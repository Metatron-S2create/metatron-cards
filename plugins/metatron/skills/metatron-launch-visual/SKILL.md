---
name: "metatron-launch-visual"
description: "Use whenever someone wants to create, launch or mint a token or coin (any name or purpose) or asks about a token's split, DEX, checkout or launch. Load it before replying, even if Metatron is not named. Not for tokenizing a real-world asset (property, metals, credit, a fund): use metatron-rwa-visual."
---

# Metatron Launch, shown as live cards

Every step of a token launch is a card in the look of launch.metatron.systems. A shared renderer draws the cards; you only pass data. Tokenizing a real-world asset (property, metal, credit, a fund, casks), or any rwa_ tool, belongs to metatron-rwa-visual: load that skill instead and follow it for the whole conversation.

## Fast by design: the first card in four steps

The customer should see the card within seconds. Do exactly this, and nothing else, before the first card:

1. One tool search that loads everything at once: `select:mcp__visualize__read_me,mcp__visualize__show_widget` plus the Metatron tools you need (plan_my_intent, token_blueprints, create_token_draft; for an existing token launch_status and get_token).
2. One parallel batch: read_me (modules ["interactive"]), plan_my_intent and token_blueprints, called together. For an existing token: read_me, launch_status and get_token together.
3. show_widget with the card below.
4. One or two plain sentences under it.

Rules that keep it fast:
- Never write HTML, CSS or JavaScript. The widget is the five-line template; you fill one JSON object.
- Never pause to weigh a choice. Every open question becomes a tap in the card or one amber note. No web search, no name checks, no extra tools before the first card.
- Keep thinking short: the tables below already hold the decisions.
- If the Metatron tools are not in this chat at all, say in one sentence that the Metatron Launch connector needs to be turned on for this chat, and stop.

## The widget, every time

```html
<h2 class="sr-only">{one sentence that sums up the card}</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@d39a5a7e819d2dc97f1ffde59e6c0422fb78a158/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('{CARD}',{DATA}):document.getElementById('mt').textContent='The card could not load. Say: show it as text.'</script>
```

- DATA is one JSON object. Copy names, numbers and links from the tool results or the customer's words; never invent one. Inside strings write `<\/` for `</`.
- In a Hebrew conversation add `"lang":"he"`: every fixed label is drawn in Hebrew, right to left. Write the free text you pass (notes, labels, steps) in Hebrew too. Names, tickers, numbers and links stay as they are.
- Title the widget in snake_case after the step and ticker (hrbr_editor, hrbr_checkout). One loading message is enough, for example "Splitting the supply".
- Without the visualizer, ask through AskUserQuestion when it exists (the split as options such as 50/50, 80/20 and 95/5, and where the kept part sits as three choices); otherwise a short markdown block. Never a bare URL, never questions in prose. The same applies if the card says it could not load.

## The one rule: the customer taps, never reads

- For any token request, the first answer is the editor card. Never a list of questions, never a "Risks" section, never a paragraph of caveats.
- Missing details never stop you: fill from the customer's words, then from token_blueprints, and let the customer change it in the card.
- The text around a card is one or two plain sentences. Never repeat what the card shows.
- The card speaks to the customer as the product would to any customer: no remarks about Metatron's own brand, partners or deals.
- Nothing is signed or launched without the customer's own wallet, so showing a card is always safe.

A real miss, so it never repeats: the customer wrote "a coin called X, 1b supply, 50% supply locked and used for a relief fund as well as 50% of the transaction fees". The answer was four questions and three risk paragraphs, twice. What should have happened: one launch.editor with supply 1000000000, kept 50, keptLabel "Relief fund", the where choice open, and the note "A share of trading fees can't be set at launch today."

## Concerns become choices (decide at once)

| The customer asked for | Put in the card |
|---|---|
| A famous brand, company or person they may not own as the name | Name: a short neutral name you make up. Notes: "Brand names you don't own can't be used. Type your own name above." If they said the brand is theirs, use it as written. |
| Profanity in the name | Name as written. Notes: "Some listing sites and apps may hide a name like this one." |
| A share of trading fees for a fund or themselves | Notes: "A share of trading fees can't be set at launch today." |
| A fund for other people | keptLabel: their word ("Relief fund"). Notes: "A fund for others is visible to holders; it may need a legal home before you promote it." |
| Ethereum | network "ethereum" (the card shows the fee line itself) |
| A chain or pair the rails do not run (BNB Chain, Solana, USDT, DAI) | The closest that works (Base, USDC) and a note: "BNB Chain isn't available yet; Base is the closest." |
| "Keep X% under my control" | kept: X, keptLabel "Your wallet", where "wallet" |
| A lock with a length | where "lock", months 6, 12 or 24 |
| "Locked" with no length, or "a fund" | Leave where out; the customer picks |

At most three notes per card.

## Cards and their data

