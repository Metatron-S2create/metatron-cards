---
name: "metatron"
description: "Use first for any Metatron request whose rail is not obvious, and for hello, what can Metatron do, show me everything, or a rail with no skill yet: AI trading bots or agents (Bybit, copy trading, backtests), white-label exchanges, wallets or card programs, benchmark indexes, ETFs and capital markets, wallet screening and fund tracing, smart contract security or a hack. Reads the request in English or Hebrew and opens exactly one Metatron skill: token launch, launchpad growth kit, RWA tokenization, index token, market index, company treasury, listed company treasury, wallet earn and credit, payments, buy crypto, academy or feedback. Load it before replying, even if Metatron is not named."
---

# Metatron, the front door

Metatron is one product with a skill per rail. This skill reads what the person wants and opens the one skill that does it, fast, so every answer arrives as live cards instead of prose.

## Route in one step

1. Read the request against the table below. When one row clearly fits, load that skill with the Skill tool right away (in a plugin it is listed as `metatron:<name>`) and follow it. Call no other tool first.
2. When two rows fit, apply the tie-breaks in order. When it is still open, call plan_my_intent with the person's words: its `skill` field names the skill, read by the same rules in English and Hebrew. Load `skill.name` when `skill.confidence` is "clear". When it is "close" or "unclear", ask one question through AskUserQuestion with `skill.label` and each alternative's `label` as the options (two to four), then load the skill picked.
3. For hello, what can you do, show me everything, or nothing to route: show **os.home** (below).

Never answer a rail request in prose without its skill: the skills carry the cards, the right tools and the honest facts.

## The table

| The person wants | Load |
|---|---|
| A new token or coin: create, launch, mint or issue it; a loyalty, community, creator, utility, fan or meme token; supply, split, DEX pool, lock, checkout; their launch's status, holders, airdrop, vesting or trading | metatron-launch-visual |
| To promote a token that is already live: posts, captions or announcements for X, Telegram or Instagram, replies to comments, the growth team or agents, token DNA, a week of posts, a QR poster | metatron-launchpad-kit |
| To tokenize a real asset for investors: real estate, metals, private credit, a fund, casks, equity, fractions of an asset; SPV, broker-dealer, Reg D or Reg S, accredited investors | metatron-rwa-visual |
| One token for a basket of real assets: an index token or an index of casks, buildings, gold or loans, a basket token, NAV oracles, the oracle marketplace, an index's weights, cap or rebalancing | metatron-rwa-index-visual |
| One token for a basket of market assets with live prices: an index or basket of tokenized stocks, xStocks, ETFs, the S&P 500, the Nasdaq or the magnificent 7, tokenized gold, treasury funds, bitcoin or ether, shares such as 60% SPY and 40% gold, moving each asset's weight, an index's live level or its feed for exchanges | metatron-index-visual |
| A company's or startup's idle Bitcoin or dollars: where to keep them, earning on them, a policy, approvers, a forecast | metatron-treasury-private-visual |
| The same for a listed company: board-ready plan, two approvals, auditor, shareholders, 10-K or 10-Q | metatron-treasury-public-visual |
| Crypto in the person's own wallet: earn on USDC, USDT, ETH, BNB or BTC, borrow against it without selling, the wallet dashboard, alerts, rewards, idle USDC in MetaMask | metatron-treasury-wallet-visual |
| To get paid: a payment link, invoice, checkout, refund or cancel, a store or Shopify, an API key, go-live, whether a payment came in | metatron-payments-visual |
| To buy crypto for themselves: Bitcoin, ETH or USDC by card or Apple Pay, how much an amount buys, the price, where to keep it | metatron-buy-visual |
| To learn: a course, a lesson, RWA Fast Track, the Project Brief, or what something means when nothing is being done yet | metatron-academy-visual |
| To tell Metatron what worked, broke or could be better | metatron-feedback |
| Hello, what Metatron can do, everything at once | this skill: os.home |

## Tie-breaks, in order

