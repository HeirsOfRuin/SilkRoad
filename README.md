# The Samarkand Ledger

A turn-based Silk Road merchant game. Single HTML file, no build step, no server,
no API key. Open `index.html` — on a phone, a tablet or a desktop — and play.

Samarkand, spring 1247. You buy a ruined caravanserai on the Zarafshan road and
try to turn it into a house whose mark is honoured from Tabriz to the Jade Gate.

## Running it

Open `index.html` in any modern browser, or serve the folder
(`python3 -m http.server`) and hit it from a phone on the same network.
Progress saves to `localStorage` on the device, so it survives a reload
but does not travel between devices.

## The loop

1. **Work the cloth row** — a free tap-for-coin action, capped per turn. It is
   the early-game income floor and it scales with your bazaar property.
2. **Buy low in Samarkand** — ten trade goods with prices that drift each turn
   and react to your own buying.
3. **Send a caravan** — pick a road, a leader, beasts, cargo and an escort.
   The leader is locked out for the whole trip. Longer roads pay far more,
   first runs on a new road pay a decaying novelty bonus, and every trip rolls
   for trouble.
4. **Build and staff property** — an unstaffed property earns nothing. A staffed
   one earns every turn without spending a Hand. This is the compounding engine
   that carries the back half of the game.
5. **End the turn** — standing income, wages, fodder, the household eats, one
   event fires, and at most one beat of a long story arc advances.

6. **Buy standing** — the city page sells Repute for ducats and a Hand: feasts,
   alms, courting the citadel, teaching a son, an afternoon in the bathhouse
   where the road's news is actually traded.

Win: net worth 12,000 ducats, Repute 60, and at least one caravan home from
Turfan, Dunhuang or Chang'an. Lose: three consecutive turns in the red.

## Resources

| | |
|---|---|
| **Ducats** | Currency. Below zero for three turns and the creditors take the house. |
| **Stores** | Food and fodder. Empty means buying grain at panic prices and a Repute hit. |
| **Repute** | Gates roads, properties, offices and staff; adds up to +30% on every sale. |
| **Hands** | Actions per turn. You and your two sons give three. A standing role trades a Hand for income. |

## Two rules that shape the whole economy

- **Distance pays.** Every extra turn of road adds 16% to what a load fetches at
  the far end (`CONFIG.distancePay`), on top of the destination's own taste for
  the goods. Without it, the optimal play is a one-turn shuttle to Bukhara
  forever — which is the wrong game.
- **Markets saturate.** Each run on a road depresses its prices by 13%, up to
  40%, recovering 28% per turn while you are away. Working one road to death
  stops paying, so the pressure is always outward. Both figures are shown in the
  caravan planner before you commit.

## Design notes

Built from a written spec for a GM-run tabletop trading game. Two things in that
spec were problems worth engineering around, and both are handled:

- **Numeric drift.** There is one authoritative state object, `S`. Every number
  on every screen is derived from it, and ducats change through exactly one
  function (`coin()`), which writes the ledger row at the same time. The Ledger
  tab's running balance is the same figure as the header chip because it is
  literally the same field.
- **Duration ambiguity.** Trip length is a property of the road, shown in turns
  before you commit, and the planner shows expected revenue, expected profit and
  the chance of trouble before you press send. Nothing is inferred from phrasing.

The spec offered two ways to handle the narrative layer: a canned random table,
or an LLM in the loop. This build takes the first, with an addition — alongside
the ~20 weighted one-shot events there are five **long threads** (a rival house,
the governor's favour, a moneylender, an eastern commission, and your sons'
succession) that advance at most one beat per turn, gated on what you have
actually done. That is not a language model, but it does give the game a memory:
the rival only appears once you are worth undercutting, and how you finish him is
your choice.

## Configuration

Everything tunable sits in `CONFIG` at the top of the script block:

```js
const CONFIG = {
  turnsPerSeason: 2,     // 1 = a turn is a whole season; 2 = half a season
  startYear: 1247,
  startDucats: 180,
  ...
};
```

`turnsPerSeason` is the granularity dial the spec asked for — it drives the date
display, aging and the year rollover, and nothing reads a hardcoded season
length. The content tables (`GOODS`, `CITIES`, `ROUTES`, `PROPS`, `STAFF`,
`BEASTS`, `EVENTS`, `THREADS`) are plain data and can be extended without
touching the engine.

## File layout

One file, `index.html`, in sections: styles, config and content data, state and
persistence, derived values, actions, the event table and threads, end-of-turn
resolution, view renderers, sheets and input wiring.
