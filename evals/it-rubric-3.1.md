# IT messaging rubric 3.1 — validation notes

23 September 2026. Scope: the public, vendor-neutral IT Pressure Test and its source-message scoring. This record supersedes the 2.2 integration notes for the current automated tool. The manual evaluator remains a separate workflow.

## Changes

- Replaced keyword totals and hidden persona/role bonuses with cumulative 0–4 criteria, explicit stage weights and separate Discover-headline requirements.
- Kept the score, Gut Reaction, priority changes and buyer questions visible; moved detailed scoring and optional context behind expandable controls.
- Kept proof status separate from structural coverage, and exposed critical claims beside the score.
- Retained awareness guidance, editable deep-review briefs, complete Markdown context, memory-only input state and the manual evaluator.

## Reproducible safeguards

- A publisher-only reference such as “According to Gartner…” earns source-reference credit but not an identifiable-document score.
- “IT admins never restrict access…” does not earn the positive control's full trust credit.
- Replacing Salesforce with HubSpot or an unfamiliar system name in the same integration statement does not change fit credit in the tested cases.
- “We will compare baseline tickets…” is classified as a prospective measurement plan, not an achieved result.
- An absolute assurance receives a trust cap and a visible **Claim review required** verdict, regardless of the overall band.
- Repeated text cannot add criterion credit; background evidence does not affect the source-message score.
- Placeholder proof, decimal numbers and URLs are handled separately from valid attribution.

## Verification

`npm run check` passed 59 deterministic tests, including the retained manual-evaluator checks, the IT export/context checks and new rubric regressions. Formula totals reconcile to 100 possible points across the tested stages and formats.

Browser checks passed for compact inputs, collapsed scoring details, in-tool deep review, edited-brief export, critical warnings, stale-result invalidation, HTML escaping, no automatic persistence or external requests, and the manual-evaluator route. Desktop and 390px output were visually inspected; 320px and 390px layouts were checked for horizontal overflow.

These are software and rule-behaviour checks, not an accuracy rate or evidence of buyer agreement.

## Remaining limits

The rubric is an editing aid. Patterns can miss paraphrases, negation and semantic relationships; structurally complete but irrelevant or false claims can still receive points. Source existence, authenticity and applicability are not verified. Weights and score bands are editorial, and small score differences have no established practical significance.

Before making validity claims, compare varied real draft pairs with independent, blind human reviews. Examine disagreements by criterion, stage and format; tune on one subset and evaluate another. No such calibration results are claimed.
