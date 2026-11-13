// Write docs/itch/cover.html, the 630x500 itch cover, with the game's own art
// inlined: tools/press.mjs renders the cover with setContent, so a file beside
// the page would not load. node tools/cover.mjs, then node tools/press.mjs.
//
// The oasis caravan behind the title, and a row of five faces from along the
// road (Persian, Chinese, steppe, Indian, Frankish), because the people are what
// the game now shows everywhere and a face reads at the 315x250 listing size
// where a sentence does not. Title and hook are sized for that preview.

import { readFile, writeFile } from 'node:fs/promises';

const uri = async (p) => `data:image/webp;base64,${(await readFile(p)).toString('base64')}`;
const CAST = ['m3', 'f6', 'm10', 'f3', 'm8'];
const bg = await uri('art/oasis.webp');
const faces = await Promise.all(CAST.map((id) => uri(`art/faces/${id}.webp`)));

const html = `<!doctype html>
<!-- docs/itch/cover.html: written by tools/cover.mjs from art/ (do not edit by hand;
     edit the tool). Rendered by tools/press.mjs at 2x, with a 315x250 preview. -->
<html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Alegreya+Sans:wght@700;800&display=swap">
<style>
  html, body { margin: 0; width: 630px; height: 500px; overflow: hidden; background: #0F1621; }
  .bg { position: absolute; inset: 0; background: url(${bg}) center 62% / cover; image-rendering: pixelated; }
  .shade { position: absolute; inset: 0;
    background: linear-gradient(180deg, #0F1621f0 0%, #0F1621b8 34%, #0F162133 55%, #0F1621e6 80%, #0F1621 100%); }
  .frame { position: absolute; inset: 12px; border: 1px solid #C9A45C66; }
  .title { position: absolute; top: 34px; width: 100%; text-align: center; font: 700 92px/1 Amiri, Georgia, serif;
    color: #E8C47A; letter-spacing: 1px; text-shadow: 0 3px 0 #000a, 0 0 28px #000c; }
  .hook { position: absolute; top: 146px; width: 100%; text-align: center; font: 800 27px/1.2 'Alegreya Sans', system-ui, sans-serif;
    color: #F6EFDD; text-shadow: 0 2px 6px #000; padding: 0 40px; box-sizing: border-box; }
  .cast { position: absolute; top: 318px; left: 0; right: 0; display: flex; justify-content: center; gap: 12px; }
  .cast img { width: 96px; height: 96px; border-radius: 12px; border: 2px solid #C9A45C; box-shadow: 0 6px 18px #000c;
    image-rendering: pixelated; background: #0F1621; }
  .foot { position: absolute; bottom: 26px; width: 100%; text-align: center; font: 800 15px 'Alegreya Sans', system-ui, sans-serif;
    letter-spacing: .22em; text-transform: uppercase; color: #E6D9B8; text-shadow: 0 1px 3px #000; }
</style></head><body>
  <div class="bg"></div><div class="shade"></div><div class="frame"></div>
  <div class="title">Silk Road</div>
  <div class="hook">Build a merchant house, 1247.<br>Trade from Trebizond to China.</div>
  <div class="cast">${faces.map((f) => `<img src="${f}" alt="">`).join('')}</div>
  <div class="foot">Turn-based trading · Phone or browser · Free</div>
</body></html>
`;
await writeFile('docs/itch/cover.html', html);
console.log(`docs/itch/cover.html: ${(html.length / 1024).toFixed(0)} KB, the oasis and ${CAST.length} faces inlined`);
