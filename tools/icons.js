/* =====================================================================
   Silk Road — the icon sheet, and the only editable source for it.

   The 26 sprites in the game live inside index.html as one base64 blob.
   This is where they are actually drawn: 26 grids of 16x16 characters,
   one shared legend, exported at an exact 4x to art/icons.webp.

   To change an icon, edit its grid below and re-run. To add one, add the
   grid, append its key to ORDER, and paste the new data URI over
   ICONS_URI in index.html (the script prints where it wrote the file).

   Running it:
     npm i playwright-core          # or full playwright
     CHROME=/path/to/chrome node tools/icons.js
   CHROME defaults to the Chromium that ships with Claude Code's sandbox.
   ===================================================================== */

const PAL = {
  ".":null,
  x:"#1B2436", s:"#55637E", S:"#8C9AB4",
  c:"#E4CFAE", w:"#F6EEDD", d:"#A8946F",
  g:"#D9A441", G:"#F0C265", k:"#7C6027",
  m:"#C4544A", M:"#E2857A", n:"#7A2E29",
  t:"#35A79C", T:"#6FD8CC", u:"#1E6E67",
  l:"#6B87DE", L:"#A2B6F2", p:"#384E96",
  b:"#8A6234", B:"#B98A52", e:"#4A3320",
  a:"#C9A470", o:"#E08A3C", v:"#6F9E4A"
};

const I = {};

/* ---------------------------------------------------------- goods --- */
I.silk = [
"................",
"....cccccccc....",
"...cccccccccd...",
"..cccnnnncccdd..",
"..ccnmmmmnccdd..",
"..cnmnnnnmncdd..",
"..cnmn..nmncdd..",
"..gggggggggggg..",
"..GGGGGGGGGGGG..",
"..cnmn..nmncdd..",
"..cnmnnnnmncdd..",
"..ccnmmmmnccdd..",
"..cccnnnncccdd..",
"...cccccccccd...",
"....cccccccc....",
"................"];

I.jade = [
"................",
".....uuuuuu.....",
"...uuTTTTTTuu...",
"..uTTtttttTTu...",
"..uTtttttttTu...",
".uTttttuuttttu..",
".uTtttu..uttdu..",
".uTttu....uttu..",
".uTttu....uttu..",
".uTtttu..uttdu..",
".uTttttuuttttu..",
"..uTttttttttu...",
"..uTtttttttTu...",
"...uutttttuu....",
".....uuuuuu.....",
"................"];

I.lapis = [
"................",
"................",
".......pp.......",
"......pllp......",
".....pllLlp.....",
"....pllLLllp....",
"...pllLgLlllp...",
"..pllLLLLllllp..",
"..plLLLLlglllp..",
"..pllLLllllllp..",
"..pplllglllllp..",
"...ppllllllpp...",
"....pppllppp....",
"......pppp......",
"................",
"................"];

I.spices = [
"................",
"................",
"........n.......",
".......nnn......",
"......nnmnn.....",
".....nnmMmnn....",
"....nnmMMMmnn...",
"...aaaaaaaaaa...",
"..aBBBBBBBBBBa..",
"..aBaaaaaaaaBa..",
"..aBaaaaaaaaBa..",
"..aBaaaaaaaaBa..",
"..aBaaaaaaaaBa..",
"...aaaaaaaaaa...",
"....dddddddd....",
"................"];

I.incense = [
"................",
".....c..........",
"....c...........",
".....c..........",
"......c.........",
".....c..........",
"......c.........",
"................",
"...gGgGgGgG.....",
"..dddddddddd....",
"..cwwwwwwwwc....",
"...cwwwwwwc.....",
"....dddddd......",
"......ss........",
".....ssss.......",
"................"];

I.paper = [
"................",
"................",
"...cccccccccc...",
"..cwwwwwwwwwwd..",
"..cwddddddwwwd..",
"..cwwwwwwwwwwd..",
"..cwddddddddwd..",
"..cwwwwwwwwwwd..",
"..cwddddddwwwd..",
"..cwwwwwwwwwwd..",
"..dddddddddddd..",
"..kggggggggggk..",
".kGGGGGGGGGGGGk.",
".kgggggggggggggk",
"..kkkkkkkkkkkk..",
"................"];

