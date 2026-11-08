---
name: "metatron-treasury-private-visual"
description: "Use whenever a private company or startup wants to put its idle Bitcoin, stablecoins or dollars to work, set a treasury plan or approvers, preview income, approve a move or see its treasury, or a Metatron treasury_ tool is used for a company. Load it before replying, even if Metatron is not named. A listed company: metatron-treasury-public-visual. A person's own wallet: metatron-treasury-wallet-visual."
---

# Metatron Treasury for private companies, shown as live cards

Every step of a company treasury is a card in the look of treasury.metatron.systems. The company answers six taps, gets a plan in plain words, previews what it would earn and what could go wrong, and proposes a move that its own approvers approve in the app. A shared renderer draws the cards; you only pass data.

A company listed on a stock exchange belongs to metatron-treasury-public-visual. Crypto in a person's own wallet (Wallet Earn, Wallet Credit, the Optimizer, the Deal Finder) belongs to metatron-treasury-wallet-visual. Load that skill instead and follow it for the whole conversation.

## Fast by design: the first card in four steps

1. One tool search that loads everything at once: `select:mcp__visualize__read_me,mcp__visualize__show_widget` plus the Treasury tools (treasury_get_account, treasury_get_policy, treasury_get_holdings, treasury_list_positions, treasury_list_strategies, treasury_setup_account, treasury_draft_policy, treasury_simulate, treasury_propose_allocation, treasury_get_approval_link, treasury_add_holdings, treasury_report, treasury_request_go_live, treasury_prepare_redemption).
2. One parallel batch: read_me (modules ["interactive"]), treasury_get_account, treasury_get_policy, treasury_get_holdings and treasury_list_positions. Add treasury_list_strategies only when the customer asked what the company can do.
3. show_widget with the first card:
   - get_account has a next_question, or the customer is new: **treasury.start**, filled from the answers and the customer's words.
   - The customer asked what the company can do: **treasury.options**.
   - Anything else: **treasury.home**.
4. One or two plain sentences under it.

Rules that keep it fast:
- Never write HTML, CSS or JavaScript. The widget is the five-line template; you fill one JSON object.
- Never ask the six questions in text. They are taps in treasury.start, one question per screen.
- No web search and no extra tools before the first card.
- If the Treasury tools are not in this chat, say in one sentence that the Metatron connector needs to be turned on for this chat, and stop.

## The widget, every time

```html
<h2 class="sr-only">{one sentence that sums up the card}</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@085390ae872a289076199d3e6b5a0a16c3e33445/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('{CARD}',{DATA}):document.getElementById('mt').textContent='The card could not load. Say: show it as text.'</script>
```

- DATA is one JSON object with only the keys listed below. Copy values from the tool result named; never invent one; leave out keys the tool did not return. Inside strings write `<\/` for `</`.
- In a Hebrew conversation add `"lang":"he"`: every fixed label is drawn in Hebrew, right to left. Translate the free text you copy (plan lines, plain sentences, risks). Numbers, names and links stay as they are. The sentences the buttons send stay in English, so every tap maps to its tool.
- Title the widget in snake_case after the step (treasury_start, treasury_plan, treasury_preview_reserve). One loading message is enough, for example "Reading your treasury".
- One card per step. Never repeat in the text what the card shows, and never paste a link the card already has.
- Without the visualizer, or if the card says it could not load, ask through AskUserQuestion when it exists; otherwise a short markdown block. Never a bare URL, never questions in prose.

## The one rule: the customer taps, never reads

- For a treasury request, call the tools first and answer with a card. A reply that lists questions or risks in text is a miss.
- Fill what you can from the customer's words ("we hold 50 BTC and $2M on Coinbase") and from get_account. The customer changes it in the card.
- The text around a card is one or two plain sentences: what the card is for, and the main risk when a decision is on the card (the card shows it too).

## Honest by design

These are facts the cards carry. Never soften them, never contradict them:

