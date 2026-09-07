# Silk Road

A turn-based merchant game on the Silk Road. Single HTML file, no build step, no server,
no API key. Open `index.html` — on a phone, a tablet or a desktop — and play.

Samarkand, spring 1247. You buy a ruined caravanserai on the Zarafshan road and
try to turn it into a house whose mark is honoured from Tabriz to the Jade Gate.

## Running it

Open `index.html` in any modern browser, or serve the folder
(`python3 -m http.server`) and hit it from a phone on the same network.

**On a phone,** the game installs as a proper app: it ships a web manifest,
icons and a service worker, so once it is served over HTTPS (there is a GitHub
Pages workflow in `.github/workflows/pages.yml`) Chrome offers *Install app* —
home-screen icon, full screen, and it plays with no signal at all. See
[`docs/android.md`](docs/android.md), which also covers building a signed APK
you can sideload.

Progress autosaves to `localStorage`. Three manual save slots and a
copy-out/paste-in text export live in the menu (the `≡` in the header), so a
game can move between devices without a server.

## The front door

The game opens on a title screen — *Continue*, *A new house*, *Load*, *How to
trade* — and the `≡` in the header reaches the same menu mid-game: save to one
of three slots, load, copy the game out as text, paste one in, help, the
difficulty setting, and the end-of-turn account toggle.

Each tab shows one dismissible line of guidance the first time it is opened.

## Three places to begin

The game offers three worlds, chosen at character creation. Each has its own
roads, its own home market, its own buildings and its own rivals.

| | | |
|---|---|---|
| **Samarkand** | The crossroads | Transoxiana, where every road meets. Thirteen roads, east and west, and everybody else's caravan on them too. |
| **Trebizond** | The Black Sea | Where the Silk Road ends and Italy begins. Alum, wine and Frankish woollens on the quay, Genoese money waiting, and the whole trade of Asia coming down the Zigana pass. |
| **Tabriz** | Persia | The hinge of the world under Mongol law — the Gulf south, the Black Sea west, the road east. Everything passes through and everything is taxed on the way. |

Sixteen goods, but a home bazaar stocks only what its own country made: paper
and silk in Samarkand, alum and wine and woollens in Trebizond, saffron and
dates in Tabriz. Anything else has to be carried in. Six of the goods are
regional — furs down the Rus' rivers, Anatolian alum, Trapezuntine wine,
Frankish woollens, Basra dates, Khorasan saffron.

The engine is start-agnostic: route ids are destination cities, so the same
marriage gifts, origin traits and property records work from any home. The
winning condition generalises too — a caravan home from **the far end of your
own road**, whichever road that is.

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

You also pick **the road you mean to walk** — a difficulty with three settings,
changeable at any time from the menu. Its main axis is how hard the seasons
bite, and it also scales how much the rival houses lean on you:

| | Seasons | Rivals |
|---|---|---|
| **A kind road** | Felt, but no road is ever closed | Keep to themselves |
| **The road as it is** | Winter shuts the passes; the sea road sails only with the monsoon | Compete, and occasionally bite |
| **A hard road** | Every country has a season that stops it | Give no quarter |

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

## The chart

The Roads tab opens on a merchant's chart of the road, drawn as inline SVG from
the route data — no map library, no tiles. Cities sit roughly where they sit on
the ground, pulled apart where the labels would collide, and it scrolls east
because the road does.

It is a working screen, not decoration:

- Roads you own are solid gilt; roads not yet yours are dashed and dim; a road
  blocked by sickness or a shut pass turns madder red.
- Every caravan sits on its own road at its actual progress — a filled dot
  outbound, a ring on the way home, with the leader's name above it.
- A city with an order waiting carries a green ring.
- Tapping a city opens the caravan planner for that road, or the scouting sheet
  if the road is not yours yet.

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

## The seasons

The calendar is structural, not flavour. Each terrain has a season profile —
spring melt on the made roads, summer wells failing in the desert, winter
closing the Pamirs, the Indian Ocean monsoon that lets a dhow sail only in
autumn and winter. A road that is shut refuses dispatch outright; the rest is a
multiplier on that road's own danger.

A long road crosses several seasons, so the planner **averages the modifier
across the turns the trip will span** rather than judging a run to Chang'an by
the month it leaves in. The Roads tab names what the season is doing, and the
planner shows it beside the risk bar.

Which terrains can actually close is set by the difficulty.

## The other houses

Three rival merchant houses trade the same roads: Karim of the Red Ledger in
Samarkand, the Sabirid brothers on the Oxus, and the house of Tegin Bay out of
Turfan. They are not scenery.

- Their caravans ride the chart on the same roads yours do, as hollow diamonds
  in the house colour.
- Every caravan they land **floods the market they sold into** — the same market
  you were going to sell into. You feel them as margins thinning on roads you
  share.
- They learn new roads and grow wealthy, and the Roads tab shows each one's
  worth against yours.
- When one is strong enough and watching you closely, it bites: outbidding you
  on an order, poaching a staff member whose loyalty has slipped, or undercutting
  a city you both sell in for a few turns. Every bite writes a journal line
  naming the house and the reason.

Karim is both the first rival *and* the six-stage story thread — the arc moves
the same object the simulation does, so buying him out actually removes a
competitor from the map.

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

## What a caravan brings home

A market's own produce is what it sells cheap — so it is also what it will not
pay much for. That rule is applied to every city at load, which makes the whole
map directional: you carry a market what it lacks, and bring home what it has
too much of.

(This was a real bug, found late: all twenty-one sourced cities both sold their
produce cheap *and* paid a premium for it — up to 3.8x arbitrage inside a single
market. Bukhara sourced the paper its neighbour Samarkand sells it; Merv sourced
the tea it was listed as wanting. Bukhara now sources furs and Merv saffron, and
the rule keeps the rest honest.)

The caravan planner shows what the destination is cheapest in, what a load of it
costs there, and how many loads the takings would buy — and you set how much of
those takings to spend, from nothing to three quarters.

## Reading the market

Each good keeps sixteen turns of price history. The bazaar rows carry a
micro-sparkline beside the price, and a good's own sheet shows the full line
with its low, high and today — green when the price has come down since the
window opened, madder when it has risen. Buying stops being guesswork.

## The account of the turn

Ending a turn fires standing income, wages, fodder, the household eating, staff
loyalty, spoilage, caravan returns, contract deadlines, an event and a thread
beat. A sheet now opens afterwards with all of it: the money grouped by line
with a net figure, the stores/repute/net-worth deltas, then what happened.

It needs no bookkeeping of its own — the ledger and journal are already stamped
with the turn, so the digest is read straight off them and cannot disagree with
them. If an event sheet is already open it steps aside and leaves a tappable
strip instead. There is an off switch in the menu.

## Saves

Autosave writes to `localStorage` every action. On top of that: three manual
slots, and a copy-out/paste-in text blob (base64 JSON with the older ledger rows
trimmed) so a game can move between devices with no server involved. v1 and v2
saves are migrated forward on load.

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
- `art/*.webp`, `art/faces/*.webp` — banner crops and portraits, also embedded.
- `manifest.webmanifest`, `sw.js`, `icons/` — what makes it installable.
- `.github/workflows/pages.yml` — publishes to GitHub Pages.
- `docs/android.md` — installing on a phone, and building an APK.

`index.html` is in sections: styles; config and content data (goods, cities,
routes, fleet lines, properties, staff); the twelve merchant houses; the trip
event library; matters outstanding and contracts; events at home; long threads;
state and persistence; derived values; actions; the caravan; character creation
and end-of-turn; view renderers; sheets; input wiring; and the embedded art.
