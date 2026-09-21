# Pressure test: scoring and review controls

Date: 21 September 2026 · App: 1.1.0 · Rubric: 1.0.0

## What was tested

Deterministic scoring, adversarial review records, import handling, prompt instructions, and the browser workflow. This was not a benchmark of any external language model. The app has no model connection, and this release does not establish model reliability, reviewer agreement, or market validity.

## Findings and fixes

| Pressure case | Before | Now |
|---|---|---|
| A single space used as evidence | Accepted because it occurred in the source | Rejected as empty evidence |
| Seven dimensions excluded, remaining dimension scored 5 | Valid 100/100 with 15% coverage | Still mathematically 100, prominently labelled a partial review with excluded dimensions listed |
| All 5s except credibility at 1 | 92/100 plus a separate risk flag | Critical-claims diagnosis appears before the score |
| Imported JSON asserts human approval | Approval carried into the UI | Import resets to pending; historical notes remain |
| Imported JSON changes source or audience | Could replace the current review | Source and decision context must match; restoring another saved record requires clearing first |
| AI prompt inherits human review type | Could mislabel an AI response | Prompt requires AI-assisted authorship and pending human review |
| Edit after human approval | Result invalidated, approval selection remained | Result/export invalidated and approval resets to pending |
| Missing evidence and low-confidence ratings | Visible only in individual fields | Aggregated in the result and Markdown export |
| Syntax-check command with a wildcard | Node could check only the first expanded file | Every browser JavaScript module is checked individually |

## Model properties

The eight weights are unchanged. SignalsDesk remains 39/100. Scores of 1–5 map to a minimum of 20 and maximum of 100; zero is not a valid complete review. N/A removes weight from the denominator, so reviews with different coverage should not be compared as equivalent.

A sensitivity scenario shifts all applicable ratings one point down or up, bounded at 1 and 5. It describes dependence on reviewer judgment; it is not a confidence interval or calibrated probability. Confidence labels are self-reported.

200 deterministic score variations test order independence and monotonicity. Fixtures cover weak AI copy, stronger AI evidence, and a non-AI product. The suite also covers import size limits, altered totals, fabricated quotations, missing fields, invalid confidence, and all-N/A rejection.

## Strategic challenge added

The optional category stress test asks for a category claim, competitor/analyst/customer challenges, a response with trade-offs, evidence and gaps, disconfirming test, and decision owner. Its export preserves the source and asset version. It remains a draft for human decision and does not change the numeric messaging score.

## What remains unvalidated

- A literal quotation can still be irrelevant, circular, or false. Substring validation cannot establish truth or entailment.
- A confident reviewer can award unsupported high scores. Diagnostics expose inconsistencies but do not replace expert review.
- Prompt instructions reduce ambiguity but do not guarantee resistance to adversarial input in an external AI tool.
- Real model comparisons, blind human calibration, and longitudinal buyer outcomes have not been run.
- A local review-state control is not an authenticated approval system. There is no server audit log, access control, or persistent approval workflow.

## Next evaluation

Have two independent PMMs score the same set of short and long assets without seeing each other's ratings. Record per-dimension agreement, exclusion choices, evidence relevance, and counterarguments. Only then assess whether weights or anchors should change. For external model testing, record provider/model/version, prompt version, repeated outputs, costs, and human adjudication; do not infer quality from JSON validity.
