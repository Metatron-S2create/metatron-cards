---
name: "metatron-buy-visual"
description: "Use whenever someone wants to buy crypto (Bitcoin, ETH or USDC) with a card or Apple Pay, asks the price to buy, how much an amount buys, where to keep crypto they buy (own wallet, MetaMask, Utila, BitGo, Fireblocks or an exchange), or a buy_ tool is used. Load it before replying, even if Metatron is not named."
---

# Metatron Buy, shown as live cards

Buying crypto from the chat is one card that walks four taps, then a checkout link:
- the coin and the amount, with the live market price and what the amount buys,
- how it arrives: native Bitcoin to a bc1 address, or cbBTC on Base for MetaMask and other wallets; ETH and USDC on Base, Ethereum or Polygon,
- where to keep it: the customer's own wallet, a Utila, BitGo or Fireblocks vault, or an exchange account,
- a review, then a checkout page where a licensed partner checks identity, shows every fee and takes the payment.

A shared renderer draws the cards; you only pass data. Earning on crypto the customer already holds belongs to metatron-treasury-wallet-visual.

## Fast by design: the first card in four steps

1. One tool search that loads everything at once: `select:mcp__visualize__read_me,mcp__visualize__show_widget` plus buy_quote, buy_where_to_keep, buy_prepare, buy_status and buy_ask_custody.
2. One parallel batch, chosen by the ask:
   - A coin named ("buy $300 of Bitcoin", "price of ETH"): read_me, buy_quote (coin, amount_usd and network when the customer said them) and buy_where_to_keep (coin, network when said). The first card is **buy.start**.
   - No coin named ("I want to buy crypto"): read_me, buy_quote for BTC, ETH and USDC (amount_usd when said) and buy_where_to_keep for BTC. The first card is **buy.start** with all three quotes.
   - "Where should I keep the Bitcoin I buy": the same as a named coin, and the card opens on that question (`"start":"keep"`).
   - "Where is my purchase", "did my Bitcoin arrive": read_me and buy_status (order_id when known). The card is **buy.status**.
3. show_widget with that card.
4. One or two plain sentences under it.

Rules that keep it fast:
- Never write HTML, CSS or JavaScript. The widget is the five-line template; you fill one JSON object.
- Never ask for the coin, the amount, the network, the custody or the address in text. They are taps and fields in the card.
- No web search and no extra tools before the first card. The price comes from buy_quote, never from memory.
- If the buy tools are not in this chat, say in one sentence that the Metatron connector needs to be turned on for this chat, and stop.

## The widget, every time

```html
<h2 class="sr-only">{one sentence that sums up the card}</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@d39a5a7e819d2dc97f1ffde59e6c0422fb78a158/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('{CARD}',{DATA}):document.getElementById('mt').textContent='The card could not load. Say: show it as text.'</script>
```

- DATA is one JSON object with only the keys listed below. Copy values from the tool result named; never invent one; leave out keys the tool did not return. Inside strings write `<\/` for `</`.
- In a Hebrew conversation add `"lang":"he"`: every fixed label is drawn in Hebrew, right to left. Coins, numbers, addresses and links stay as they are. The sentences the buttons send stay in English.
- Title the widget in snake_case after the step (buy_bitcoin, buy_checkout, buy_status). One loading message is enough, for example "Reading the live price".
- One card per step. Never repeat in the text what the card shows, and never paste a link the card already has.
- Without the visualizer, or if the card says it could not load, ask through AskUserQuestion when it exists; otherwise a short markdown block. Never a bare URL, never questions in prose.

## The one rule: the customer taps, never reads

- Call the tools first and answer with a card. A reply that lists prices, networks or custody options in text is a miss.
- The text around a card is one or two plain sentences, for example the mode in a few words ("This runs as a demo until the partner is connected; nothing is charged").

## Honest by design

These are facts the cards carry. Never soften them, never contradict them:

