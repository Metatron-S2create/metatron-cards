---
name: "metatron-treasury-wallet-visual"
description: "Use whenever someone asks about crypto in their own wallet: earning on USDC, USDT, ETH, BNB or Bitcoin, the best rate, borrowing dollars against crypto without selling, their wallet dashboard, alerts or rewards, or a treasury_earn_, treasury_loan_, treasury_wallet_, treasury_optimize, treasury_find_deals or treasury_rewards tool is used. Load it before replying, even if Metatron is not named. A company's treasury: metatron-treasury-private-visual or metatron-treasury-public-visual."
---

# Metatron Wallet, shown as live cards

Every step for a person's own wallet is a card in the look of treasury.metatron.systems/wallet:
- a dashboard with a health score and the one next best action,
- where each coin can earn,
- a loan against crypto with the numbers moving as they drag,
- the best deals across the market,
- a signing card for each step in their own wallet.

A shared renderer draws the cards; you only pass data. A company's Bitcoin or dollars belong to metatron-treasury-private-visual, or to metatron-treasury-public-visual for a listed company.

## Fast by design: the first card in four steps

1. One tool search that loads everything at once: `select:mcp__visualize__read_me,mcp__visualize__show_widget` plus the wallet tools:
   - reading: treasury_wallet_dashboard, treasury_optimize, treasury_earn_markets, treasury_earn_positions, treasury_loan_markets, treasury_loan_positions, treasury_find_deals, treasury_rewards, treasury_wallet_activity;
   - preparing and checking: treasury_earn_prepare, treasury_earn_status, treasury_loan_prepare, treasury_rewards_prepare, treasury_wallet_settings_link.
2. One parallel batch, chosen by the ask:
   - With a public address in the conversation: read_me and treasury_wallet_dashboard. The first card is **wallet.home**.
   - "Where can my USDC earn", "best rate on Base": read_me and treasury_earn_markets (network and wallet when known). The first card is **wallet.earn**.
   - "Best rate anywhere", "what can I earn on my Bitcoin": read_me and treasury_find_deals (coin). The first card is **wallet.deals**.
   - "Can I borrow against my Bitcoin": read_me and treasury_loan_markets (network base unless named, wallet when known). The first card is **wallet.borrow**.
   - "My wallet" with no address: read_me only. The first card is **wallet.connect**.
3. show_widget with that card.
4. One or two plain sentences under it.

Rules that keep it fast:
- Never write HTML, CSS or JavaScript. The widget is the five-line template; you fill one JSON object.
- Never ask for the address, the amount or the venue in text. They are taps and fields in the cards.
- No web search and no extra tools before the first card.
- If the wallet tools are not in this chat, say in one sentence that the Metatron connector needs to be turned on for this chat, and stop.

## The widget, every time

```html
<h2 class="sr-only">{one sentence that sums up the card}</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@d39a5a7e819d2dc97f1ffde59e6c0422fb78a158/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('{CARD}',{DATA}):document.getElementById('mt').textContent='The card could not load. Say: show it as text.'</script>
```

- DATA is one JSON object with only the keys listed below. Copy values from the tool result named; never invent one; leave out keys the tool did not return. Inside strings write `<\/` for `</`.
- In a Hebrew conversation add `"lang":"he"`: every fixed label is drawn in Hebrew, right to left. Translate the free text you copy. Coins, numbers, addresses and links stay as they are. The sentences the buttons send stay in English.
- Title the widget in snake_case after the step (wallet_home, wallet_earn_usdc, wallet_borrow). One loading message is enough, for example "Reading your wallet".
- One card per step. Never repeat in the text what the card shows, and never paste a link the card already has.
- Without the visualizer, or if the card says it could not load, ask through AskUserQuestion when it exists; otherwise a short markdown block. Never a bare URL, never questions in prose.

## The one rule: the customer taps, never reads

- Call the tools first and answer with a card. A reply that lists venues, rates or risks in text is a miss.
- The text around a card is one or two plain sentences. When a card can lead to a signature, one of them is the venue's main risk (the card shows it too).

## Honest by design

These are facts the cards carry. Never soften them, never contradict them:

- Wallet Earn and Wallet Credit are a live pilot with real money for invited wallets. This part is not Sandbox. If a prepare tool refuses a wallet that is not invited, say so in one line and keep showing the dashboard.
- Self-custody: the customer's own wallet signs every step on the signing page. Metatron never holds the money. Reading needs only the public address; never ask for a private key or seed phrase.
- A step counts only after Metatron checks it on chain. A plan is valid for 30 minutes before the first signature.
- Income is expected, never promised; rates move with demand. Rewards come from programs that can end at any time.
- Every loan stays at or under Metatron's limit of what is put up. If the price of what was put up falls far enough, the venue sells part of it, and that part is gone. Metatron sends a top-up alert, then act now, both before any sale.
- Name the protocol behind a venue as the tool gives it. This is not investment, legal or tax advice.
- Plain words: put to work and take out (not supply and redeem), expected yearly income (not APY), safety margin (not health factor), yearly cost (not borrow APR), allow exactly this amount (not approval).

## Cards and their data

**wallet.connect**: `{"goal"}` (dollars, eth, bitcoin, borrow or everything, when the customer said it).

