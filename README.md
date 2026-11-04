# Metatron chat cards

One renderer for the Metatron cards in Claude chats. The skills (metatron-launch-visual, metatron-rwa-visual) send data only, so a card renders in seconds and looks the same in every session, in light and dark mode.

```html
<h2 class="sr-only">Launch editor for Harbor Guild</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@1.0.0/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('launch.editor',{"name":"Harbor Guild","supply":1000000000,"kept":35}):document.getElementById('mt').textContent='The card could not load.'</script>
```

Cards: rwa.start, rwa.structure, rwa.asset, rwa.seat, rwa.details, rwa.documents, rwa.year, rwa.ready, launch.path, launch.editor, launch.token, launch.checkout, launch.status, launch.sign, launch.utila, launch.live, launch.market, launch.needs.

- `lang: "he"` draws every fixed label in Hebrew, right to left. `t: {...}` overrides any label.
- Buttons that need the assistant call `sendPrompt` with a plain English sentence the skill maps to one tool.
- Controls pin their colors with `!important`, because the chat styles buttons and inputs on its own.
- Partners are never named; the data the tools return carries no firm names.

Releases are tags. Never move a tag: publish a new one (1.0.1, 1.1.0) and point the skills at it, since the CDN caches a tag for good.
