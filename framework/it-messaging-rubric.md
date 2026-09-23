# IT messaging rubric 3.3

The public IT Pressure Test scores the structure of one message for its purchase stage and format. It is a vendor-neutral editing aid. It does not verify facts, simulate a real buyer, measure purchase probability or approve copy for publication. A headline scored at Commit is still a headline score, not an assessment of an entire purchase case.

## Calculation

Each criterion earns a level from 0 to 4. Checks are cumulative: stronger credit requires the preceding checks. A criterion contributes `level / 4 × weight`; the contributions are summed and the total is rounded once.

| Criterion | Full asset: Discover | Full asset: Evaluate | Full asset: Commit | Headline: any stage | Outreach: any stage |
| --- | ---: | ---: | ---: | ---: | ---: |
| Recognisable pressure | 30 | 20 | 10 | 40 | 35 |
| Business value | 20 | 20 | 20 | 20 | 25 |
| Stack fit | 0 | 20 | 20 | 0 | 0 |
| Trust and governance | 0 | 10 | 20 | 0 | 0 |
| Credibility and proof | 15 | 20 | 20 | 0 | 0 |
| Clarity and repeatability | 35 | 10 | 10 | 40 | 40 |
| Total | 100 | 100 | 100 | 100 | 100 |

Full asset defaults apply to sales pitches and product briefs. Other formats adjust them as follows, listed in criterion order: pressure, value, fit, trust, proof, clarity.

| Format | Discover | Evaluate | Commit |
| --- | --- | --- | --- |
| Campaign / thought leadership | 35 / 25 / 0 / 0 / 0 / 40 | 30 / 25 / 10 / 0 / 10 / 25 | 20 / 25 / 15 / 10 / 10 / 20 |
| Homepage / landing page | 30 / 25 / 0 / 0 / 15 / 30 | 20 / 20 / 20 / 10 / 15 / 15 | full asset |
| IT strategic narrative or positioning framework | 35 / 25 / 0 / 0 / 10 / 30 | 25 / 20 / 15 / 10 / 20 / 10 | full asset |

Headlines and outreach use the same short-format weights at each purchase stage: the score concerns the supplied unit of copy. For a headline/ad longer than 45 words or outreach longer than 200 words, clarity is capped at level 2. Those are editorial review limits, not researched conversion thresholds.

These weights are editorial choices. Discover prioritises a recognisable problem and clear proposition; later stages give more weight to system fit, controls and justification when the format can carry them. Priority changes normally follow the largest unearned criterion weight, but place clarity, then relevance, then value first if its basic level is below 2. That editorial diagnostic order draws on Wynter's [Message Layers](https://grader.wynter.com/) and [research playbook](https://wynter.com/research-playbook); it does not reproduce a Wynter panel, comparison index or score. Neither the weights nor the equal spacing between levels have been calibrated against independent buyer ratings or commercial outcomes.

## What earns stronger credit

| Criterion | Level 1 | Level 2 | Level 3 | Level 4 |
| --- | --- | --- | --- | --- |
| Pressure | Problem named | Buyer and task linked to problem | Consequence explained | Discover: reason to reconsider; fuller Evaluate/Commit asset: contrast plus stated mechanism |
| Value | Benefit mentioned | Specific workflow benefit | Mechanism connected to benefit | Full asset: measure, population and period; short/editorial asset: beneficiary and workflow |
| Fit | Interaction mentioned | Named or described system and action | What stays or changes | Dependency or boundary |
| Trust | Assurance or credential | Specific control and object | Control owner | Boundary or responsibility |
| Proof | Source reference | URL or identifiable document citation | Relevant scope | Scoped result or control |
| Clarity | Usable text | Concrete proposition | Readable, restrained wording | Stage-appropriate next step, or a clear takeaway where a CTA is optional |

Level 0 means the rule did not detect a qualifying passage; it is not proof the content is absent or false. Open a criterion in **Why this score?** to inspect its estimated level and matched passage.

For short formats, a specific beneficiary and workflow outcome replace the full success measure. Technical detail and inline proof carry no points. Headlines, editorial copy, strategic narratives and internal messaging frameworks do not need a CTA. Emails still need a next step. Claims still need scrutiny even when proof carries no points. The score checks whether the text *expresses* a difference; it does not check competitor material or prove the difference is true. The attached Wynter example uses simulated respondents, so its numerical ratings are a prompt to examine clarity and distinctness, not observed IT buyer performance.

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

Compare drafts only under the same rubric version, purchase stage and asset format. A small score change has no established practical significance. The general IT lens and unknown buying role are defaults when marketing has not identified the reader. A selected specialist remit or buying role changes the Gut Reaction, questions and rewrite guidance; none add hidden numerical bonuses. Every remit has a focus question in the output even when its detailed criterion has no weight in a short asset. Market focus is recorded context only.

The local rules can miss paraphrases, negation, relationships between sentences and important claims. Version 3.3 recognizes common inflected action verbs in short buyer-problem passages; scores from 3.2 and 3.3 are not comparable. The rules can still reward structurally complete but irrelevant or false copy. Review the meaning, the central promise and the applicability of every source before using the recommendations.

## Calibration still needed

Use varied real draft pairs across stages and formats, independently scored by at least two reviewers who cannot see the automated result. Examine criterion disagreement and pairwise ordering, including vendor substitutions, paraphrases, negation and citation formats. Tune on one subset and check another. No calibration dataset or outcome-validation result is claimed here.

Implementation: [`it-rubric.js`](../docs/assets/js/it-rubric.js). Regression checks: [`it-rubric.test.js`](../tests/it-rubric.test.js). The separate [manual eight-dimension rubric](positioning-rubric.md) uses a different scale and its scores are not interchangeable with this tool.