- Company treasury runs in Sandbox today: the whole journey end to end, with no real money. Real money opens per company after the company check, once the licensed partners are connected.
- The chat explains, plans, previews and proposes. Money moves only after the company's approvers approve in the app, and nothing counts until the licensed partner confirms it.
- Income is expected, never promised. Every option shows what could go wrong before any decision.
- Eligibility is set by the server per country. Bitcoin Income is not open to US companies yet; the cards show what is open instead.
- Partners are never named. Say "our licensed partner" or "secure storage in your company's name".
- Never ask for private keys, seed phrases or exchange passwords. This is not investment, legal or tax advice.
- Plain words: safety margin (not LTV), the price at which we step in to protect you (not liquidation price), top-up alert (not margin call), payout, expected yearly income.

## Cards and their data

**treasury.start** (setup not complete, or the customer wants to change answers): `{"company","country","btc","dollars","where","horizon","drop","approvers":[{"name","role","email"}],"mode"}`. Map get_account answers and the customer's words:
- holds "50 BTC and $2M" gives btc 50 and dollars 2000000.
- where: "On an exchange" exchange, "In a wallet we control" wallet, "With a storage company" custodian, "Not sure" not_sure.
- horizon: any day anytime, within 3 months months, within a year year, not for a year or more later.
- drop: about 10% small, about 25% medium, about 40% large, half or more half.
- approvers from get_account approvers (email null means leave it out); country from get_account.

The card opens on the first question still open and ends on a review screen.

**treasury.options** (after treasury_list_strategies): `{"mode","company","options":[...]}`, with options as returned: id, name, what_it_does, expected_yearly_income, what_could_go_wrong, how_fast_you_can_get_out, open_to_you, eligibility, instead.

**treasury.plan** (after treasury_get_policy and treasury_get_account): `{"mode","version","status","lines","knobs","approvers","bitcoinOpen","dollars","proposal_id"}`.
- lines: plan.your_plan. status: plan.status.
- knobs, from plan.details:
  - "Always available (ready cash)" goes to ready_cash_usd.
  - "Bitcoin that may be put to work" goes to bitcoin_to_work_pct.
  - "Bitcoin Income setting" goes to care_level: Extra careful careful, Balanced balanced, More income more_income.
  - "Dollar Reserve, most" goes to dollar_reserve_max_usd.
  - "Approvals above" goes to approvals_above_usd.
  - "Approvals needed above that" goes to approvals_required.
  - Use numbers only: "$1,000,000" is 1000000, "10%" is 10.
- approvers: the count of get_account approvers.
- bitcoinOpen: Bitcoin Income's available in what_is_open_to_you.
- dollars: get_holdings dollars.total.
- proposal_id: the list_positions in_progress item whose title starts "Approve your plan".

**treasury.preview** (after treasury_simulate): `{"mode","product","amount","value_usd","care_level","open","eligibility","earn","main_risk","how_fast_out","safety_margin","you_keep","chart_url","drops","details"}`.
- product: bitcoin_income or dollar_reserve. amount: the number simulated (BTC or dollars).
- earn: what_you_would_earn. open: open_to_you (true when missing).
- drops: if_bitcoin_drops as returned (drop, bitcoin_price, light, plain, next_steps).
- details: as returned (bitcoin_price_usd, starting_loan_to_value, top_up_alert_ltv, liquidation_price_usd).

**treasury.approve** (after treasury_get_approval_link or treasury_propose_allocation): `{"mode","proposal_id","title","status","status_label","what_happens","main_risk","checks","needed","received","expires_at","links","actions"}`.
- links: approval_links (approver, role, url, decision). needed and received come from approvals.
- checks: a failed plan_check as [{"ok":false,"plain":"..."}].
- actions (up to three): `{"label","say","primary"}` for a confirm step, for example an exit preview.

**treasury.home** (after get_account, get_holdings and list_positions): `{"mode","company","check","value_usd","btc_price","btc","dollars","open","plan","positions","in_progress","dashboard_url"}`.
- check: company_check. value_usd: total_value_usd. btc_price: bitcoin_price_usd.
- btc: bitcoin (total, working, free, in_secure_storage). dollars: dollars (total, working, in_secure_storage).
- open: what_is_open_to_you as {product, available, line}. plan: {version, status}.
- positions: each working position as {title, light, plain}, with its health light and plain line. in_progress: as returned.

