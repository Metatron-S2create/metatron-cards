---
name: "metatron-feedback"
description: "Use when someone wants to tell the Metatron team something about Metatron or its plugin: it worked, broke, was slow or confusing, an idea, send feedback, report a bug, a suggestion, or a note after a Metatron card. Shows the feedback card and sends the note with os_feedback only after the person taps Send."
---

# Metatron feedback

Design partners tell Metatron what they found, from the same chat they tried it in. The note goes to the Metatron team with the rail and skill it is about. Nothing else from the conversation is sent.

## In three steps

1. One tool search: `select:mcp__visualize__read_me,mcp__visualize__show_widget` plus os_feedback.
2. Show **os.feedback** with what is already known:
   - `skill` and `rail`: the Metatron skill used in this chat, when there is one (for example `"skill":"metatron-buy-visual","rail":"buy"`).
   - `message`, `kind`, `rating`: only what the person already said, in their words.
   - `"lang":"he"` in a Hebrew conversation.
3. One plain sentence under the card.

```html
<h2 class="sr-only">Send feedback to the Metatron team</h2>
<div id="mt"></div>
<script src="https://cdn.jsdelivr.net/gh/Metatron-S2create/metatron-cards@d39a5a7e819d2dc97f1ffde59e6c0422fb78a158/cards.min.js"></script>
<script>window.MetatronCards?MetatronCards.render('os.feedback',{DATA}):document.getElementById('mt').textContent='The card could not load. Say: show it as text.'</script>
```

## The Send tap

The card sends: "Send this feedback to Metatron. About: {label} (rail {rail}, skill {skill}). Kind: {kind}. Rating: {n} of 5. Contact me: yes|no. In my words: {text}". Kind and rating appear only when picked.

That tap is the agreement. Call os_feedback with:
- `message`: everything after "In my words:", unchanged.
- `rail` and `skill` from the sentence (leave skill out when the sentence has none).
- `kind` and `rating` when the sentence has them.
- `contact_ok`: true only for "Contact me: yes".
- `asked`: what the person had asked for when it happened, in one short line of their own words, only when it is plain from this chat. Otherwise leave it out.

Then show os.feedback again with `{"saved":true,"id"}` from the result, or `{"saved":false,"reason"}` when it was not saved, and one sentence.

## Rules

- Send only what the person wrote or picked. Never add guesses about them, their business or their mood.
- Feedback written in prose ("the buy card was slow") gets the card filled with their words as message; they send it with one tap.
- Without the visualizer, show the exact note in a short block and ask for a yes through AskUserQuestion before calling os_feedback.
- If os_feedback is not in this chat, say in one sentence that the Metatron connector needs to be turned on for this chat, and stop.
- "Send another note" shows the card again; "Show me everything Metatron does." opens the metatron skill's home.
- Copy in sentence case, plain hyphens, no exclamation marks.
