# IT buyer integration — 21 September 2026

Integrated the v2.1 HTML output from the ChatGPT task “Enhance Positioning Checker”. The similarly named download was a saved copy of the older app; the newer source was retrieved from the task's output panel. Original source preserved locally outside the public repository.

## Retained

Six IT remits; three buying roles; purchase-stage weighting; narrative and positioning-framework asset types; Gut Reaction; top-three changes; buyer questions; six gates; in-tool deep review; editable rewrite brief; Markdown export.

## Integration fixes

- Kept the five awareness stages alongside the distinct purchase-stage selector.
- Preserved the manual eight-dimension workflow at `manual-review.html` and its JSON compatibility.
- Removed silent local storage and the obsolete external-prompt dialog/listener interception.
- Every input or context change hides results, removes the old deep review and invalidates export state. Example load and clear also reset results.
- Scoring examines the message only: supplied proof cannot silently inflate what the copy communicates.
- Matched passages preserve source whitespace. All user text inserted into HTML templates is escaped.
- Exports include source, context, supplied proof, awareness, rewrite guidance and any edited brief.
- Replaced buyer-readiness claims with explicit language-signal diagnostics; a high score grants no approval.
- Withheld the prototype's unattributed research percentages pending source-level verification. No underlying private research files were published.

## Validation

44 automated checks pass, including all prior manual tests and new proof-isolation, exact-quote, export-context and 54 remit/role/purchase-stage combinations. Browser checks cover example review, deep review, awareness changes invalidating results and mobile layout at 390px.

## Limits and next work

Keyword matching is not semantic evaluation: negation, keyword stuffing, irrelevant quotations and unsupported assertions can still score highly. Weights are prototype choices, not calibrated research findings. Gut Reaction is templated guidance from a composite lens, not real buyer testimony. Awareness and asset type inform rewrite guidance; regional preferences do not change scores. There is no research retrieval, Cortex integration, external model benchmark or authenticated approval system. Validate against independently scored assets before treating the score as a reliable prioritisation model.
