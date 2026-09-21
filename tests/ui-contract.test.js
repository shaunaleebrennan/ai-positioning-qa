import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("the static app exposes the complete workflow with unique IDs", async () => {
  const html = await read("docs/manual-review.html");
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "HTML IDs must be unique");

  for (const id of [
    "review-form",
    "asset-name",
    "reviewer-type",
    "audience",
    "source-messaging",
    "dimensions",
    "priority-findings",
    "next-test",
    "human-notes",
    "calculate",
    "results",
    "overall-score",
    "export-markdown",
    "export-json",
    "prompt-dialog",
    "import-dialog",
  ]) {
    assert.ok(ids.includes(id), `Missing required workflow element #${id}`);
  }

  assert.match(html, /<section id="results"[^>]*hidden/);
  assert.match(html, /<script type="module" src="\.\/assets\/js\/app\.js"><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="\.\/assets\/styles\.css">/);
  assert.match(html, /<link rel="icon" href="\.\/favicon\.svg" type="image\/svg\+xml">/);
});

test("the browser surface blocks remote connections and unsafe rendering primitives", async () => {
  const [html, app] = await Promise.all([
    read("docs/manual-review.html"),
    read("docs/assets/js/app.js"),
  ]);

  assert.match(html, /connect-src 'none'/);
  assert.doesNotMatch(html, /<(?:script|link)[^>]+(?:src|href)="https?:/i);
  assert.doesNotMatch(app, /\b(?:innerHTML|outerHTML|insertAdjacentHTML|document\.write|eval|Function)\b/);
  assert.doesNotMatch(app, /\b(?:fetch|XMLHttpRequest|localStorage|sessionStorage)\b/);
  assert.match(app, /\.textContent\s*=/);
});

test("the interface includes keyboard, small-screen, and reduced-motion safeguards", async () => {
  const [html, css] = await Promise.all([
    read("docs/manual-review.html"),
    read("docs/assets/styles.css"),
  ]);

  assert.match(html, /class="skip-link"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /role="alert"/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(max-width: 38rem\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /min-width:\s*20rem/);
});
