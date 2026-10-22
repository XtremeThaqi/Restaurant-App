const { chromium, webkit, devices } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const url = process.env.BLINI_QA_URL || "http://127.0.0.1:3000";

async function checkEngine(engine, name) {
  const browser = await engine.launch(name === "chromium" ? {
    ...(process.env.BLINI_CHROMIUM_EXECUTABLE ? { executablePath: process.env.BLINI_CHROMIUM_EXECUTABLE } : {}),
    ...(process.env.BLINI_CHROMIUM_CHANNEL ? { channel: process.env.BLINI_CHROMIUM_CHANNEL } : {}),
  } : {});
  const fallbackOnly = name === "webkit" && process.env.BLINI_WEBKIT_FALLBACK_ONLY === "1";
  try {
    for (const width of fallbackOnly ? [] : [320, 390, 768, 1440, 1920]) {
      const context = await browser.newContext({ ...(width === 390 ? devices["iPhone 13"] : {}), viewport: { width, height: 900 }, reducedMotion: "no-preference" });
      const page = await context.newPage();
      const errors = [];
      const requests = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("request", request => { if (request.url().endsWith(".mp4")) requests.push(request.url()); });
      await page.goto(url);
      await page.getByRole("button", { name: "Pause background video" }).waitFor();
      const video = page.locator("video");
      const metadata = await video.evaluate(v => ({ muted: v.muted, inline: v.playsInline, loop: v.loop, duration: v.duration, width: v.videoWidth, height: v.videoHeight }));
      assert.ok(metadata.muted && metadata.inline && metadata.loop);
      assert.equal(metadata.duration, 12);
      assert.equal(metadata.width, width < 768 ? 450 : 1440);
      assert.equal(new Set(requests).size, 1, "one rendition only");
      // WebKit may report an intermediate opacity during the 600ms fade-in.
      // Wait until the video is fully visible before checking pause behavior.
      await page.waitForFunction(() => {
        const element = document.querySelector(".hero-video");
        return element && !element.paused && Number(getComputedStyle(element).opacity) >= 0.999;
      });
      await page.getByRole("button", { name: "Pause background video" }).click();
      const frozen = await video.evaluate(v => v.currentTime);
      await page.waitForTimeout(700);
      assert.equal(await video.evaluate(v => v.currentTime), frozen);
      assert.ok(await video.evaluate(v =>
        v.classList.contains("is-playing") && Number(getComputedStyle(v).opacity) >= 0.999
      ), "pause retains the visible video frame");
      await page.getByRole("button", { name: "Play background video" }).focus();
      await page.keyboard.press("Enter");
      await page.getByRole("button", { name: "Pause background video" }).waitFor();
      if (width === 1440) {
        await video.evaluate(v => { v.currentTime = 11.8; });
        await page.waitForFunction(() => { const v = document.querySelector("video"); return v.currentTime < 1 && !v.paused; });
      }
      await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
      const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector(".hero"))).violations.map(v => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map(n => ({
          target: n.target,
          html: n.html,
          failureSummary: n.failureSummary,
          checks: n.any.map(check => ({ message: check.message, data: check.data })),
        })),
      })));
      if (violations.length) {
        fs.writeFileSync(`qa-artifacts/hero-axe-${name}-${width}.json`, JSON.stringify(violations, null, 2));
        console.error(`Hero accessibility details for ${name} at ${width}px:`, JSON.stringify(violations, null, 2));
      }
      assert.deepEqual(violations.map(v => v.id), [], "hero accessibility");
      await page.screenshot({ path: `qa-artifacts/hero-${name}-${width}.png` });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForFunction(() => !document.querySelector("video").getAttribute("src"));
      assert.equal(await video.evaluate(v => getComputedStyle(v).transform), "none");
      assert.deepEqual(errors, []);
      await context.close();
      console.log(`PASS ${name} playback, keyboard, crop, accessibility, preference change: ${width}`);
    }

    for (const preference of ["reduce", "saveData", "2g", "reducedData", ...(fallbackOnly ? [] : ["blocked"]), "error", "noJS"]) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: preference === "reduce" ? "reduce" : "no-preference", javaScriptEnabled: preference !== "noJS" });
      if (["saveData", "2g"].includes(preference)) await context.addInitScript(value => {
        const connection = new EventTarget();
        Object.assign(connection, { saveData: value === "saveData", effectiveType: value === "2g" ? "2g" : "4g" });
        Object.defineProperty(navigator, "connection", { value: connection });
      }, preference);
      if (preference === "reducedData") await context.addInitScript(() => {
        const original = window.matchMedia.bind(window);
        window.matchMedia = query => query.includes("prefers-reduced-data") ? Object.assign(new EventTarget(), { matches: true, media: query }) : original(query);
      });
      if (preference === "blocked") await context.addInitScript(() => {
        let userStarted = false;
        window.addEventListener("pointerdown", () => { userStarted = true; }, true);
        window.addEventListener("keydown", () => { userStarted = true; }, true);
        // Disable the browser's independent declarative autoplay as well as play().
        new MutationObserver(() => document.querySelectorAll("video[autoplay]").forEach(v => v.removeAttribute("autoplay"))).observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ["autoplay"] });
        document.addEventListener("playing", event => { if (!userStarted && event.target instanceof HTMLVideoElement) event.target.pause(); }, true);
        const play = HTMLMediaElement.prototype.play;
        HTMLMediaElement.prototype.play = function () { return userStarted ? play.call(this) : Promise.reject(new DOMException("Autoplay blocked", "NotAllowedError")); };
      });
      const page = await context.newPage();
      const media = [];
      page.on("request", request => { if (request.url().endsWith(".mp4")) media.push(request.url()); });
      if (preference === "error") await page.route("**/*.mp4", route => route.abort());
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => { const i = document.querySelector(".hero-image"); return i.complete && i.naturalWidth > 0; });
      if (!["noJS", "error"].includes(preference)) await page.locator(".hero-playback").waitFor();
      if (preference === "error") await page.waitForFunction(() => document.querySelector("video").error);
      assert.ok(await page.locator(".hero-image").evaluate(i => i.complete && i.naturalWidth > 0));
      assert.equal(await page.locator(".hero-scroll").evaluate(e => getComputedStyle(e).position), preference === "reduce" ? "relative" : "sticky", "stacking depends on reduced motion, never video availability or data saving");
      if (["reduce", "saveData", "2g", "reducedData", "noJS"].includes(preference)) {
        assert.deepEqual(media, [], "static mode requests no footage");
        }
      if (preference === "error") assert.equal(await page.locator(".hero-playback").count(), 0);
      if (!fallbackOnly && ["reduce", "saveData", "2g", "reducedData", "blocked"].includes(preference)) {
        await page.getByRole("button", { name: "Play background video" }).click();
        await page.getByRole("button", { name: "Pause background video" }).waitFor();
      }
      await context.close();
      console.log(`PASS ${name} fallback: ${preference}`);
    }
  } finally { await browser.close(); }
  if (fallbackOnly) console.log("LIMITATION: Windows WebKit playback not validated; fallback checks only (local H.264 decoder unavailable).");
}

fs.mkdirSync("qa-artifacts", { recursive: true });
(async () => {
  if (process.env.BLINI_WEBKIT_ONLY !== "1") await checkEngine(chromium, "chromium");
  if (process.env.BLINI_WEBKIT === "1") await checkEngine(webkit, "webkit");
})().catch(error => { console.error(error); process.exit(1); });
