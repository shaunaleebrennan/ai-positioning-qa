# IT rubric 4.0 evaluation: why automatic scoring was removed

**Date:** 8 November 2026 · **Compared:** rubric 3.3 (keyword rules) and 4.0 (human-rated)

## The test

Four short homepage passages were scored by the 3.3 engine (general IT lens, Evaluate stage, homepage format). Two are written the way a good product marketer would write; two are written to game the rules.

| Copy | What it is | 3.3 score | 3.3 label |
| --- | --- | ---: | --- |
| Clear and buyer-focused | Names the gap in tools the buyer already owns, what changes, who stays in control and a next step, in plain language | 15 | Reframe the message |
| Keyword run-on | One long sentence stuffed with *integrates*, *API*, *SSO*, *SOC 2*, *reduces costs by 40%*, a report link | 85 | Strong structure |
| Buzzword fluff | “Next-generation platform … seamless automation … unlock productivity” | 18 | Reframe the message |
| Nonsense with keywords | Ungrammatical fragments containing the same terms | 60 | Promising |

## Finding

The 3.3 score measured vocabulary, not meaning. Clear copy that avoided the expected words scored near the bottom, and copy written to hit the words scored near the top. Hardening the rules would make them harder to game, not reliable: any keyword rule can be met by text that says nothing.

## Decision

In 4.0:

- A person rates each question from 0 to 4, and each rating above 0 must be tied to a passage from the copy.
- The rules only suggest passages and flag claims. They never set a score.
- An optional AI draft follows the same contract and is rejected if a quoted passage isn’t in the copy. Drafts stay marked until a person confirms them.

With no ratings, every passage in the table scores 0 and the review is marked incomplete. The score is now an honest summary of a reviewer’s judgement rather than an imitation of one.

## Still to do

Two-reviewer agreement on a set of real draft pairs, as described in the [rubric](../framework/it-messaging-rubric.md#calibration-still-needed).