I.glass = [
"................",
".......uu.......",
".......tt.......",
".......tt.......",
"......uttu......",
"......uttu......",
".....uttttu.....",
"....uTttttuu....",
"...uTTttttttu...",
"..uTTtttttttu...",
"..uTtttttttttu..",
"..uttttttttttu..",
"..uuttttttttuu..",
"...uuttttttuu...",
".....uuuuuu.....",
"................"];

I.tea = [
"................",
"................",
"...BBBBBBBBB....",
"..BbbbbbbbbbB...",
".Bbbbbbbbbbbbe..",
".bbbeeeeeebbbe..",
".bbbeBBBBebbbe..",
".bbbeBbbBebbbe..",
".bbbeBBBBebbbe..",
".bbbeeeeeebbbe..",
".bbbbbbbbbbbbe..",
".ebbbbbbbbbbee..",
"..eeeeeeeeeee...",
"...eeeeeeeee....",
"................",
"................"];

I.porcelain = [
"................",
"......wwww......",
".....wwwwww.....",
"......ssss......",
".....wwwwww.....",
"....wwwwwwww....",
"...wwllwwllww...",
"...wlLwwwwLlw...",
"...wwlwwwwlww...",
"...wwwllllwww...",
"....wwwwwwww....",
"....wwwwwwww....",
".....wwwwww.....",
"......ssss......",
".....ssssss.....",
"................"];

I.horses = [
"................",
"................",
"..........bbb...",
".........bbbbb..",
"........bbbcb...",
".......bbbbb....",
"....bbbbbbb.....",
"...bBBBBBBBb....",
"..bBBBBBBBBBb...",
"..bBBBBBBBBBb...",
"..bBBBBBBBBBb...",
"..b.b....b.b....",
"..b.b....b.b....",
"..b.b....b.b....",
"..e.e....e.e....",
"................"];

I.furs = [
"................",
".......ee.......",
"......ebbe......",
"......ebbe......",
"...e..ebbe..e...",
"..ebeebbbbeebe..",
"..ebbbbbbbbbbe..",
"..ebBbbbbbBbbe..",
"..ebbbbbbbbbbe..",
"..ebbbbbbbbbbe..",
"..ebeebbbbeebe..",
"...e..ebbbe..e..",
"......ebbbe.....",
".......ebbe.....",
"........ee......",
"................"];

I.alum = [
"................",
"................",
"......ww........",
".....wLww.......",
"....wwLLww..ww..",
"...wwLLLLw.wLww.",
"..wwLLLLLwwLLLw.",
"..wLLLLLLLwLLLw.",
"..wLLLLLLLwwLLw.",
"...wLLLLLLLwLLw.",
"....wLLLLLLwww..",
".ssswwLLLLwwsss.",
".sSSSsswwsssSSs.",
"..sSSSSSSSSSSs..",
"...ssssssssss...",
"................"];

I.wine = [
"................",
"......nnnn......",
".....nmmmmn.....",
"......mmmm......",
".....bmmmmb.....",
"....bBbbbbBb....",
"...bBbbbbbbBb...",
"...bBbbbbbbBb...",
"..bBbccccccbBb..",
"..bBbcccccccBb..",
"...bbbbbbbbbb...",
"...bBbbbbbbBb...",
"....bbbbbbbb....",
".....bbbbbb.....",
"......bbbb......",
".......bb......."];

I.cloth = [
"................",
"................",
"..cccccccccccc..",
"..mmmmmmmmmmmm..",
"..mMmmmmmmmmnm..",
"..mmmmmmmmmmnm..",
"..cccccccccccc..",
"..mmmmmmmmmmmm..",
"..mMmmmmmmmmnm..",
"..mmmmmmmmmmnm..",
"..cccccccccccc..",
"..mmmmmmmmmmmm..",
"..mMmmmmmmmmnm..",
"..mmmmmmmmmmnm..",
"..cccccccccccc..",
"................"];

I.dates = [
"................",
".......v........",
"......vv........",
".....vvv........",
"....v..v.v......",
"...vv..vvv......",
"..bBb..bBb......",
".bBnbb.bBnb.....",
".bnnnb.bnnnb....",
".bnnnb.bnnnb....",
"..bnb...bnb.....",
"...bBb.bBb......",
"..bBnbbBnb......",
"..bnnnbnnnb.....",
"...bnb.bnb......",
"................"];

