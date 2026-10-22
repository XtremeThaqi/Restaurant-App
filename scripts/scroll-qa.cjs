const { chromium, firefox, webkit } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const url = process.env.BLINI_QA_URL || "http://127.0.0.1:3000";
const sizes = [[1024,900],[1440,900],[1920,900],[320,844],[375,844],[390,844],[1024,600],[1440,600],[1920,600],[320,667],[375,667],[390,667]];
async function swipe(session,page) {
  await session.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:190,y:650}]});
  for(let y=630;y>=250;y-=20){await session.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:190,y}]});await page.waitForTimeout(16);}
  await session.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
}
async function settle(page) {
  await page.waitForTimeout(80);
  await page.waitForFunction(() => !document.documentElement.classList.contains("lenis-scrolling"), {timeout:5000});
}
async function geometry(page) {
  return page.evaluate(() => {
    const hero = document.querySelector(".hero-scroll").getBoundingClientRect();
    const menu = document.querySelector("#menu").getBoundingClientRect();
    return { hero: hero.top, height: hero.height, menu: menu.top, y: scrollY, overflow: document.documentElement.scrollWidth > innerWidth,
      front: document.querySelector("#menu").contains(document.elementFromPoint(innerWidth/2, Math.min(innerHeight-5, Math.max(120,menu.top+40)))) };
  });
}
async function check(engine,name) {
  const browser = await engine.launch(name === "chromium" ? {
    ...(process.env.BLINI_CHROMIUM_EXECUTABLE ? {executablePath:process.env.BLINI_CHROMIUM_EXECUTABLE} : {}),
    ...(process.env.BLINI_CHROMIUM_CHANNEL ? {channel:process.env.BLINI_CHROMIUM_CHANNEL} : {}),
  } : {});
  try {
    for (const [width,height] of sizes) {
      const context = await browser.newContext({viewport:{width,height},reducedMotion:"no-preference"});
      const page=await context.newPage();
      await page.goto(url); await page.waitForSelector("html.lenis"); await page.waitForTimeout(750);
      const prefix=`qa-artifacts/stack-${name}-${width}x${height}`;
      const start=await geometry(page);
      assert.ok(Math.abs(start.menu-start.height)<2 && Math.abs(start.hero)<2,"hero fills first viewport with menu immediately after it");
      // The fixture intentionally uses real wheel events, never scrollTo(), for the transition.
      await page.screenshot({path:prefix+"-start.png"});
      await page.mouse.move(width/2,height/2);
      await page.mouse.wheel(0,Math.round(start.height*.5));
      const samples=[];
      for(let i=0;i<8;i++){await page.waitForTimeout(40);samples.push((await geometry(page)).y);}
      assert.ok(new Set(samples.map(Math.round)).size>2,"wheel movement is interpolated over frames");
      assert.ok(samples.every((v,i)=>!i||v>=samples[i-1]-1),"no backwards snap during forward wheel");
      await settle(page);
      const mid=await geometry(page);
      assert.ok(Math.abs(mid.hero)<2 && mid.menu>height*.3 && mid.menu<height*.7 && mid.front,"stationary hero, rising foreground menu");
      assert.ok(!mid.overflow);
      await page.screenshot({path:prefix+"-middle.png"});
      await page.mouse.wheel(0,Math.round(start.height*.65));await settle(page);
      const end=await geometry(page);
      assert.ok(Math.abs(end.hero)<2 && end.menu<0 && end.front,"menu fully covers stationary hero");
      await page.screenshot({path:prefix+"-end.png"});
      await page.mouse.wheel(0,200);await settle(page);
      assert.ok((await geometry(page)).menu<end.menu-150,"tall menu continues in normal document flow");
      await page.mouse.wheel(0,-Math.round(start.height*2));await settle(page);
      const reversed=await geometry(page);
      assert.ok(reversed.y<2,`upward wheel reverses the transition: ${JSON.stringify(reversed)}`);
      // Anchor clicks must animate without the simultaneous native hash jump.
      await page.getByRole("link",{name:"Explore menu",exact:true}).click();await settle(page);
      assert.equal(new URL(page.url()).hash,"#menu");
      const gap=await page.evaluate(()=>document.querySelector("#menu .eyebrow").getBoundingClientRect().top-document.querySelector(".site-header").getBoundingClientRect().bottom);
      assert.ok(gap>=8&&gap<=72,`menu heading below navbar: ${gap}`);
      await page.keyboard.press("Shift+Tab");await settle(page);
      assert.ok(await page.evaluate(()=>{
        const target=document.activeElement,rect=target.getBoundingClientRect();
        if (target === document.body) return true; // Platform traversal may leave the page.
        return target.contains(document.elementFromPoint(rect.left+rect.width/2,rect.top+rect.height/2));
      }),"reverse keyboard navigation leaves the focused control visible");
      // Safari can omit links from Tab traversal according to platform keyboard
      // settings. Exercise the occluded hero link explicitly in every engine too.
      await page.goto(url+"/#menu");await settle(page);
      await page.locator(".hero-bottom a").focus();await settle(page);
      assert.ok(await page.evaluate(()=>{
        const target=document.activeElement,rect=target.getBoundingClientRect();
        return target.closest(".hero-scroll") && target.contains(document.elementFromPoint(rect.left+rect.width/2,rect.top+rect.height/2));
      }),"focusing an occluded hero link reveals it above the panel");
      await page.goto(url+"/#story");await settle(page);
      await page.goto(url+"/#visit");await page.goBack();await settle(page);
      assert.equal(new URL(page.url()).hash,"#story");
      await page.getByRole("link",{name:"Back to top",exact:true}).click();await settle(page);
      assert.ok((await geometry(page)).y<2,"Back to Top works even after the browser scrolls the footer link into view");
      await context.close();console.log(`PASS real wheel stacking, reversal, anchor/history ${name} ${width}x${height}`);
    }
    if(name==="chromium") {
      const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
      const page=await context.newPage();await page.goto(url);await page.waitForSelector("html.lenis");
      const cdp=await context.newCDPSession(page);
      await swipe(cdp,page);
      await page.waitForTimeout(500);
      const touch=await geometry(page);
      assert.ok(touch.y>150&&Math.abs(touch.hero)<2&&touch.front,"native browser touch swipe raises menu over stationary hero");
      await page.screenshot({path:"qa-artifacts/stack-touch.png"});await context.close();
      console.log("PASS Chromium native touch swipe (syncTouch false)");
      // Isolated A/B fixture: test both modes without adding a second Lenis loop
      // to the application or shipping a test-only runtime switch.
      for (const syncTouch of [false,true]) {
        const experiment=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
        const touchPage=await experiment.newPage();
        await touchPage.setContent('<meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}.stack{position:relative}.hero{position:sticky;top:0;height:100svh;background:#171b17}.menu{position:relative;min-height:3000px;background:#f6f1e8}</style><div class="stack"><div class="hero"></div><div class="menu"></div></div>');
        const source=fs.readFileSync(require.resolve("lenis"),"utf8").replace("export { Lenis as default };","window.TouchLenis = Lenis;");
        await touchPage.addScriptTag({content:source});
        await touchPage.evaluate(value=>{window.experiment=new window.TouchLenis({autoRaf:true,syncTouch:value});},syncTouch);
        const session=await experiment.newCDPSession(touchPage);
        await swipe(session,touchPage);
        await touchPage.waitForTimeout(900);
        const displacement=await touchPage.evaluate(()=>scrollY);
        assert.ok(displacement>100&&displacement<1600,`syncTouch=${syncTouch} gesture remains responsive`);
        console.log(`Touch A/B syncTouch=${syncTouch}: ${displacement}px (emulation only; retain native touch pending physical iOS validation)`);
        await experiment.close();
      }
    }
    const context=await browser.newContext({reducedMotion:"reduce"});const page=await context.newPage();await page.goto(url);
    await page.mouse.wheel(0,350);await page.waitForTimeout(100);
    assert.equal(await page.locator(".hero-scroll").evaluate(e=>getComputedStyle(e).position),"relative");
    assert.ok((await geometry(page)).hero<0,"reduced motion has ordinary document flow");await context.close();
  }finally{await browser.close();}
}
fs.mkdirSync("qa-artifacts",{recursive:true});
(async()=>{for(const name of (process.env.BLINI_SCROLL_ENGINES||"chromium,firefox,webkit").split(","))await check({chromium,firefox,webkit}[name],name);})().catch(e=>{console.error(e);process.exit(1);});
