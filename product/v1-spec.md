# AI Positioning QA v1 specification

Status: implemented locally; pending publication and hands-on user validation  
Date: 19 September 2026

## Problem statement

B2B messaging reviews often collapse into subjective reactions, while generic AI rewrites can introduce unsupported claims or hide the reasoning behind a recommendation. The existing v0.1 repository provides a strong rubric and manual template, but it has no runnable evaluator, deterministic scoring, structured AI contract, citation checks, or exportable report.

## Product decision

Build a free, static, browser-only evaluator that supports both human review and optional AI assistance. The application will not call an AI provider directly. Instead, it will generate a structured prompt for a tool the reviewer already trusts and validate the returned JSON before importing it.

This keeps source messaging local by default, avoids exposed API keys and hosting costs, and makes the product claim precise: **an interactive AI-assisted positioning QA framework, not an autonomous agent.**

## Goals

1. Let a product marketer complete an evidence-led review in one browser session.
2. Calculate applicable and N/A-adjusted scores deterministically in application code.
3. Make every AI-assisted observation traceable to exact source wording or visibly flag it.
4. Keep the marketer accountable for accepting, rejecting, or changing recommendations.
5. Produce portable Markdown and JSON reports without accounts or a backend.

## Non-goals for v1

- Direct calls to an LLM or storage of provider credentials.
- Autonomous rewriting, publishing, or final positioning decisions.
- Market validation, customer research, competitive fact-checking, or message-market-fit prediction.
- Accounts, team workspaces, databases, analytics, or share links.
- URL scraping, document upload, RAG, MCP, agents, or multi-model orchestration.
- Benchmarks that imply scores are comparable across asset types or rubric versions.

## Primary user stories

- As a product marketer, I want to provide the asset and its buying context so that the review evaluates the intended message rather than invented background.
- As a reviewer, I want to score each dimension with source evidence and confidence so that feedback is discussable rather than subjective.
- As an AI-tool user, I want a structured prompt and import contract so that I can use an approved model without giving this application my API key.
- As an accountable decision-maker, I want imported quotations checked against the source and recommendations left editable so that model output remains a draft.
- As a collaborator, I want a Markdown or JSON report so that the evaluation can be reviewed outside the tool.

## P0 requirements and acceptance criteria

### Context and source input

- The reviewer can enter asset name and version, intended audience, journey stage, buying trigger, alternatives, available evidence, and exact source messaging.
- The interface warns against entering confidential, personal, or unapproved material.
- Required context errors are explained before calculation or prompt generation.
- Raw messaging stays in the browser unless the reviewer explicitly copies it into another tool.

### Eight-dimension review

- Every rubric dimension presents its weight, review question, 1/3/5 anchors, a 1–5 or N/A score, exact source quotation, missing context, confidence, and recommendation.
- N/A requires a reason and is valid for Responsible AI claims when the asset makes no AI claim.
- All-N/A reviews are rejected.
- A score of 1 for Evidence and credibility or Responsible AI claims creates a visible critical-risk flag.

### Deterministic scoring

- Application code calculates:

  `normalised score = earned applicable points / applicable weight total × 100`

- Model-supplied totals are ignored.
- The SignalsDesk fixture returns exactly 39/100.
- N/A dimensions are removed from both earned points and applicable weight before normalisation.

### Optional AI assistance

- The application generates a versioned prompt containing the user's context, exact source, rubric, guardrails, and strict JSON response contract.
- The reviewer can paste a JSON response back into the tool.
- Import rejects malformed, oversized, incomplete, or unexpectedly structured data.
- A claimed evidence quotation not found verbatim in the source is visibly flagged.
- Imported output is labelled AI-assisted and remains editable.
- No network request is made by the application.

### Review and export

- The report includes component scores, normalised score, applicable weight, critical flags, three priority findings, risky claims, a recommended next test, and human-review notes.
- The reviewer can export the complete evaluation as Markdown and JSON.
- Exported JSON records app version, rubric version, reviewer type, and date.
- Clearing the review removes entered material from the interface.

### Quality

- Native automated tests cover the published example, N/A normalisation, invalid scores, all-N/A input, malformed imports, fabricated quotations, and exports.
- GitHub CI runs deterministic checks on every push and pull request.
- The application works from the GitHub Pages repository subpath.
- The full workflow is keyboard accessible, usable at 320px width and 200% zoom, and honours reduced-motion preferences.
- No user or imported content is inserted as HTML.

## Success measures

### Launch gate

- All deterministic tests pass.
- The fictional fixture produces the documented result.
- No serious or critical accessibility issue is found in the core workflow.
- A first-time reviewer can load the example, calculate it, generate the AI prompt, import valid JSON, and export a report without developer tools.

### Early validation hypotheses

- At least 80% of five test reviewers complete the example workflow without help.
- Median time from blank state to a valid manual result is under ten minutes.
- Every AI-assisted test report either contains exact source evidence or visibly shows a citation warning.
- Test reviewers can explain that the score is diagnostic rather than proof of market fit.

## P1 follow-ups

- Optional local-only save/load controlled by the reviewer.
- Comparison between two versions of the same asset.
- Rubric calibration notes across human reviewers and approved models.
- Guided onboarding informed by first-time-user testing.

## Future decision

Consider a secure, server-side provider integration only after user testing shows that prompt copy-and-import prevents meaningful adoption. Any later integration must keep credentials server-side, disclose the provider and retention implications, and preserve the same deterministic validation and human-review controls.
