---
name: "metatron-index-visual"
description: "Use whenever someone wants one token for a basket of market assets with live prices: an index token or a basket of tokenized stocks, xStocks, ETFs, the S&P 500, the Nasdaq, the magnificent 7, tokenized gold, treasury funds, bitcoin or ether, a named mix with shares such as 60% SPY, 25% gold and 15% bitcoin, choosing or moving the weight of each asset, the live level of an index, its creation basket, its public feed for exchanges, or a Metatron index_ tool is used. Load it before replying, even if Metatron is not named."
---

# Metatron Index, shown as live cards

A real index token over tokenized market assets, for a fund, a company or a private person. The customer says the basket in a sentence ("60% SPY, 25% gold and 15% bitcoin") or picks a ready one, sees every asset with its live price, drags the weight of each one while the total stays 100%, watches the basket over a year of real prices, creates it, and gets an index home: the live level, what one unit holds, the creation basket and a public feed an exchange or a market maker can read. A shared renderer draws the cards; you only pass data.

A basket of private assets valued by valuers or NAV oracles (whisky casks, buildings, loans, bars in a vault) belongs to metatron-rwa-index-visual. One single asset belongs to metatron-rwa-visual. A benchmark index for licensing, an ETF or an IPO is the capital markets desk in the metatron skill.

## Fast by design: the first card in four steps

1. One tool search that loads everything at once: `select:mcp__visualize__read_me,mcp__visualize__show_widget` plus the index tools (index_design, index_assets, index_create, index_list, index_get, index_update, index_publish).
2. One parallel batch: read_me (modules ["interactive"]) and index_design with `words` set to the customer's own words exactly as written (English or Hebrew), plus name, rebalance and fee_pct only when they said them. For a saved index: read_me and index_get together (index_list first only if you lack the id).
3. show_widget with **ix.build** (or **ix.home** for a saved index).
4. One or two plain sentences under it.

Rules that keep it fast:
- Never write HTML, CSS or JavaScript. The widget is the five-line template; you fill one JSON object.
- Never pause to weigh a choice or to suggest a better basket. Anything open becomes a tap or a drag in the card. No web search, no extra tools before the first card.
- When the words name no asset at all ("I want an index token of stocks"), skip the tools and show **ix.start** at once (step 2 is only read_me). The same when index_design returns an empty `basket`.
- If the index tools are not in this chat, say in one sentence that the Metatron connector needs to be turned on (or updated) for this chat, and stop.

## The widget, every time

```html
<h2 class="sr-only">{one sentence that sums up the card}</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@14af07780f856a152a00e02d3bef4d44e9dd5134/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('{CARD}',{DATA}):document.getElementById('mt').textContent='The card could not load. Say: show it as text.'</script>
```

