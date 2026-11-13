// tools/press.config.mjs: what tools/press.mjs photographs. Each shot drives the
// REAL build to a house a few years in: a son married, staff hired, two caravans
// on the road, the rival houses ahead of you. Everything is set through the
// game's own functions (marry, hireStaff, dispatch), so every face, name and
// figure on screen is the game's. First-visit hints are marked seen.

async function house(page) {
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.click('[data-a="t-new"]');
  await page.click('[data-a="pface"][data-v="m1"]');
  // the name box wins over build.name in beginGame, so set both: one house name in every shot
  await page.evaluate(() => { build.name = 'Yusuf ibn Davud'; build.origins = ['kin']; const n = document.getElementById('pname'); if (n) n.value = build.name; });
  await page.click('[data-a="begin"]');
  await page.evaluate(() => {
    closeSheet();
    window.toast = () => {};
    Object.keys(HINTS).forEach((k) => { S.seen[k] = true; });
    S.turn = 14; S.ducats = 6000; S.repute = 48; S.stores = 160;
    S.props.serai = 2; S.props.godown = 2; S.props.stall = 1;
    ['merv', 'balkh', 'urgench', 'herat', 'kashgar'].forEach((r) => { if (route(r)) S.routes[r] = { open: true, runs: 2, sat: 0.08 }; });
    S.house.forEach((m) => { if (!m.you) m.age = Math.max(m.age, 19); });
    const free = () => S.house.forEach((m) => { m.busy = 0; });
    for (const t of ['guards', 'master', 'dragoman', 'innkeeper']) { free(); hireStaff(t); }
    free(); const son = marriageable()[0], h = HOUSES.find(canMarry); if (son && h) marry(h.id, son.id);
    addUnit('camel', 1); addUnit('camel', 1); addUnit('camel', 0); addUnit('mule', 0);
    // two caravans out: a son east, the caravan master west
    const send = (rid, who) => {
      free(); planInit(rid);
      S.fleet.forEach((u) => { if (!u.busy && lineOk(u.line, route(rid).terrain)) { const k = u.line + ':' + u.tier; S.plan.units[k] = (S.plan.units[k] || 0) + 1; } });
      GOOD_IDS.forEach((g) => { S.goods[g] = Math.max(S.goods[g], 8); });
      S.plan.leader = who; autoFill(); dispatch();
    };
    // the first two roads that are open and unblocked (Kashgar wants a guide, and sent nothing)
    const roads = ROUTES.filter((r) => routeOpen(r.id) && !routeBlocked(r)).map((r) => r.id);
    const sonB = S.house.find((m) => !m.you && !m.spouseOf && !m.wed);
    send(roads[0], (sonB || S.house[1]).id);
    const master = S.staff.find((s) => s.type === 'master');
    send(roads[1], master ? master.id : S.house[2].id);
    S.goods.silk = 6; S.goods.paper = 9; S.goods.glass = 4; S.goods.spices = 5;
    S.rivals.forEach((r, i) => { r.wealth = netWorth() + 900 - i * 700; r.heat = i === 0 ? 0.7 : 0.2; });
    S.digest = null; S.digestPending = false;
    free(); after();
  });
  await page.waitForTimeout(250);
}

export default {
  site: 'dist/site',
  size: [390, 844],              // measured: node tools/embed-measure.mjs
  cover: 'docs/itch/cover.html', // written by node tools/cover.mjs
  hide: ['.toast', '.hint', '.hint-strip'],
  shots: [
    {
      name: 'the-household',
      async drive({ page }) { await house(page); await page.evaluate(() => { go('house'); }); },
    },
    {
      name: 'the-roads',
      async drive({ page }) { await house(page); await page.evaluate(() => { go('roads'); }); },
    },
    {
      name: 'hiring',
      async drive({ page }) { await house(page); await page.evaluate(() => { go('estate'); openSheet(() => sheetHire()); }); await page.waitForTimeout(700); },
    },
    {
      name: 'the-bazaar',
      async drive({ page }) { await house(page); await page.evaluate(() => { go('bazaar'); }); },
    },
    {
      name: 'a-rival',
      async drive({ page }) { await house(page); await page.evaluate(() => { go('roads'); openSheet(() => sheetRival(S.rivals[0].id)); }); await page.waitForTimeout(700); },
    },
  ],
};
