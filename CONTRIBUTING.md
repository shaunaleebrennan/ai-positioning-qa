# Contributing

Thanks for helping make AI-assisted messaging review more useful and accountable.

## Useful contributions

- Propose clearer scoring anchors
- Add a fictional or appropriately licensed worked example
- Identify cases where the rubric produces misleading results
- Improve accessibility and instructions for non-technical users
- Add evaluation fixtures or responsible-use safeguards

## Before submitting

1. Do not include confidential company information, personal data, or private customer quotations.
2. Clearly label fictional, synthetic, adapted, and public-source material.
3. Provide evidence for factual claims and link to the source when licensing permits.
4. Explain the user problem behind the change.
5. Keep recommendations vendor-neutral unless a contribution specifically tests a named system.
6. Keep all user and imported content inert; never render it as HTML.
7. Do not add remote model calls, analytics, persistence, or third-party scripts without an explicit privacy and threat-model review.

## Development checks

The application is dependency-light and uses the native Node.js test runner.

```bash
npm test
```

When changing the rubric, schema, prompt contract, or scoring logic:

1. update the human-readable rubric and machine-readable contract together;
2. add or revise a fictional fixture;
3. test N/A normalisation and exact-evidence validation; and
4. record the change in `CHANGELOG.md` because scores from different rubric versions may not be comparable.

For interface changes, verify the complete workflow with a keyboard, at 320px width, and at 200% zoom. Keep focus visible and preserve text equivalents for every visual result.

## Issues

When reporting a rubric problem, include the relevant dimension, input context, observed result, expected result, and why the difference matters.

## Pull requests

Keep each pull request focused. Describe what changed, why it improves the framework, how you evaluated it, and any remaining limitations. `npm test` must pass before review.

By contributing, you agree that your contribution will be licensed under the MIT License.
