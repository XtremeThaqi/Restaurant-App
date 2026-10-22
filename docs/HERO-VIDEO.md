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

Muted, inline autoplay and looping are enabled. Rejected autoplay (including Safari Low Power Mode) leaves the poster and a working Play button. Pause freezes the current frame. Media errors retain the poster and remove the unavailable control. Hiding the document pauses playback. If it was playing before the tab was hidden, it attempts to resume when visible again; a visitor-initiated pause remains paused.

Reduced motion, reduced data, Save-Data, and reported 2G/slow-2G connections prevent automatic video requests. An explicit Play action opts into footage, without affecting the structural sticky layout. Preference changes are handled live. Browsers without a data-saving signal cannot expose that preference to the page; the small mobile file still limits transfer. iOS autoplay decisions remain under browser control.

The hero and Menu share one isolated stacking parent, following the [UI Layouts Sticky Hero-Sec](https://www.ui-layouts.com/components/sticky-scroll) layout principle. The hero is sticky at top: 0 for one 100svh viewport; the opaque Menu rises over it in natural document flow and determines the parent's height. No scroll runway, negative overlap margins, JS activation, progress calculations or hero content transforms remain. Short windows retain stacking with compact hero spacing. Data-saving, autoplay rejection and video errors retain this same layout using the poster. Reduced motion intentionally uses ordinary non-sticky document flow and disables Lenis interpolation.

Official lenis/react supplies a single automatic RAF loop (lerp 0.12, smoothWheel true, syncTouch false, respectReducedMotion true). CSS scroll-behavior is auto. Native touch gestures are retained. Anchor destinations use the existing responsive scroll-padding/scroll-margin offsets through Lenis scrollTo; the built-in anchors handler is disabled to avoid stale animation coordinates after native focus/hash jumps. Same-page clicks preserve target focus and URL history while suppressing the competing default anchor jump; initial hashes and Back/Forward retain native URLs. Modified clicks and external links remain native.


## Sticky scroll revision (22 October 2026)

Verification targets the replacement interaction rather than the retired runway/parallax behavior. `scripts/scroll-qa.cjs` now exercises real wheel input in Chromium, Firefox and WebKit at 1024/1440/1920px desktop and 320/375/390px mobile widths, with 900/600px desktop and 844/667px mobile heights. It captures start/middle/end images, checks a stationary hero and foreground Menu hit testing, continued Menu flow and reverse wheel movement, anchor placement and history, plus native Chromium touch gestures. Playback and preference tests remain in hero-qa; general UI and WCAG tests remain in browser-qa. Physical iPhone Safari/Brave require device verification; emulation is not proof of device behavior.

Touch A/B in a browser-level Chromium fixture produced approximately 385px of native travel with syncTouch false and 400px with true for the same swipe. Both responded; this did not establish a reliability or feel improvement on physical iOS. The application retains syncTouch false to preserve native gestures.

Run a production server and the existing browser/reservation suites, plus `node scripts/scroll-qa.cjs`, using Playwright and axe-core from the isolated QA directory (NODE_PATH). CI installs official Chrome, Firefox and WebKit; `BLINI_CHROMIUM_CHANNEL=chrome` selects H.264-capable Chrome for playback and wheel tests. Locally `BLINI_CHROMIUM_EXECUTABLE` can select installed Brave.
