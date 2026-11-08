---
name: "metatron-payments-visual"
description: "Use whenever someone wants to take a payment, send a payment link or invoice, check whether a customer paid, refund or cancel, see payment totals, connect payments to their store, site, app or Shopify, go live with payments, or a pay_ tool is used. Load it before replying, even if Metatron is not named."
---

# Metatron Pay, shown as live cards

Every payments step is a card in the look of payb.metatron.systems:
- a payment link in one screen: amount, what it is for, how the customer pays,
- the link ready to copy and send, then its status, timeline and refunds,
- totals and recent payments,
- connecting the customer's own business: four questions, then their payments architecture drawn as lanes they can play through, the steps, code for their stack and an end-to-end test,
- going live and API keys.

A shared renderer draws the cards; you only pass data. Buying crypto for yourself belongs to metatron-buy-visual.

## Fast by design: the first card in four steps

1. One tool search that loads everything at once: `select:mcp__visualize__read_me,mcp__visualize__show_widget` plus pay_get_account, pay_setup_account, pay_create_payment_link, pay_get_payment, pay_list_payments, pay_cancel_payment, pay_refund_payment, pay_summary, pay_request_go_live, pay_create_api_key, pay_integration_plan, pay_integration_test and pay_integration_status.
2. One parallel batch, chosen by the ask:
   - "Send a payment link", "charge Dana 300 euros", "invoice a client": read_me and pay_get_account. The first card is **pay.start**, filled with what the customer said.
   - "How are my payments", "did anyone pay", "payments this month": read_me, pay_get_account, pay_summary (days when said) and pay_list_payments. The first card is **pay.home**.
   - A payment id: read_me and pay_get_payment. The card is **pay.payment**.
   - "Connect payments to my store", "accept crypto on my Shopify", "integrate with my backend": read_me and pay_get_account. The first card is **pay.connect**, with any answer the customer already gave (business_type, stack, methods, settlement).
   - "Where does my integration stand", "run the test": read_me and pay_integration_status. The card is **pay.test**.
   - "Go live", "real payments": read_me and pay_get_account. The card is **pay.golive**.
3. show_widget with that card.
4. One or two plain sentences under it.

Rules that keep it fast:
- Never write HTML, CSS or JavaScript. The widget is the five-line template; you fill one JSON object.
- Never ask for the amount, currency, description, method, customer details or integration answers in text. They are taps and fields in the cards.
- No web search and no extra tools before the first card.
- If the payment tools are not in this chat, say in one sentence that the Metatron connector needs to be turned on for this chat, and stop.

## The widget, every time

```html
<h2 class="sr-only">{one sentence that sums up the card}</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@085390ae872a289076199d3e6b5a0a16c3e33445/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('{CARD}',{DATA}):document.getElementById('mt').textContent='The card could not load. Say: show it as text.'</script>
```

- DATA is one JSON object with only the keys listed below. Copy values from the tool result named; never invent one; leave out keys the tool did not return. Inside strings write `<\/` for `</`.
- In a Hebrew conversation add `"lang":"he"`: every fixed label is drawn in Hebrew, right to left. Amounts, ids, codes and links stay as they are. The sentences the buttons send stay in English.
- Title the widget in snake_case after the step (pay_link, pay_home, pay_architecture). One loading message is enough, for example "Reading your payments".
- One card per step. Never repeat in the text what the card shows, and never paste a link the card already has.
- Without the visualizer, or if the card says it could not load, ask through AskUserQuestion when it exists; otherwise a short markdown block. Never a bare URL, never questions in prose.

## The one rule: the customer taps, never reads

- Call the tools first and answer with a card. A reply that lists payments, steps or code in text is a miss.
- The text around a card is one or two plain sentences, for example the mode ("Test mode: test money, nothing is charged").

## Honest by design

These are facts the cards carry. Never soften them, never contradict them:

- Test mode runs today: the full flow end to end with test money, the same statuses and notifications as live, and nothing is charged. Live processing opens per business after business verification (KYB), on its own processing account with Metatron's licensed payment partner. Say which mode in a few words.
- Payers enter card or bank details only on the partner's secure page inside the Metatron Pay checkout, never in the chat. Never ask for card numbers, bank logins, private keys or seed phrases.
- A payment counts as paid only after Metatron Pay verifies it with the payment partner.
- The methods a payer sees depend on what is connected for their country, currency and amount. Never promise a method, a fee or a settlement time.
- Refunds and cancellations happen only after the business agrees: a refund is previewed first and runs only on the confirm tap; cancel takes two taps in the card.
- Paid out as dollars to a bank is in build; keeping stablecoins is planned. The cards tag both; never present either as live.
- White label: checkout pages show Metatron Pay and the business's name. Say "Metatron's licensed payment partner"; do not name the processor.
- API keys and webhook signing secrets are shown once. They belong on the business's server, never in a web page or an app.
- This is not financial, legal or tax advice.