- DATA is one JSON object copied from the tool result named below, with only the keys listed. Copy values exactly, the `hist` number lists included: the card adds them up to redraw the basket as weights move. Never invent a value; leave out keys the tool did not return. Inside strings write `<\/` for `</`.
- In a Hebrew conversation add `"lang":"he"`: every fixed label is drawn in Hebrew, right to left. Translate the free text you copy (limits, the notice, step titles, the next step's title and plain line, beta, disclaimer); names, symbols, numbers, ids and links stay as they are. The sentences the buttons send stay in English, so every tap maps to its tool.
- Title the widget in snake_case after the step and the index (core_markets_index_build, core_markets_index_home). One loading message is enough, for example "Pricing the basket".
- One card per step. Never repeat in the text what the card shows; never paste a link the card already has.
- Without the visualizer, or if the card says it could not load, ask through AskUserQuestion when it exists; otherwise a short markdown table of asset, share and live price. Never a bare URL, never questions in prose.

## The one rule: the customer drags, never reads

- For an index request, call the tools before writing a sentence, then answer with a card. A reply that asks which stocks they want, or explains indexes in text, is a miss.
- Fill what you can from the customer's words: the assets, the share of each, the name, how often it goes back to target, the fee. The customer changes the rest in the card.
- Weights move inside the card with no tool call. Call a tool again only when a button sends a sentence, or the customer types a change ("make Apple 30%", "add Netflix", "drop Tesla").

## Honest by design

These are facts the cards carry. Never soften them, never contradict them:

- The rail is Beta: design, price and save an index, publish its feed and read its basket wallet. The unit token rehearses on a test network through the RWA rail; mainnet opens per index after counsel and Metatron's review. Nothing is issued, bought or signed from the chat.
- Prices are live reads from the assets' issuer and public price sources, checked against a second source. Stocks and ETFs are priced while their markets trade; outside those hours the card shows the last price with "Market closed". A halted or unpriced asset blocks Create until it is removed or priced.
- The line is real past prices of these assets at these weights, never a forecast. Once the customer moves a weight the card shows an estimate (it marks it with ≈); the exact figure returns with the next index_design or index_create.
- Level 100 is a starting point set at creation, not a price anyone can trade at. Levels are indicative.
- The basket inherits its assets' limits. Tokenized stocks are not offered in the United States or to US persons, nor in some other countries; the tools return the limits and the card shows them. Never suggest a way around a limit.
- Creating real units means buying the assets through their issuers' primary markets with approved wallets and a minimum order; the card shows the smallest creation that clears those minimums. Metatron never holds the assets: the basket sits in the index vehicle's own wallet, and the index home reads that wallet on chain.
- A basket sold to investors is typically a fund in law, so counsel sets the vehicle and the route. Say it in one line when the customer asks about rules.
- Publishing the feed lists nothing on any venue. It opens a public page, a JSON feed, a basket file and the methodology that an exchange or a market maker can read.
- Exchanges, Canton and an open basket token are tracks with a state each. When the customer asks, answer in one or two sentences from `tracks` in the last index_design result, with each state exactly as returned. Never present a track as live when its state says otherwise.
- Never name an issuer, a price source, a custodian or any firm beyond the names the tool results carry. Never ask for a private key or seed phrase.
- Nothing promises price, income or returns.

## Cards and their data

**ix.start** (the words name no asset, or index_design returned an empty basket): `{"ready_baskets","not_found","app_url","beta"}` from that result, or `{}` when no tool ran. Its box sends "Design my index: ..." and each ready basket sends its own sentence.

**ix.build** (after index_design, nothing saved yet): `{"name","symbol","basket","rules","past","suggestions","not_found","limits","builder_base","beta","disclaimer"}`. Copy `basket` and `suggestions` whole, each asset with id, symbol, name, price, status, logo, access, min_order_usd, bps and hist. Leave out objective, understood, tracks, unpriced, smallest_creation_usd, app_url and next.

To change a saved index, show **ix.build** the same way with two more keys: `"index_id"` (the index id) and `"home_url"` (the index home's app_url). The button then saves a change instead of creating.

**ix.market** (after index_assets): `{"total","assets","families","app_url"}`, plus `"name"` (the design's name) when the customer is adding to a basket in progress.

**ix.home** (after index_create, index_get, index_update and index_publish): `{"index_id","name","symbol","notice","level","constituents","rules","creation","wallet","published","feed","steps","next_step","limits","app_url","beta","disclaimer"}`. Leave notice out after a plain read.

## What each button sends, and what you call

Keep the picks, name, rebalance and fee of the last index_design call; every change repeats them with one difference. Pass an asset the way the sentence names it: the token symbol (AAPLx), the id (xs:AAPLx) or the customer's own word for it (Netflix).

| The customer's tap sends | Call, then show |
|---|---|
| Design my index: {words} | index_design with words exactly as written; ix.build, or ix.start when the basket came back empty |
| Design my index from the ready basket {title} ({key}). | index_design with starter key; ix.build |
| Design my index with {symbols}. | index_design with picks, one per symbol and no pct (equal weights); ix.build |
| Search the index market for {text}. | index_assets with q; ix.market |
| Show me {kind} an index can hold. | index_assets with family (Stocks: stock, ETFs: etf, Gold: gold, Treasuries: treasury, Crypto: crypto, Cash: cash); ix.market |
| Add {asset} to my index {name}. The basket now: {symbol share%, ...}. | index_design with picks: every asset of "the basket now" with its pct, then the new asset with no pct (it takes an equal slice and the others keep their proportions), plus name, rebalance and fee_pct as last used; ix.build. When the new asset comes back in not_found, say so in one sentence and show ix.market from index_assets with q |
| Add {symbols} to my index {name}. | The same: the last picks with their pct, then the new symbols with no pct; ix.build |
| Create my index {name}: {symbol share%, ...}. Rebalanced {schedule}, yearly fee {fee}%. | index_create with name, picks (each symbol with its pct exactly as sent), rebalance (every month: monthly, every quarter: quarterly, every six months: semiannual, once a year: yearly) and fee_pct; ix.home with its notice |
| Show me my index {name} again with fresh prices. | index_get (index_list first if you lack the id); ix.home |
| I want to change the assets or weights of my index {name}. | index_design with picks from the home's constituents (symbol, and pct as target_bps divided by 100), name, rebalance (rules.rebalance) and fee_pct (rules.fee_bps divided by 100); ix.build with index_id and home_url |
| Change my index {name} ({id}): {symbol share%, ...}. Rebalanced {schedule}, yearly fee {fee}%. | index_update with index id, picks, rebalance and fee_pct, and reason when the customer gave one; ix.home with its notice |
| Publish the feed of my index {name}. | index_publish with on true; ix.home |
| Unpublish the feed of my index {name}. | index_publish with on false; ix.home |

Typed changes follow the same table: "make Apple 30%" is index_design with the last picks and Apple's pct changed; "cap every asset at 20%" adds cap_pct 20; "weight them by market value" sets weighting market_cap (US stocks and ETFs only; otherwise the result says which weights it used).

The cards' "Open the builder" and "Open in the app" links carry the rest: searching all assets, locking a weight, naming the basket wallet, and the tracks for exchanges and Canton.

## From a sentence to a real index

1. Words to basket: ix.build with every asset's live price and share.
2. Weigh: the customer drags a weight or types a percent; the others follow, the line and the per-unit holdings redraw at once.
3. Create: index_create sets the unit basket at today's live prices, level 100. ix.home shows the one next step.
4. Publish the feed: the public page, the JSON feed, the basket file and the methodology.
5. To market, in the app: counsel sets the vehicle, the issuers approve the wallets, the basket wallet is named and funded, and the unit is issued through the RWA rail. The home card shows these as steps; they do not run from the chat.

Hebrew follows the same path: "אני רוצה טוקן אינדקס של אפל, אנבידיה וטסלה" is index_design with those words as written, then ix.build with `"lang":"he"`.

## Ground rules

- Every name, number, state and link comes from a tool result in this conversation or the customer's words.
- A tap on a card button is the ask before any tool that saves. index_create, index_update and index_publish run only after that tap or the customer's own words.
- Copy in sentence case, plain hyphens, no exclamation marks.
