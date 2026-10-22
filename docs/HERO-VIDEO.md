# BLINI cinematic hero

## Source and license

- Footage: [A Chef Cooking Foods](https://www.pexels.com/video/a-chef-cooking-foods-8626266/), Pexels video **8626266**, by [Kampus Production](https://www.pexels.com/@kampus/).
- Downloaded 20 October 2026 from the selected clip's [1920 × 1080 rendition](https://videos.pexels.com/video-files/8626266/8626266-hd_1920_1080_25fps.mp4). This is the selected cooking footage, replacing the earlier candlelit-dinner proposal.
- [Pexels License](https://www.pexels.com/license/), reviewed on that date: free website/commercial use and modification; attribution is appreciated but optional. Restrictions include implying endorsement, offensive use of identifiable people, selling unaltered copies, stock-platform redistribution and trademark use. The footage is third-party material under the Pexels License, not the repository's MIT license. No endorsement or depiction of an actual BLINI kitchen is claimed.

## Delivered assets

All assets live in `public/videos/`. The original is a 20.97-second, 25 fps landscape clip. The hero uses seconds 6–18, showing steam, cookware and the chef's hands. Contact-sheet review across the original and rendered desktop/phone views informed the centre crop. The excerpt loops with a natural cut; it is not a fabricated seamless loop.

- `blini-chef-desktop.mp4`: 1440 × 810, 12 seconds, 25 fps, 1,588,971 bytes.
- `blini-chef-mobile.mp4`: 450 × 800, 12 seconds, 25 fps, 550,810 bytes. Crop the central 608 × 1080 region of the 1920 × 1080 source (x=656, y=0) before scaling, retaining the pot and steam.
- `blini-chef-poster.webp`: 1440 × 810, 16,868 bytes, extracted at the excerpt's first frame; centre cropping matches the video composition on phones.

Both MP4s use H.264 Main profile, level 3.1, 8-bit yuv420p, square pixels, no audio track and fast-start metadata. Only one rendition is selected at initial hydration; rotation does not trigger a second download. The original download and encoder are kept outside tracked source.

Reproduce with FFmpeg (replace `source.mp4` with the download above):

```sh
ffmpeg -ss 6 -i source.mp4 -t 12 -an -vf 'scale=1440:810,setsar=1' -c:v libx264 -preset slow -crf 27 -maxrate 1400k -bufsize 2800k -profile:v main -level 3.1 -pix_fmt yuv420p -movflags +faststart public/videos/blini-chef-desktop.mp4
ffmpeg -ss 6 -i source.mp4 -t 12 -an -vf 'crop=608:1080:656:0,scale=450:800,setsar=1' -c:v libx264 -preset slow -crf 28 -maxrate 550k -bufsize 1100k -profile:v main -level 3.1 -pix_fmt yuv420p -movflags +faststart public/videos/blini-chef-mobile.mp4
ffmpeg -ss 6 -i source.mp4 -vf scale=1440:810 -frames:v 1 -quality 82 public/videos/blini-chef-poster.webp
```

## Behavior and accessibility

The static poster renders on the server, including with JavaScript disabled. The fixed hero sizing and absolutely positioned media reserve layout space. The existing identity, copy, navigation, CTAs and mobile SVG fixes remain intact. The dark gradient provides text contrast throughout the clip. Decorative footage is hidden from assistive technology, while the labelled Play/Pause button remains keyboard accessible with a 44px minimum target and visible focus.

Muted, inline autoplay and looping are enabled. Rejected autoplay (including Safari Low Power Mode) leaves the poster and a working Play button. Pause freezes the current frame and stops parallax. Media errors retain the poster and remove the unavailable control. Hiding the document pauses playback. If it was playing before the tab was hidden, it attempts to resume when visible again; a visitor-initiated pause remains paused.

Reduced motion, reduced data, Save-Data, and reported 2G/slow-2G connections prevent automatic video requests. An explicit Play action opts into footage, while motion/data preferences continue to suppress parallax. Preference changes are handled live. Browsers without a data-saving signal cannot expose that preference to the page; the small mobile file still limits transfer. iOS autoplay decisions remain under browser control.

Scroll remains native. An Apple-inspired sticky stage keeps the cooking footage fixed in the viewport while the page advances through an extra 130svh on desktop or 100svh on mobile. A passive scroll listener batches progress updates through requestAnimationFrame: the foreground content shifts upward up to 90px, softens to 45% opacity, the overlay darkens slightly, and a restrained progress line fills from 0 to 100%. At 100%, the section releases and the menu follows normally. The footage continues natural playback (no seek or frame scrubbing). Short viewports (720px high or less), reduced-motion and data-saving modes use the original non-pinned layout. There is no scroll capture, wheel interception, animation dependency, or change to the design's CTAs.

## Verification

The existing `scripts/browser-qa.cjs` covers responsive layout, SVG icons, navigation, menu filters, reservation interactions and WCAG checks. `scripts/reservation-test.cjs` covers reservation validation. The added `scripts/hero-qa.cjs` exercises Chromium and optionally WebKit: playback, pause/resume by keyboard, rendition selection, scroll fade, responsive overflow, hero accessibility, live reduced-motion changes, static/no-JS fallback, data-saving preferences, autoplay rejection and media failure.

Run the production server, then use the isolated QA tools already used by the existing workflow:

```sh
NODE_PATH=/path/to/qa/node_modules BLINI_WEBKIT=1 node scripts/hero-qa.cjs
```

WebKit with iPhone emulation checks engine behavior and viewport compatibility; it does not replace a physical iPhone Safari/Low Power Mode check.

### Local results, 20 October 2026

- Passed lint with zero warnings, TypeScript, production build and `git diff --check`. An initial build ran out of memory during tracing while other processes were running; the subsequent isolated build completed successfully.
- Passed all five reservation validation tests and the existing browser regression suite at 320, 375, 390, 768, 1024, 1440 and 1920px, including its SVG regression assertions and zero WCAG violations at 320, 768 and 1440px. The optional remote baseline screenshot was unavailable under local network restrictions; local production checks passed.
- Passed real H.264 playback, pause/resume, keyboard controls, loop wraparound, parallax, rendition choice, preference changes, crop/overflow and hero accessibility at 320, 390, 768, 1440 and 1920px using the installed Brave Chromium engine. Passed reduced-motion, Save-Data, 2G, reduced-data, simulated autoplay rejection, failed-video and no-JavaScript cases. Screenshots were visually inspected at phone and desktop sizes.
- Playwright's bundled Chromium reports no H.264 decoder on both the local Windows machine and the first Linux CI run; Windows WebKit advertises MP4 support but rejects the stream. Both correctly retain the poster. WebKit passed static reduced-motion/data-saving, media-error and no-JavaScript checks; **WebKit video playback and physical iPhone Safari remain unverified locally**. CI uses official Chrome for H.264 playback, and installs WebKit with its Linux media dependencies to run the full suite without this local limitation override.

For Chromium playback checks, `BLINI_CHROMIUM_EXECUTABLE` can select an installed browser supporting H.264, or `BLINI_CHROMIUM_CHANNEL=chrome` can select official Chrome as CI does. To explicitly run only the limited local WebKit fallback checks, set `BLINI_WEBKIT=1`, `BLINI_WEBKIT_ONLY=1`, and `BLINI_WEBKIT_FALLBACK_ONLY=1`. The script prints the playback limitation; CI does not use these fallback-only flags.
