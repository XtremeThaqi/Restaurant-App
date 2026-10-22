const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const screenshots = path.resolve("qa-artifacts");
fs.mkdirSync(screenshots, { recursive: true });
async function settleImages(page) {
  // Visit the whole document so lazy images and original scroll animations appear
  // in full-page screenshots, then require every image to finish loading.
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let offset = 0; offset < height; offset += 700) {
    await page.evaluate(y => window.scrollTo(0, y), offset);
    await page.waitForTimeout(80);
  }
  await page.waitForFunction(() => Array.from(document.images).every(image => image.complete), { timeout: 30000 });
  await page.waitForTimeout(1100);
  await page.evaluate(() => window.scrollTo(0, 0));
}
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  // Baseline is informational: external availability must not mask redesign QA.
  const baseline = await browser.newPage({ reducedMotion: "reduce" });
  try {
    for (const width of [375, 1440]) {
      await baseline.setViewportSize({ width, height: 1000 });
      await baseline.goto("https://blini.netlify.app/", { waitUntil: "networkidle", timeout: 30000 });
      await settleImages(baseline);
      await baseline.screenshot({ path: path.join(screenshots, "before-" + width + ".png"), fullPage: true });
    }
  } catch (error) { console.warn("Baseline screenshot unavailable:", error.message); }
  await baseline.close();
  await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator(".dish-card").count(), 12);
  // Unicode arrows and starbursts may turn into iOS emoji; use vector icons throughout.
  assert.equal(await page.locator("svg.icon").count(), 14);
  assert.equal(await page.locator('svg.icon[aria-hidden="true"][focusable="false"]').count(), 14);
  assert.equal(await page.getByRole("link", { name: "Explore menu" }).locator("svg.icon").count(), 1);
  assert.equal(await page.locator(".ribbon-symbol.icon, .asterisk.icon").count(), 2);
  assert.equal(await page.locator(".detail-heading svg.icon").count(), 1);
  assert.ok(await page.locator("svg.icon").evaluateAll(icons => icons.every(icon => {
    const styles = getComputedStyle(icon);
    return styles.width !== "0px" && styles.height !== "0px" && icon.getAttribute("stroke") === "currentColor";
  })), "Icons must be visible scalable SVGs using the surrounding text color");
  assert.equal(await page.locator("body").evaluate(element => /[↗↘↑↓✳◷☰×]/u.test(element.textContent)), false, "No platform-dependent icon glyphs in page text");
  assert.equal(await page.locator(".hero-content h1").evaluate(element => getComputedStyle(element).animationName), "none");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  assert.equal(await page.locator(".hero-content h1").evaluate(element => getComputedStyle(element).animationName), "enter");
  await page.waitForTimeout(750);
  assert.equal(await page.locator(".hero-content h1").evaluate(element => getComputedStyle(element).opacity), "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "Overflow at " + width);
    if (width < 768) {
      assert.equal(await page.getByRole("button", { name: "Open navigation" }).locator("svg.icon").count(), 1);
      await page.getByRole("button", { name: "Open navigation" }).click();
      assert.equal(await page.getByRole("button", { name: "Close navigation" }).getAttribute("aria-expanded"), "true");
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "Menu overflow at " + width);
      await page.keyboard.press("Escape");
      assert.equal(await page.getByRole("button", { name: "Open navigation" }).getAttribute("aria-expanded"), "false");
      assert.equal(await page.getByRole("button", { name: "Open navigation" }).evaluate(element => element === document.activeElement), true);
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Menu", exact: true }).click();
      assert.equal(await page.getByRole("button", { name: "Open navigation" }).getAttribute("aria-expanded"), "false");
      assert.equal(await page.locator("#menu").evaluate(element => element === document.activeElement), true);
    }
    for (const id of ["menu", "story", "visit", "reservations"]) {
      await page.locator("#" + id).scrollIntoViewIfNeeded();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), id + " overflow at " + width);
    }
    await settleImages(page);
    const broken = await page.locator("img").evaluateAll(images => images.filter(image => image.complete && image.naturalWidth === 0).map(image => image.src));
    assert.deepEqual(broken, [], "Broken imagery at " + width);
    await page.screenshot({ path: path.join(screenshots, "after-" + width + ".png"), fullPage: true });
    console.log("PASS responsive layout", width);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Desserts", exact: true }).click();
  assert.equal(await page.locator(".dish-card").count(), 1);
  assert.equal(await page.locator(".dish-card h3").textContent(), "Apfelstrudel");
  assert.equal(await page.getByRole("button", { name: "Desserts", exact: true }).getAttribute("aria-pressed"), "true");
  await page.getByRole("button", { name: "All dishes", exact: true }).focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(".dish-card").count(), 12);
  await page.getByRole("button", { name: "Preview reservation", exact: true }).click();
  assert.equal(await page.locator("#date").getAttribute("aria-invalid"), "true");
  assert.equal(await page.locator("#date").evaluate(element => element === document.activeElement), true);
  const tomorrow = await page.evaluate(() => { const date = new Date(); date.setDate(date.getDate() + 1); return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-"); });
  await page.locator("#date").fill(tomorrow);
  await page.locator("#time").selectOption("18:00");
  await page.locator("#requests").fill("A quiet table");
  const submissions = [];
  page.on("request", request => { if (request.method() !== "GET") submissions.push(request.url()); });
  await page.getByRole("button", { name: "Preview reservation", exact: true }).click();
  await page.getByText("Demo complete. No table has been booked.", { exact: true }).waitFor();
  assert.deepEqual(submissions, [], "Demo must not transmit form data");
  assert.equal(await page.locator("#requests").inputValue(), "");
  assert.equal(await page.evaluate(() => localStorage.length + sessionStorage.length), 0);
  await page.screenshot({ path: path.join(screenshots, "reservation-success.png"), fullPage: true });
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const results = await page.evaluate(async () => window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } }));
    fs.writeFileSync(path.join(screenshots, "axe-" + width + ".json"), JSON.stringify(results, null, 2));
    assert.deepEqual(results.violations.map(item => ({ id: item.id, impact: item.impact, nodes: item.nodes.map(node => node.target) })), [], "Accessibility at " + width);
    console.log("PASS accessibility", width);
  }
  assert.deepEqual(errors, [], "Browser errors");
  fs.writeFileSync(path.join(screenshots, "results.json"), JSON.stringify({ widths: [320,375,390,768,1024,1440,1920], browserErrors: errors, reservationTransmissions: submissions, passed: true }, null, 2));
  await browser.close();
  console.log("PASS menu filters, mobile keyboard navigation, form validation, local-only submission and browser console");
})().catch(error => { console.error(error); process.exit(1); });
