# Metatron for Claude

Metatron is the operating system for digital assets, inside the AI you already use. This plugin gives Claude the Metatron connector and one skill per rail, so you say what you want in plain words, in English or Hebrew, and every step arrives as a live card you tap.

Version 1.0.1, the first release for design partners.

## Install

In Claude Code, from inside a session:

```
/plugin install metatron --marketplace Metatron-S2create/metatron-cards
```

Or from your shell:

```
claude plugin marketplace add Metatron-S2create/metatron-cards
claude plugin install metatron@metatron
```

In the Claude desktop or web app, install the `metatron.plugin` file Metatron sends you.

The first time a Metatron tool runs, Claude asks you to sign in to the Metatron connector with your Metatron ID. Every rail uses that one sign-in.

## Try it

Say any of these, or just "What can Metatron do?":

- Launch a token called Harbor on Ethereum, 70% to the DEX paired with USDC, keep 30% locked for 12 months
- I want to tokenize a $5M office building in Tel Aviv for investors outside the US
- My company holds 10 BTC and $2M in USDC sitting idle
- What's the best yield for the USDC in my wallet?
- Buy $200 of Bitcoin to my wallet
- Promote my token
- I want to take a payment for 99 dollars
- Which Academy course fits me?
- בעברית: אני רוצה להנפיק טוקן לקהילה שלי

## What is in it

| Skill | Opens when you want to |
|---|---|
| metatron | Start anywhere: the home of every rail, and the router that picks the right skill |
| metatron-launch-visual | Create, launch or mint a token: split, DEX pool, checkout, status |
| metatron-launchpad-kit | Promote a token that is live: growth team, posts for X, Telegram and Instagram, token DNA, the week, a QR poster |
| metatron-rwa-visual | Tokenize a real asset: real estate, metals, private credit, funds, casks |
| metatron-treasury-private-visual | Put a company's or startup's idle Bitcoin and dollars to work |
| metatron-treasury-public-visual | The same for a listed company, ready for the board and the auditor |
| metatron-treasury-wallet-visual | Earn on, or borrow against, the crypto in your own wallet |
| metatron-payments-visual | Get paid: payment links, invoices, refunds, your store |
| metatron-buy-visual | Buy Bitcoin, ETH or USDC by card or Apple Pay, and choose where to keep it |
| metatron-academy-visual | Learn: courses, RWA Fast Track, plain-words answers, your Project Brief |
| metatron-feedback | Tell the Metatron team what worked and what did not |

## Where each rail stands today

- Token Launch: live end to end. The checkout is a demo paid with Metatron Credit; no card is charged.
- Launchpad growth kit: live. Nothing is posted for you; you approve each post and post it yourself.
- RWA Tokenization: Beta. Plan, structure, simulate and rehearse on a test network; no real issuance yet.
- Company treasury: Sandbox, end to end with no real money.
- Wallet Earn and Wallet Credit: live pilots with real money for invited wallets, signed in your own wallet.
- Crypto Payments: live in test mode until your business is verified.
- Buy crypto: Beta. Live prices and a checkout link; where the licensed partner is not connected yet, the checkout is a demo with no charge.
- Academy: live. RWA Fast Track is a free beta.

Metatron never asks for, holds or sees a private key or seed phrase. Every change on chain is a link you open and sign in your own wallet. Nothing here is financial, legal or tax advice, and nothing promises price, income or returns.

## Feedback

Say "send feedback" at any point, or tap Send feedback on the home card. Your note goes to the Metatron team with the rail it is about, and nothing else from the chat. Tick the box if the team may write back to you.

## Privacy

The connector acts only as you, after you sign in. Feedback notes keep your email only when you agree to be contacted.
