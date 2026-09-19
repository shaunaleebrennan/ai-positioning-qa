import test from "node:test";
import assert from "node:assert/strict";

import { calculateScore, ScoringError } from "../docs/assets/js/scoring.js";
import { DIMENSIONS } from "../docs/assets/js/rubric.js";
import { readFixture } from "./helpers.js";

test("SignalsDesk fixture calculates exactly 39/100", async () => {
  const fixture = await readFixture("signalsdesk-review.json");
  const result = calculateScore(fixture.dimensions);
  assert.equal(result.score, 39);
  assert.equal(result.applicableWeight, 100);
  assert.deepEqual(result.excludedDimensions, []);
});

test("N/A dimensions are excluded and remaining weights are normalized", async () => {
  const fixture = await readFixture("relayboard-non-ai-review.json");
  const result = calculateScore(fixture.dimensions);
  assert.equal(result.score, 84.4);
  assert.equal(result.applicableWeight, 90);
  assert.deepEqual(result.excludedDimensions.map(({ id }) => id), ["responsible-ai-claims"]);
});

test("all-N/A score sets are rejected", () => {
  const dimensions = DIMENSIONS.map(({ id }) => ({ id, score: null }));
  assert.throws(
    () => calculateScore(dimensions),
    (error) =>
      error instanceof ScoringError && error.code === "ALL_DIMENSIONS_NOT_APPLICABLE",
  );
});

test("score 1 triggers critical evidence and responsible-AI flags", () => {
  const dimensions = DIMENSIONS.map(({ id }) => ({ id, score: 3 }));
  dimensions.find(({ id }) => id === "evidence-and-credibility").score = 1;
  dimensions.find(({ id }) => id === "responsible-ai-claims").score = 1;
  const result = calculateScore(dimensions);
  assert.deepEqual(result.criticalFlags.map(({ code }) => code), [
    "CRITICAL_EVIDENCE_RISK",
    "CRITICAL_RESPONSIBLE_AI_RISK",
  ]);
});

test("unknown, duplicate, missing, and out-of-range dimensions are rejected", () => {
  const valid = DIMENSIONS.map(({ id }) => ({ id, score: 3 }));
  assert.throws(() => calculateScore(valid.slice(1)), /Missing dimension scores/);
  assert.throws(() => calculateScore([...valid.slice(0, 7), { id: valid[0].id, score: 3 }]), /Duplicate/);
  assert.throws(() => calculateScore([...valid.slice(0, 7), { id: "unknown", score: 3 }]), /Unknown/);
  assert.throws(() => calculateScore(valid.map((item, index) => ({ ...item, score: index ? 3 : 6 }))), /1 to 5/);
});
