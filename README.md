# BLINI

BLINI is a fictional restaurant website built with Next.js 16, React 19, TypeScript and Tailwind CSS. It features a responsive sample menu, a cinematic cooking-video hero and a local reservation preview. No orders or reservations are accepted.

## Run locally

Use Node.js 22 and npm 10:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production preview, run `npm run build` followed by `npm run start`. Next.js uses its supported webpack mode for this project.

## Verify

```sh
npm audit
npm audit --omit=dev
npm run lint -- --max-warnings=0
npm run typecheck
npm run build
```

GitHub Actions also runs reservation tests, responsive browser checks, hero media checks and automated accessibility checks. See [.github/workflows/redesign-quality.yml](.github/workflows/redesign-quality.yml) for the exact commands. The project includes Chromium and WebKit browser checks; real iPhone Safari and other physical devices still need manual review.

## Experience and limits

The muted hero video attempts inline autoplay where the browser permits it. A poster and accessible Play/Pause control cover blocked autoplay or failed media. Reduced-motion and data-saving preferences suppress automatic playback. On suitable viewports, the hero stays pinned during native scrolling while its text and overlay respond to scroll progress; short viewports and reduced-motion settings use a static layout. Footer copy identifies the fictional concept, and the reservation form states clearly that it creates no booking or availability promise.

The [hero-video notes](docs/HERO-VIDEO.md) record asset provenance and browser limitations. The [dependency security report](docs/DEPENDENCY-SECURITY.md) records the audit baseline and remaining development-tool findings. Menu details, food-image rights, hours and operational contact details require verification before any commercial use. No real restaurant address or booking system is provided.
