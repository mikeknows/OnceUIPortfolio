# Michael Plymire Portfolio — contributor notes

This repository is a Next.js App Router portfolio built with React, MDX, Sass,
and Once UI. Keep changes product-neutral, accessible, responsive, and suitable
for a public engineering portfolio.

## Commands

- `npm run dev` — local development server
- `npm run lint` — ESLint, including TypeScript and Next.js rules
- `npm run typecheck` — TypeScript without emitting files
- `npm run build` — production build

Use a currently supported Node.js release. Run lint, typecheck, and build before
committing changes.

## Architecture

- `src/app/layout.tsx` owns global metadata, providers, theme initialization,
  and shared page chrome.
- `src/resources/content.js` is the main source for portfolio copy, navigation,
  career history, skills, and social links.
- `src/resources/once-ui.config.js` controls routes, base URL, schema data, and
  the Once UI visual system.
- `src/resources/showcase.ts` defines the home-page project carousel.
- `src/app/work/projects/*.mdx` and `src/app/blog/posts/*.mdx` are discovered
  from the filesystem and rendered as project/article pages.
- `src/app/hobby-projects` contains public-safe personal automation and gaming
  projects.
- `src/features/data-integrity-lab` is an interactive, client-side demo.
- `src/components/Providers.tsx` supplies Once UI theme, toast, data-theme, and
  icon providers.

## Public-content boundary

The current employment entry is intentionally limited to title, dates, and a
privacy note. Do not add employer names, products, customers, project names,
screenshots, responsibilities, source code, interfaces, architecture, or
implementation details from current employment. Keep professional case studies
synthetic and product-neutral.

Never add secrets, internal hostnames, device identifiers, private IP or MAC
addresses, tokens, customer data, or other people's work or likenesses.

## Conventions

- Preserve server/client boundaries; add `"use client"` only for hooks or
  browser APIs.
- Prefer Once UI primitives and existing design tokens over one-off styling.
- Add icons to `src/resources/icons.ts` before referencing them by name.
- Follow the existing frontmatter format for new MDX content.
- Keep images in `public/images` and use Next.js image handling where possible.
- Do not reintroduce password routes, visitor tracking, or runtime font fetches.
- Update `src/resources/once-ui.config.js` and any corresponding layout theme
  initialization together when changing theme keys.