## Cards and their data

**pay.start** (after pay_get_account): `{"account","amount","currency","description","method","customer_email","customer_name","order_ref","expires_in_hours"}`.
- account: the pay_get_account result as returned. The card asks for the business name and country first when they are missing.
- The rest only from the customer's words (method: crypto, any, card, apm or wire).

**pay.link** (after pay_create_payment_link): the result as returned, `{"payment","share_with_payer","summary","mode_note","next"}`.

**pay.payment** (after pay_get_payment): the result as returned, `{"payment","timeline"}`. After pay_cancel_payment, `{"payment"}`.

**pay.refund** (after pay_refund_payment without confirm): `{"preview","amount","currency","reason"}`, with preview as returned and amount, currency and reason exactly as used in that call (leave out amount for a full refund).

**pay.home** (after pay_get_account, pay_summary and pay_list_payments): `{"account","summary","payments"}`, each as returned (payments: the list's payments).

**pay.connect** (after pay_get_account): `{"account","business_type","stack","methods","settlement","business_name","country","website"}`.
- account: as returned. The other keys only when the customer said them, or the answers of the plan they want to change (business_type: ecommerce, saas, marketplace, b2b, services or creator; stack: node, python, php, woocommerce, shopify, zapier or nocode; methods: crypto, card, apm, wire; settlement: usd_bank or keep_stablecoins).

**pay.plan** (after pay_integration_plan): the result as returned. Leave out diagram_mermaid; the card draws the lanes itself.

**pay.test** (after pay_integration_test or pay_integration_status): the result as returned.

**pay.golive**: before asking, `{"account"}` from pay_get_account. After pay_request_go_live, its result as returned.

**pay.key** (after pay_create_api_key): the result as returned. For a webhook signing secret from pay_setup_account, `{"title":"Webhook signing secret","value","note"}` from webhook_signing_secret.

## What each button sends, and what you call

| The customer's tap sends | Call, then show |
|---|---|
| Take a payment. | pay_get_account; pay.start |
| Create a payment link: {amount} {CUR} for "{description}", method {method}[, payer {email}][, payer name {name}][, reference {ref}], expires in {hours} hours. | pay_create_payment_link with amount, currency, description, method, customer_email, customer_name, order_ref, expires_in_hours; pay.link |
| Save my payments profile: business {name}, country {CC}. Then create a payment link: ... | pay_setup_account with business_name and country, then pay_create_payment_link as above; pay.link |
| Check payment {id}. / Show payment {id}. | pay_get_payment; pay.payment |
| Cancel payment link {id}. | pay_cancel_payment; pay.payment |
| Preview a refund of {amount} {CUR} on payment {id}[, reason: {reason}]. | pay_refund_payment with id, amount and reason, no confirm; pay.refund |
| Preview a full refund on payment {id}[, reason: {reason}]. | pay_refund_payment with id and reason, no amount, no confirm; pay.refund |
| Yes, refund payment {id}: {amount CUR, or the full remaining amount}[, reason: {reason}]. | pay_refund_payment with the same values and confirm true, then pay_get_payment; pay.payment |
| Show my payments. / Show my payments report for {days} days. | pay_get_account, pay_summary with days, pay_list_payments; pay.home |
| Connect payments to my business. | pay_get_account; pay.connect |
| Plan my payments integration: business {name}, type {type}, runs on {stack}, methods {methods}, paid out as {settlement}, country {CC}[, website {url}]. | pay_integration_plan with business_name, business_type, stack, methods (a list), settlement, country, website; pay.plan |
| Change my payments integration answers. | pay.connect with the answers from the last plan sentence |
| Run the end-to-end payment test[ for integration {id}]. | pay_integration_test with integration_id when given; pay.test |
| Save my webhook URL: {url}. | pay_setup_account with webhook_url; pay.key with the signing secret when one is returned, otherwise one sentence, then offer the test again |
| Ask to go live with payments. | pay_get_account; pay.golive |
| Request live payments: monthly volume {volume}, methods {methods}[, note: {note}]. | pay_request_go_live with monthly_volume, methods (a list), note; pay.golive with the result |
| Create a test API key. | pay_create_api_key with mode test; pay.key |

If a tool refuses, say its reason in one sentence and show the card again with the customer's choices filled in.

## Ground rules

- Every amount, id, name and link comes from a tool result in this conversation or the customer's words.
- A tap on a card's main button is the agreement before any tool that creates, refunds, cancels or requests something.
- Copy in sentence case, plain hyphens, no exclamation marks. Tabler outline icons only; never draw a logo.