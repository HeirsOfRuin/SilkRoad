/* =====================================================================
   Silk Road — regenerate the itch.io store screenshots.

   Drives the real game to a mid-campaign state and captures the screens
   worth showing. Seeds capacity along with the cargo, so the godown is
   never over its limit in a shot — that reads as a bug to anyone
   browsing. Clears S.seen so no first-visit hint strips appear.

     npm i playwright-core
     CHROME=/path/to/chrome node tools/store.js
   ===================================================================== */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch (e) { ({ chromium } = require('playwright')); }
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const OUT = path.join(ROOT, 'dist/store');
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args:['--no-sandbox'] });
  const p = await b.newPage({ viewport:{width:620,height:900}, deviceScaleFactor:2 });
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://' + path.join(ROOT, 'index.html'));
  await p.waitForTimeout(2200);
  const shot = n => p.screenshot({ path: OUT + '/' + n + '.png' });

  await p.click('[data-a="t-new"]'); await p.waitForTimeout(400);
  await p.click('[data-a="pface"][data-v="f2"]'); await p.waitForTimeout(250);
  await p.click('[data-a="begin"]'); await p.waitForTimeout(500);
  let c = await p.$('[data-a="close"]'); if(c) await c.click();
  await p.waitForTimeout(300);

  // a house a few seasons in: real roads, real stock, room to hold it
  await p.evaluate(() => {
    S.turn = 9; S.ducats = 2400; S.repute = 26; S.stores = 120;
    S.props.serai = 2; S.props.godown = 2; S.props.stall = 1;     // capacity for the cargo
    ["merv","balkh","urgench","herat","kashgar"].forEach(r => S.routes[r] = {open:true, runs:2, sat:0.08});
    S.goods.silk = 6; S.goods.paper = 9; S.goods.glass = 4; S.goods.spices = 5; S.goods.jade = 2;
    for(let i=0;i<10;i++) GOOD_IDS.forEach(g => S.hist[g].push(Math.round(buyPrice(g) * (0.88 + Math.random()*0.3))));
    S.seen = {bazaar:1, roads:1, estate:1, house:1, ledger:1};     // no first-visit hint strips
    S.tab = "bazaar"; render();
  });
  await p.waitForTimeout(400);
  // the goods list with the icons is what sells this screen
  await p.evaluate(() => {
    const h = [...document.querySelectorAll('.sec > h2')].find(e => /THE BAZAAR/i.test(e.textContent));
    if (h) h.scrollIntoView({block:'start'});
    window.scrollBy(0, -70);
  });
  await p.waitForTimeout(350); await shot('03-bazaar');

  await p.evaluate(() => { window.scrollTo(0,0); S.tab = "roads"; S.plan = null; render(); });
  await p.waitForTimeout(400); await shot('04-roads');

  await p.evaluate(() => { planInit("kashgar"); S.plan.cargo.silk = 4; S.goods.silk -= 4;
                           S.tab = "roads"; render(); });
  await p.waitForTimeout(400); await shot('05-planner');

  await p.evaluate(() => { S.plan = null; S.tab = "estate"; render(); window.scrollTo(0,0); });
  await p.waitForTimeout(400); await shot('06-estate');

  console.log('errors:', errs.length?errs.join(' | '):'none');
  await p.close(); await b.close();
})();
