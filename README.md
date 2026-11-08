# Metatron chat cards

One renderer for the Metatron cards in Claude chats. The skills of the Metatron plugin (metatron, metatron-feedback, metatron-launch-visual, metatron-rwa-visual, metatron-treasury-private-visual, metatron-treasury-public-visual, metatron-treasury-wallet-visual, metatron-buy-visual, metatron-payments-visual, metatron-academy-visual, metatron-launchpad-kit) send data only, so a card renders in seconds and looks the same in every session, in light and dark mode.

```html
<h2 class="sr-only">Launch editor for Harbor Guild</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@085390ae872a289076199d3e6b5a0a16c3e33445/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('launch.editor',{"name":"Harbor Guild","supply":1000000000,"kept":35}):document.getElementById('mt').textContent='The card could not load.'</script>
```

Cards: rwa.start, rwa.structure, rwa.asset, rwa.seat, rwa.details, rwa.documents, rwa.year, rwa.ready, launch.path, launch.editor, launch.token, launch.checkout, launch.status, launch.sign, launch.utila, launch.live, launch.market, launch.needs, treasury.start, treasury.options, treasury.plan, treasury.preview, treasury.approve, treasury.home, treasury.statement, treasury.golive, treasury.governance, treasury.connect, wallet.connect, wallet.home, wallet.earn, wallet.borrow, wallet.deals, wallet.sign, wallet.status, wallet.alerts, buy.start, buy.checkout, buy.status, pay.start, pay.link, pay.payment, pay.refund, pay.home, pay.connect, pay.plan, pay.test, pay.golive, pay.key, academy.picker, academy.learn, academy.home, academy.lesson, academy.intake, academy.project, academy.whatif, academy.brief, kit.desk, kit.week, kit.drafts, kit.post, kit.replies, kit.team, os.home, os.feedback.

os.home is the front door: one tile per rail with its honest status from os_overview, a box to say anything in plain words, and the other rails with their status. os.feedback sends a design partner's note to the Metatron team through os_feedback.

- `lang: "he"` draws every fixed label in Hebrew, right to left. `t: {...}` overrides any label.
- Buttons that need the assistant call `sendPrompt` with a plain English sentence the skill maps to one tool.
- Controls pin their colors with `!important`, because the chat styles buttons and inputs on its own.
- Partners are never named; the data the tools return carries no firm names.

The skills pin a commit, so a card never changes under a live chat. To release a change, push it, then point the skills at the new commit.

## Install the Metatron plugin in Claude Code

```
/plugin marketplace add Metatron-S2create/metatron-cards
/plugin install metatron@metatron
```

The plugin carries the Metatron connector (https://launch.metatron.systems/mcp) and one skill per rail. In the Claude app, install it from the .plugin file instead.
