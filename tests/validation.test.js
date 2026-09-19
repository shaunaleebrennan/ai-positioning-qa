import test from "node:test";
import assert from "node:assert/strict";

import { cloneSignalsDeskExample } from "../docs/assets/js/sample-data.js";
import {
  MAX_IMPORT_BYTES,
  parseReviewJson,
  validateReview,
} from "../docs/assets/js/validation.js";
import { clone, readFixture } from "./helpers.js";

for (const name of [
  "signalsdesk-review.json",
  "releaseguard-strong-review.json",
  "relayboard-non-ai-review.json",
]) {
  test(`${name} is a valid strict review`, async () => {
    const fixture = await readFixture(name);
    assert.deepEqual(validateReview(fixture), { valid: true, errors: [] });
  });
}

test("the browser example matches the canonical SignalsDesk JSON fixture", async () => {
  assert.deepEqual(cloneSignalsDeskExample(), await readFixture("signalsdesk-review.json"));
});

test("import rejects invalid JSON and oversized input", () => {
  assert.deepEqual(parseReviewJson("not json"), {
    valid: false,
    errors: ["Imported review is not valid JSON."],
  });
  const result = parseReviewJson(" ".repeat(MAX_IMPORT_BYTES + 1));
  assert.equal(result.valid, false);
  assert.match(result.errors[0], /byte limit/);
});

test("strict validation rejects missing and unexpected fields", async () => {
  const fixture = await readFixture("signalsdesk-review.json");
  const missing = clone(fixture);
  delete missing.metadata.audience;
  assert.ok(validateReview(missing).errors.some((error) => error.includes("metadata.audience is required")));

  const unexpected = clone(fixture);
  unexpected.dimensions[0].modelCommentary = "should not be accepted";
  assert.ok(validateReview(unexpected).errors.some((error) => error.includes("modelCommentary is not allowed")));
});

test("version, review date, and UI-required context fields are enforced", async () => {
  const fixture = await readFixture("signalsdesk-review.json");
  const invalid = clone(fixture);
  invalid.appVersion = "0.9.0";
  invalid.rubricVersion = "draft";
  invalid.metadata.reviewedAt = "someday";
  invalid.metadata.journeyStage = "";
  invalid.metadata.buyingTrigger = "";
  invalid.metadata.alternatives = "";
  const errors = validateReview(invalid).errors.join("\n");
  assert.match(errors, /appVersion must be 1\.0\.0/);
  assert.match(errors, /rubricVersion must be 1\.0\.0/);
  assert.match(errors, /valid ISO 8601/);
  assert.match(errors, /journeyStage cannot be empty/);
  assert.match(errors, /buyingTrigger cannot be empty/);
  assert.match(errors, /alternatives cannot be empty/);
});

test("scores and confidence values are checked together", async () => {
  const fixture = await readFixture("signalsdesk-review.json");
  const invalidScore = clone(fixture);
  invalidScore.dimensions[0].score = 2.5;
  assert.ok(validateReview(invalidScore).errors.some((error) => error.includes("integer from 1 to 5")));

  const invalidConfidence = clone(fixture);
  invalidConfidence.dimensions[0].confidence = "certain";
  assert.ok(validateReview(invalidConfidence).errors.some((error) => error.includes("must be low, medium, high")));

  const conflicting = clone(fixture);
  conflicting.dimensions[0].score = null;
  conflicting.dimensions[0].confidence = "high";
  assert.ok(validateReview(conflicting).errors.some((error) => error.includes("must be not-applicable")));
});

test("applicable evidence must be a non-empty exact source substring", async () => {
  const fixture = await readFixture("signalsdesk-review.json");
  const empty = clone(fixture);
  empty.dimensions[0].evidenceQuote = "";
  assert.ok(validateReview(empty).errors.some((error) => error.includes("cannot be empty")));

  const paraphrase = clone(fixture);
  paraphrase.dimensions[0].evidenceQuote = "teams that are modern";
  assert.ok(validateReview(paraphrase).errors.some((error) => error.includes("exact substring")));
});

test("N/A permits an empty evidence quote but still rejects a fabricated quote", async () => {
  const fixture = await readFixture("relayboard-non-ai-review.json");
  assert.equal(validateReview(fixture).valid, true);

  const fabricated = clone(fixture);
  fabricated.dimensions.at(-1).evidenceQuote = "This quote is not in the source.";
  assert.ok(validateReview(fabricated).errors.some((error) => error.includes("exact substring")));
});

test("imported calculation must match deterministic scoring", async () => {
  const fixture = await readFixture("signalsdesk-review.json");
  fixture.calculation.score = 99;
  const result = parseReviewJson(JSON.stringify(fixture));
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.includes("deterministic score of 39")));
});

test("a reviewed artifact requires human notes", async () => {
  const fixture = await readFixture("signalsdesk-review.json");
  fixture.summary.humanNotes = "";
  const result = validateReview(fixture);
  assert.ok(result.errors.some((error) => error.includes("required when manual review is marked reviewed")));
});
