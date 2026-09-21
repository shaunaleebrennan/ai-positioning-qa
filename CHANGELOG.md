# Changelog

All notable changes to this project will be documented here.

## 1.0.0 — 2026-09-19

### Added

- Browser-based evaluator for manual and AI-assisted positioning reviews
- Deterministic weighted scoring with N/A normalisation and critical-risk flags
- Structured prompt generator with an explicit JSON response contract
- Strict JSON import validation and verbatim source-evidence checks
- Editable human-review notes and Markdown/JSON exports
- Fictional weak, strong, and non-AI evaluation fixtures
- Automated tests and GitHub Pages deployment workflow
- Responsive, keyboard-accessible interface with no tracking or remote model calls

### Changed

- Corrected the SignalsDesk worked-example result from 40/100 to 39/100
- Clarified the N/A calculation and all-N/A rejection rule
- Reframed the project accurately as an interactive AI-assisted QA framework, not an autonomous agent

### Archived

- Preserved the original v0.1 ZIP in `archive/ai-positioning-qa-v0.1.zip`

## 0.1.0 — 2026-08-01

### Added

- Eight-dimension positioning quality rubric
- Weighted scoring method with N/A normalization
- Fictional SignalsDesk worked example
- Reusable messaging evaluation template
- Responsible-use guidance and contribution standards

## 1.1.0 — 2026-09-21

- Added category counterargument and disconfirmation worksheet with draft Markdown export.
- Added coverage, evidence, confidence, and sensitivity diagnostics to results and Markdown exports.
- Rejected whitespace-only quotes; bound imports to the current source/context; reset imported or edited human approval.
- Clarified AI prompt provenance, untrusted context, self-approval, and differentiation checks.
- Added strong and non-AI browser examples and portfolio-aligned styling.
- Expanded deterministic tests to 40, including 200 scoring variations; syntax-check every browser module.
- Kept rubric 1.0.0 weights and compatibility with app 1.0.0 review files.

- Renamed Journey stage to Awareness stage, with five selectable stages and prospect-knowledge indicators; prompts and Markdown exports use the same framework. Existing saved JSON remains compatible.

## IT buyer interface 2.2 — 2026-09-21

Integrated the ChatGPT IT-buyer prototype with local deep review, six audiences, buying roles, awareness stages, safe result invalidation and complete Markdown context. Preserved the original manual evaluator. See the integration evaluation for limits and checks.
