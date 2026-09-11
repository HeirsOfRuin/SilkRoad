/* =====================================================================
   Silk Road — the scene-banner pipeline.

   The wide 2:1 banners at the top of each tab (and, for terrain keys, the
   planner) live inside index.html as base64 WebP. This turns a source
   image into one: crops it to a 2:1 band, downscales to 864x432, and
   encodes WebP stepping the quality down until it lands in the size
   range the existing banners occupy.

   Usage:
     node tools/scenes.js <key>=<path>[:<centre>] [...]

   <centre> is the vertical centre of the band to keep, 0..1, default 0.5.
   It only matters when the source is taller than 2:1 — an image already
   at 2:1 is used whole. The banner is displayed at 2.6:1 cropped from the
   middle, so the top and bottom ~12% of what you keep will not be seen.

   Writes art/<key>.webp and art/scenes.json, and prints the data URI to
   paste into the ART object in index.html.

     npm i playwright-core
     CHROME=/path/to/chrome node tools/scenes.js land_sea=~/sea.png
   ===================================================================== */

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch (e) { ({ chromium } = require('playwright')); }
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const W = 864, H = 432;                 // what every banner in the game is
const MAX = Number(process.env.MAX_KB || 70) * 1024;

const args = process.argv.slice(2);
if (!args.length) {
  console.error('usage: node tools/scenes.js <key>=<path>[:<centre>] [...]');
  process.exit(1);
}
const jobs = args.map(a => {
  const eq = a.indexOf('=');
  if (eq < 0) { console.error('bad argument (want key=path): ' + a); process.exit(1); }
  const key = a.slice(0, eq);
  let file = a.slice(eq + 1), centre = 0.5;
  const colon = file.lastIndexOf(':');
  if (colon > 1 && /^[0-9.]+$/.test(file.slice(colon + 1))) {
    centre = parseFloat(file.slice(colon + 1));
    file = file.slice(0, colon);
  }
  file = file.replace(/^~/, process.env.HOME || '~');
  if (!fs.existsSync(file)) { console.error('no such file: ' + file); process.exit(1); }
  return { key, file, centre };
});

(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.goto('about:blank');

  const outFile = path.join(ROOT, 'art/scenes.json');
  const out = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};

  for (const job of jobs) {
    const b64 = fs.readFileSync(job.file).toString('base64');
    const ext = path.extname(job.file).slice(1).toLowerCase();
    const mime = ext === 'jpg' ? 'jpeg' : ext;
    const r = await p.evaluate(async ([b64, mime, centre, W, H, MAX]) => {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej;
        img.src = 'data:image/' + mime + ';base64,' + b64; });
      const scale = W / img.naturalWidth;
      const bandH = Math.min(img.naturalHeight, H / scale);
      let sy = img.naturalHeight * centre - bandH / 2;
      sy = Math.max(0, Math.min(img.naturalHeight - bandH, sy));
      const c = document.createElement('canvas');
      c.width = W; c.height = H;
      const g = c.getContext('2d');
      g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
      g.drawImage(img, 0, sy, img.naturalWidth, bandH, 0, 0, W, H);
      let q = 0.78, d = c.toDataURL('image/webp', q);
      const bytes = u => Math.floor(u.split(',')[1].length * 3 / 4);
      while (bytes(d) > MAX && q > 0.45) { q -= 0.06; d = c.toDataURL('image/webp', q); }
      return { d, q, nat: img.naturalWidth + 'x' + img.naturalHeight,
               cropped: bandH < img.naturalHeight - 1 };
    }, [b64, mime, job.centre, W, H, MAX]);

    const bytes = Buffer.from(r.d.split(',')[1], 'base64');
    fs.writeFileSync(path.join(ROOT, 'art/' + job.key + '.webp'), bytes);
    out[job.key] = r.d;
    console.log(job.key.padEnd(14), r.nat, '->', W + 'x' + H,
      r.cropped ? '(band @' + job.centre + ')' : '(whole, already 2:1)',
      'q=' + r.q.toFixed(2), Math.round(bytes.length / 1024) + 'KB');
  }

  fs.writeFileSync(outFile, JSON.stringify(out));
  console.log('\nwrote art/*.webp and art/scenes.json —',
    Object.keys(out).length, 'scene(s) on file');
  console.log('paste each data URI into the ART object in index.html');
  await b.close();
})();