I.saffron = [
"................",
"................",
"................",
"........o.......",
".....o.oo.......",
"......ooo.o.....",
".....o.oo.o.....",
"....oo.o.oo.....",
"...o.ooooo.o....",
"..cccccccccccc..",
".cwwwwwwwwwwwwc.",
".cwddddddddddwc.",
"..cwwwwwwwwwwc..",
"...cccccccccc...",
"................",
"................"];

/* ---------------------------------------------------------- fleet --- */
I.camel = [
"................",
"................",
".....aa...aa....",
"....aBBa.aBBa...",
"...aBBBBaBBBBa..",
"...aBBgGgGgBBa..",
"..aaBBBBBBBBBa..",
".aaaaBBBBBBBBa..",
"aeaaaaBBBBBBBa..",
"axaaaaaaaaaaa...",
".aa..aa..aa.aa..",
".aa..aa..aa.aa..",
".aa..aa..aa.aa..",
".aa..aa..aa.aa..",
".ee..ee..ee.ee..",
"................"];

I.mule = [
"................",
"................",
".....cccccc.....",
"....cwwwwwwc....",
"....cccccccc....",
"..bbbbbbbbbbbb..",
"..bBBBBBBBBBBb..",
"..bbbbbbbbbbbb..",
"b.....eeee......",
".b..eebbbbee....",
"...ebb....bbe...",
"..ebb..gg..bbe..",
"..ebb..gg..bbe..",
"...ebb....bbe...",
"....eebbbbee....",
"......eeee......"];

I.boat = [
"................",
"........c.......",
"........cc......",
".......cwcc.....",
"......ccwwcc....",
".....cccwwwcc...",
"....ccccwwwwc...",
"...cccccwwwwwc..",
"..cccccccwwwwc..",
"........c.......",
".bbbbbbbbbbbbb..",
"..bBBBBBBBBBBb..",
"...bbbbbbbbbb...",
"..llLllLllLll...",
"..lllllllllll...",
"................"];

/* ------------------------------------------------------ properties -- */
I.serai = [
"................",
".......gG.......",
".......aa.......",
"..aaaaaaaaaaaa..",
"..aBaBaBaBaBaBa.",
"..aaaaaaaaaaaa..",
"..aBBBBBBBBBBa..",
"..aBBBxxxxBBBa..",
"..aBBxxxxxxBBa..",
"..aBBxxxxxxBBa..",
"..aBBxxxxxxBBa..",
"..aBBxxxxxxBBa..",
"..aBBxxxxxxBBa..",
"..aaaxxxxxxaaa..",
"..eeexxxxxxeee..",
"................"];

I.stall = [
"................",
"................",
"...cccccccccc...",
"..cmcmcmcmcmcm..",
".cmcmcmcmcmcmc..",
"cccccccccccccc..",
"..b........b....",
"..b........b....",
"..b.mm.tt..b....",
"..b.mm.tt..b....",
"..bbbbbbbbbb....",
"..bBBBBBBBBb....",
"..b........b....",
"..b........b....",
"..e........e....",
"................"];

I.godown = [
"................",
"................",
".ssssssssssssss.",
".sSSSSSSSSSSSSs.",
".sSssssssssssSs.",
".sSSSSSSSSSSSSs.",
".sSSSSSSSSSSSSs.",
".sSSbbbbbbbbSSs.",
".sSSbBbbbbBbSSs.",
".sSSbBbbbbBbSSs.",
".sSSbBbgGbBbSSs.",
".sSSbBbggbBbSSs.",
".sSSbBbbbbBbSSs.",
".sSSbbbbbbbbSSs.",
".ssssssssssssss.",
"................"];

I.dye = [
"................",
"................",
"........T.......",
".......T.T......",
"........T.......",
"..ss...ss...ss..",
".sMMs.sllS.sGGs.",
".smms.sllp.sggs.",
".smms.sllp.sggs.",
".smms.sllp.sggs.",
".smms.sllp.sggs.",
".sSSs.sSSs.sSSs.",
"..ss...ss...ss..",
"..bbbbbbbbbbbb..",
"..eeeeeeeeeeee..",
"................"];

