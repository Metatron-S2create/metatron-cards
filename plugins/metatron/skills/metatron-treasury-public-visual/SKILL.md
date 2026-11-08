---
name: "metatron-treasury-public-visual"
description: "Use whenever a publicly listed company (traded on a stock exchange) wants to hold or put to work Bitcoin, stablecoins or idle dollars, set a board-ready treasury plan with dual approvals, prepare for its auditor or board, connect the treasury to its own systems, or a Metatron treasury_ tool is used for a listed company. Load it before replying, even if Metatron is not named. A private company: metatron-treasury-private-visual. A person's own wallet: metatron-treasury-wallet-visual."
---

# Metatron Treasury for listed companies, shown as live cards

The same Treasury rail as for private companies, set up for a listed company. Every step is a card in the look of treasury.metatron.systems.

On top of the private flow, the cards add:
- two approvers by default,
- a readiness checklist that separates what Metatron holds from what stays with the board, counsel and auditor,
- statements framed for the auditor,
- a guided connection to the company's own systems.

A shared renderer draws the cards; you only pass data. A private company belongs to metatron-treasury-private-visual. Crypto in a person's own wallet belongs to metatron-treasury-wallet-visual.

## Fast by design: the first card in four steps

1. One tool search that loads everything at once: `select:mcp__visualize__read_me,mcp__visualize__show_widget` plus the Treasury tools:
   - account and plan: treasury_get_account, treasury_get_policy, treasury_get_holdings, treasury_list_positions, treasury_list_strategies, treasury_setup_account, treasury_draft_policy;
   - money moves: treasury_simulate, treasury_propose_allocation, treasury_get_approval_link, treasury_add_holdings, treasury_prepare_redemption, treasury_request_go_live;
   - reporting and systems: treasury_report, treasury_integration_plan, treasury_integration_test, treasury_integration_status.
2. One parallel batch: read_me (modules ["interactive"]), treasury_get_account, treasury_get_policy, treasury_get_holdings and treasury_list_positions. Add treasury_integration_status when the customer asks about readiness, the board or the auditor.
3. show_widget with the first card. Every card gets `"public":true`.
   - Setup not complete: **treasury.start**.
   - Readiness, board, auditor or "are we ready": **treasury.governance**.
   - Connecting systems, an ERP, Slack or webhooks: **treasury.connect**.
   - Anything else: **treasury.home**.
4. One or two plain sentences under it.

Rules that keep it fast:
- Never write HTML, CSS or JavaScript. The widget is the five-line template; you fill one JSON object.
- Never ask the setup questions in text. They are taps in treasury.start, one question per screen.
- No web search and no extra tools before the first card.
- If the Treasury tools are not in this chat, say in one sentence that the Metatron connector needs to be turned on for this chat, and stop.

## The widget, every time

```html
<h2 class="sr-only">{one sentence that sums up the card}</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@085390ae872a289076199d3e6b5a0a16c3e33445/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('{CARD}',{DATA}):document.getElementById('mt').textContent='The card could not load. Say: show it as text.'</script>
```

- DATA is one JSON object with only the keys listed below, plus `"public":true`. Copy values from the tool result named; never invent one; leave out keys the tool did not return. Inside strings write `<\/` for `</`.
- In a Hebrew conversation add `"lang":"he"`: every fixed label is drawn in Hebrew, right to left. Translate the free text you copy. Numbers, names and links stay as they are. The sentences the buttons send stay in English.
- Title the widget in snake_case after the step (treasury_readiness, treasury_plan, treasury_connect). One loading message is enough.
- One card per step. Never repeat in the text what the card shows, and never paste a link the card already has.
- Without the visualizer, or if the card says it could not load, ask through AskUserQuestion when it exists; otherwise a short markdown block. Never a bare URL, never questions in prose.

## The one rule: the customer taps, never reads

- Call the tools first and answer with a card. A reply that lists questions or risks in text is a miss.
- Fill what you can from the customer's words and from get_account; the customer changes it in the card.
- The text around a card is one or two plain sentences.

## Honest by design

