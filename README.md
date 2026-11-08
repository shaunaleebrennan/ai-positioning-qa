# IT Pressure Test

**Will IT believe it?** Review B2B technology messaging against the six questions IT buyers ask before they take a vendor seriously.

**[Open the tool](https://shaunaleebrennan.github.io/shauna-ai-portfolio/it-pressure-test/)** · [Read the method](framework/it-messaging-rubric.md) · [Why the method changed in 4.0](evals/it-rubric-4.0.md)

Built by [Shauna Azevedo-Brennan](https://shaunaleebrennan.github.io/shauna-ai-portfolio/), product marketing leader. MIT licensed.

---

## What it does

You choose who is reading (six IT lenses, from CIO to security to IT operations), the purchase stage and the format, then paste one piece of copy. The tool walks you through six questions:

| Question | What a strong answer looks like |
| --- | --- |
| **Recognisable pressure** | The buyer, the task and a reason to change the current approach |
| **Business value** | A specific improvement, how it happens, and how you’d measure it |
| **Stack fit** | The systems it works with, what stays and what changes |
| **Trust and governance** | Specific controls, who owns them, and the boundaries |
| **Credibility and proof** | An identifiable, scoped source for the central claim |
| **Clarity and repeatability** | A plain proposition and a next step that suits the stage |

For each one you pick a level from 0 to 4 and the passage in the copy that earns it. The tool turns that into:

- a score out of 100, weighted for the stage and format;
- **what to change first**, ordered by what the copy is missing;
- **what IT will ask next**, in the words of the reader you chose;
- **claims to check** before publishing: numbers, absolutes and comparisons;
- a Markdown record you can share or attach to a brief.

## How the score works

```text
score = round( sum of (level / 4) × weight )
```

- **You make the judgement.** Simple rules suggest a passage to look at for each question and flag claims, but they never set a score.
- **Every rating is tied to the copy.** A level above 0 doesn’t count until it’s linked to a passage from the text.
- **The stage decides what counts.** A headline isn’t asked about system fit; a Commit-stage brief is. Weights always sum to 100.
- **The weights are editorial.** They haven’t been calibrated against buyer outcomes, so compare drafts under the same settings and treat small differences as noise.

Full levels, weights and ordering rules are in the [rubric](framework/it-messaging-rubric.md).

## Optional: draft the ratings with AI

The tool can build a prompt containing the rubric, your context and the copy. Paste it into an AI tool your organisation has approved, then paste the JSON reply back. The reply is applied only if every criterion is present, every level is 0–4, and every quoted passage actually appears in your copy. Applied ratings stay marked **AI draft** until you confirm or change them, and the exported record says which ones you didn’t.

The page never calls an AI model itself.

## Privacy

Everything runs in your browser tab. There are no accounts, analytics, network requests or saved data; the page’s content security policy blocks outgoing connections. Your copy is gone when you close the tab, so export the record if you want to keep it. Don’t paste confidential or unreleased material into an external AI tool.

## Why 4.0 is human-rated

Earlier versions scored copy automatically with keyword rules. Testing showed they rewarded vocabulary, not meaning: a clear, buyer-focused paragraph scored 15/100, while a run-on list of terms such as *SSO*, *SOC 2* and *reduces costs by 40%* scored 85. Version 4.0 keeps the rubric and moves the judgement to the reviewer, with the rules demoted to pointers. The [evaluation](evals/it-rubric-4.0.md) has the details.

## Run it locally

No build step and no dependencies.

```bash
python3 -m http.server 4175 --directory docs
# open http://127.0.0.1:4175/tool.html
```

Tests need Node.js 20 or later:

```bash
npm test        # scoring, AI-reply validation, rubric, page contract
npm run check   # syntax check plus the test suite
```

## Repository

```text
docs/
  tool.html                 IT Pressure Test
  manual-review.html        Original eight-dimension manual review
  assets/js/review.js       Scoring, AI-reply validation, export
  assets/js/it-rubric.js    Weights, levels, passage suggestions, claim flags
  assets/js/it-engine.js    IT reader lenses and their questions
  assets/js/it-review-app.js  The tool's interface
framework/                  The IT rubric and the manual rubric
evals/                      Evaluation notes, including 4.0
tests/                      Node test suite
examples/                   Fictional review fixtures for the manual review
```

The live tool is published inside the portfolio. After changing this repository, sync it from the portfolio repository with `node scripts/sync-it-pressure-test.mjs`.

## Also here: the manual positioning review

[`manual-review.html`](https://shaunaleebrennan.github.io/shauna-ai-portfolio/it-pressure-test/manual-review.html) is the original tool: an eight-dimension positioning review (ICP, problem, differentiation, value, clarity, evidence, narrative consistency, responsible AI claims) with exact-quote evidence, an optional AI handoff and JSON export. Its scores use a different scale and aren’t comparable with the IT Pressure Test. See the [manual rubric](framework/positioning-rubric.md) and the [worked example](examples/signalsdesk-worked-example.md).

## Limits

The tool checks how copy is built, not whether it’s true. It doesn’t open sources, check competitor material or predict how buyers will respond, and a high score isn’t proof of message–market fit. The examples are fictional.

## Contributing

Feedback from product marketers, IT buyers and researchers is welcome; see [CONTRIBUTING.md](CONTRIBUTING.md). Released under the [MIT License](LICENSE).
