# BLINI redesign

## Scope and audit

The original repository (main at 88ea0f9) has nine JSX components, a Next 14 App Router page, Tailwind, Framer Motion, React Icons, local food imagery and an npm lockfile. All component and configuration source was reviewed through GitHub. There were no repository AGENTS.md instructions or existing test workflows in the tree.

The live site's rendered content was inspected. An interactive local shell/browser was unavailable in the authoring session, so the original visual appearance and viewport behaviour could not be personally inspected. The CI workflow attempts baseline screenshots of the unchanged production site, then tests the feature-branch production build locally on the runner. No deployment is part of this workflow.

| Original problem | Implemented change |
| --- | --- |
| Struck-through wordmark, similar orange/black sections and repeated underlined headings | Serif wordmark, charcoal hero, warm ivory menu, sage story, charcoal visit section and paper reservation panel |
| Multiple h1 elements, generic metadata and ambiguous image alt text | One h1, labelled semantic sections, descriptive metadata, canonical and generated social image |
| Inline data and repetitive fixed-height menu cards | Typed dish data, accessible category buttons, consistent image ratios and flexible content |
| Every order link goes to contact | Removed false ordering actions; menu browsing and reservation demo are separate |
| Fictional-restaurant warning disabled in comments | Persistent concept ribbon, story explanation and explicit form notices |
| Unverified reviews and business claims | Removed testimonial component, unsupported history, personal phone/address and business email claims |
| Contact form has no handler, date or time; no labels | Local-only validated reservation preview with dates, example times, party size, clear errors and status announcements |
| Fixed form/hour/footer widths and overflow masking | Fluid containers, minmax grids, intrinsic sizing and dedicated narrow-screen layouts; no overflow-x-hidden workaround |
| Repeated client-side entrance motion on every section | Server-rendered static sections, small client boundaries and a single reduced-motion-aware hero entrance |
| No quality checks | Lockfile install, strict lint, production build, TypeScript, validation tests and production browser QA in GitHub Actions |

## Content decisions

BLINI is explicitly a fictional portfolio concept, as the original commented-out warning states. Original dishes and USD sample prices are retained, with concise illustrative descriptions derived from the original text. They are not confirmed recipes or allergen guidance. No drinks or fabricated new dishes were added. All images remain local to the original repository and use Next Image; ownership/licensing still needs confirmation before commercial use.

Opening hours are labelled concept hours. No address, directions, telephone link, business email, social profile, real reviews, ratings, operating status or Restaurant structured data is published without verification. Project enquiries link to the actual repository.

The demo deliberately omits name, email and phone fields. They serve no purpose without an operational booking destination. Requests are optional examples, limited to 300 characters, cleared after success, and never transmitted or stored. There is no server action, API, analytics, localStorage or sessionStorage. The date must be a valid future local-calendar date; slots and party limits are examples. A brief pending state prevents duplicate submission. Success explicitly says no table was booked.

The later dependency maintenance pass supersedes the historical dependency notes below; see [the security upgrade report](DEPENDENCY-SECURITY.md).

## Design and architecture

CSS custom properties define palette, typography, section spacing, motion timing and radius. Georgia provides a warm display serif without third-party font downloads; Arial/Helvetica provides a clean interface stack. Contrast-safe dark terracotta is used for small text/buttons; brighter terracotta is decorative. Static hero/story/visit/footer content remains in server components. Only navigation, menu filtering and the reservation preview are client components.

Mobile navigation is an in-page disclosure, not a modal: aria-expanded/controls, Escape dismissal, focus return, destination focus, outside-click dismissal and closing at the desktop breakpoint. Menu filtering uses ordinary pressed buttons, not incomplete ARIA tabs. Focus outlines, skip navigation, scroll offsets, meaningful labels, announced errors, and reduced-motion support are included.

Original Next/React/Tailwind dependencies and lockfile are preserved. Framer Motion, React Icons, file-loader and direct webpack remain installed but are no longer imported by the redesigned application; remove them in a separately lockfile-validated maintenance pass. Next 14.2.5 and its old lint configuration require a dependency/security review before any production rollout. Consult https://nextjs.org/blog and https://nextjs.org/support-policy for currently supported releases. A current supported Next release migration is a separate task; passing this redesign's checks does not establish dependency security.

## Verification

The workflow runs npm ci using the existing lockfile, lint with zero warnings, next build, tsc --noEmit, five Node validation tests, and Chromium tests against next start. Isolated pinned Playwright/axe dependencies do not modify the project package or lockfile.

Browser checks cover 320, 375, 390, 768, 1024, 1440 and 1920px widths; horizontal overflow at every section and with the mobile menu open; mobile Escape/focus/destination handling; all/dessert filtering; form errors and focus; success without network submission or storage; broken images; and browser console/page errors. Axe checks WCAG A/AA rules at 320, 768 and 1440px. Full-page screenshots and JSON reports upload as blini-redesign-review artifacts. Workflow results, rather than this document, determine pass/fail.

Automated axe is not a full WCAG certification. Manual screen-reader testing, cross-browser Safari/Firefox checks, touch-device testing, visual review and Lighthouse measurements remain additional review work. Baseline screenshots depend on external Netlify availability; any failure is logged. No performance score, manual visual approval or genuine reservation availability is claimed.

## Recorded first verification

CI run 39469145750 for commit cfd8632 passed the lockfile installation, zero-warning lint, production build, TypeScript, all five validation tests, all seven responsive widths, all three automated accessibility checks and interaction/console checks. Its 14 review artifacts include two baseline screenshots, seven responsive after screenshots, a success screenshot, three axe reports and results.json. The production route reports 11.7 kB page JavaScript and 98.8 kB total first-load JavaScript; this is build output, not a Lighthouse measurement.

The install reported 26 inherited audit vulnerabilities (5 moderate, 20 high, 1 critical). The build also recommends optional sharp for production image processing and updating the Browserslist database. These maintenance items are not resolved by UI changes. A follow-up screenshot harness improvement scrolls through each document before capture so lazy images and legacy scroll animations are represented; refer to the latest feature-branch CI result for that harness.
