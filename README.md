# better-work

A small, agent-neutral workflow for building projects with AI agents. It uses plain Markdown and has no runtime dependencies.

## Start a project

From the project root, run:

```sh
npx @parthmunjal07/better-work
```

This adds `AGENTS.md` with workflow instructions, an empty `Plan.md`, and editable templates in `specs/_template.md` and `changes/_templates/`. Existing files are always skipped.

Fill in `Plan.md` with the project's problem, tech stack, user story, and features.

## Plan a change

```sh
npx @parthmunjal07/better-work new add-login
```

This creates `changes/add-login/proposal.md`, `spec.md`, and `tasks.md` from the project's templates. The name must use lowercase letters, numbers, and hyphens. Running the command again preserves files you have edited.

Use the files in this order:

1. Explain why and what in `proposal.md`.
2. Answer the four behavior and verification questions in `spec.md`.
3. Break implementation into checkable steps in `tasks.md`.
4. Review the plan, implement it, and check off completed tasks.
5. After verification, copy the final spec to `specs/<change-name>.md`. Keep the change folder as a record.

This is a small version of the [OpenSpec change workflow](https://openspec.dev/docs/quickstart). It leaves review and spec updates in plain files without adding an archive command or tool-specific agent setup.

## Development

```sh
npm test
```