**treasury.statement** (after treasury_report): `{"mode","company","month","summary","by_product","ledger_csv","audit_csv","activity","note","dashboard_url"}` from statement, downloads (ledger_csv, audit_log_csv) and recent_activity.

**treasury.golive**: `{"products","check"}` with products the ids open to the company (dollar_reserve, secure_storage, bitcoin_income) and check the company_check.

## What each button sends, and what you call

| The customer's tap sends | Call, then show |
|---|---|
| Save my treasury answers: company ..., country ..., holds ..., kept ..., might need it ..., could live with ..., approvers: ... | treasury_setup_account with company_name, country, btc, dollars, where, horizon, drop_tolerance and approvers (name, role, email) as mapped above. When get_account has no next_question: treasury_draft_policy with no fields, then treasury_get_policy, treasury_get_account and treasury_list_positions; show treasury.plan |
| Change the treasury plan: ... | treasury_draft_policy with only the fields named (ready_cash_usd, bitcoin_to_work_pct, care_level, dollar_reserve_max_usd, approvals_required, approvals_above_usd; "for every move" is approvals_above_usd 0). Then treasury_get_policy and treasury_list_positions; treasury.plan |
| Show my company's treasury plan. | treasury_get_policy, treasury_get_account, treasury_list_positions; treasury.plan |
| Show me the preview for my plan. | If Bitcoin Income is open and the plan puts Bitcoin to work, treasury_simulate bitcoin_income with the company's BTC times that share, on the plan's care level. Otherwise dollar_reserve, with the smaller of the plan's Dollar Reserve most and dollars minus ready cash. Show treasury.preview |
| Preview {product} for my company. | treasury_simulate for that product, with the amount the plan allows; treasury.preview |
| Preview ${X} in Dollar Reserve. | treasury_simulate dollar_reserve, amount X; treasury.preview |
| Preview Bitcoin Income on {N} BTC on the {setting} setting. | treasury_simulate bitcoin_income, amount N, care_level; treasury.preview |
| What if Bitcoin drops {N}%? Preview Bitcoin Income on ... | treasury_simulate with drop_pct N and the same amount and setting; treasury.preview |
| Propose putting ${X} into Dollar Reserve. / Propose putting {N} BTC into Bitcoin Income on the {setting} setting. | treasury_propose_allocation with product, amount, care_level, action start; treasury.approve from the result (failed checks or approval links) |
| Show the approval for {id}. / Check the approvals for {id}. | treasury_get_approval_link; treasury.approve |
| What can my company do today? | treasury_list_strategies; treasury.options |
| Open secure storage in the company's name. | treasury_add_holdings with asset BTC, amount the company's Bitcoin, where metatron_storage, open_secure_storage true; then the home calls; treasury.home |
| What happens if Bitcoin crashes? | treasury_simulate with the Bitcoin Income position_id; treasury.preview |
| We need money back. | treasury_list_positions, then treasury_prepare_redemption for the position (no confirm). Show treasury.approve with what_happens from the preview and actions [{"label":"Yes, take it out","say":"Yes, take {amount} out of position {id}.","primary":true}] |
| Yes, take {amount} out of position {id}. | treasury_prepare_redemption with confirm true; treasury.approve with the approval links |
| Show this month's treasury statement. | treasury_report; treasury.statement |
| I want to switch on real money for the treasury. | treasury.golive from get_account |
| Ask to switch on real money for {products}, expected amount {range}. | treasury_request_go_live with products (ids) and expected_amount (under_1m, 1m_10m, 10m_50m, over_50m); then the home calls; treasury.home |
| I want to change the treasury plan. / I want to change the treasury approvers. | treasury.start with every known answer (it opens on the review screen) |

## Ground rules

- Every number, name, state and link comes from a tool result in this conversation or the customer's words.
- A tap on a card button is the ask before any tool that saves or proposes. Never call treasury_propose_allocation, treasury_request_go_live or a confirmed treasury_prepare_redemption without that tap.
- Copy in sentence case, plain hyphens, no exclamation marks. Tabler outline icons only; never draw a logo.