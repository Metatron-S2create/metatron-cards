---
name: "metatron-rwa-index-visual"
description: "Use whenever someone wants one token for a basket of real assets: an index token or an index of whisky casks, buildings, gold, loans or a mix, a basket token, NAV oracles or the oracle marketplace, the weights, cap, rebalancing or calculation agent of an index, or a Metatron rwa_index_ tool is used. A basket of tokenized stocks, ETFs or crypto with live prices is metatron-index-visual instead. Load it before replying, even if Metatron is not named."
---

# Metatron Index Token, shown as live cards

One token for a basket of real assets, for a company or a private person. The customer says it in a sentence ("an index token of whisky casks"), sees the whole index as one card, adjusts it by tapping, picks the oracle behind every value from the marketplace, watches a first year through the real engine, creates it, and runs it: values recorded from the chat, each NAV signed by the calculation agent's own wallet in the app. A shared renderer draws the cards; you only pass data.

An index is an RWA: a vehicle holds the basket and each unit is an interest in that vehicle. One single asset belongs to metatron-rwa-visual; a coin with no asset behind it belongs to metatron-launch-visual. A basket of assets with a market price (tokenized stocks, xStocks, ETFs, tokenized gold or treasury funds, bitcoin) belongs to metatron-index-visual, which prices it live.

## Fast by design: the first card in four steps

1. One tool search that loads everything at once: `select:mcp__visualize__read_me,mcp__visualize__show_widget` plus the index tools (rwa_index_design, rwa_index_marketplace, rwa_index_simulate, rwa_index_create, rwa_index_list, rwa_index_get, rwa_index_add_oracle, rwa_index_record_valuation, rwa_index_record_estimates, rwa_index_record_custody).
2. One parallel batch: read_me (modules ["interactive"]) and rwa_index_design with `words` set to the customer's own words exactly as written (English or Hebrew), plus theme, name, geography and raise_usd only when they said them. For an existing index: read_me and rwa_index_get together (rwa_index_list first only if you lack the id).
3. show_widget with **index.design** (or **index.home** for an existing index).
4. One or two plain sentences under it.

Rules that keep it fast:
- Never write HTML, CSS or JavaScript. The widget is the five-line template; you fill one JSON object.
- Never pause to weigh a choice. Anything open becomes a tap in the card. No web search, no extra tools before the first card.
- When the words name no basket at all ("I want an index token"), skip the tools and show **index.start** at once (step 2 is only read_me).
- If the index tools are not in this chat, say in one sentence that the Metatron connector needs to be turned on (or updated) for this chat, and stop.

## The widget, every time

```html
<h2 class="sr-only">{one sentence that sums up the card}</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@9a48a3241fee6662aea72a698b19d0781020740c/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('{CARD}',{DATA}):document.getElementById('mt').textContent='The card could not load. Say: show it as text.'</script>
```

- DATA is one JSON object copied from the tool result named below, with only the keys listed. Copy values exactly; never invent one; leave out keys the tool did not return. Inside strings write `<\/` for `</`.
- In a Hebrew conversation add `"lang":"he"`: every fixed label is drawn in Hebrew, right to left. Translate the free text you copy (the objective, plain lines, notes, holds, guards, the readiness line, the next step's label and why); names, numbers, keys, ids and links stay as they are. The sentences the buttons send stay in English, so every tap maps to its tool.
- Title the widget in snake_case after the step and the index (scotch_cask_index_design, scotch_cask_index_home). One loading message is enough, for example "Designing the index".
- One card per step. Never repeat in the text what the card shows; never paste a link the card already has.
- Without the visualizer, or if the card says it could not load, ask through AskUserQuestion when it exists; otherwise a short markdown block. Never a bare URL, never questions in prose.

## The one rule: the customer taps, never reads

- For an index request, call the tools before writing a sentence, then answer with a card. A reply that asks questions or explains indexes in text is a miss.
- Fill what you can from the customer's words: what the basket holds, how many, the name, the weights, the cap, rebalancing, where the investors live, the raise. The customer changes the rest in the card.

## Honest by design

These are facts the cards carry. Never soften them, never contradict them:

- The rail is Beta: design, simulate and rehearse on a test network. No real issuance yet; mainnet opens per index after counsel and Metatron's review.
- A theme starts from sample constituents with invented names and values. They are labelled as samples and must be replaced with the customer's own assets (in the app's Index tab) before anything is signed.
- The preview NAV comes from starting values and today's public feeds. It is not a price; the first signed NAV sets the real one.
- The calculation agent's own wallet signs every NAV in the app, and the server checks the signature. Nothing signs from the chat. Never ask for a private key or seed phrase.
- Live listings read a public oracle network on Ethereum. Never name the network, a valuer, a custodian or any firm; the tools return none. An introduction is a request to Metatron, not a filled seat.
- A value or a custodian statement is recorded only when the customer gave it in this conversation with its date and report link, or said it is a rehearsal estimate on the test network. Never invent a value, a date, a provider or a link.
- Nothing promises price, income or returns. The first year is an illustration of how the engine reacts, never a forecast.
- A basket sold to many investors is usually a fund in law, so counsel picks the vehicle and the route. Say it in one line when the customer asks about rules.

## Cards and their data

**index.start** (the words name no basket): `{"name","theme","geography","raise"}` with only what they said. Themes: whisky_casks, real_estate, precious_metals, private_credit, real_assets (a mix), custom (start empty). Its button sends "Design my index: ...".

