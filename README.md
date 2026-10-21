# BLINI

A fictional restaurant portfolio website built with Next.js App Router, React, TypeScript and Tailwind CSS.

The redesign lives on `feat/blini-complete-redesign`. It includes an editorial visual identity, category-filtered sample menu, accessible mobile navigation and a local-only reservation preview.

**This is a demo. No orders, bookings or services are offered.** Menu amounts are illustrative USD values from the original project. Business hours are examples. No restaurant operating details or reviews are asserted.

## Development

Use Node.js 22 and the existing npm lockfile:

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run lint -- --max-warnings=0
npm run build
npm run typecheck
npm run start
```

## Verification

GitHub Actions runs the checks above, reservation validation tests, Chromium interaction/overflow checks at seven viewport widths and axe accessibility checks at three widths. Before/after screenshots and JSON reports are attached to the workflow run as `blini-redesign-review`.

The browser QA packages are installed into an isolated CI directory, preserving application dependencies and the lockfile. The test commands are in [.github/workflows/redesign-quality.yml](.github/workflows/redesign-quality.yml).

## Content and architecture

- `src/app/data/`: typed illustrative menu and concept hours
- `src/app/components/`: focused server/client UI components and original local images
- `src/app/lib/reservation.ts`: pure local date and form validation
- `src/app/globals.css`: design tokens, components, responsive layouts and motion preferences
- `scripts/`: browser and validation tests

Read [the redesign audit and verification notes](docs/REDESIGN.md) for design decisions, demo behaviour and remaining limitations.

See [the cinematic hero notes](docs/HERO-VIDEO.md) for footage attribution and license, asset sizes, encoding commands, playback behavior and browser verification.

## Before commercial deployment

The dependency security upgrade moves to Next.js 16 and React 19 and removes four unused packages. The verified full audit decreased from 26 findings to 9 development-tool findings (2 moderate, 7 high, no critical). See [the dependency security report](docs/DEPENDENCY-SECURITY.md) for exact versions, audit evidence and remaining limitations.

Verify food-image rights, menu details, address, contact information, opening hours and any operational booking provider before turning this concept into a real restaurant website.
