# IT messaging rubric 3.1

The public IT Pressure Test scores the structure of one message for its purchase stage and format. It is a vendor-neutral editing aid. It does not verify facts, simulate a real buyer, measure purchase probability or approve copy for publication.

## Calculation

Each criterion earns a level from 0 to 4. Checks are cumulative: stronger credit requires the preceding checks. A criterion contributes `level / 4 × weight`; the contributions are summed and the total is rounded once.

| Criterion | Discover | Evaluate | Commit | Discover headline |
| --- | ---: | ---: | ---: | ---: |
| Recognisable pressure | 30 | 20 | 10 | 40 |
| Business value | 20 | 20 | 20 | 20 |
| Stack fit | 0 | 20 | 20 | 0 |
| Trust and governance | 0 | 10 | 20 | 0 |
| Credibility and proof | 15 | 20 | 20 | 0 |
| Clarity and repeatability | 35 | 10 | 10 | 40 |
| Total | 100 | 100 | 100 | 100 |

These weights are editorial choices. Discover prioritises a recognisable problem and clear proposition; later stages give more weight to system fit, controls and justification. Neither the weights nor the equal spacing between levels have been calibrated against independent buyer ratings or commercial outcomes.

## What earns stronger credit

| Criterion | Level 1 | Level 2 | Level 3 | Level 4 |
| --- | --- | --- | --- | --- |
| Pressure | Problem named | Buyer and task linked to problem | Consequence explained | Reason to reconsider the current approach |
| Value | Benefit mentioned | Specific workflow benefit | Mechanism connected to benefit | Measure, population and period in the benefit passage |
| Fit | Interaction mentioned | Named or described system and action | What stays or changes | Dependency or boundary |
| Trust | Assurance or credential | Specific control and object | Control owner | Boundary or responsibility |
| Proof | Source reference | URL or identifiable document citation | Relevant scope | Scoped result or control |
| Clarity | Usable text | Concrete proposition | Readable, restrained wording | Stage-appropriate next step |

Level 0 means the rule did not detect a qualifying passage; it is not proof the content is absent or false. Open a criterion in **Why this score?** to inspect its estimated level and matched passage.

For a Discover headline, a specific beneficiary and workflow outcome replace the full success measure. Technical detail and inline proof carry no weight, and a headline does not need its own CTA. Claims still need scrutiny even when proof carries no points.

## Evidence and claim safeguards

- Only the source message earns points. Separate background proof cannot silently improve it.
- A publisher's name alone earns source-reference credit, not identifiable-document credit.
- All supplied and referenced evidence remains unverified: the tool does not open sources or establish that they support the claim.
- An asserted material claim without attribution in its passage limits proof credit to level 1. Attribution elsewhere may be valid, but requires a human to make that connection.
- An absolute assurance limits trust credit to level 1 until scope and exceptions are reviewed.
- High-risk assertions display **Claim review required** beside the score. A high total never clears them.
- Proposed measurements are separated from achieved results. Investment, adoption, pricing and comparative claims get different review questions.
- Exact repeated passages earn no extra criterion credit. Known vendor names have no special score advantage.

## Interpreting results

The ordinary labels are 80–100 **Strong structure**, 60–79 **Promising**, 40–59 **Needs work** and below 40 **Reframe the message**. These are editorial bands, not validated thresholds. Critical-claim warnings override the positive label without hiding the underlying calculation.

Compare drafts only under the same rubric version, purchase stage and asset format. A small score change has no established practical significance. Audience, buying role and awareness shape questions and rewrite guidance; they do not add hidden numerical bonuses. Market focus is recorded context only.

The local rules can miss paraphrases, negation, relationships between sentences and important claims. They can also reward structurally complete but irrelevant or false copy. Review the meaning, the central promise and the applicability of every source before using the recommendations.

## Calibration still needed

Use varied real draft pairs across stages and formats, independently scored by at least two reviewers who cannot see the automated result. Examine criterion disagreement and pairwise ordering, including vendor substitutions, paraphrases, negation and citation formats. Tune on one subset and check another. No calibration dataset or outcome-validation result is claimed here.

Implementation: [`it-rubric.js`](../docs/assets/js/it-rubric.js). Regression checks: [`it-rubric.test.js`](../tests/it-rubric.test.js). The separate [manual eight-dimension rubric](positioning-rubric.md) uses a different scale and its scores are not interchangeable with this tool.
