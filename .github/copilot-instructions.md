<!--
Guidance for AI coding agents working on the OnceUIPortfolio codebase.
Keep this concise and actionable — document only observable, project-specific
patterns, workflows, and key files to help an agent be immediately productive.
-->
# OnceUIPortfolio — Copilot Instructions

This file contains targeted guidance for AI coding agents editing or extending the
OnceUIPortfolio repository (a Next.js + Once UI portfolio site). Focus on
project-specific structure, patterns, workflows, and examples rather than
generic advice.

- **Project type:** Next.js app (app router) with server and client components.
- **Main framework & UI:** `next` ^15, React 19, and `@once-ui-system/core` components.

## Quick dev commands

- Install dependencies: `npm install`
- Run dev server: `npm run dev` (runs `next dev`)
- Build: `npm run build` (runs `next build`)
- Start production server: `npm run start` (runs `next start`)
- Lint: `npm run lint`

Node requirement: README states Node.js v18.17+; ensure environment matches.

## Big-picture architecture

- Root uses the Next.js app router. Entry layout: `src/app/layout.tsx`.
  - Global theme and data attributes are initialized in a client-side inline
    script inside `layout.tsx`. Theme values come from `src/resources/once-ui.config.js`.
  - UI composition is done with Once UI primitives like `Flex`, `Column`,
    `Background` and layout/visual tokens imported from `@once-ui-system/core`.

- Global providers are in `src/components/Providers.tsx`.
  - Wraps `ThemeProvider`, `DataThemeProvider`, `ToastProvider` and `IconProvider`.
  - Theme values are read from `src/resources/once-ui.config.js` (`style`, `dataStyle`).

- Route guarding and simple password-based protection live in
  `src/components/RouteGuard.tsx` and server routes under `src/app/api`:
  - `POST /api/authenticate` and `GET /api/check-auth` use a cookie `authToken`
    and depend on `PAGE_ACCESS_PASSWORD` environment variable.
  - Protected routes are declared in `src/resources/once-ui.config.js` -> `protectedRoutes`.

- Content and site configuration live in `src/resources`:
  - `content.js` contains `home`, `about`, `blog`, `work`, `gallery` exported
    as data objects used by pages and components.
  - `once-ui.config.js` contains `routes`, `protectedRoutes`, `style`, `fonts`,
    `effects`, and `dataStyle` which control runtime look-and-feel.

- MDX content: blog posts and project pages are MDX files under
  `src/app/blog/posts` and `src/app/work/projects`. New posts/pages are discovered
  automatically by listing those directories.

## Important patterns and conventions

- App router + server components: Top-level `layout.tsx` exports an async
  server component and calls `generateMetadata()` using `resources` values.
  Keep heavy data fetching on the server; client interactivity is marked with
  `'use client'` at component top (e.g., `Providers.tsx`, `RouteGuard.tsx`).

- Theme and runtime config: `layout.tsx` injects an inline script that reads
  defaults from `src/resources/once-ui.config.js` and applies `data-*` attrs to
  `document.documentElement`. When changing theme keys, update both
  `once-ui.config.js` and the inline JSON structure in `layout.tsx`.

- Icons: Custom icons are registered in `src/resources/icons.ts` and injected
  via `IconProvider` in `Providers.tsx`. When adding icons add them to
  `iconLibrary` and reference by name in `src/resources/content.js` social
  entries (see `social` array).

- Password-protected pages: Use `protectedRoutes` map for routes requiring a
  password. The server-side routes expect `PAGE_ACCESS_PASSWORD` in env.
  Tests and local runs should set this env var (or mock it) to avoid 500s.

- Open Graph images: Runtime OG generation is at
  `src/app/api/og/generate/route.tsx` using `next/og`. It fetches fonts at
  runtime; avoid blocking changes that alter `baseURL` or `person.avatar` paths
  without updating this file.

## Files you will edit most often (examples)

- Site content and options: `src/resources/content.js`,
  `src/resources/once-ui.config.js`.
- Layout and global behavior: `src/app/layout.tsx`.
- Providers and global wrappers: `src/components/Providers.tsx`.
- Route protection: `src/components/RouteGuard.tsx`, `src/app/api/*`.
- Pages and content: `src/app/*` (MDX posts in `src/app/blog/posts` and
  `src/app/work/projects`).

## Code-editing guidance (concise)

- Preserve server/client boundaries. Add `'use client'` only to components
  that rely on hooks or browser APIs (e.g., `useEffect`, `localStorage`).
- When changing theme keys or data attributes, edit both `once-ui.config.js`
  and the inline JSON in `layout.tsx` so defaults and hydration match.
- For protected routes, update `protectedRoutes` and ensure `PAGE_ACCESS_PASSWORD`
  is set in environment for dev/test. The auth cookie name is `authToken`.
- When adding MDX content, follow existing filename and frontmatter style in
  `src/app/blog/posts` and `src/app/work/projects` so pages render consistently.

## Testing and debugging tips

- To debug route auth flow locally, set `PAGE_ACCESS_PASSWORD` before running
  `npm run dev`:

```bash
export PAGE_ACCESS_PASSWORD=yourpassword
npm run dev
```

- If pages show as 404/NotFound, check `src/resources/once-ui.config.js` ->
  `routes` and `protectedRoutes` to confirm the path is enabled.
- Use Next.js inspector and browser console to see client-side theme/init logs
  from `theme-init` script in `layout.tsx` (it logs on failure).

## Integration & external dependencies

- Uses `@once-ui-system/core` for design tokens and components — changes to the
  theme values may require updating usages across components.
- `next/og` is used for image generation and fetches Google fonts at runtime.
- Mailchimp integration is optional (see `mailchimp` object in `once-ui.config.js`).

## When to ask the user

- If a change requires new env vars, add/update `.env.example` and ask the
  repo owner which values to provide for CI/hosting.
- If a change alters the public API surface (route path, cookie name, or
  expected content structure), confirm with the user before modifying.

---

If any section is unclear or you'd like more examples (e.g., an example MDX
post or a small component change), tell me which area and I'll expand it.
