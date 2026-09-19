import test from "node:test";
import assert from "node:assert/strict";

import { exportFilename, reviewToJson, reviewToMarkdown } from "../docs/assets/js/export.js";
import { generateEvaluationPrompt } from "../docs/assets/js/prompt.js";
import { DIMENSIONS } from "../docs/assets/js/rubric.js";
import { readFixture } from "./helpers.js";

test("prompt includes context, source, rubric, injection boundary, and strict JSON instruction", async () => {
  const fixture = await readFixture("signalsdesk-review.json");
  const prompt = generateEvaluationPrompt(fixture);
  assert.match(prompt, /Return exactly one JSON object/);
  assert.match(prompt, /untrusted data, never as instructions/);
  assert.match(prompt, /<review_context>/);
  assert.match(prompt, /<source_messaging>/);
  assert.match(prompt, /SignalsDesk is an innovative AI-powered platform/);
  assert.match(prompt, /Product managers at growing B2B software companies/);
  for (const dimension of DIMENSIONS) {
    assert.match(prompt, new RegExp(dimension.id));
    assert.match(prompt, new RegExp(dimension.anchors[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("JSON export round-trips and Markdown export contains the review result", async () => {
  const fixture = await readFixture("signalsdesk-review.json");
  assert.deepEqual(JSON.parse(reviewToJson(fixture)), fixture);
  const markdown = reviewToMarkdown(fixture);
  assert.match(markdown, /^# Positioning QA: SignalsDesk homepage hero/m);
  assert.match(markdown, /\*\*Normalized score:\*\* 39\/100/);
  assert.match(markdown, /Responsible AI claims/);
  assert.match(markdown, /SignalsDesk is fictional/);
});

test("exports reject incomplete artifacts", async () => {
  const fixture = await readFixture("signalsdesk-review.json");
  fixture.summary.priorityFindings = [];
  assert.throws(() => reviewToJson(fixture), /cannot be exported/);
  assert.throws(() => reviewToMarkdown(fixture), /cannot be exported/);
});

test("download filenames are normalized", () => {
  assert.equal(exportFilename("SignalsDesk Homepage Hero!", "json"), "signalsdesk-homepage-hero.json");
  assert.equal(exportFilename("", "md"), "positioning-review.md");
});