I.counting = [
"................",
"................",
"...gg....gg.....",
"..gwwwggwwwg....",
"..gwddwwdddwg...",
".gwwwwggwwwwwg..",
".gwddwggwdddwg..",
".gwwwwggwwwwwg..",
".gwddwggwdddwg..",
".ggwwwggwwwwgg..",
"..kkkkkkkkkkk...",
"....b....b......",
"...bbbbbbbb.....",
"..b.g.g.g.g.b...",
"..bbbbbbbbbbb...",
"................"];

I.depot = [
"................",
"................",
"....bbbbbbbb....",
"...bBBBBBBBBb...",
"...bBgGGGGgBb...",
"...bBBBBBBBBb...",
"...bbbbbbbbbb...",
"..bbbbbbbbbbbb..",
".bBBBBccBBBBBBb.",
".bBBBBccBBBBBBb.",
".bbbbbccbbbbbbb.",
".bBBBBccBBBBBBb.",
".bBBBBccBBBBBBb.",
".bbbbbbbbbbbbbb.",
"..eeeeeeeeeeee..",
"................"];

I.factory = [
"................",
"................",
".......ss.......",
"......sSSs......",
"......sSSs......",
".....gggggg.....",
"......sSSs......",
"......sSSs......",
"......sSSs......",
"..ssssssssssss..",
"..sSSSSSSSSSSs..",
"..ssssssssssss..",
".llLllllLllLll..",
".llllllllllllll.",
".pppppppppppppp.",
"................"];

/* ---------------------------------------------------------- render -- */
const ORDER = ["silk","jade","lapis","spices","incense","paper","glass","tea",
               "porcelain","horses","furs","alum","wine","cloth","dates","saffron",
               "camel","mule","boat",
               "serai","stall","godown","dye","counting","depot","factory"];

const COLS = 8, CELL = 16, SCALE = 4;
const ROWS = Math.ceil(ORDER.length / COLS);

// sanity: every grid is 16 rows of 16 known chars
let bad = 0;
ORDER.forEach(k => {
  const g = I[k];
  if(!g){ console.log("MISSING " + k); bad++; return; }
  if(g.length !== 16){ console.log(k + ": " + g.length + " rows"); bad++; }
  g.forEach((row,y) => {
    if(row.length !== 16){ console.log(k + " row " + y + ": " + row.length + " cols"); bad++; }
    for(const ch of row) if(!(ch in PAL)){ console.log(k + " row " + y + ": unknown '" + ch + "'"); bad++; }
  });
});
if(bad){ console.log("ABORT: " + bad + " grid problems"); process.exit(1); }
console.log("grids ok:", ORDER.length, "icons,", COLS + "x" + ROWS, "cells");

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch (e) { ({ chromium } = require('playwright')); }
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args:['--no-sandbox'] });
  const p = await b.newPage();
  await p.goto('about:blank');
  const out = await p.evaluate(([I, PAL, ORDER, COLS, ROWS, CELL, SCALE]) => {
    const W = COLS*CELL*SCALE, H = ROWS*CELL*SCALE;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const g = c.getContext('2d');
    ORDER.forEach((key, i) => {
      const ox = (i % COLS) * CELL * SCALE, oy = Math.floor(i / COLS) * CELL * SCALE;
      I[key].forEach((row, y) => {
        for(let x = 0; x < CELL; x++){
          const col = PAL[row[x]];
          if(!col) continue;
          g.fillStyle = col;
          g.fillRect(ox + x*SCALE, oy + y*SCALE, SCALE, SCALE);
        }
      });
    });
    return { png: c.toDataURL('image/png'), webp: c.toDataURL('image/webp', 0.95), W, H };
  }, [I, PAL, ORDER, COLS, ROWS, CELL, SCALE]);
  fs.writeFileSync(path.join(ROOT, 'art/icons.png'), Buffer.from(out.png.split(',')[1], 'base64'));
  fs.writeFileSync(path.join(ROOT, 'art/icons.webp'), Buffer.from(out.webp.split(',')[1], 'base64'));
  fs.writeFileSync(path.join(ROOT, 'art/icons.json'),
    JSON.stringify({ uri: out.webp, order: ORDER, cols: COLS, rows: ROWS, cell: CELL*SCALE }));
  console.log('sheet', out.W + 'x' + out.H, '->', path.join(ROOT, 'art/icons.webp'));
  console.log('data URI', Math.round(out.webp.length/1024) + 'KB — paste over ICONS_URI in index.html');
  await b.close();
})();