These are facts the cards carry. Never soften them, never contradict them:

- Company treasury runs in Sandbox today: the whole journey end to end with no real money. Real money opens per company after the company check, once the licensed partners are connected.
- The chat explains, plans, previews and proposes. Money moves only after the company's approvers approve in the app, and nothing counts until the licensed partner confirms it.
- Income is expected, never promised. Every option shows what could go wrong before any decision. Eligibility is set by the server per country.
- Metatron holds the controls in the product: plan versions, approvers and thresholds, approval links, the monthly ledger and audit log, secure storage in the company's name, events into the company's systems.
- What the company discloses, and when, is its counsel's decision. How the holdings are measured and reported is agreed with its auditor. Board approval of the plan is the board's. Never state disclosure, accounting or listing rules; never say a step satisfies a regulator.
- Partners are never named. Never ask for private keys, seed phrases or exchange passwords. This is not investment, legal or tax advice.
- Plain words: safety margin, the price at which we step in to protect you, top-up alert, payout, expected yearly income.

## Cards and their data

The company cards take the same data as in metatron-treasury-private-visual, with `"public":true`:

**treasury.start**: `{"company","country","btc","dollars","where","horizon","drop","approvers":[{"name","role","email"}],"mode","public":true}`.
- where: exchange, wallet, custodian or not_sure. horizon: anytime, months, year or later. drop: small, medium, large or half.
- Map them from get_account answers: "On an exchange" is exchange; "We could need it any day" is anytime; "about 25%" is medium.
- The card starts with two approver rows and notes that a listed company usually has two people approve every move.

**treasury.options** (after treasury_list_strategies): `{"mode","options":[...],"public":true}` with options as returned.

**treasury.plan**: `{"mode","version","status","lines","knobs","approvers","bitcoinOpen","dollars","proposal_id","public":true}`.
- lines: plan.your_plan.
- knobs from plan.details as numbers: ready_cash_usd, bitcoin_to_work_pct, care_level (careful, balanced, more_income), dollar_reserve_max_usd, approvals_above_usd, approvals_required.
- approvers: the count from get_account. bitcoinOpen from what_is_open_to_you. dollars: get_holdings dollars.total.
- proposal_id: the in_progress "Approve your plan" item.
- The card warns when fewer than two approvals are set.

**treasury.preview** (after treasury_simulate): `{"mode","product","amount","value_usd","care_level","open","eligibility","earn","main_risk","how_fast_out","safety_margin","you_keep","chart_url","drops","details","public":true}`. earn is what_you_would_earn; drops is if_bitcoin_drops; details as returned.

**treasury.approve**: `{"mode","proposal_id","title","status","status_label","what_happens","main_risk","checks","needed","received","expires_at","links","actions","public":true}`.
- links: approval_links. needed and received come from approvals.
- checks: a failed plan_check as [{"ok":false,"plain"}].
- actions: up to three {label, say, primary}.

**treasury.home**: `{"mode","company","check","value_usd","btc_price","btc","dollars","open","plan","positions","in_progress","dashboard_url","public":true}`. Built from three results:
- get_account: company, company_check as check, what_is_open_to_you as open {product, available, line}, plan {version, status}, dashboard_url.
- get_holdings: total_value_usd as value_usd, bitcoin_price_usd as btc_price, bitcoin as btc, dollars.
- list_positions: positions as {title, light, plain}, and in_progress.

Its buttons add "Listed-company readiness" and "Connect to our systems".

**treasury.statement** (after treasury_report): `{"mode","company","month","summary","by_product","ledger_csv","audit_csv","activity","note","dashboard_url","public":true}`. The card is labelled ready for the auditor.

**treasury.golive**: `{"products","check","public":true}`.

**treasury.governance** (readiness): `{"mode","approvers","approvals_required","plan","check","storage","connected"}`.
- approvers: get_account approvers count. approvals_required: "Approvals needed above that" from plan.details.
- plan: {version, status} from get_policy. check: company_check.
- storage: true when get_holdings shows anything in_secure_storage.
- connected: true only when treasury_integration_status says the connection is live.