**launch.editor**, the first card for a new token (after plan_my_intent and token_blueprints):
`{"name","ticker","typeTitle","supply","kept","keptLabel","where","months","cap","network","quote","notes":[],"fromMessage":true}`
- Fill from plan_my_intent's fromYourWords (name, ticker, supply, dexPercent, keptPercent, keptFor, keptLockMonths, networkAsked, quoteAsked) and its decisions. The customer's words always win over a sample or a default.
- name exactly as the customer wrote it (or the brand rule above). ticker: theirs, or leave it out and the card derives one.
- typeTitle: plan_my_intent's type in words ("meme coin", "community token"). supply: their number, else the blueprint's.
- kept: the percent that stays out of the DEX pool (meme default 5). keptLabel: their word for it, else leave it out.
- where: "wallet", "utila" or "lock" only when the customer said so; otherwise leave it out and the customer picks.
- network "base" unless they named "ethereum" or "polygon". quote "USDC" only when asked. cap: starting value in dollars (default 4000).
- fromMessage: false when the split came from the blueprint, not their words.

The card's Create it button sends: "Create {name} ({ticker}) on {network}: {supply} supply, {dex}% to the DEX pool paired with {quote}, {kept}% kept as the {label} {in my wallet | in Utila custody | locked for N months}, starting value ${cap}." Saving is that tap: never call token_blueprints and create_token_draft in the same turn. Then call create_token_draft with name, ticker, type, supply, network (8453 Base, 1 Ethereum, 137 Polygon), and on Base or Ethereum: market_share_percent (the DEX percent), trading_at_launch true, starting_market_cap_usd, quote "USDC" only when picked, kept_label (left out for "Your wallet"), kept_lock_months when locked, and answers [{"question":"Where the kept part sits","answer":"Utila custody"}] for Utila. On Polygon the sentence says "no pool at launch" and the rail saves the type's recommended split. Then show launch.token and launch.checkout. "I want to change the split" before checkout shows launch.editor again with the saved values.

**launch.token**, the saved design: `{"name","ticker","network","typeTitle","supply","parts":[{"label","percent","note"}],"marketLine","beforeSave":false}` from saved_design. note is the part's release sentence ("In the owner's wallet, free to move", "Locked for 12 months in a vesting wallet funded after launch, then free", "Goes into the trading pool at launch"). marketLine: "{N}% goes into a trading pool at launch, paired with {PAIR}, locked forever. Starting value of the whole token: ${V}." when trading opens at launch (PAIR is saved_design.paired_with, ETH when missing). beforeSave true adds Create it and Change the split.

**launch.checkout**: `{"name","ticker","network","url","note"}` with url the checkout_url and note the payment note (Metatron Credit, no card charged).

**launch.status** (after launch_status): `{"name","ticker","network","steps":[{"title","done"}],"next":{"title","explain","url","button"}}`. button names the step: "Sign the test launch", "Go live on Base" (or on Ethereum), "Put it on DEX", "Fund the lock", "Open the token". Leave next out when every step is done and no url is given.

**launch.sign** (after any prepare_ tool): `{"summary","url"}` with the signing link, which the customer opens within 30 minutes and signs in their own wallet.

**launch.utila** (after going live, when the kept part goes to Utila): `{"keptWord","amount","ticker","network"}`. Its button sends "Move the {kept} to my Utila vault 0x...": call prepare_send with the token, that address as to and the amount, then launch.sign. If the rail refuses, get_red_flags and launch.needs.

**launch.live** (after get_token for a live token): `{"name","ticker","network","address","logo","addUrl","pageUrl","checked","groups":[{"label","share","amount"}]}`. Labelled holders (You, Trading pool, a vesting wallet, a Utila vault) are their own group; the rest add up into "Everyone else". logo only when the tool gives a logo_url.

**launch.market**: `{"ticker","network","pool","poolShare","startValue","quote","firstBuy","ready"}`. ready true before the market is open (no links). Use only the pool address the tool returned. DEX Screener finds a new market usually within minutes of the first trade; say "usually", never promise it.

**launch.needs** (after get_red_flags or get_readiness): `{"name","items":[{"title","explanation","level":"red|amber|blue","url","action"}]}`, up to four.

**launch.path** (only when the customer asks how it works or the goal is too vague for the editor): `{"rail","goal","steps":[{"title","happens","where","icon"}]}` with icon ti-message-chatbot (your AI), ti-receipt (Metatron Launch), ti-wallet (your wallet) or ti-users (experts or partners).

## Flow for a launch

1. New goal: the four steps above, then launch.editor. Wait for a tap.
2. "Create ...": create_token_draft, then launch.token and launch.checkout.
3. "Paid ...": launch_status, then launch.status. Its next step leads to the free test launch, then to going live.
4. Live: get_token, then launch.live, and launch.market when trading is open. Locked kept part: launch.status with "Fund the lock" and the token home link (the assistant does not fund it with prepare_vesting). Utila: launch.utila. In your wallet needs nothing more.
5. Putting it on DEX later (Base or Ethereum): prepare_open_trading, then launch.sign; after "I signed": get_signing_link, get_token, launch.market.
6. "What is left": get_red_flags, then launch.needs.

## Ground rules

- Every number, name, address and link comes from a tool result or the customer's words. If a value is missing, leave that key out.
- Agree on name and ticker before create_token_draft (the editor is that agreement). Ask before any tool that saves or prepares (a tap on a card button is that ask). Never ask for a private key or seed phrase. Never promise price, profit, returns or listings.
- Copy in sentence case, plain hyphens, no exclamation marks. Tabler outline icons only; never draw a logo.