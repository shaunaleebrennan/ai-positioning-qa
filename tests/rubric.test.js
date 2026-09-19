import test from "node:test";
import assert from "node:assert/strict";

import { DIMENSIONS, DIMENSION_IDS } from "../docs/assets/js/rubric.js";

test("rubric defines eight unique dimensions totaling 100 percent", () => {
  assert.equal(DIMENSIONS.length, 8);
  assert.equal(new Set(DIMENSION_IDS).size, 8);
  assert.equal(DIMENSIONS.reduce((total, dimension) => total + dimension.weight, 0), 100);
});

test("every dimension includes the question and 1, 3, and 5 anchors", () => {
  for (const dimension of DIMENSIONS) {
    assert.ok(dimension.question.length > 10);
    assert.deepEqual(Object.keys(dimension.anchors), ["1", "3", "5"]);
    assert.ok(dimension.anchors[1]);
    assert.ok(dimension.anchors[3]);
    assert.ok(dimension.anchors[5]);
  }
});
