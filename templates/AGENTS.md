# Project workflow

These instructions apply to agents working on this project, regardless of the agent tool in use.

## Atomic commits

- Make each commit one logical unit of change.
- Keep the codebase working at every commit. Run applicable tests before committing, and fix failures first.
- Keep unrelated concerns in separate commits. For example, do not mix formatting-only changes with logic changes.

## Spec-driven development

- Use `Plan.md` to capture the project's problem, tech stack, user story, and features before building the project.
- For a feature or behavior change, create `changes/<name>/` with `npx @parthmunjal07/better-work new <name>`. Fill in its proposal, spec, and task list before coding.
- Every spec must answer: What are we building? How should it behave? What must never happen? How will we verify it?
- Give the user a chance to review the proposal, spec, and tasks. If they asked for approval, wait for it before implementing.
- Work through `tasks.md` and check off each completed task. Verify the behavior described in the spec.
- Once verified, copy the final spec to `specs/<name>.md`. Keep the change folder as a record, and update the current spec when behavior changes later.
