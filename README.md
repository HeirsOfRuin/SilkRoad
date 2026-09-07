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

## Building a merchant

The game opens on a point-buy character sheet:

- **A face.** Sixteen pixel-art portraits. The one you pick is your character for
  the rest of the game and shows on the household roster and in the header.
- **An age.** Thirty is the reckoning age and gives 7 points. Every year over
  buys a point; every year under costs one (range 24-55).
- **Sixteen advantages**, 3 to 8 points each — a mule and cart, a purse, a
  patched roof, a road already walked, a brother at your side, an old guide's
  friendship. At 30 you can afford two.
- **Six faults**, which pay 3 to 5 points back and then bill you every turn —
  a debt already running, a bad name that grows back slowly, a weak
  constitution, slow with figures, hard on your people, an enemy from the start.
  Three at most.

Age also drives two numbers nobody writes down: a younger merchant has more
**nerve** (less of every road's risk) and a grey head carries more **weight at a
price** (better sale prices). Old starts buy more points and then charge for
them — past 55, mortality begins, and the seal passes to whoever in the
household is old enough to hold it. There is no reroll: if nobody is, the house
ends.

## The loop

0. **Deal with what is outstanding** — a customs hold, bandits on one road,
   murrain in the yard, a suit in the qadi's court. Fourteen kinds of problem
   that bite every turn until you settle them.
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
4b. **Take orders** — contracts from the citadel, a guild, or a house you have
   married pay a premium over the market, and fill themselves when a caravan of
   yours reaches the city carrying the goods. Miss the deadline and the bond has
   a penalty written into it.
5. **End the turn** — standing income, wages, fodder, the household eats, one
   event fires, and at most one beat of a long story arc advances.

6. **Buy standing** — the city page sells Repute for ducats and a Hand: feasts,
   alms, courting the citadel, teaching a son, an afternoon in the bathhouse
   where the road's news is actually traded.

Win: net worth 20,000 ducats, Repute 60, and at least one caravan home from
Turfan, Dunhuang or Chang'an. Lose: three consecutive turns in the red. Winning
is an ending, not a wall — you can take the title and keep trading.

## Resources

| | |
|---|---|
| **Ducats** | Currency. Below zero for three turns and the creditors take the house. |
| **Stores** | Food and fodder. Empty means buying grain at panic prices and a Repute hit. |
| **Repute** | Gates roads, properties, offices and staff; adds up to +30% on every sale. |
| **Hands** | Actions per turn. You and your two sons give three. A standing role trades a Hand for income. |

## The fleet

Every animal and vehicle is an individual unit with a tier, in one of three
lines gated by terrain:

| Line | Country | Tiers |
|---|---|---|
| Camels | road, steppe, desert, mountain | Bactrian camel → seasoned camel → camel string → great string |
| Haulage | made roads only | pack mule → mule and cart → ox-cart → great wagon |
| Water | the sea road | river barge → coastal dhow → ocean dhow → great dhow |

You work a unit up one step at a time, cheaply. Once you have owned a tier, you
can buy that kind ready-made — for about 18% more than the work would have cost.
A tier you have never reached cannot be bought at any price.

## People

**Hands and staff are different people.** Your household gives you a Hand each
per turn. Staff are hired, paid a wage, do one job, and give no Hand — but each
one accrues years of service and a loyalty score. Serve long enough and well
enough and they can be brought into the household, where they give a Hand like
family and cost double. You can only carry `1 + repute/25` such people at your
table, so it stays a choice rather than a treadmill.

Loyalty rises when they are paid and fed, falls when they are not, and at zero
they walk out through the gate they came in by.

## Marriage

Twelve merchant houses, each from a different world on this road — Khwarazmian
river freighters, Bukharan bankers, Uyghur tax-farmers, the old Sogdian caravan
aristocracy, Kipchak horse-lords, Khorasani silk, Armenian factors in Tabriz,
Radhanite credit, Nestorian deacons on the eastern road, Kashmiri pepper,
Chinese kilns, and a Chinggisid officer's family.

Marrying into one costs a bride-price and a Hand, and brings a dowry, a
permanent advantage specific to that house (a road opened, a good at source
price, credit that buys you four more turns before the creditors move, tolls
that fall on somebody else), a line of contracts only family are offered, and
one more pair of Hands — the spouse joins the household.

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
or an LLM in the loop. This build takes the first, at scale:

- **129 trip events**, tagged by terrain (made road, desert, mountain, sea) and
  by how badly the trip went — colour, boon, minor, moderate, severe. A caravan
  east across the Taklamakan cannot draw a squall off the cape, and a clean run
  still comes home with something to say.
- **38 events at home**, weighted by the house you have actually built.
- **14 matters outstanding** — persistent problems with an ongoing bite and a
  way out, some of which trip events start.
- **Six long threads** (a rival house, the governor's favour, a moneylender, an
  eastern commission, succession, and the family you married) that advance at
  most one beat per turn, gated on what you have done.

That is not a language model, but it gives the game a memory: the rival only
appears once you are worth undercutting, and how you finish him is your choice.

## Saves

Progress saves to `localStorage` per device. A v1 save is migrated forward on
load — beasts become tiered fleet units, staff gain names, years and loyalty.

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

## Art

Six pixel-art bands — the bazaar, an oasis at dusk, the steppe, a city gate, a
merchant's tent, a river crossing — head the intro and each tab, cropped to
864x432 and embedded as WebP data URIs (about 400 KB in total). Embedding rather
than linking keeps the game a single file that works offline, from a `file://`
URL, and inside a sandboxed page that blocks external images. The same crops are
kept as real files in `art/` so they can be re-cropped and re-embedded.

Each banner carries a live line rather than a caption — loads in the godown,
caravans on the road, properties built and kept — so the art does some work.

## File layout

- `index.html` — the whole game.
- `art/*.webp` — the six banner crops, also embedded in the HTML.

`index.html` is in sections: styles; config and content data (goods, cities,
routes, fleet lines, properties, staff); the twelve merchant houses; the trip
event library; matters outstanding and contracts; events at home; long threads;
state and persistence; derived values; actions; the caravan; character creation
and end-of-turn; view renderers; sheets; input wiring; and the embedded art.
