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
      await page.getByRole("button", { name: "Pause background video" }).click();
      const frozen = await video.evaluate(v => v.currentTime);
      await page.waitForTimeout(700);
      assert.equal(await video.evaluate(v => v.currentTime), frozen);
      assert.equal(await video.evaluate(v => getComputedStyle(v).opacity), "1", "pause retains the frame");
      await page.getByRole("button", { name: "Play background video" }).focus();
      await page.keyboard.press("Enter");
      await page.getByRole("button", { name: "Pause background video" }).waitFor();
      if (width === 1440) {
        await video.evaluate(v => { v.currentTime = 11.8; });
        await page.waitForFunction(() => { const v = document.querySelector("video"); return v.currentTime < 1 && !v.paused; });
      }
      const track = page.locator(".hero-scroll");
      const menu = page.locator(".menu-section");
      await page.waitForFunction(() => document.querySelector(".hero-scroll").classList.contains("is-pinned"));
      const top = await page.locator(".hero").boundingBox();
      const menuAtStart = await menu.boundingBox();
      assert.ok(Math.abs(menuAtStart.y - 900) < 12, "menu begins just below the viewport, leaving the hero fully visible");
      assert.equal(await menu.evaluate(e => getComputedStyle(e).backgroundColor), "rgb(246, 241, 232)", "rising panel has an opaque background");
      await page.evaluate(() => scrollTo({ top: 300, behavior: "instant" }));
      await page.waitForTimeout(180);
      const pinned = await page.locator(".hero").boundingBox();
      assert.ok(Math.abs(pinned.y - top.y) < 2, "video stage stays pinned while content scrolls");
      const menuAfterScroll = await menu.boundingBox();
      assert.ok(menuAfterScroll.y < menuAtStart.y - 280 && menuAfterScroll.y > 0, "menu visibly rises over the stationary hero");
      const menuIsInFront = await menu.evaluate(e => {
        const rect = e.getBoundingClientRect();
        const x = window.innerWidth / 2;
        const y = Math.min(window.innerHeight - 10, rect.top + 40);
        return e.contains(document.elementFromPoint(x, y));
      });
      assert.ok(menuIsInFront, "menu is the foreground layer while the hero remains pinned");
      const progress = await track.evaluate(e => Number(getComputedStyle(e).getPropertyValue("--hero-scroll-progress")));
      assert.ok(progress > 0 && progress < 1, "scroll progress moves through the sticky section");
      const opacity = await page.locator(".hero-content h1").evaluate(e => Number(getComputedStyle(e).opacity));
      assert.equal(await page.locator(".hero-content .actions").evaluate(e => getComputedStyle(e).opacity), "1", "CTA buttons must retain full contrast during scroll");
      assert.ok(opacity < 1 && opacity > .44, "foreground fades while video stays fixed");
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await page.evaluate(() => {
        const track = document.querySelector(".hero-scroll");
        const top = scrollY + track.getBoundingClientRect().top;
        scrollTo({ top: top + track.offsetHeight - innerHeight + 100, behavior: "instant" });
      });
      await page.waitForTimeout(180);
      const released = await page.locator(".hero").boundingBox();
      assert.ok(released.y < -40, "hero releases naturally when the scroll reaches 100%");
      assert.equal(await track.evaluate(e => Number(getComputedStyle(e).getPropertyValue("--hero-scroll-progress"))), 1);
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
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
      assert.equal(await page.locator(".hero-scroll").evaluate(e => e.classList.contains("is-pinned")), false, "reduced motion removes extended sticky scroll");
      assert.deepEqual(errors, []);
      await context.close();
      console.log(`PASS ${name} playback, keyboard, parallax, crop, accessibility, preference change: ${width}`);
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
      if (["reduce", "saveData", "2g", "reducedData", "noJS"].includes(preference)) {
        assert.deepEqual(media, [], "static mode requests no footage");
        assert.equal(await page.locator(".hero-scroll").evaluate(e => e.classList.contains("is-pinned")), false, "static fallback has no pinned runway");
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
