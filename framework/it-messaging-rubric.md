# IT messaging rubric 4.0

The IT Pressure Test checks one piece of B2B technology messaging against six questions an IT buyer asks before taking a vendor seriously. **A person rates the copy.** The tool keeps the rating consistent, ties every rating to a passage from the copy, and turns the ratings into a score, a list of what to fix first and the questions IT will ask next.

It is an editing aid. It does not verify facts, simulate a real buyer, predict a purchase or approve copy for publication.

## Why 4.0 changed the method

Versions up to 3.3 scored copy automatically with keyword rules. Testing showed the rules rewarded vocabulary rather than meaning: a clear, buyer-focused paragraph scored 15/100, while a run-on list of terms such as *SSO*, *SOC 2* and *reduces costs by 40%* scored 85, "Strong structure". See [the 4.0 evaluation](../evals/it-rubric-4.0.md).

In 4.0 the rules no longer score anything. They suggest a passage to look at for each question and flag claims to check. The score comes only from ratings that a person makes, or confirms after an optional AI draft.

## The six questions

| Criterion | The buyer’s question (general IT lens) |
| --- | --- |
| Recognisable pressure | Which IT or employee problem is this solving, and why now? |
| Business value | What improves for the organisation, and how would we tell? |
| Stack fit | Where does this sit alongside the tools we already run? |
| Trust and governance | What new risks, controls and responsibilities would this introduce? |
| Credibility and proof | What evidence supports the main claim for an organisation like ours? |
| Clarity and repeatability | Could I explain what this does and why it matters to another stakeholder? |

Six specialist lenses (CIO, AI transformation, digital workplace, enterprise architecture, security, IT operations) reword these questions for that reader. The lens changes the questions and guidance, never the weights.

## Levels

Each criterion is rated from 0 to 4. Levels are cumulative: level 3 requires what levels 1 and 2 require.

| Criterion | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| Pressure | A problem is named | Buyer and task are tied to the problem | The consequence is explained | An explicit reason to change the current approach |
| Value | A benefit is mentioned | A specific workflow benefit | A mechanism connects the work to the benefit | A scoped measure or success test |
| Fit | An integration is mentioned | Named system and interaction | What stays or changes is explicit | A dependency or boundary is explicit |
| Trust | General assurance or credential | A specific control is stated | Who controls what is explained | A boundary or responsibility is stated |
| Proof | A source is referenced | The reference is identifiable | Its scope is stated | A relevant result or control is linked to that scope |
| Clarity | Readable text | A clear action or idea | Readable, restrained wording | An explicit next step suited to this stage |

**Evidence rule:** any level above 0 must be tied to a passage from the copy. A rating without a passage, or with a passage that isn’t in the copy, does not count.

## Weights

The purchase stage and asset format decide which questions count and how much. Weights always sum to 100.

| Criterion | Discover | Evaluate | Commit | Headline / ad | Email / outreach |
| --- | ---: | ---: | ---: | ---: | ---: |
| Recognisable pressure | 30 | 20 | 10 | 40 | 35 |
| Business value | 20 | 20 | 20 | 20 | 25 |
| Stack fit | 0 | 20 | 20 | 0 | 0 |
| Trust and governance | 0 | 10 | 20 | 0 | 0 |
| Credibility and proof | 15 | 20 | 20 | 0 | 0 |
| Clarity and repeatability | 35 | 10 | 10 | 40 | 40 |

The stage columns apply to sales pitches and product briefs. Campaign copy, homepages, strategic narratives and messaging frameworks use adjusted weights for each stage; the exact values are in [`it-rubric.js`](../docs/assets/js/it-rubric.js). A weight of 0 means the format can’t reasonably carry that question at that stage, so it isn’t asked.

```text
score = round( sum over rated criteria of (level / 4) × weight )
```

| Score | Label |
| --- | --- |
| 80–100 | Strong structure |
| 60–79 | Promising |
| 40–59 | Needs work |
| below 40 | Reframe the message |

The weights and bands are editorial choices. They have not been calibrated against buyer ratings or commercial outcomes, so compare drafts under the same stage and format and treat small differences as noise.

## What to change first

Among the rated criteria below level 4, a weak basic message comes first: clarity, then pressure, then value, if any is below level 2. After that, the criterion with the largest unearned weight, `weight × (1 − level / 4)`, comes first.

## Optional AI draft

The reviewer can copy a prompt containing the rubric, the context and the copy into an AI tool their organisation has approved, then paste the JSON reply back. The page itself makes no network requests.

A reply is applied only if every check passes:

- every required criterion is present;
- every level is a whole number from 0 to 4;
- every level above 0 quotes a passage that appears in the copy (ignoring differences in spacing).

Applied ratings are marked **AI draft** until the reviewer confirms or changes each one, and the exported record says which ratings were never confirmed.

## What the local rules still do

- **Suggest a passage** for each question, as a pointer. They often miss the right one; that’s why they no longer score.
- **Flag claims to check:** numbers, absolutes, comparisons and investment claims, each with the question a reviewer should ask. A flag never changes the score, and the absence of a flag doesn’t make a claim safe.

## Limits

- The tool checks how the copy is built, not whether it is true. It never opens sources or checks competitor material.
- A high score cannot establish message–market fit or buyer acceptance.
- Ratings depend on the reviewer. Two reviewers can disagree; the passage tied to each rating makes the disagreement easy to discuss.

## Calibration still needed

Use varied real draft pairs across stages and formats, rated independently by at least two reviewers. Compare agreement by criterion and the order in which reviewers rank drafts, then adjust the level descriptions and weights. No calibration dataset or outcome validation is claimed here.

Implementation: [`review.js`](../docs/assets/js/review.js) (scoring, AI-reply validation, export) and [`it-rubric.js`](../docs/assets/js/it-rubric.js) (weights, levels, passage suggestions, claim flags). Tests: [`review.test.js`](../tests/review.test.js). The separate [manual eight-dimension rubric](positioning-rubric.md) uses a different scale; its scores are not interchangeable with this tool’s.
