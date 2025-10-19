# Repository Guidelines

## Project Structure & Module Organization
The app uses Next.js 15 with the App Router under `src/app`, where route segments carry their layouts and metadata. Shared UI lives in `src/components` (e.g., `layout/`, `controls/`, `visualization/`). Algorithm logic is grouped per domain in `src/algorithms/*`, each exporting an `AlgorithmImplementation` typed in `src/types`. Keep metadata such as `ALL_ALGORITHMS` inside `src/constants` and orchestration helpers like `algorithmRegistry.ts` inside `src/lib`. Reusable hooks reside in `src/hooks`, while static assets live in `public/`. Import through the `@/` alias defined in `tsconfig.json`.

## Build, Test, and Development Commands
- `npm install` — sync dependencies after lockfile updates.
- `npm run dev` — launch the Next dev server with hot reload on `http://localhost:3000`.
- `npm run build` — create an optimized production build.
- `npm run start` — serve the production build for smoke testing.
- `npm run lint` / `npm run type-check` — enforce ESLint (Next Core Web Vitals) and strict TypeScript; both must pass before pushing.

## Coding Style & Naming Conventions
TypeScript is required for all modules. Prettier enforces 2-space indentation, 80-column wrapping, single quotes, trailing commas; format on save or run `npx prettier --write`. Use functional React components with `PascalCase` names, camelCase for variables and functions, kebab-case for route folders, and SCREAMING_SNAKE_CASE for exported constants. Prefer Tailwind utility classes over custom CSS and keep components small with related helpers colocated.

## Testing Guidelines
Automated testing is being introduced; target component coverage with React Testing Library plus a lightweight runner (Vitest or Jest). House specs beside the unit under `__tests__` directories or as `*.test.tsx`. Until the shared `npm run test` script lands, include manual verification steps in each PR and keep new hooks or algorithms pure enough for forthcoming unit tests. Aim for ≥80 % coverage on new modules once the tooling is merged and attach screenshots for UI changes.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`type: scope? subject`) as seen in `chore: initial commit`; e.g., `feat(algorithms): add heap sort animation`. Keep commits focused and lint-clean. PRs should link the relevant issue, summarize the change, list test commands executed, and attach a GIF or screenshot for UI updates. Label breaking UX changes explicitly and mention any new environment variables. Request review once CI (lint/type-check/build) passes and ensure reviewers have reproduction steps.