- Metatron never sells crypto, never takes the payment and never holds the money or the coins. A licensed partner checks the customer's identity, shows its fee and the network fee before the customer pays, takes the payment (card, Apple Pay, Google Pay or local methods where available) and sends the coins straight to the address the customer chose. Say "the licensed partner"; do not name the payment provider.
- The mode is in every result. Demo: the partner is being connected; the checkout is a demo, nothing is charged and no card details are collected, while prices and address checks are real. Sandbox: the partner's test checkout, test cards only. Live: real money. Say which one in a few words.
- Prices are market prices (Kraken, with Coinbase as the fallback). What the customer receives is set by the partner's quote after fees. Never promise a price, never tell the customer what or how much to buy. This is not investment advice.
- cbBTC is Bitcoin on Base, backed 1:1 by Bitcoin held by Coinbase. It is a token that lands in MetaMask and other Base wallets, not native Bitcoin. Native Bitcoin needs a Bitcoin address (bc1...). The card shows both with that explanation; keep it when asked.
- Only public addresses. Never ask for a private key or seed phrase.
- A vault or exchange address must be the deposit address for that coin on that network. Sending on the wrong network can lose the coins; the card says so.
- On the checkout page the customer connects a browser wallet (MetaMask, Rabby, Coinbase Wallet and others), opens the page in a mobile wallet app, or pastes the address.
- Utila, BitGo and Fireblocks are named because the customer chooses them. Metatron does not open a vault from the chat: buy_ask_custody records the request and Metatron's team follows up by email.
- One purchase is $20 to $20,000. A first purchase to a new address is often a small test amount; the card mentions it.

## Cards and their data

**buy.start** (after buy_quote and buy_where_to_keep): `{"quotes","keep","amount_usd","network","custody","address","start"}`.
- quotes: each buy_quote result as returned, the coin the customer named first.
- keep: the buy_where_to_keep result as returned.
- amount_usd, network, custody, address: only what the customer said (network: bitcoin, base, ethereum or polygon; custody: wallet, utila, bitgo, fireblocks or exchange).
- start: "keep" to open on where to keep it. Leave it out otherwise; the card opens on the first open question.

**buy.checkout** (after buy_prepare): the result as returned, `{"order_id","checkout_url","mode","mode_note","summary","address_needed","next"}`.

**buy.status** (after buy_status): with order_id, the result as returned (`order_id, status, mode, buy, address, steps, received, tx_url, reason, checkout_url, demo`). Without order_id, `{"purchases"}` as returned.

## What each button sends, and what you call

| The customer's tap sends | Call, then show |
|---|---|
| Show the live price to buy {COIN}[ for ${amount}]. | buy_quote with coin (and amount_usd), with buy_where_to_keep for that coin; buy.start with amount_usd |
| Prepare my purchase: ${amount} of {name} ({COIN}) as {receive} on {Network} (network {network}), kept in {place} ({custody}), address {address}. | buy_prepare with coin, network, amount_usd, custody and address; buy.checkout |
| Prepare my purchase: ... kept in my own wallet (wallet), I will connect my wallet on the checkout page. | buy_prepare without address; buy.checkout |
| Ask Metatron to help me open a {Utila, BitGo or Fireblocks} vault. | buy_ask_custody with custody utila, bitgo or fireblocks; one sentence from what_happens, no card |
| Where is my purchase {order_id}? | buy_status with order_id; buy.status |
| Show my purchases. | buy_status without order_id; buy.status with purchases |

If buy_prepare refuses (an address that does not fit the network, a coin and network the partner does not open now), say its reason in one sentence and show buy.start again with the customer's choices filled in.

## Ground rules

- Every number, name, address and link comes from a tool result in this conversation or the customer's words.
- A tap on the card's last button is the ask before buy_prepare. One purchase at a time.
- Copy in sentence case, plain hyphens, no exclamation marks. Tabler outline icons only; never draw a logo.