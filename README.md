# better-work

A small, agent-neutral workflow for building projects with AI agents. It uses plain Markdown and has no runtime dependencies.

## Start a project

From the project root, run:

```sh
npx @parthmunjal07/better-work
```

This adds `AGENTS.md` with workflow instructions, `ARCHITECTURE.md` with codebase design principles, an empty `Plan.md`, and editable templates in `specs/_template.md` and `changes/_templates/`. Existing files are always skipped.

For a project with frontend work, preload the three requested design skills during setup:

```sh
npx @parthmunjal07/better-work init --with-design-skills
```

Or add them later with `npx @parthmunjal07/better-work design`. This uses the [skills CLI](https://www.skills.sh/docs/cli) to install `frontend-design` from Anthropic, `ui-taste` from Uizze, and `ui-ux-pro-max` from NextLevelBuilder into the project for supported agents. It requires network access and runs the skills CLI three times. Review third-party skill instructions before using them.

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

## Publishing

The package is configured for public access under the `@parthmunjal07` scope. From an npm account that can publish to that scope, run `npm publish` in this repository. The publish command runs the test suite first. Use `npm pack --dry-run` to inspect the package contents before publishing.

## Development

```sh
npm test
```
