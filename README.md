# IT Pressure Test

[Try the IT buyer tool](https://shaunaleebrennan.github.io/shauna-ai-portfolio/it-pressure-test/) · [Manual eight-dimension review](https://shaunaleebrennan.github.io/shauna-ai-portfolio/it-pressure-test/manual-review.html)

**[Read the portfolio case study](https://shaunaleebrennan.github.io/shauna-ai-portfolio/case-study.html?case=it-pressure-test)**

IT Pressure Test replaces the original AI Positioning QA as the featured public build. This repository retains the implementation and evaluation history; the live app is hosted inside the portfolio. `docs/tool.html` is the app entry point used by the portfolio sync script. The old Pages root redirects to the new live location.

## IT buyer workflow · rubric 3.1

Choose one of six IT audiences, a buying role, purchase stage and asset type, then paste an asset. Awareness, alternatives and supporting evidence sit in optional context. The result keeps the /100 messaging score, Gut Reaction, three priority changes and buyer questions easy to scan. Open **Why this score?** for levels, weights and matching passages, or **Run deep review** for claim checks and an editable rewrite brief without leaving the tool.

This is a **local rules-based structural estimate**, with no model calls, analytics or automatic storage. Explicit 0–4 criteria contribute to a score using purchase-stage weights; Discover headlines use lighter requirements. Remit, buying role and awareness shape guidance without hidden numerical bonuses. Proof status stays separate, source names alone do not establish credibility, and critical claims remain visible even at a high score. A human must assess meaning and evidence.

Read the [public scoring rubric](framework/it-messaging-rubric.md) and [3.1 validation notes](evals/it-rubric-3.1.md). The weights and bands are editorial, not calibrated buyer-response measures. Compare drafts under identical settings; small point differences have no validated significance.

The original manual evaluator and saved-review JSON format remain available separately. Its eight-dimension scores are not comparable to the IT tool's six-gate scores.

### Team use case: Workvivo

Within Workvivo's product marketing team, we use the framework to pressure-test messaging for IT buyers: does the copy establish a relevant problem, explain the value and system fit, and make claims the team can support? Team-specific product knowledge and approved evidence inform the human review.

The public app is the generic version of that workflow. It contains no Workvivo product lens, internal messaging, customer evidence or private research attachments. This note describes the use case; there is no separate company-specific public tool or link.

[Earlier integration notes](evals/it-buyer-integration-2026-09-21.md)

---

## Original manual evaluator

An open-source, browser-based evaluator for evidence-led B2B positioning reviews.

[Open the manual evaluator](https://shaunaleebrennan.github.io/shauna-ai-portfolio/it-pressure-test/manual-review.html) · [See the manual rubric](framework/positioning-rubric.md) · [Review the worked example](examples/signalsdesk-worked-example.md)

AI Positioning QA turns subjective messaging feedback into a review you can inspect and discuss. It scores one asset across eight positioning dimensions, requires exact source evidence, calculates results deterministically, and leaves the final judgement with the marketer.

> **What it is:** an interactive positioning QA framework with optional AI assistance.  
> **What it is not:** an autonomous agent, a copy generator, or proof of message-market fit.

## Why it exists

Messaging reviews often collapse into reactions such as “make it punchier” or “lead with value.” Generic AI rewrites can add volume while also introducing unsupported claims, invented product behaviour, or confident recommendations with no traceable basis.

This project makes the reasoning visible:

- define the audience, buying trigger, awareness stage, alternatives, and available evidence;
- score the words on the page rather than hidden product knowledge;
- connect every applicable score to an exact quotation;
- separate missing context from message quality;
- surface critical credibility and responsible-AI risks; and
- record what a human accepted, rejected, or changed.

## Use the evaluator

Everything runs locally in the browser. There are no accounts, analytics, model calls, or server-side storage.

1. Add the review context and exact source messaging.
2. Complete the eight-dimension review yourself, or generate a structured prompt for an AI tool approved by you or your organisation.
3. If using AI assistance, paste its JSON response back into the evaluator.
4. The evaluator validates the structure, checks that evidence quotations exist verbatim in the source, and recalculates the score itself.
5. Review and edit the findings before exporting a Markdown or JSON record.

Do not place confidential, personal, customer, or unapproved material into an external AI tool. Generating a prompt does not send anything; copying it elsewhere is your decision.

## Scoring model

| Dimension | Weight | Core question |
|---|---:|---|
| ICP specificity | 15% | Is it clear who this is for and when it becomes valuable? |
| Problem relevance | 15% | Does it express an important problem in customer terms? |
| Differentiation | 15% | Is the choice distinct from the alternatives customers consider? |
| Value articulation | 15% | Are capabilities connected to outcomes the audience values? |
| Clarity | 15% | Can the intended audience understand the offer quickly? |
| Evidence and credibility | 10% | Are important claims supported and proportionate? |
| Narrative consistency | 5% | Do the message elements reinforce one positioning? |
| Responsible AI claims | 10% | Are AI claims specific, bounded, and appropriately transparent? |

Scores use a 1–5 scale. A genuinely irrelevant dimension can be marked N/A with a reason; its weight is removed before the result is normalised.

```text
normalised score =
  100 × sum((score / 5) × weight)
      / sum(applicable weights)
```

The total is a prioritisation aid, not an objective verdict. Read the component evidence, uncertainty, and missing context before the number.

## Run locally

The evaluator has no runtime dependencies. From the repository root:

```bash
python3 -m http.server 4175 --directory docs
```

Then open `http://127.0.0.1:4175/tool.html`. The old root redirects to the portfolio; `manual-review.html` opens the separate manual evaluator.

Run the JavaScript syntax and deterministic test suite with Node.js 20 or later:

```bash
npm run check
```

## Repository map

```text
ai-positioning-qa/
├── docs/                         # Static evaluator published by GitHub Pages
│   ├── index.html
│   └── assets/
├── framework/
│   └── positioning-rubric.md     # Human-readable rubric and scoring rules
├── schemas/
│   └── review.schema.json        # Machine-readable review contract
├── examples/                     # Weak, strong, and non-AI review fixtures
├── evals/
│   └── evaluation-template.md    # Manual review template
├── tests/                        # Scoring, validation, prompt, and export checks
├── product/
│   └── v1-spec.md                # Product scope and acceptance criteria
└── archive/
    └── ai-positioning-qa-v0.1.zip
```

## Design and safety decisions

- **Local by default:** source messaging remains in browser memory unless you deliberately copy or export it.
- **No browser API keys:** the app never asks for model credentials or calls a provider.
- **Deterministic totals:** imported scores are recalculated in application code; model-supplied totals are not trusted.
- **Traceable evidence:** applicable findings require an exact source quotation.
- **Strict imports:** malformed, oversized, incomplete, or unexpectedly structured JSON is rejected.
- **Human accountability:** AI-assisted output remains an editable draft and must not be treated as approval to publish.
- **Accessible output:** results use labelled text and score bars rather than an inaccessible decorative chart.

## Limitations

AI Positioning QA does not verify product capabilities, competitive facts, customer demand, legal claims, or the truth of supplied evidence. A high score cannot establish message-market fit. Rubric calibration across asset types and reviewers remains an area for further research.

The included examples are fictional. They demonstrate behaviour; they are not market evidence.

## What this project demonstrates

This is a product-marketing build as well as a tool: domain judgement encoded into a transparent workflow, a constrained AI handoff, deterministic evaluation, test fixtures, and an explicit human decision point.

## Contributing

Feedback from product marketers, founders, researchers, and responsible-AI practitioners is welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

## License

Released under the [MIT License](LICENSE).

## Version 1.1: defend the position

The app now combines the existing messaging rubric with an optional category stress test. Record competitor, analyst, and customer counterarguments; defend or narrow the claim; name the evidence gaps and disconfirming test; and export a draft with an accountable owner and source snapshot.

Results put critical claims, excluded dimensions, missing evidence, and low confidence ahead of the total. A one-point sensitivity scenario exposes how much the score depends on judgment. Imported approval resets to pending, current source/context must match, and edits invalidate approval and exports. Version 1.0 review files remain supported.

The interface shares the portfolio's dark palette and lilac, pink, and green accents. Three fictional examples are available in the app. Source material stays in memory; export before closing or reloading. Category stress tests export separately from messaging reviews and cannot currently be re-imported.

Read the [pressure-test findings and remaining limitations](evals/pressure-test-2026-09-21.md). The numerical rubric has been tested; external AI models and real-world positioning outcomes have not been benchmarked.

Awareness stage uses five indicators: Unaware, Problem aware, Solution aware, Product aware, and Most aware. Saved JSON retains the `journeyStage` field for compatibility with existing review files.
