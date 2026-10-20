# Dependency security upgrade — 2026-10-20

Repository: XtremeThaqi/Restaurant-App. Existing PR: #1. Branch: feat/blini-complete-redesign. Baseline: ea93d695be0bb847a3a00bbadbb40318a01bf86c.

## Resolved versions

These are installed lockfile versions, rather than package.json ranges:

- Next.js: 14.2.5 → 16.4.2; eslint-config-next: 14.2.5 → 16.4.2.
- React and React DOM: 18.3.1 → 19.3.1.
- TypeScript: 5.5.4 → 5.9.3.
- ESLint: 8.57.0 → 9.39.5.
- PostCSS: 8.4.40 → 8.5.31.
- Tailwind CSS: 3.4.7 → 3.4.19.
- @types/node: 20.14.14 → 22.20.5.
- @types/react: 18.3.3 → 19.3.0; @types/react-dom: 18.3.0 → 19.3.0.
- Removed unused framer-motion 11.3.22, react-icons 5.2.1, webpack 5.93.0 and file-loader 6.2.0. No application imports or custom webpack loaders use these packages. The approved hero animation uses CSS.

Next 16 is Active LTS; Next 14 is unsupported ([support policy](https://nextjs.org/support-policy)). The [Next 16 migration guide](https://nextjs.org/docs/app/guides/upgrading/version-16) requires Node >=20.9 and TypeScript >=5.1. This repository standardizes on Node 22 / npm 10. React and its type packages were upgraded together. Runtime versions are pinned, and npm regenerated the v3 lockfile without --force or --legacy-peer-deps.

The obsolete next lint command becomes the ESLint CLI with Next's flat core-web-vitals config. Next 16 uses Turbopack by default, but its CSS evaluation worker crashed on this Windows host (0xc0000409). Development and production scripts explicitly use the supported --webpack option, validated by the successful production build. This uses Next's bundled webpack, not the removed standalone package. Explicit image qualities [75, 80] retain the approved hero's quality=80. React 19 requires the timer ref's explicit undefined initial value. The local-calendar date effect retains its hydration behavior with one narrowly explained lint exception.

## Verified npm audits

- Before: **26** total — 5 moderate, 20 high, 1 critical.
- After: **9** total — 2 moderate, 7 high, 0 critical.
- After, production only (`npm audit --omit=dev`): **0** findings.

Machine-readable npm responses: [before](security/audit-before.json), [after](security/audit-after.json), [production](security/audit-production.json). npm reports vulnerable package nodes, including dependent packages; these totals are not counts of unique advisories. These are registry snapshots, not a guarantee against future findings.

The original findings covered Next runtime/cache/image/server vulnerabilities; webpack/terser/serialize-javascript; old lint glob/parser chains; and PostCSS/Tailwind/watch/selector dependencies. Removing unused packages and upgrading supported runtime/tool versions eliminated the critical finding and refreshed compatible transitive dependencies using npm audit fix without force.

Remaining findings are development dependencies:

- High: braces, chokidar, micromatch, fast-glob, @next/eslint-plugin-next, eslint-config-next and tailwindcss. The underlying braces stack-exhaustion advisory is [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm); npm reports all braces versions affected. Both the current Next lint plugin and Tailwind 3 depend on this chain.
- Moderate: postcss-selector-parser and postcss-nested through Tailwind 3 ([GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf)). npm proposes Tailwind 4 as a breaking remediation. A styling migration is deferred to preserve the approved design. No unverified transitive major overrides were added.

ESLint 9.39.5 is deprecated/out of support. It is retained because the current React and jsx-a11y plugins declare ESLint 9 peer support, not ESLint 10. This is an explicit tooling limitation, not a claim that every development dependency is supported or secure. Follow up when the plugins support ESLint 10 and the glob/brace chain is patched. Avoid processing untrusted source/glob input with these build tools.

CI fails on production audit findings at moderate or higher and uploads the full audit so the known development findings remain visible. It retains the approved redesign's reservation, responsive, interaction and accessibility checks. No merge or deployment is part of this upgrade.

## Local verification

- Node 22.23.1 / npm 10.9.0; clean npm ci passed. npm ls --depth=0 exited successfully; it lists two optional sharp WASM fallback packages as extraneous despite their presence in the lockfile. No invalid peer dependencies were reported.
- ESLint with --max-warnings=0 passed.
- Production build with Next 16.4.2 and --webpack passed; all four routes prerendered.
- npm run typecheck passed after build generated Next declarations. Next automatically updated tsconfig with target ES2017, jsx react-jsx and .next/dev/types.
- All five reservation validation tests passed.
- Chromium production regression passed at 320, 375, 390, 768, 1024, 1440 and 1920px, including navigation/focus, filtering, reservation demo with no transmission/storage, image loading and console checks. Axe checks passed at 320, 768 and 1440px. Added checks verified both normal hero animation and reduced-motion behavior. Screenshots and JSON reports are in ignored qa-artifacts and uploaded by CI.
- git diff --check passed. No CSS, layout, menu content or image assets changed.
