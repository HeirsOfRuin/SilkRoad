# Putting Silk Road on an Android phone

Three routes, cheapest first. The first one is already built and needs nothing
from you but a setting; the other two are here for when you want a real
installable file.

---

## 1. Install it as a web app (done — you just need to flip one switch)

The game already ships everything a phone needs to install it: a web manifest,
icons, and a service worker that caches the whole game so it runs with no
signal. All it needs is to be served over HTTPS.

**One-time setup on GitHub:**

1. Repository → **Settings** → **Pages**
2. Under *Build and deployment*, set **Source: GitHub Actions**
3. Push (or re-run the *Publish to GitHub Pages* workflow by hand)

The workflow in `.github/workflows/pages.yml` publishes the repo root, so the
game lands at:

```
https://heirsofruin.github.io/SilkRoad/
```

**On the phone:**

1. Open that URL in Chrome
2. Menu (⋮) → **Add to Home screen** / **Install app**
3. It gets a home-screen icon, opens full-screen with no address bar, and works
   in airplane mode

Samsung Internet works the same way (menu → *Add page to* → *Home screen*).

**Updating it:** push to the branch. The service worker fetches the new copy in
the background and it lands the next time the app is opened. If you change
`index.html` substantially, bump `CACHE` in `sw.js` (e.g. `silk-road-v5`)
so old copies are evicted rather than merged.

**What you get and don't get:** a real app icon, full screen, offline play, and
its own storage — saves survive. No Play Store listing, no signing, no cost. It
cannot be shared as a file; other people install it from the URL.

---

## 2. A signed APK you can sideload (about half a day, mostly toolchain)

[Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) wraps the published
web app in a Trusted Web Activity — a thin Android shell around the same page —
and produces an installable `.apk`.

**You need:** JDK 17, the Android SDK command-line tools, and Node 18+.

```bash
npm install -g @bubblewrap/cli

# Point it at the live manifest. It reads name, icons and colours from there.
bubblewrap init --manifest https://heirsofruin.github.io/SilkRoad/manifest.webmanifest

# Answer the prompts. The important ones:
#   Application ID:  com.heirsofruin.silkroad     (must be unique and permanent)
#   Signing key:     let it generate one, then BACK UP the .keystore and password —
#                    lose them and you can never update the app on a device again.

bubblewrap build
# produces app-release-signed.apk
```

**Getting it onto the phone:**

- With a cable: `adb install app-release-signed.apk`
- Without: copy the APK to the phone (Drive, email, USB), tap it, and allow
  *Install unknown apps* for whichever app you opened it from. Samsung will warn
  you twice; that is expected for an app that did not come from a store.

**One detail worth doing:** a TWA shows a browser address bar for a second on
launch unless the site proves it owns the app. To remove it, take the SHA-256
fingerprint Bubblewrap prints and publish it at
`/.well-known/assetlinks.json` in this repo:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.heirsofruin.silkroad",
    "sha256_cert_fingerprints": ["<the fingerprint bubblewrap printed>"]
  }
}]
```

**Caveat:** a TWA is still Chrome under the hood, so the phone must have Chrome
installed (every Samsung does). The app itself is a few hundred KB — the game
loads from the cached web app.

---

## 3. The Play Store (only if other people should install it)

Everything in step 2, plus:

- A Google Play developer account — **$25, one-off, forever**
- An `.aab` instead of an `.apk`: `bubblewrap build --release`
- A store listing: title, short and full description, a feature graphic
  (1024×500), and at least two phone screenshots
- The `assetlinks.json` above is **required**, not optional
- A privacy policy URL — the game collects nothing, but the form still wants one
- Review, usually a few days for a first submission

Not worth it for a personal game. Worth it if you want people to find it.

---

## What you do *not* need

Capacitor, Cordova, React Native, or any rewrite. The game is a single
self-contained HTML file with no server, no API and no build step — it is
already the app. Every route above is a wrapper around exactly the same file.