The card shows seven controls in Metatron and three items that stay with the board, counsel and auditor.

**treasury.connect**: `{"mode","wants","stack","alerts_to","webhook_url","public":true}`. Before a plan exists, it is three taps.

After treasury_integration_plan, the same card takes `{"plan":{"steps":[...],"events":[...],"page_url"}}`:
- steps: the plan's steps as short titles.
- events: the webhook event names.
- page_url: the live diagram page.

## What each button sends, and what you call

| The customer's tap sends | Call, then show |
|---|---|
| Save my treasury answers: company ..., country ..., holds ..., kept ..., might need it ..., could live with ..., approvers: ... | treasury_setup_account with company_name, country, btc, dollars, where, horizon, drop_tolerance and approvers (name, role, email). When complete: treasury_draft_policy with approvals_required 2 if there are two or more approvers. Then treasury_get_policy, treasury_get_account and treasury_list_positions; treasury.plan |
| Change the treasury plan: ... | treasury_draft_policy with only the fields named ("for every move" is approvals_above_usd 0); then treasury_get_policy and treasury_list_positions; treasury.plan |
| Show my company's treasury plan. | treasury_get_policy, treasury_get_account, treasury_list_positions; treasury.plan |
| Show me the preview for my plan. / Preview {product} for my company. / Preview ${X} in Dollar Reserve. / Preview Bitcoin Income on {N} BTC on the {setting} setting. / What if Bitcoin drops {N}%? ... | treasury_simulate as the sentence says (product, amount, care_level, drop_pct); treasury.preview |
| Propose putting ${X} into Dollar Reserve. / Propose putting {N} BTC into Bitcoin Income on the {setting} setting. | treasury_propose_allocation with product, amount, care_level, action start; treasury.approve |
| Show the approval for {id}. / Check the approvals for {id}. | treasury_get_approval_link; treasury.approve |
| What can my company do today? | treasury_list_strategies; treasury.options |
| Open secure storage in the company's name. | treasury_add_holdings with asset BTC, amount the company's Bitcoin, where metatron_storage, open_secure_storage true; the home calls; treasury.home |
| We need money back. | treasury_prepare_redemption preview for the position. Show treasury.approve with actions [{"label":"Yes, take it out","say":"Yes, take {amount} out of position {id}.","primary":true}] |
| Yes, take {amount} out of position {id}. | treasury_prepare_redemption with confirm true; treasury.approve |
| Show this month's treasury statement. | treasury_report; treasury.statement |
| Show our listed-company readiness. | treasury_get_account, treasury_get_policy, treasury_get_holdings, treasury_integration_status; treasury.governance |
| Connect the treasury to our systems. | treasury.connect (three taps) |
| Design our treasury connection: {wants}; stack {stack}; alerts to {where}; webhook {url}. | treasury_integration_plan with wants (follow, alerts, statements, approvals), stack (node, python, zapier, ai_only), alerts_to (own_server, slack, email, none), webhook_url, company_name. Then treasury.connect with the plan |
| Run the treasury integration test. | treasury_integration_test; treasury.connect with the plan and one plain sentence on the result |
| Write a one-page board summary of our treasury plan. | treasury_get_policy and treasury_get_account. Write a short plain summary as text, marked "Draft for counsel": what the plan says, who approves and above what amount, what is open, each product's main risk, and that it runs in Sandbox until real money is switched on. No recommendations and no disclosure or accounting statements |
| I want to switch on real money for the treasury. | treasury.golive |
| Ask to switch on real money for {products}, expected amount {range}. | treasury_request_go_live with product ids and expected_amount (under_1m, 1m_10m, 10m_50m, over_50m); the home calls; treasury.home |
| I want to change the treasury plan. / I want to change the treasury approvers. | treasury.start with every known answer (it opens on the review screen) |

## Ground rules

- Every number, name, state and link comes from a tool result in this conversation or the customer's words.
- A tap on a card button is the ask before any tool that saves or proposes.
- Copy in sentence case, plain hyphens, no exclamation marks. Tabler outline icons only; never draw a logo.