**index.design** (after rwa_index_design, nothing saved yet): `{"name","symbol","theme","objective","understood","open","investors","geography","raise_usd","basket","preview_nav","methodology","oracles":{"readiness","plan","guards"},"packages","structure","app_url","beta","disclaimer"}`. Leave out `choices` and `oracles.map`. When `geography` is null the card asks where the investors live, and Create waits for it.

**index.market** (after rwa_index_marketplace): `{"name","project_id","readiness","packages","listings","app_url","note"}` with name the index's name.

**index.year** (after rwa_index_simulate): `{"name","project_id","summary","moments","series","disclaimer"}`; project_id only for an index that exists.

**index.home** (after rwa_index_get, rwa_index_create, rwa_index_add_oracle and every record tool): `{"project_id","name","symbol","theme","live","test","notice","nav","constituents","methodology","rebalance","oracles":{"readiness","in_use","map"},"feed","next_step","app_url","beta"}`. notice is the result's notice; leave it out after a plain read.

**index.value** (the customer wants to record a value or a custodian statement): `{"name","project_id","mode","key","live","constituents"}` from the last rwa_index_get: mode "value" or "custody", key the constituent named in the tap (value mode only), and constituents with only key, name, unit, currency, by_hand, kind and custodian.

## What each button sends, and what you call

Keep the inputs of the last rwa_index_design call; every design tap repeats them with one change.

| The customer's tap sends | Call, then show |
|---|---|
| Design my index: a basket of {theme}, named {name}, for {investors}, raising {amount}. | rwa_index_design with theme (whisky casks: whisky_casks, real estate: real_estate, precious metals: precious_metals, private credit: private_credit, mixed real assets: real_assets, an empty basket: custom), name, geography (in the United States: us_only, outside: non_us_only, in and outside: both, banks, funds and custodians: institutions) and raise_usd; index.design |
| Design {name} again with equal weights. (or weights that follow value, custom weights) | rwa_index_design, same inputs, weighting equal, value or custom; index.design |
| Design {name} again with no cap. (or a cap of N%) | rwa_index_design, same inputs, cap_pct null or N; index.design |
| Design {name} again, rebalanced every quarter. (every six months, once a year) | rwa_index_design, same inputs, rebalance quarterly, semiannual or yearly; index.design |
| Design {name} again for {investors}. | rwa_index_design, same inputs, geography as above; index.design |
| Add the {title} package to {name} ({id}). or Add {title} to {name} ({id}). | Before the index exists: rwa_index_design, same inputs, the id added to add; index.design. Once it exists: rwa_index_add_oracle with listing id; index.home with its notice |
| Show me the oracle marketplace for {name}. | rwa_index_marketplace with the design inputs, or project once the index exists; index.market |
| Show me the first year of {name}. | rwa_index_simulate with the design inputs, or project once the index exists; index.year |
| Show me the design of {name} again. | rwa_index_design with the last inputs; index.design |
| Create my index: {name}. | rwa_index_create with the last design inputs plus name, symbol and geography; index.home with its notice |
| Show me the index home for {name}. | rwa_index_get; index.home |
| I want to record the value for {constituent} ({key}) in {name}. | index.value with mode value and that key |
| Record the value for {constituent} ({key}) in {name}: {currency} {value} per {unit}, as of {date}, from {source} by {provider}, report {link}. | rwa_index_record_valuation with key, unit_value, currency, as_of, source (the valuer's report: valuer_report, the fund administrator's figure: fund_administrator, my own rehearsal estimate: issuer_estimate), provider, report_url; index.home |
| I want to record a custodian statement for {name}. | index.value with mode custody |
| Record the custodian statement for {name}: {custodian} confirms {constituent} ({key}), ... as of {date}, statement {link}. I hold this statement. | rwa_index_record_custody with keys, custodian, as_of, report_url; index.home |
| Record rehearsal estimates for {name}. | rwa_index_record_estimates (test network only); index.home |
| Open the {role} seat for {name}. | Hand over to metatron-rwa-visual: rwa_get_asset, rwa.seat. The index's custodian, valuer, oracle network and fund administrator seats close there |

The cards' "Open in the app" links carry the wallet steps: replacing the sample constituents, signing a NAV with the calculation agent's wallet, publishing the NAV feed and recording a rebalance.

## From a sentence to a real index

1. Words to design: index.design with the basket, the rules and where every value comes from.
2. Oracles: packages and single listings from the marketplace. Every constituent priced by a live feed gives a live NAV; valuers, custodians and publication arrive by introduction or bring your own.
3. A first year: index.year, the guards holding a typo and a late value.
4. Create: index.home with the one next step. In order the steps are: replace the samples, record values, sign the NAV in the app, record custodian statements, publish the feed.
5. The team: the seats close with metatron-rwa-visual's seat cards, like any RWA asset.

Hebrew follows the same path: "אני רוצה לייצר טוקן אינדקס של חביות וויסקי" is rwa_index_design with those words as written, then index.design with `"lang":"he"`.

## Ground rules

- Every name, number, state and link comes from a tool result in this conversation or the customer's words.
- A tap on a card button is the ask before any tool that saves. rwa_index_create, rwa_index_add_oracle and every record tool run only after that tap or the customer's own words.
- Copy in sentence case, plain hyphens, no exclamation marks.
