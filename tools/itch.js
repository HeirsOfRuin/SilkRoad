/* =====================================================================
   Silk Road — build the itch.io upload.

   itch serves an HTML game from a zip, inside a sandboxed iframe on its
   own subdomain. Three things in index.html only make sense on our own
   Pages deploy and are stripped here:

     manifest.webmanifest   a PWA cannot be installed from inside an iframe
     apple-touch-icon       same
     the service worker     it would cache the shell on itch's origin and
                            serve a stale build after the next upload

   Everything else is already self-contained — the art, the icons and the
   whole game are inlined — so the zip is one file.

     node tools/itch.js
   writes dist/silk-road-itch.zip
   ===================================================================== */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SRC  = path.join(ROOT, 'index.html');
const OUT  = path.join(ROOT, 'dist');
const STAGE = path.join(OUT, '.stage');

let html = fs.readFileSync(SRC, 'utf8');
const before = html.length;

const strip = [
  [/^<link rel="manifest"[^>]*>\n/m,         'manifest link'],
  [/^<link rel="apple-touch-icon"[^>]*>\n/m, 'apple-touch-icon link']
];
for (const [re, what] of strip) {
  if (!re.test(html)) { console.error('expected to find the ' + what + ' and did not — check index.html'); process.exit(1); }
  html = html.replace(re, '');
  console.log('stripped', what);
}

/* the registration block, left inert rather than deleted so the shape of
   index.html and of the upload stay comparable */
const swRe = /if\("serviceWorker" in navigator && location\.protocol\.indexOf\("http"\) === 0\)\{/;
if (!swRe.test(html)) { console.error('expected to find the service-worker guard and did not'); process.exit(1); }
html = html.replace(swRe, 'if(false){   /* itch build: no service worker on a shared origin */');
console.log('stripped service-worker registration');

fs.rmSync(STAGE, { recursive: true, force: true });
fs.mkdirSync(STAGE, { recursive: true });
fs.writeFileSync(path.join(STAGE, 'index.html'), html);

/* the same stripped file, loose, as the downloadable. Opened straight off
   disk it has no network dependency except the webfonts, which fall back,
   and localStorage still works — so a download plays offline and saves. */
const loose = path.join(OUT, 'Silk-Road.html');
fs.writeFileSync(loose, html);

const zip = path.join(OUT, 'silk-road-itch.zip');
fs.rmSync(zip, { force: true });
execFileSync('zip', ['-q', '-9', '-j', zip, path.join(STAGE, 'index.html')]);
fs.rmSync(STAGE, { recursive: true, force: true });

const kb = n => (n / 1024).toFixed(0) + 'KB';
console.log('\nindex.html ' + kb(before) + ' -> ' + kb(html.length) +
            '  zip ' + kb(fs.statSync(zip).size));
console.log('wrote ' + path.relative(ROOT, zip) + ' — index.html at the zip root, which is what itch requires');
console.log('wrote ' + path.relative(ROOT, loose) + ' — the downloadable, plays offline from disk');