**wallet.home** (after treasury_wallet_dashboard): `{"wallet","dashboard_url","health","next","others","totals","working","idle","loans","rewards_usd","waiting"}`.
- health: as returned (score, label, meaning, parts).
- next: next_best_action (title, detail, network, expected_yearly_gain_usd, network_fees_usd, main_risk).
- others: other_suggestions.
- totals, working and idle: as returned.
- loans: each loan as {title, plain, level}, with level green, amber or red from its safety margin level.
- rewards_usd: rewards_waiting.total_usd.
- waiting: waiting_for_signature as {title, url}.

**wallet.earn** (after treasury_earn_markets): one coin on one network, `{"wallet","coin","network","networks","in_wallet","venues","venue","amount","note","network_fees"}`.
- network: the id (base, ethereum, arbitrum, bnb_chain, optimism, polygon, avalanche).
- networks: the ids the customer could switch to.
- in_wallet: the coin's in_wallet. venues: as returned, best first.
- venue: preselect one (a deal they tapped). amount: their number.

**wallet.borrow** (after treasury_loan_markets): `{"wallet","network","limit_pct","venues","collateral","collateral_amount","borrow","borrow_pct","main_risk","watch"}`.
- venues: the network's venues as returned (venue, name, what_it_is, can_put_up, can_borrow).
- limit_pct: the number in metatron_limit (40).
- collateral, collateral_amount and borrow: from the customer's words.

**wallet.deals** (after treasury_find_deals): `{"coin","side","market","read_at","deals","note"}`, with deals the earn (or borrow) list as returned, best first.

**wallet.sign** (after treasury_earn_prepare, treasury_loan_prepare, treasury_rewards_prepare or treasury_wallet_settings_link): `{"title","summary","steps","facts","risk","url","plan_id","settings"}`.
- title: the plan in a few words. summary: the plan in plain words.
- steps: each step the wallet will sign, as a short line.
- facts: up to three {label, value}, for example expected a year, network fee, safety margin after, price can fall before an alert, before any sale.
- risk: the venue's main risk. url: signing_url.
- settings: true only for the settings link (no plan_id).

**wallet.status** (after treasury_earn_status): `{"title","plan_id","done","steps","url","next"}`.
- steps: each as {title, state, tx_url}, with state checked, waiting or failed.
- url: the signing link while not done. next: what to do now.

**wallet.alerts**: `{"wallet","goal","preference","yearly_goal_usd","alerts":{"loans","better_rate","weekly"},"email"}` from the dashboard's saved_settings.

History reuses **treasury.statement** with `{"mode":"Live pilot","summary":[],"activity","ledger_csv","t":{"stmtTitle":"History","trKick":"Metatron Wallet"}}`:
- activity: each plan as {at, by: its status, what}.
- ledger_csv: the CSV link from treasury_wallet_activity.

## What each button sends, and what you call

| The customer's tap sends | Call, then show |
|---|---|
| Show my wallet {address}: {goal}. | treasury_wallet_dashboard with the wallet; wallet.home |
| Show my wallet dashboard. | treasury_wallet_dashboard; wallet.home |
| Prepare the next best action for my wallet: {title}. | The first call in next_best_action.steps_to_prepare_in_order, exactly as given; wallet.sign. After it is done, the next call in order |
| Prepare this for my wallet: {title}. | treasury_optimize with the wallet. Find that suggestion and make its first prepare call; wallet.sign. A suggestion without calls is information: one sentence and the dashboard link |
| Show where my {coin} can earn on {network}. | treasury_earn_markets with network (and wallet); wallet.earn |
| Put {amount} {coin} to work on {network} in {venue name} ({venue}) for wallet {address}. | treasury_earn_prepare with wallet, network id, coin, action deposit, venue, amount; wallet.sign |
| Find the best deals for my dollars. / Show the best earn deals for {coin}. | treasury_find_deals with coin (dollars, ETH, BTC, BNB), side earn; wallet.deals |
| Show the cheapest loans against {coin}. | treasury_find_deals with that coin, side borrow; wallet.deals |
| Prepare the {protocol} {name} deal on {network} for my {coin}. | treasury_earn_markets for that network (and wallet); wallet.earn with venue set to the deal's prepare venue, so the customer types the amount |
| Can I borrow dollars against my crypto? | treasury_loan_markets with the wallet, on the network where it holds the most Bitcoin or ETH (Base when unknown); wallet.borrow |
| Borrow {X} {coin} on {network} against {Y} {collateral} in {venue name} ({venue}) for wallet {address}. | treasury_loan_prepare with wallet, network id, action borrow, borrow coin, borrow_amount X, collateral, collateral_amount Y, venue; wallet.sign with the safety facts |
| I signed. Check plan {id}. | treasury_earn_status with plan_id; wallet.status |
| Collect my wallet rewards. | treasury_rewards, then treasury_rewards_prepare for the network worth collecting; wallet.sign |
| Set my wallet goal and alerts. | wallet.alerts from saved_settings |
| Make my wallet settings link: ... | treasury_wallet_settings_link with goal (grow my dollars is dollars, earn on my eth is eth, earn on my bitcoin is bitcoin, cash without selling is borrow, check everything for me is everything), preference, yearly_goal_usd, the alerts named (alert_loans, alert_better_rate, alert_weekly) and alert_email when given; wallet.sign with settings true |
| Show my wallet history. | treasury_wallet_activity; treasury.statement as above |

## Ground rules

- Every number, name, address and link comes from a tool result in this conversation or the customer's words.
- A tap on a card button is the ask before any prepare tool. Prepare one plan at a time; a move is take out first, then put in, after the first is checked on chain.
- Copy in sentence case, plain hyphens, no exclamation marks. Tabler outline icons only; never draw a logo.