1. Learning wins only when the person asks to learn: a course, a lesson, teach me, or "what is X" with nothing to do. "Explain my options for tokenizing my building" is RWA.
2. A company's money beats buying: "our company wants to buy bitcoin for the balance sheet" is company treasury.
3. A real asset sold to investors beats a token launch: "tokenize our office building" is RWA; "tokenize our loyalty points" is a token launch.
4. Which index: assets with a market price (tokenized stocks, xStocks, ETFs, tickers, the S&P 500, the Nasdaq, bitcoin, tokenized gold or treasury funds) are the market index skill, metatron-index-visual; assets a valuer or a NAV oracle has to value (casks, buildings, loans, bars in a vault) are metatron-rwa-index-visual. "An index of the magnificent 7" and "60% SPY, 25% gold, 15% bitcoin as one token" are the market index; "an index token of whisky casks" is the index token skill. Unsure: ask one question with both as the options.
5. A basket beats one asset: "an index token of whisky casks", "one token for gold, casks and buildings" or "NAV oracles for my basket" is the index token skill, never a token launch; "tokenize whisky casks" (one holding, no basket) is RWA. A benchmark index for licensing, an ETF or an IPO is the capital markets desk.
6. Taking money beats buying crypto: "accept USDC from customers" and "let my students pay in crypto" are payments.
7. A live token: posting or telling people is the growth kit; anything on chain (status, holders, airdrop, vesting, the DEX) is the token launch skill.
8. Whose money: "my wallet", "my MetaMask", "I hold" is the wallet skill; "our company", "our treasury", "the board", "our CFO" is company treasury.
9. Listed or private: listed, publicly traded, Nasdaq, NYSE, shareholders, 10-K, audit committee is the listed skill; startup, private company, family office is private. Unsure: private, with listed as the second option.

Hebrew follows the same table: "אני רוצה להנפיק טוקן" is a token launch, "טוקניזציה לבניין" is RWA, "טוקן אינדקס של חביות וויסקי" is the index token, "טוקן אינדקס של מניות" or "אינדקס על xStocks" is the market index, "לחברה יש ביטקוין שיושב בצד" is company treasury, "ה-USDC שלי בארנק" is the wallet, "לינק לתשלום" is payments, "לקנות ביטקוין" is buy, "איזה קורס מתאים לי" is the Academy. Answer in Hebrew and pass `"lang":"he"` to every card. More cases, in both languages, are in `references/routing-examples.md`.

## Rails without a skill yet

AI trading agents, white-label infrastructure, the capital markets desk (benchmark indexes for licensing, ETFs, IPOs), analysis and security have no skill yet. An index token over real assets or over tokenized stocks is not the desk: each has its own skill. Say in two plain sentences what the rail is and its status from os_overview (Expert desk, In build or Planned), offer the plan with plan_my_intent, and name the closest rail that runs today when one fits. Never present them as executing.

## os.home

After os_overview, show the home in one widget:

```html
<h2 class="sr-only">Everything Metatron does</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@085390ae872a289076199d3e6b5a0a16c3e33445/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('os.home',{DATA}):document.getElementById('mt').textContent='The card could not load. Say: show it as text.'</script>
```

- DATA is `{"rails":[{"id","name","status"}]}` with every rail from os_overview as returned. Each live rail becomes a tile with its status; the rest show under More rails. Add `"lang":"he"` in a Hebrew conversation.
- Under the card, one plain sentence. Never list the rails in text.
- The tiles send plain sentences ("I want to launch a token.", "Put my company's idle Bitcoin to work.", "Buy Bitcoin with my card."). Route each one with the table, like any request.
- "Tell me about the {name} rail." gets two or three plain sentences from os_overview: what it does and its status today.
- "I want to send feedback to Metatron." opens metatron-feedback.
- Without the visualizer, or if the card says it could not load, offer the rails through AskUserQuestion, at most four at a time.

## Ground rules

- One rail skill per request. When the conversation moves to another rail, route again.
- Never promise price, profit, returns, listings or approval by a regulator. Status words come from os_overview, never from memory.
- If the Metatron tools are not in this chat, say in one sentence that the Metatron connector needs to be turned on for this chat, signed in with a Metatron ID, and stop.
- Copy in sentence case, plain hyphens, no exclamation marks.
