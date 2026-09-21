# Positioning QA rubric

Use this rubric to review a single messaging asset in a defined context. Record the asset, intended audience, funnel stage, known alternatives, and available evidence before scoring.

## Scoring principles

- Score what the asset communicates, not what the reviewer knows about the product.
- Attach evidence from the source asset to every score.
- Use `not assessable` when the necessary context is absent; do not silently award a midpoint.
- Record confidence separately from quality.
- Treat the score as a prioritization aid, not proof of market resonance.

## Scale

| Score | General meaning |
|---:|---|
| 1 | Missing, misleading, or counterproductive |
| 2 | Present only weakly; substantial ambiguity remains |
| 3 | Adequate but generic, incomplete, or insufficiently supported |
| 4 | Specific, relevant, and mostly well supported |
| 5 | Exceptionally clear, distinctive, credible, and appropriate to context |

## 1. ICP specificity — 15%

**Question:** Is it clear who the product is for and in what situation it becomes valuable?

- **1:** No recognizable audience or use context.
- **3:** A broad audience is named, but role, situation, or priority is unclear.
- **5:** The buyer or user, relevant context, and important trigger are immediately recognizable.

Look for role, company context, maturity, workflow, trigger, constraint, and language the audience would use about itself.

## 2. Problem relevance — 15%

**Question:** Does the message express an important problem in customer terms?

- **1:** Leads with the company or technology and identifies no customer problem.
- **3:** Names a plausible pain but not its consequence, urgency, or trigger.
- **5:** Connects a recognizable problem to a meaningful consequence and buying moment.

Flag invented urgency, vague pain language, and problems unsupported by research.

## 3. Differentiation — 15%

**Question:** Is it clear why this choice is meaningfully different from the alternatives?

- **1:** Interchangeable with category competitors or generic AI claims.
- **3:** Names distinctive capabilities but does not connect them to a valued advantage.
- **5:** Establishes a relevant, defensible contrast with the alternatives customers actually consider.

Alternatives may include a competitor, manual work, an internal build, an adjacent tool, or doing nothing.

## 4. Value articulation — 15%

**Question:** Are product capabilities translated into outcomes the audience values?

- **1:** Feature inventory with no meaningful outcome.
- **3:** Benefits are stated but remain broad or detached from the workflow.
- **5:** Connects capability to outcome, explains the mechanism, and reflects buyer priorities.

Avoid treating unsupported productivity superlatives as value.

## 5. Clarity — 15%

**Question:** Can the intended audience understand the offer quickly and accurately?

- **1:** Ambiguous category, heavy jargon, or contradictory claims.
- **3:** Understandable after effort, but contains abstractions or overloaded sentences.
- **5:** The product, audience, value, and relevant context are readily understood.

Clarity is audience-dependent; specialist language can be clear to a specialist audience.

## 6. Evidence and credibility — 10%

**Question:** Are important claims supported, supportable, and proportionate?

- **1:** Relies on fabricated, unverifiable, or implausible claims.
- **3:** Includes plausible claims but weak proof, qualification, or attribution.
- **5:** Material claims are backed by relevant evidence and appropriately bounded.

Evidence may include customer proof, product behavior, methodology, benchmarks, or transparent qualification.

## 7. Narrative consistency — 5%

**Question:** Do the message elements reinforce the same positioning?

- **1:** Audience, problem, promise, and proof conflict.
- **3:** Mostly aligned, with some drift in terminology or emphasis.
- **5:** Each element reinforces a coherent audience, problem, value, and reason to believe.

## 8. Responsible AI claims — 10%

**Question:** If AI is mentioned, are its role and limitations communicated responsibly?

- **1:** Deceptive anthropomorphism, guaranteed outcomes, or concealed material limitations.
- **3:** AI capability is plausible but vague about mechanism, oversight, data, or limits.
- **5:** Claims are specific and proportionate, with appropriate human control and material limitations made clear.

If the product and asset make no AI claims, mark this dimension `not applicable` and normalize the remaining weights.

## Calculation

For applicable dimensions:

```text
normalised score =
  100 × sum((dimension score / 5) × dimension weight)
      / sum(applicable dimension weights)
```

Weights are expressed as percentages, such as `15` rather than `0.15`. Exclude every N/A dimension from both the earned-points total and the applicable-weight total. Reject a review in which every dimension is N/A. Always report the component scores alongside the total so that the normalised score does not create false precision.

## Required output

Every review should contain:

1. Context and assumptions
2. Dimension scores with cited source evidence
3. Weighted score and confidence
4. Three highest-impact findings
5. Unsupported or risky claims
6. Recommended next test
7. Human review notes

## Reliability diagnostics (app 1.1)

Critical score flags take precedence over the headline total. Excluding a core dimension makes the review partial; excluding responsible AI alone can be appropriate for non-AI messaging. Coverage is displayed but not treated as a probability. Low confidence, missing context, risky claims, and high credibility without supplied evidence remain visible in the diagnosis.

The sensitivity range applies a simultaneous one-point decrease/increase to each applicable rating, bounded by 1 and 5. It is a scenario, not a statistical confidence interval. The 1–5 scale means the minimum complete score is 20/100.

The separate category stress test evaluates the reasoning through human-written counterarguments and disconfirmation criteria. It does not award additional points or make a publication decision. See the [pressure-test report](../evals/pressure-test-2026-09-21.md).
