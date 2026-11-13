# Silk Road — itch.io page kit

Everything needed to put the game on itch.io, and the things that are a
decision rather than a task. Copy to `docs/itch/ITCH.md` and fill the blanks.
Every count in the copy is read out of the build, not from memory.

## Files

| File | What it is | Built by |
|---|---|---|
| `release/silk-road-web.zip` | The game, played on the page (index.html at the zip root, no manifest, no service worker) | `node tools/itch.js`, copied to `release/` |
| `release/silk-road.html` | The desktop download: one file, plays offline (not Safari) | `node tools/itch.js` (`dist/Silk-Road.html`) |
| `release/silk-road-itch-kit.zip` | All of the above, the page text and images, and START-HERE.txt | `node tools/make-itch-kit.mjs` |

## Upload settings

| Field | Value |
|---|---|
| Kind of project | HTML |
| Upload 1 (played on the page) | `silk-road-web.zip`, tick "This file will be played in the browser" |
| Embed | **390 x 844** (measured with `node tools/embed-measure.mjs`; table below) |
| Mobile friendly | On, orientation portrait |
| Fullscreen button | On |
| Automatically start on page load | Off (a title screen is the start) |
| Classification | Games |
| Release status | Released |
| Pricing | No payments |
| Genre | Simulation |
| Tags | trading, economy, management, historical, medieval, turn-based, strategy, pixel-art, life-simulation, dynasty (economy, management and trading are the tags already sending this page visits; life-simulation sends the account the most; dynasty and pixel-art for the household of faces) |
| Cover | `cover-630x500.png` (check `cover-preview-315x250.png`: that is how browse listings show it) |
| Screenshots | `shot1-the-household.png` first (the faces), then the roads, hiring, the bazaar, a rival |
| Links | The installable copy: https://heirsofruin.github.io/SilkRoad/ |
| Community | Comments on, so players can post save codes with bug reports |

Embed measurement (`node tools/embed-measure.mjs`):

```
embed      game width  chrome  content  overflow  wasted
360 x 640         360     234      406         0       0
390 x 844         390     234      610         0       0
480 x 820         480     234      586         0       0
600 x 800         600     234      566         0       0
800 x 820         800     234      586         0       0
960 x 760         960     234      526         0       0
```

## AI disclosure

itch asks whether the project uses generative AI, and for which parts. Say
plainly what was generated and what was yours. Tick the boxes that apply (Text,
Graphics, Code, Sound). Suggested wording, to adjust to your own:

> Made with AI assistance. I designed the game, its systems and its world, and
> directed, edited and play-tested it; the code, the text and the drawn art were
> generated with an AI model to that design.

## Short description (the one-line field, under ~120 characters)

> Build a merchant house on the Silk Road, 1247. Send caravans far, marry well, outlast three rival houses.

## Known constraints (say them on the page)

- Saves live in this browser. If a browser blocks site data in embedded frames,
  open the game fullscreen or use the save code (Menu).
- Saves on itch and in the installed copy are separate; the save code moves a game.
- Three difficulties (kind, road, hard), changeable from the menu at any time. Start on the road.
- The page asks Google Fonts for its typefaces; offline it falls back to system fonts.

## Before going public

- [ ] `npm run check` green on the commit being released
- [ ] `node tools/pre-public.mjs --zip=release/silk-road-web.zip` clean (the zip in an itch-style frame, storage blocked and allowed; copy checks)
- [ ] `node tools/update-check.mjs` clean (a new deploy reaches someone who already has the app)
- [ ] Every number in the description confirmed against the build (pre-public lists them)
- [ ] Tutorial and help re-read against the build
- [ ] Cover checked at 315 x 250; shots looked at on the press sheet
- [ ] Played the uploaded draft yourself, in a private window and on a phone: start, a few turns, copy a save code, reload, load it
- [ ] Then Public

## After publishing

Watch the comments the first week; ask for a save code with every bug report.
Each fix: rebuild, `build-itch.mjs`, upload over the old file (the page stays);
a devlog for anything players would notice (`devlog.md`).
