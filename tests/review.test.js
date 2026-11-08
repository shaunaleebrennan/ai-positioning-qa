import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { prepare, score, band, priorities, parseAIReview, buildPrompt, quoteInMessage, summary, CRITERIA } from '../docs/assets/js/review.js';
import { profiles, buyingRoles } from '../docs/assets/js/it-engine.js';
import { EXAMPLE } from '../docs/assets/js/it-example.js';

const ctx = (message, extra = {}) => ({ persona: 'general', buyingRole: 'unknown', goal: 'shortlist', assetType: 'Homepage / landing page', region: 'global', awareness: 'Problem aware', alternatives: '', proof: '', message, ...extra });
const STUFFED = "IT teams struggle with manual, fragmented, siloed workflows because of complexity, which leads to delays. Rather than replacing your tools, our platform integrates with your HR system and ticketing system via API and SSO, keeps your system of record, requires admin configuration, reduces costs by 40% for 500 employees in 90 days through automation, is SOC 2 and ISO 27001 compliant with access control owned by IT administrators, according to the Forrester report https://example.com covering 12 enterprises. Book a demo.";

test('keywords alone earn nothing: the score comes only from ratings', () => {
  const prepared = prepare(ctx(STUFFED));
  const result = score(prepared.weights, {}, STUFFED);
  assert.equal(result.total, 0);
  assert.equal(result.complete, false);
  assert.equal(result.rated.length, 0);
});

test('a level above 0 only counts when it is tied to a passage from the copy', () => {
  const message = 'Employees wait days for answers. Ask once in Teams and get the policy paragraph.';
  const prepared = prepare(ctx(message));
  const withoutQuote = score(prepared.weights, { clarity: { level: 3, quote: '' } }, message);
  const invented = score(prepared.weights, { clarity: { level: 3, quote: 'Cut costs by 90%' } }, message);
  const grounded = score(prepared.weights, { clarity: { level: 3, quote: 'Ask once in Teams' } }, message);
  assert.equal(withoutQuote.rated.length, 0);
  assert.equal(invented.rated.length, 0);
  assert.deepEqual(grounded.rated, ['clarity']);
  assert.equal(grounded.total, Math.round((3 / 4) * prepared.weights.clarity));
});

test('the score is the weighted sum of levels, rounded once, and complete only when every required question is rated', () => {
  const prepared = prepare(ctx(EXAMPLE.message, { persona: 'workplace' }));
  const parsed = parseAIReview(JSON.stringify(EXAMPLE.reply), EXAMPLE.message, prepared.weights);
  assert.ok(parsed.ok);
  const result = score(prepared.weights, parsed.ratings, EXAMPLE.message);
  const expected = CRITERIA.reduce((sum, id) => sum + (parsed.ratings[id] ? (parsed.ratings[id].level / 4) * prepared.weights[id] : 0), 0);
  assert.equal(result.total, Math.round(expected));
  assert.ok(result.complete);
  assert.equal(result.drafts.length, result.rated.length, 'AI ratings stay drafts until a person confirms them');
  assert.equal(band(result.total), 'Strong structure');
});

test('AI replies are rejected when a criterion is missing, a level is invalid or a quote is not in the copy', () => {
  const prepared = prepare(ctx(EXAMPLE.message));
  const reply = structuredClone(EXAMPLE.reply);
  delete reply.ratings.trust;
  assert.equal(parseAIReview(JSON.stringify(reply), EXAMPLE.message, prepared.weights).ok, false);
  const badLevel = structuredClone(EXAMPLE.reply);
  badLevel.ratings.value.level = 5;
  assert.equal(parseAIReview(JSON.stringify(badLevel), EXAMPLE.message, prepared.weights).ok, false);
  const invented = structuredClone(EXAMPLE.reply);
  invented.ratings.value.quote = 'Customers save 90% of their IT budget.';
  const result = parseAIReview(JSON.stringify(invented), EXAMPLE.message, prepared.weights);
  assert.equal(result.ok, false);
  assert.match(result.errors.join(' '), /not in the copy/);
  assert.equal(parseAIReview('not json', EXAMPLE.message, prepared.weights).ok, false);
  assert.equal(parseAIReview('x'.repeat(60000), EXAMPLE.message, prepared.weights).ok, false);
});

