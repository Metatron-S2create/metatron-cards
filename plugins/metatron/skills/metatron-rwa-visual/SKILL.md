---
name: "metatron-rwa-visual"
description: "Use whenever someone wants to tokenize a real-world asset (property, gold or other metal, private credit, a fund, casks, any RWA), asks about an RWA structure, SPV, broker-dealer, custodian or closing a partner, or a Metatron rwa_ tool is used. Load it before replying, even if Metatron is not named."
---

# Metatron RWA, shown as live cards

Every RWA step is a card in the look of rwa.metatron.systems. The customer sees the structure as a map, every seat of the team opens its closing steps, and they leave with a full RWA: structure, team, documents and sign-offs in place, ready for the wallet steps in the app. A shared renderer draws the cards; you only pass data. A token or coin with no asset behind it belongs to metatron-launch-visual; one token for a basket of assets (an index token, NAV oracles, the oracle marketplace) belongs to metatron-rwa-index-visual, which hands its seats back here.

## Fast by design: the first card in four steps

1. One tool search that loads everything at once: `select:mcp__visualize__read_me,mcp__visualize__show_widget` plus the RWA tools you need (rwa_match_structure, rwa_create_draft, rwa_get_asset, rwa_seat_team, rwa_choose_partner, rwa_update_details, rwa_ask_metatron, rwa_record_signoff, rwa_structure_pack, rwa_simulate, rwa_investor_link, rwa_list_assets).
2. One parallel batch: read_me (modules ["interactive"]) and rwa_match_structure (asset_type, asset_name, raise_usd when known, geography and price from the customer's words; metal and listed securities have a live market price). For an existing asset: read_me and rwa_get_asset together (rwa_list_assets first only if you lack the id).
3. show_widget with the card below.
4. One or two plain sentences under it.

Rules that keep it fast:
- Never write HTML, CSS or JavaScript. The widget is the five-line template; you fill one JSON object.
- Never pause to weigh a choice. Anything open becomes a tap in the card. No web search, no extra tools before the first card.
- When where investors live or how the asset is priced is not in the customer's words, skip the tools and show rwa.start at once (step 2 is only read_me).
- If the RWA tools are not in this chat, say in one sentence that the Metatron connector needs to be turned on for this chat, and stop.

## The widget, every time

```html
<h2 class="sr-only">{one sentence that sums up the card}</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@085390ae872a289076199d3e6b5a0a16c3e33445/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('{CARD}',{DATA}):document.getElementById('mt').textContent='The card could not load. Say: show it as text.'</script>
```

- DATA is one JSON object copied from the tool result named below, with only the keys listed. Copy values exactly; never invent one; leave out keys the tool did not return. Inside strings write `<\/` for `</`.
- In a Hebrew conversation add `"lang":"he"`: every fixed label is drawn in Hebrew, right to left. Translate the free text you copy (titles, plain lines, notes); names, numbers, links and keys stay as they are. The sentences the buttons send stay in English, so every tap maps to its tool.
- Title the widget in snake_case after the step and the asset (alpine_structure, alpine_seat_custodian). One loading message is enough, for example "Drawing the structure".
- One card per step. Never repeat in the text what the card shows; never paste a link the card already has.
- Without the visualizer, or if the card says it could not load, ask through AskUserQuestion when it exists; otherwise a short markdown block. Never a bare URL, never questions in prose.

## The one rule: the customer taps, never reads

- For an RWA request, call the tools before writing a sentence, then answer with a card. A reply that asks questions or lists risks in text is a miss.
- Fill what you can from the customer's words: asset type, name, where investors live, how it is priced, the raise. The customer changes it in the card.

## Honest by design

These are facts the cards carry. Never soften them, never contradict them:

- The RWA rail is Beta: plan, structure, simulate and rehearse on a test network. No real issuance yet; mainnet opens per asset after counsel and Metatron's review.
- Partners are never named. Say "Metatron's broker-dealer", "Metatron's issuer partner", "an introduction from Metatron". The tools return no firm names; never add one.
- What happens in the chat: the structure, who sits in every seat, naming the SPV, the asset details, the documents for counsel, asking Metatron to start a seat, recording a sign-off the customer holds the signed document for, the first-year simulation. Wallet signatures, vault counts and Metatron's review happen in the app; the cards link there.
- An introduction request is not a filled seat. "Requested" means Metatron's team is finding a firm.
- Nothing promises price, income, returns, listings or approval. The simulation is an illustration of the customer's own numbers.

## Cards and their data

**rwa.start** (the customer's words leave the structure open): `{"name","type","geography","price","raise"}` with only what they said. Types: real_estate, private_credit, precious_metals, fund, commodity, whisky_cask, listed_security, treasury, vehicle, collectible, other. Its button sends "Show me the structure for {name}: ...": call rwa_match_structure with geography, price, raise_usd, asset_type and asset_name from it, then rwa.structure.

**rwa.structure** (after rwa_match_structure, nothing saved yet): `{"name", "build_now", "recommended", "tranches":[{"route"}], "status", "plain", "broker_estimate":{"total_usd"}, "reasons", "notes", "map", "flow", "team":{"seats":[...]}}`, keeping for each seat only step, role, role_id, required, recommended_label, why and state. Saving is the customer's tap: "Create my asset: {name}." means rwa_create_draft with the same geography, price, raise_usd and countries, name, and intake {"assetType","assetName","raiseUsd"}; then rwa_get_asset and rwa.asset.

**rwa.asset** (home, after every write): `{"name","symbol","blueprint","notice","beta","app_url","live","test","missing","next_step","team"}` from rwa_get_asset. blueprint is blueprint.name; test is true when test_deployment is set; missing is the count of details.missing; team keeps filled, closed, total, introductions_requested, empty, run_by_metatron and seats with only step, role, role_id, required, who, state, closed and next_step. notice is one line on what just happened ("Recommended team seated: 5 seated, 6 introductions requested", "Engagement letter recorded"). Leave flow out here; it lives on rwa.structure.

**rwa.seat** (the customer opened a seat): `{"name","app_url","notice","seat":{...}}` with the whole seat from rwa_get_asset's team.seats as returned (step, role, role_id, does, required, who, state, closed, current, recommended, recommended_label, why, options, look_for, when, closing, next_step). An empty seat leads with who sits here; a filled or requested seat leads with its closing steps, one action at a time.

**rwa.details**: `{"name","fields":[...]}` with details.fields as returned (key, label, kind, options, common, hint, value, missing).

**rwa.documents** (after rwa_structure_pack): `{"name","documents":[{"title"}],"review_url","broker_estimate","note"}`.

**rwa.year** (after rwa_simulate): `{"name","summary","key_moments","disclaimer"}`.

**rwa.ready** (every seat closed, or "What is left before ... goes live?"): `{"name","app_url","beta","next_step","gates","investor"}` from rwa_get_asset, with investor the rwa_investor_link result once deployed. Its next step opens the app, where the customer rehearses on Sepolia and later issues on Ethereum from their own wallet, after counsel's sign-off and Metatron's review.

## What each button sends, and what you call

| The customer's tap sends | Call, then show |
|---|---|
| Seat the recommended team for {name}. | rwa_seat_team, rwa.asset with a notice |
| Open the {role} seat for {name}. | rwa_get_asset, rwa.seat |
| Seat the {role} for {name}: {option label}. | rwa_choose_partner with role (role_id) and partner (that option's key). "{firm}, our own firm" is bring_your_own with the firm in note. Then rwa.seat with a notice, or rwa.asset when the seat closed |
| Name the SPV for {name}: {legal name}. | rwa_choose_partner with issuer_vehicle, client_spv, note the name; rwa.seat |
| Ask Metatron to start the {role} seat for {name}. | rwa_ask_metatron with role; rwa.seat |
| Record "{label}" for {name}: signed by ... I hold the signed document. | rwa_record_signoff with that step's gate, signer_name, signer_role, confirm true; rwa.seat. Never without this sentence from the customer |
| Show me the details still missing for {name}. | rwa.details from the last rwa_get_asset |
| Save the details for {name}: label: value; ... | rwa_update_details with intake holding those keys (choices by option, money as USD numbers, countries as two-letter codes); rwa.asset |
| Draft the documents for {name}. | rwa_structure_pack, rwa.documents |
| Show me the first year of {name}. | rwa_simulate, rwa.year |
| What is left before {name} goes live? | rwa_get_asset (and rwa_investor_link once deployed), rwa.ready |
| Back to the team for {name}. | rwa_get_asset, rwa.asset |
| I want to change the answers for {name}. | rwa.start with what you know |

## Ground rules

- Every name, number, state and link comes from a tool result in this conversation or the customer's words.
- A tap on a card button is the ask before any tool that saves. Never ask for a private key or seed phrase.
- Copy in sentence case, plain hyphens, no exclamation marks. Tabler outline icons only; never draw a logo.