test('AI replies wrapped in prose or code fences still parse, and quotes match despite whitespace changes', () => {
  const prepared = prepare(ctx(EXAMPLE.message));
  const wrapped = 'Here is the review:\n```json\n' + JSON.stringify(EXAMPLE.reply) + '\n```';
  assert.ok(parseAIReview(wrapped, EXAMPLE.message, prepared.weights).ok);
  assert.ok(quoteInMessage('IT teams   already run\nthree tools', EXAMPLE.message));
});

test('priorities put a weak basic message first, then the largest unearned weight', () => {
  const message = 'One. Two. Three. Four.';
  const weights = { relevance: 20, value: 20, fit: 20, trust: 10, proof: 20, clarity: 10 };
  const ratings = { relevance: { level: 3, quote: 'One.' }, value: { level: 2, quote: 'Two.' }, fit: { level: 0 }, trust: { level: 4, quote: 'Three.' }, proof: { level: 1, quote: 'Four.' }, clarity: { level: 1, quote: 'One.' } };
  assert.deepEqual(priorities(weights, ratings, message), ['clarity', 'fit', 'proof', 'value', 'relevance']);
});

test('stage and format decide which questions count', () => {
  const discover = prepare(ctx('Copy.', { goal: 'attention', assetType: 'Headline / paid ad' }));
  assert.equal(discover.weights.fit, 0);
  assert.equal(discover.weights.trust, 0);
  for (const prepared of [discover, prepare(ctx('Copy.', { goal: 'evaluation' }))]) {
    assert.equal(Object.values(prepared.weights).reduce((a, b) => a + b, 0), 100);
  }
});

test('the prompt carries the rules, the rubric and the exact copy, and the record carries provenance', () => {
  const prepared = prepare(ctx(EXAMPLE.message));
  const prompt = buildPrompt(ctx(EXAMPLE.message), profiles.general, prepared);
  assert.match(prompt, /exact, continuous passage/);
  assert.match(prompt, /Keywords alone do not earn credit/);
  assert.ok(prompt.includes(EXAMPLE.message));
  const parsed = parseAIReview(JSON.stringify(EXAMPLE.reply), EXAMPLE.message, prepared.weights);
  const record = summary({ context: ctx(EXAMPLE.message), profile: profiles.general, role: buyingRoles.unknown, prepared, ratings: parsed.ratings, result: score(prepared.weights, parsed.ratings, EXAMPLE.message) });
  assert.match(record, /AI draft, not confirmed/);
  assert.ok(record.includes(EXAMPLE.message));
});

test('the tool page keeps every request local', async () => {
  const html = await readFile(new URL('../docs/tool.html', import.meta.url), 'utf8');
  assert.match(html, /connect-src 'none'/);
  assert.doesNotMatch(html, /<script[^>]+src="https?:|<link[^>]+rel="stylesheet"[^>]+href="https?:/i);
  for (const id of ['context', 'message', 'start', 'review', 'criteria', 'ai-assist', 'copy-prompt', 'ai-reply', 'apply-ai', 'verdict', 'score', 'priorities', 'questions', 'claims', 'export']) assert.match(html, new RegExp(`id="${id}"`));
  const app = await readFile(new URL('../docs/assets/js/it-review-app.js', import.meta.url), 'utf8');
  assert.doesNotMatch(app, /\b(?:innerHTML|outerHTML|insertAdjacentHTML|eval|fetch|XMLHttpRequest|localStorage|sessionStorage)\b/);
});
