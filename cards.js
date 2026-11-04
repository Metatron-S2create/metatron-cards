/* Metatron chat cards. One renderer for the Metatron skills in Claude: the assistant passes data, this draws the card. */
(function () {
  var VERSION = '1.0.0';
  var CSS = [
    '.bl{--f:Inter,var(--font-sans,system-ui),sans-serif;font-family:var(--f);letter-spacing:-.01em;display:grid;gap:12px;padding:4px 0;color:var(--text-primary)}',
    '.bl *{box-sizing:border-box}',
    '.bl [data-body]{display:grid;gap:12px;min-width:0}',
    '.bl[dir=rtl] .ti-arrow-right,.bl[dir=rtl] .ti-arrow-narrow-right{display:inline-block;transform:scaleX(-1)}',
    '.bl-card{border-radius:20px;padding:18px 20px;position:relative;overflow:hidden}',
    '.bl-night{background:#071226;border:1px solid #1B2C4B;color:#EEF4FF}',
    '.bl-field{background:#1F6FE5;color:#fff}',
    '.bl-white{background:#fff;color:#0B2840;border:1px solid #DCE7F7}',
    '.bl button,.bl input{font-family:var(--f)!important;letter-spacing:inherit!important;box-shadow:none!important;min-height:0!important;text-transform:none!important}',
    '.bl-pill{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:6px!important;width:auto!important;height:auto!important;border-radius:999px!important;padding:9px 16px!important;font:500 14px/1.2 var(--f)!important;text-decoration:none!important;border:1px solid transparent!important;cursor:pointer;background:transparent!important;color:inherit!important}',
    '.bl-pill.w{background:#fff!important;color:#0B2840!important}.bl-pill.a{background:#3A92FC!important;color:#fff!important}.bl-pill.o{border-color:currentColor!important}.bl-pill.sm{padding:5px 12px!important;font-size:13px!important}.bl-pill.xs{padding:2px 8px!important;font-size:12px!important;color:#1F6FE5!important}',
    '.bl-white .bl-pill.o{color:#0B2840!important}.bl-field .bl-pill.o{color:#fff!important}.bl-night .bl-pill.o{color:#EEF4FF!important}.bl-pill.a:hover{background:#1F6FE5!important}',
    '.bl-pill.fo{color:#fff!important;border-color:rgba(255,255,255,.55)!important}.bl-pill.so{color:#0B2840!important;border-color:#B9CCE6!important}.bl-pill.no{color:#8EC5FB!important;border-color:#2A3E63!important;padding:6px 12px!important;font-size:13px!important;flex:none}',
    '.bl-mono{font-family:var(--font-mono);font-size:12px;letter-spacing:0}',
    '.bl-muted{color:#93A6C6}.bl-white .bl-muted{color:#4A6488}.bl-field .bl-muted{color:#DCEBFF}.bl [data-body]>.bl-muted{color:var(--text-secondary)}',
    '.bl-h{font:600 16px/1.3 var(--f);letter-spacing:-.01em;margin:0}',
    '.bl-chip{display:inline-flex!important;align-items:center!important;width:auto!important;height:auto!important;border:1px solid #DCE7F7!important;border-radius:999px!important;padding:6px 12px!important;background:#fff!important;color:#0B2840!important;font:500 13px/1.2 var(--f)!important;cursor:pointer}',
    '.bl-chip:hover{border-color:#8EC5FB!important}.bl-chip[aria-pressed=true]{background:#1F6FE5!important;border-color:#1F6FE5!important;color:#fff!important}',
    '.bl-opt{display:flex!important;justify-content:flex-start!important;gap:10px!important;align-items:flex-start!important;width:100%!important;height:auto!important;text-align:start!important;border:1px solid #DCE7F7!important;border-radius:14px!important;padding:10px 12px!important;background:#fff!important;color:#0B2840!important;font:400 13px/1.4 var(--f)!important;cursor:pointer}',
    '.bl-opt:hover{border-color:#8EC5FB!important}.bl-opt[aria-pressed=true]{border-color:#1F6FE5!important;outline:1px solid #1F6FE5;background:#EEF5FF!important}',
    '.bl-in-f{display:block;width:100%!important;height:40px!important;padding:0 12px!important;border:1px solid #DCE7F7!important;border-radius:10px!important;background:#fff!important;color:#0B2840!important;font:400 14px var(--f)!important}',
    '.bl-in-f.mono{font:400 13px var(--font-mono)!important}',
    '.bl-in-f::placeholder{color:#7A8BA6!important;opacity:1}.bl-in-f:focus{border-color:#3A92FC!important;outline:2px solid #BFDBFE}',
    '.bl-cb{width:16px!important;height:16px!important;min-width:16px;padding:0!important;margin:2px 0 0!important;flex:none;accent-color:#1F6FE5}',
    '.bl-edit{all:unset;box-sizing:border-box;background:transparent!important;color:#fff!important;border:0!important;border-bottom:1px dashed rgba(255,255,255,.5)!important;border-radius:0!important;padding:0!important;height:auto!important;outline:none}',
    '.bl-edit:focus{border-bottom-color:#fff!important}',
    '.bl-tag{display:inline-flex;align-items:center;gap:4px;border-radius:999px;padding:2px 9px;font:600 11px/1.6 var(--f);white-space:nowrap}',
    '.t-ok{background:#E8FBF3;color:#0B7A52}.t-open{background:#FFF4E0;color:#8A5300}.t-req{background:#E8F2FF;color:#0A6FCC}.t-mid{background:#EEF2F7;color:#4A6488}.t-run{background:#E8F2FF;color:#0A6FCC}',
    '.bl-night .t-mid{background:#13233F;color:#B9CCE6}.bl-night .t-ok{background:#0E3A2C;color:#7EE2B8}.bl-night .t-open{background:#3A2A0C;color:#F8D58F}.bl-night .t-req{background:#0F2A4A;color:#BFE0FF}',
    '.bl-cols{display:grid;grid-template-columns:repeat(auto-fit,minmax(136px,1fr));gap:10px}',
    '.bl-seat{display:flex!important;justify-content:flex-start!important;gap:10px!important;align-items:flex-start!important;width:100%!important;height:auto!important;text-align:start!important;border:1px solid #1B2C4B!important;border-radius:14px!important;padding:10px 12px!important;background:#0B1A36!important;color:#EEF4FF!important;font:400 13px/1.35 var(--f)!important;cursor:pointer}',
    '.bl-seat:hover{border-color:#3A92FC!important}.bl-seat[data-s=open]{border-style:dashed!important;border-color:#7A5A1E!important}',
    '.bl-ico{flex:none;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font-size:16px;background:#3A92FC;color:#fff}',
    '.bl-ico.o{background:none;border:1px dashed #6E86A8;color:#93A6C6}',
    '.bl-bar{display:flex;gap:3px;height:12px}.bl-seg{border-radius:999px;flex:var(--p) 1 0;transform-origin:left}.bl[dir=rtl] .bl-seg{transform-origin:right}',
    '.bl-drag{position:relative;height:30px;display:flex;align-items:center;gap:4px;cursor:ew-resize;touch-action:none;user-select:none;outline:none}',
    '.bl-drag .bl-seg{height:14px;min-width:0}',
    '.bl-knob{position:absolute;top:1px;width:28px;height:28px;margin-inline-start:-14px;border-radius:50%;background:#fff;border:2px solid #1F6FE5;box-sizing:border-box;display:grid;place-items:center;color:#1F6FE5;font-size:14px;pointer-events:none}',
    '.bl-drag:focus-visible .bl-knob{outline:3px solid #8EC5FB}',
    '.go .bl-seg{animation:bl-grow 1s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(var(--i,0)*90ms)}',
    '.go .bl-in{animation:bl-in .45s ease-out both;animation-delay:calc(var(--i,0)*70ms)}',
    '.go .bl-pulse{animation:bl-pulse 1.8s ease-in-out infinite}',
    '.bl-field::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.2) 50%,transparent 65%);transform:translateX(-120%)}',
    '.go .bl-field::after{animation:bl-sheen 2.6s ease-in-out .4s 2}',
    '@keyframes bl-grow{from{transform:scaleX(0)}}@keyframes bl-in{from{opacity:0;transform:translateY(6px)}}@keyframes bl-pulse{50%{box-shadow:0 0 0 7px rgba(58,146,252,.25)}}@keyframes bl-sheen{to{transform:translateX(120%)}}',
    '.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}',
    '@media (prefers-reduced-motion:reduce){.bl *,.bl *::after{animation:none!important}}'
  ].join('\n');

  var HE = {
    create: 'צור את הנכס שלי', change: 'שנה תשובות', flow: 'הצג את הזרימה', hideFlow: 'הסתר את הזרימה', back: 'הקודם', next: 'הבא', step: 'שלב', of: 'מתוך',
    map: 'המבנה', team: 'הצוות שלך', why: 'למה המבנה הזה', run: 'מופעל על ידי Metatron', seatTeam: 'הושב את הצוות המומלץ', details: 'השלם את הפרטים', left: 'נותרו',
    closed: 'סגור', seated: 'מושבים סגורים', open: 'פתח באפליקציה', backTeam: 'חזרה לצוות', seatIt: 'הושב', saveName: 'שמור את השם', spvName: 'השם המשפטי של ה-SPV',
    ask: 'בקש מ-Metatron להתחיל', draft: 'הפק את המסמכים', record: 'רשום', signer: 'מי חתם', signerRole: 'תפקיד וחברה', hold: 'המסמך החתום נמצא אצלי',
    lookFor: 'למה לשים לב', when: 'מתי', recommended: 'מומלץ', closeSteps: 'איך המושב נסגר', later: 'בהמשך', metatronActs: 'Metatron מטפלת', partnerActs: 'השותף מטפל',
    counselActs: 'עורך הדין מטפל', youAct: 'הצעד שלך', firmName: 'שם החברה', errName: 'הזן את השם', errSigner: 'הזן מי חתם ואת התפקיד', errHold: 'אשר שהמסמך החתום אצלך',
    beta: 'בטא', save: 'שמור את הפרטים', estimate: 'הערכת הברוקר-דילר', longTerm: 'מתאים לטווח ארוך', optional: 'אופציונלי', again: 'מההתחלה', whoSits: 'מי יושב כאן',
    changeWho: 'שנה מי יושב כאן', now: 'עכשיו', already: 'כבר יושב במושב הזה', bringOwn: 'הבא חברה משלך', nextStep: 'הצעד הבא',
    qName: 'איך קוראים לנכס?', qType: 'מה אתה מטקנז?', qWhere: 'איפה גרים המשקיעים שלך?', qPrice: 'איך השוק יודע כמה הוא שווה?', qRaise: 'כמה אתה רוצה לגייס?',
    ty_real_estate: 'נדל"ן', ty_private_credit: 'אשראי פרטי', ty_precious_metals: 'מתכות יקרות', ty_fund: 'קרן', ty_commodity: 'סחורה', ty_whisky_cask: 'חביות וויסקי',
    ty_listed_security: 'נייר ערך סחיר', ty_treasury: 'אג"ח ממשלתי', ty_vehicle: 'רכבים', ty_collectible: 'פריט אספנות', ty_other: 'משהו אחר',
    ge_us_only: 'בארצות הברית', geh_us_only: 'משקיעים אמריקאים צריכים פטור וכללי העברה נאכפים', ge_non_us_only: 'מחוץ לארצות הברית', geh_non_us_only: 'נמכר לפי Reg S לארנקים מאומתים',
    ge_both: 'גם וגם', geh_both: 'שתי שכבות, לכל אחת הכללים שלה', ge_institutions: 'בנקים, קרנות או קסטודיאנים', geh_institutions: 'בדרך כלל צריכים פרטיות וסליקה בצעד אחד',
    pr_live_market: 'יש לו מחיר שוק חי', prh_live_market: 'ניירות ערך סחירים, אג"ח, מטילים', pr_nav_periodic: 'שמאי קובע אותו לפי לוח זמנים', prh_nav_periodic: 'נדל"ן, חביות, אשראי פרטי, קרנות',
    pr_unique_items: 'כל פריט ייחודי', prh_unique_items: 'בקבוקים ייחודיים ופריטי אספנות', typeRaise: 'או הקלד, למשל 2.4m', seeStructure: 'הצג את המבנה שלי',
    errAssetName: 'הזן את שם הנכס', errType: 'בחר מה אתה מטקנז', errWhere: 'בחר איפה גרים המשקיעים', errPrice: 'בחר איך הנכס מתומחר', errRaise: 'בחר או הקלד סכום גיוס',
    startNow: 'מתחילים היום עם המבנה שלמעלה.', offering: 'הנפקה', status: 'סטטוס', teamHint: 'כל מושב עם ההמלצה של Metatron. הקש כדי לראות למה.',
    envLive: 'חי על Ethereum', envTest: 'על Sepolia', envDraft: 'טיוטה', seatedN: 'מאוישים', requestedN: 'בבקשה', tapSeat: 'הקש על מושב כדי לסגור אותו. כל מושב מראה את הצעדים שלו.',
    year: 'צפה בשנה הראשונה', whatLeft: 'מה נשאר עד ההשקה', otherCodes: 'קודים נוספים, למשל FR, JP', otherCode: 'קוד אחר, למשל FR', exMoney: 'למשל 2.4m', exNumber: 'למשל 1',
    errNumber: 'הזן מספר', errOne: 'מלא לפחות פרט אחד', draftTag: 'טיוטה', review: 'עיון והורדה', raised: 'גויס', ofRaise: 'מהגיוס', holders: 'מחזיקים', paid: 'שולם למחזיקים',
    refused: 'העברות שנחסמו', byContract: 'על ידי החוזה', day: 'יום', beforeTest: 'לפני רשת הבדיקה', beforeMain: 'לפני Ethereum', investorPage: 'עמוד המשקיעים',
    openInvestor: 'פתח את עמוד המשקיעים', walletNote: 'פעולות ארנק נפתחות באפליקציה ונחתמות בארנק שלך. אף אחד ב-Metatron לא מחזיק מפתח.',
    rwaKicker: 'Metatron RWA, בטא', rwaTitle: 'טוקניזציה של נכס אמיתי', rwaSub: 'חמש הקשות בוחרות את המבנה. עדיין לא נשמר כלום.', fits: 'המבנה שמתאים ל-', onEth: 'על Ethereum',
    detailsTitle: 'הפרטים שהשותפים קוראים', detailsSub: 'המבנה, המסמכים והסימולציה נבנים מהם.', docsTitle: 'טיוטות לעורך הדין', yearTitle: 'השנה הראשונה, על המספרים שלך',
    readyTitle: 'מהחזרה הגנרלית ל-Ethereum', partnersSee: 'Metatron מחפשת חברה',
    totalSupply: 'היצע כולל', ticker: 'טיקר', on: 'על', network: 'רשת', dragSplit: 'גרור כדי לחלק', whereSit: 'איפה זה יושב?', wallet: 'בארנק שלך', walletSub: 'שלך להזיז בכל רגע',
    utila: 'משמורת Utila', utilaSub: 'כספת מוסדית עם אישורי צוות', lock: 'נעול', lockSub: 'שום דבר לא זז עד התאריך שתבחר', months: 'חודשים', fundHint: 'מחזיקים סומכים יותר על קרן נעולה או במשמורת.',
    poolOn: 'מאגר DEX על', poolForever: 'נעול במאגר לתמיד', pairedWith: 'מצומד ל', startValue: 'שווי פתיחה של כל הטוקן', recommendedV: 'מומלץ', whyBtn: 'למה',
    ethFee: 'עמלות הרשת ב-Ethereum גבוהות בהרבה מ-Base: כמה דולרים ביום שקט, מעל 100 דולר כשהרשת עמוסה.', noPool: 'אין מאגר בהשקה על', noPool2: 'הטוקן מושק עם החלוקה המומלצת לסוג שלו, והנזילות מתווספת אחר כך באפליקציה, מצומדת ל',
    createIt: 'צור אותו', helpChoose: 'עזור לי לבחור', errTokenName: 'הזן שם', errTicker: 'טיקר: 1 עד 11 אותיות או ספרות', errWhereSit: 'בחר איפה החלק השמור יושב',
    fromMessage: 'לפי ההודעה שלך', recommendedFor: 'מומלץ ל', whoGets: 'מי מקבל מה', changeSplit: 'שנה את החלוקה', draftSaved: 'הטיוטה נשמרה', checkoutFor: 'תשלום עבור',
    payCredit: 'שלם עם Metatron Credit', paidCheck: 'שילמתי, בדוק', nextLbl: 'הבא', signTitle: 'חתום בארנק שלך', openSign: 'פתח וחתום', signNote: 'פתח תוך 30 דקות. רק הארנק שלך יכול לחתום.',
    signedCheck: 'חתמתי, בדוק', moveTo: 'העבר ל-Utila', moveSub: 'עוברים לכספת Utila שלך על', moveSub2: 'אתה חותם על ההעברה בארנק שלך.', prepareMove: 'הכן את ההעברה',
    errVault: 'הדבק את כתובת הכספת מ-Utila: 0x ו-40 תווים', liveOn: 'חי על', addWallet: 'הוסף לארנק', tokenPage: 'עמוד הטוקן', whereSupply: 'איפה ההיצע נמצא', fromChain: 'מהבלוקצ\'יין,',
    onDex: 'נסחר ב-DEX', marketReady: 'השוק שלך, מוכן', anyone: 'כל אחד יכול לקנות ולמכור ב-Uniswap. המאגר נעול לתמיד.', inPool: 'במאגר', yourWallet: 'הארנק שלך', startWhole: 'שווי פתיחה, כל הטוקן',
    buyersPay: 'הקונים משלמים עם', firstBuy: 'קנייה ראשונה', dexScreener: 'ראה ב-DEX Screener', tradeUni: 'סחר ב-Uniswap', needYou: 'דברים שצריכים אותך', live: 'חי', keptSuffix: 'שמור'
  };

  var e = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); };
  var usd = function (n) { return n == null || n === '' ? '' : '$' + (n >= 1e9 ? +(n / 1e9).toFixed(1) + 'B' : n >= 1e6 ? +(n / 1e6).toFixed(1) + 'M' : n >= 1e4 ? Math.round(n / 1e3) + 'k' : Math.round(n).toLocaleString('en-US')); };
  var fmt = function (n) { return Math.round(Number(n) || 0).toLocaleString('en-US'); };
  var say = function (t) { if (typeof window.sendPrompt === 'function') window.sendPrompt(t); };
  var ICON = { issuer_vehicle: 'building-bank', broker_dealer: 'shield-check', kyc_aml: 'scan', payments: 'credit-card', custodian: 'building-warehouse', security_agent: 'gavel', valuer: 'scale', reserves_auditor: 'file-check', counsel_issuer: 'file-text', counsel_us: 'file-text', contract_auditor: 'bug-off', transfer_agent: 'address-book', secondary_venue: 'repeat' };
  var ROLE = { issuer_vehicle: 'Issuer', broker_dealer: 'Broker-dealer', kyc_aml: 'KYC and AML', payments: 'Payments', custodian: 'Custodian', security_agent: 'Security Agent', valuer: 'Valuer', reserves_auditor: 'Reserves auditor', counsel_issuer: 'Counsel', counsel_us: 'US counsel', contract_auditor: 'Contract auditor', transfer_agent: 'Transfer agent', secondary_venue: 'Secondary trading' };
  var PALETTE = ['#3A92FC', '#8EC5FB', '#B7C4FF', '#0A5FB4', '#93A6C6'];

  function ensureStyle() {
    if (document.getElementById('mt-css')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600&display=swap';
    document.head.appendChild(l);
    var s = document.createElement('style');
    s.id = 'mt-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* Everything a card needs: labels, helpers, the root and the body. */
  function kit(D, root) {
    var dict = Object.assign({}, D.lang === 'he' ? HE : {}, D.t || {});
    var L = function (k, v) { return dict[k] || v; };
    var T = new Proxy({}, { get: function (_, k) { return L(k, BASE[k] || k); } });
    var tone = function (s) { return s === T.closed || s === 'Closed' ? 't-ok' : s === 'Open' ? 't-open' : s === 'Requested' || s === 'Introduction' ? 't-req' : 't-mid'; };
    var tag = function (s, c) { return '<span class="bl-tag ' + (c || tone(s)) + '">' + e(s) + '</span>'; };
    var $ = function (id) { return root.querySelector('#' + id); };
    var done = function () { requestAnimationFrame(function () { root.classList.add('go'); }); };
    return { L: L, T: T, tag: tag, tone: tone, $: $, done: done };
  }

  var BASE = { create: 'Create my asset', change: 'Change answers', flow: 'Show the flow', hideFlow: 'Hide the flow', back: 'Back', next: 'Next', step: 'Step', of: 'of', map: 'The structure', team: 'Your team', why: 'Why this structure', run: 'Run by Metatron', seatTeam: 'Seat the recommended team', details: 'Finish the details', left: 'left', closed: 'Closed', seated: 'seats closed', open: 'Open in the app', backTeam: 'Back to the team', seatIt: 'Seat it', saveName: 'Save the name', spvName: 'SPV legal name', ask: 'Ask Metatron to start', draft: 'Draft the documents', record: 'Record it', signer: 'Who signed', signerRole: 'Role and firm', hold: 'I hold the signed document', lookFor: 'What to look for', when: 'When', recommended: 'Recommended', closeSteps: 'How this seat closes', later: 'later', metatronActs: 'Metatron acts', partnerActs: 'Your partner acts', counselActs: 'Counsel acts', youAct: 'Your step', firmName: 'The firm\'s name', errName: 'Enter the name', errSigner: 'Enter who signed and their role', errHold: 'Confirm you hold the signed document', beta: 'Beta', save: 'Save the details', estimate: 'Broker-dealer estimate', longTerm: 'Long-term fit', optional: 'optional', again: 'From the start', whoSits: 'Who sits here', changeWho: 'Change who sits here', now: 'Now', already: 'Already in this seat', bringOwn: 'Bring your own instead', nextStep: 'Next step' };

  function shell(K, root, opts) {
    root.className = 'bl';
    if (opts.rtl) root.setAttribute('dir', 'rtl');
    root.innerHTML = '<h2 class="sr-only">' + e(opts.sr) + '</h2><div class="bl-card bl-field">' + opts.hero + '<div data-hero></div></div><div data-body></div>';
    return { H: root.querySelector('[data-hero]'), B: root.querySelector('[data-body]') };
  }
  var errSpan = function (id) { return '<span ' + (id ? 'id="' + id + '" ' : 'data-err ') + 'role="alert" style="font-size:13px;color:var(--text-danger,#C23B3B)"></span>'; };
  function onSay(root) { root.addEventListener('click', function (ev) { var b = ev.target.closest('[data-say]'); if (b && !b.disabled) { ev.preventDefault(); say(b.dataset.say); } }); }

  /* Shared pieces for the RWA cards. */
  function rwaParts(K, root) {
    var T = K.T, tag = K.tag;
    var groups = function (seats) { var g = []; seats.forEach(function (s) { var x = g.find(function (y) { return y.step === s.step; }); if (!x) g.push(x = { step: s.step, seats: [] }); x.seats.push(s); }); return g; };
    var mapHTML = function (map) { return '<div class="bl-cols">' + map.map(function (c, i) { return '<div class="bl-in" style="--i:' + i + '"><div style="display:flex;align-items:center;gap:6px;margin-bottom:8px"><span style="width:20px;height:20px;border-radius:50%;background:#E8F2FF;color:#0A6FCC;display:grid;place-items:center;font:600 11px var(--f)">' + (i + 1) + '</span><span style="font:600 12px var(--f);letter-spacing:.02em;color:#4A6488">' + e(c.step) + '</span></div><div style="display:grid;gap:6px">' + c.parties.map(function (p) { return '<div data-pt="' + e(p.title) + '" style="transition:box-shadow .3s;border:1px ' + (p.state === 'Open' ? 'dashed #C9D6E6' : 'solid #E3ECF8') + ';border-radius:12px;padding:8px 10px;background:' + (p.state === 'Run by Metatron' ? '#F2F8FF' : '#fff') + '"><div style="font:600 13px/1.3 var(--f)">' + e(p.title) + '</div><div class="bl-muted" style="font-size:12px">' + e(p.who) + '</div>' + (p.state === 'Run by Metatron' ? '<div style="margin-top:4px">' + tag('Metatron', 't-run') + '</div>' : '') + '</div>'; }).join('') + '</div></div>'; }).join('') + '</div>'; };
    var seatTile = function (s, i, act) { var st = s.closed ? T.closed : s.state, wait = st === 'Requested' || st === 'Introduction'; return '<button class="bl-seat bl-in" style="--i:' + i + '" data-s="' + (st === 'Open' ? 'open' : 'x') + '" ' + act(s) + '><span class="bl-ico' + (st === 'Open' ? ' o' : '') + '"><i class="ti ti-' + (ICON[s.role_id] || 'circle') + '" aria-hidden="true"></i></span><span style="flex:1;min-width:0"><span style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px"><span style="font-weight:600;min-width:0">' + e(s.role) + (s.required === false ? ' <span class="bl-muted" style="font-weight:400;font-size:12px">' + e(T.optional) + '</span>' : '') + '</span>' + tag(st) + '</span><span class="bl-muted" style="display:block;font-size:12px;margin-top:2px">' + e(s.who || s.recommended_label || '') + '</span>' + (s.next_step && !s.closed && !wait ? '<span style="display:flex;gap:4px;align-items:baseline;font-size:12px;color:#8EC5FB;margin-top:4px"><i class="ti ti-arrow-right" aria-hidden="true"></i>' + e(s.next_step) + '</span>' : '') + '</span></button>'; };
    var teamHTML = function (seats, act) { return groups(seats).map(function (g, gi) { return '<div style="display:grid;gap:8px"><div style="font:600 12px var(--f);letter-spacing:.02em;color:#8EC5FB;display:flex;align-items:center;gap:6px"><span style="width:20px;height:20px;border-radius:50%;background:#13233F;color:#fff;display:grid;place-items:center;font-size:11px">' + (gi + 1) + '</span>' + e(g.step) + '</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:8px">' + g.seats.map(function (s, i) { return seatTile(s, i, act); }).join('') + '</div></div>'; }).join(''); };
    var flowHTML = function () { return '<div id="fl" style="display:none" class="bl-card bl-white"><div id="flb"></div><div style="display:flex;align-items:center;gap:8px;margin-top:14px"><button class="bl-pill o" id="flp">' + e(T.back) + '</button><span id="fld" style="display:flex;gap:4px;margin:0 auto"></span><button class="bl-pill a" id="fln">' + e(T.next) + '</button></div></div>'; };
    var wireFlow = function (flow) {
      var box = K.$('fl'); if (!box || !flow || !flow.length) { root.querySelectorAll('[data-flow]').forEach(function (b) { b.style.display = 'none'; }); return; }
      var k = 0;
      var draw = function () {
        var m = flow[k];
        K.$('flb').innerHTML = '<div class="bl-muted" style="font-size:12px">' + e(T.step) + ' ' + (k + 1) + ' ' + e(T.of) + ' ' + flow.length + '</div><div style="font:600 22px/1.2 var(--f);letter-spacing:-.02em;margin:4px 0 6px">' + e(m.title) + '</div><div style="font-size:14px;line-height:1.5;color:#4A6488">' + e(m.detail) + '</div><div style="display:grid;gap:6px;margin-top:12px">' + (m.moves || []).map(function (v) { return '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:13px"><span style="font-weight:600">' + e(v.from) + '</span><span class="bl-tag t-req"><i class="ti ti-arrow-narrow-right" aria-hidden="true"></i>' + e(v.what) + '</span><span style="font-weight:600">' + e(v.to) + '</span></div>'; }).join('') + '</div>';
        K.$('fld').innerHTML = flow.map(function (_, j) { return '<span style="height:6px;width:' + (j === k ? 18 : 6) + 'px;border-radius:9px;background:' + (j === k ? '#1F6FE5' : '#C9D6E6') + '"></span>'; }).join('');
        K.$('flp').style.visibility = k ? 'visible' : 'hidden';
        var lit = new Set((m.moves || []).reduce(function (a, v) { return a.concat([v.from, v.to]); }, []));
        root.querySelectorAll('[data-pt]').forEach(function (x) { x.style.boxShadow = box.style.display !== 'none' && lit.has(x.dataset.pt) ? '0 0 0 2px #1F6FE5' : ''; });
        K.$('fln').textContent = k < flow.length - 1 ? T.next : T.again;
      };
      K.$('flp').onclick = function () { if (k) { k--; draw(); } };
      K.$('fln').onclick = function () { k = k < flow.length - 1 ? k + 1 : 0; draw(); };
      draw();
      root.querySelectorAll('[data-flow]').forEach(function (b) { b.onclick = function () { var on = box.style.display === 'none'; box.style.display = on ? 'block' : 'none'; b.textContent = on ? T.hideFlow : T.flow; draw(); if (on) box.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }; });
    };
    return { mapHTML: mapHTML, teamHTML: teamHTML, flowHTML: flowHTML, wireFlow: wireFlow };
  }

  var CARDS = {};

  CARDS['rwa.start'] = function (D, root, K) {
    var L = K.L, $ = K.$;
    var S = shell(K, root, { rtl: K.rtl, sr: 'Five quick choices to see the structure that fits your asset', hero: '<div style="font-size:13px" class="bl-muted">' + e(L('rwaKicker', 'Metatron RWA, Beta')) + '</div><div style="font:600 26px/1.15 var(--f);letter-spacing:-.02em;margin-top:4px">' + e(L('rwaTitle', 'Tokenize a real asset')) + '</div><div style="font-size:14px;margin-top:6px" class="bl-muted">' + e(L('rwaSub', 'Five taps pick the structure. Nothing is saved yet.')) + '</div>' });
    var TY = [['real_estate', 'Real estate'], ['private_credit', 'Private credit'], ['precious_metals', 'Precious metals'], ['fund', 'Fund'], ['commodity', 'Commodity'], ['whisky_cask', 'Whisky casks'], ['listed_security', 'Listed security'], ['treasury', 'Treasuries'], ['vehicle', 'Vehicles'], ['collectible', 'Collectible'], ['other', 'Something else']];
    var GE = [['us_only', 'In the United States', 'US buyers need an exemption and enforced transfer rules'], ['non_us_only', 'Outside the United States', 'Sold under Reg S to verified wallets'], ['both', 'Both', 'Two tranches, each with its own rules'], ['institutions', 'Banks, funds or custodians', 'They usually need privacy and settlement in one step']];
    var PR = [['live_market', 'It has a live market price', 'Listed securities, T-bills, bullion'], ['nav_periodic', 'A valuer sets it on a schedule', 'Property, casks, private credit, funds'], ['unique_items', 'Each item is one of a kind', 'Unique bottles and collectibles']];
    var ty = D.type || '', ge = D.geography || '', pr = D.price || '', ra = D.raise || 0, auto = false;
    var q = function (t, h) { return '<div style="font:600 15px var(--f);margin:0 0 8px">' + e(t) + '</div>' + h; };
    var opt = function (a, x) { return '<button class="bl-opt" data-' + a + '="' + x[0] + '" aria-pressed="false"><span><span style="display:block;font-weight:600">' + e(L(a === 'ge' ? 'ge_' + x[0] : 'pr_' + x[0], x[1])) + '</span><span class="bl-muted">' + e(L(a === 'ge' ? 'geh_' + x[0] : 'prh_' + x[0], x[2])) + '</span></span></button>'; };
    S.B.innerHTML = '<div class="bl-card bl-white" style="display:grid;gap:18px">' + q(L('qName', 'What is it called?'), '<input id="nm" class="bl-in-f" maxlength="80" placeholder="Alpine Gold Reserve" value="' + e(D.name || '') + '">') + q(L('qType', 'What are you tokenizing?'), '<div style="display:flex;flex-wrap:wrap;gap:6px">' + TY.map(function (x) { return '<button class="bl-chip" data-ty="' + x[0] + '" aria-pressed="false">' + e(L('ty_' + x[0], x[1])) + '</button>'; }).join('') + '</div>') + q(L('qWhere', 'Where do your investors live?'), '<div style="display:grid;gap:6px">' + GE.map(function (x) { return opt('ge', x); }).join('') + '</div>') + '<div id="prq">' + q(L('qPrice', 'How does the market know what it is worth?'), '<div style="display:grid;gap:6px">' + PR.map(function (x) { return opt('pr', x); }).join('') + '</div>') + '</div>' + q(L('qRaise', 'How much do you want to raise?'), '<div id="rc" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px"></div><input id="ra" class="bl-in-f" inputmode="decimal" placeholder="' + e(L('typeRaise', 'Or type it, for example 2.4m')) + '">') + '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center"><button id="go" class="bl-pill a">' + e(L('seeStructure', 'See my structure')) + ' ↗</button>' + errSpan('err') + '</div></div>';
    var err = function (t) { $('err').textContent = t; };
    var pick = function (a, v) { root.querySelectorAll('[data-' + a + ']').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset[a] === v)); }); };
    var money = function (t) { var m = String(t).trim().toLowerCase().replace(/[$,\s]/g, '').match(/^(\d+(?:\.\d+)?)([kmb])?$/); return m ? Math.round(+m[1] * ({ k: 1e3, m: 1e6, b: 1e9 }[m[2]] || 1)) : 0; };
    var chips = function () { var c = ty === 'precious_metals' ? [25e6, 1e8, 5e8, 1e9] : [5e5, 2e6, 5e6, 2e7]; $('rc').innerHTML = c.map(function (v) { return '<button class="bl-chip" data-rv="' + v + '" aria-pressed="' + (v === ra) + '">' + usd(v) + '</button>'; }).join(''); $('prq').style.display = ty === 'precious_metals' ? 'none' : 'block'; if (ty === 'precious_metals') { pr = 'live_market'; auto = true; } else if (auto) { pr = ''; auto = false; pick('pr', ''); } };
    root.querySelectorAll('[data-ty]').forEach(function (b) { b.onclick = function () { ty = b.dataset.ty; pick('ty', ty); chips(); err(''); }; });
    root.querySelectorAll('[data-ge]').forEach(function (b) { b.onclick = function () { ge = b.dataset.ge; pick('ge', ge); err(''); }; });
    root.querySelectorAll('[data-pr]').forEach(function (b) { b.onclick = function () { pr = b.dataset.pr; pick('pr', pr); err(''); }; });
    $('rc').onclick = function (ev) { var b = ev.target.closest('[data-rv]'); if (!b) return; ra = +b.dataset.rv; $('ra').value = ''; root.querySelectorAll('[data-rv]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); err(''); };
    $('ra').oninput = function () { ra = money($('ra').value); root.querySelectorAll('[data-rv]').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); err(''); };
    pick('ty', ty); pick('ge', ge); pick('pr', pr); chips();
    $('go').onclick = function () {
      var n = $('nm').value.trim();
      if (n.length < 2) return err(L('errAssetName', 'Enter the asset\'s name'));
      if (!ty) return err(L('errType', 'Pick what you are tokenizing'));
      if (!ge) return err(L('errWhere', 'Pick where your investors live'));
      if (!pr) return err(L('errPrice', 'Pick how it is priced'));
      if (!ra) return err(L('errRaise', 'Pick or type the raise'));
      var lab = function (a, v) { return (a.find(function (x) { return x[0] === v; }) || [])[1] || v; };
      say('Show me the structure for ' + n + ': ' + lab(TY, ty).toLowerCase() + ', investors ' + lab(GE, ge).replace(/^In /, 'in ').replace(/^Outside/, 'outside').replace(/^Both/, 'in and outside the United States').replace(/^Banks/, 'banks') + ', ' + lab(PR, pr).toLowerCase() + ', raising ' + usd(ra) + '.');
    };
    K.done();
  };

  CARDS['rwa.structure'] = function (D, root, K) {
    var T = K.T, L = K.L, m = D.m || D, P = rwaParts(K, root), S0 = (m.team && m.team.seats) || [];
    var bn = m.build_now || {};
    var S = shell(K, root, { rtl: K.rtl, sr: 'The structure that fits ' + D.name + ': ' + (bn.name || ''), hero: '<div class="bl-muted" style="font-size:13px">' + e(L('fits', 'The structure that fits ')) + e(D.name) + '</div><div style="font:600 30px/1.08 var(--f);letter-spacing:-.03em;margin-top:6px">' + e(bn.name) + '.<br><span style="font-weight:400">' + e(bn.token) + ' ' + e(L('onEth', 'on Ethereum')) + '.</span></div>' });
    S.H.innerHTML = '<div style="font-size:14px;line-height:1.5;margin-top:10px;max-width:560px">' + e(m.plain) + '</div>' + (m.recommended && bn.id && m.recommended.id !== bn.id ? '<div class="bl-muted" style="font-size:13px;margin-top:6px">' + e(T.longTerm) + ': ' + e(m.recommended.name) + '. ' + e(L('startNow', 'You start with the structure above today.')) + '</div>' : '') + '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px">' + [[L('offering', 'Offering'), (m.tranches || []).map(function (t) { return t.route; }).join(' + ')], [L('status', 'Status'), m.status || T.beta], [T.estimate, m.broker_estimate && m.broker_estimate.total_usd ? usd(m.broker_estimate.total_usd) : '']].filter(function (x) { return x[1]; }).map(function (x) { return '<span style="background:rgba(255,255,255,.16);border-radius:12px;padding:6px 10px;font-size:12px"><span class="bl-muted">' + e(x[0]) + '</span> <b style="font-weight:600">' + e(x[1]) + '</b></span>'; }).join('') + '</div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:16px"><button class="bl-pill w" data-say="' + e('Create my asset: ' + D.name + '.') + '">' + e(T.create) + ' ↗</button><button class="bl-pill o" data-flow>' + e(T.flow) + '</button><button class="bl-pill o" data-say="' + e('I want to change the answers for ' + D.name + '.') + '">' + e(T.change) + ' ↗</button></div>';
    S.B.innerHTML = P.flowHTML() + '<div class="bl-card bl-white"><div class="bl-h" style="margin-bottom:12px">' + e(T.map) + '</div>' + P.mapHTML(m.map || []) + '</div><div class="bl-card bl-night" style="display:grid;gap:14px"><div><div class="bl-h">' + e(T.team) + '</div><div class="bl-muted" style="font-size:13px;margin-top:2px">' + e(L('teamHint', 'Every seat with Metatron\'s recommendation. Tap one to see why.')) + '</div></div>' + P.teamHTML(S0.map(function (s) { return Object.assign({}, s, { who: s.recommended_label }); }), function (s) { return 'data-why="' + e(s.role_id) + '"'; }) + '<div id="wy" style="display:none;border-top:1px solid #1B2C4B;padding-top:12px"></div></div>' + ((m.reasons || []).length || (m.notes || []).length ? '<div class="bl-card bl-night"><div class="bl-h" style="margin-bottom:8px">' + e(T.why) + '</div>' + (m.reasons || []).map(function (r) { return '<div style="display:flex;gap:8px;font-size:13px;line-height:1.45;margin-top:6px"><i class="ti ti-check" style="color:#8EC5FB" aria-hidden="true"></i><span>' + e(r) + '</span></div>'; }).join('') + (m.notes || []).slice(0, 3).map(function (n) { return '<div style="display:flex;gap:10px;align-items:baseline;font-size:13px;margin-top:8px"><span style="flex:none;width:8px;height:8px;border-radius:50%;background:#F5B544"></span><span>' + e(n) + '</span></div>'; }).join('') + '</div>' : '');
    P.wireFlow(m.flow);
    root.querySelectorAll('[data-why]').forEach(function (b) { b.onclick = function () { var s = S0.find(function (x) { return x.role_id === b.dataset.why; }), w = K.$('wy'); if (!s) return; w.style.display = 'block'; w.innerHTML = '<div style="font:600 15px var(--f)">' + e(s.role) + ': ' + e(s.recommended_label) + '</div><div style="font-size:13px;line-height:1.5;margin-top:4px">' + e(s.why) + '</div>' + (s.look_for || []).map(function (l) { return '<div class="bl-muted" style="font-size:12px;margin-top:4px"><i class="ti ti-point" aria-hidden="true"></i> ' + e(l) + '</div>'; }).join('') + (s.when ? '<div class="bl-muted" style="font-size:12px;margin-top:6px">' + e(T.when) + ': ' + e(s.when) + '</div>' : ''); }; });
    K.done();
  };

  CARDS['rwa.asset'] = function (D, root, K) {
    var T = K.T, L = K.L, tag = K.tag, P = rwaParts(K, root), tm = D.team || { seats: [] }, S0 = tm.seats || [];
    var sym = String(D.symbol || ''), bp = typeof D.blueprint === 'object' && D.blueprint ? D.blueprint.name : D.blueprint;
    var S = shell(K, root, { rtl: K.rtl, sr: D.name + ': the structure and its team, seat by seat', hero: '<div style="display:flex;align-items:center;gap:14px"><div style="flex:none;width:54px;height:54px;border-radius:50%;background:#fff;color:#1F6FE5;display:grid;place-items:center;font:600 13px var(--f)">' + e(sym.length <= 5 ? sym : sym.slice(0, 4)) + '</div><div style="min-width:0"><div style="font:600 26px/1.1 var(--f);letter-spacing:-.02em">' + e(D.name) + '</div><div class="bl-muted" style="font-size:13px;margin-top:4px">' + e([sym, bp].filter(Boolean).join(', ')) + '</div></div></div>' });
    var test = D.test != null ? D.test : !!D.test_deployment;
    var missing = typeof D.missing === 'number' ? D.missing : D.details && D.details.missing ? D.details.missing.length : 0;
    var env = D.live ? L('envLive', 'Live on Ethereum') : test ? L('envTest', 'On Sepolia') : L('envDraft', 'Draft');
    S.H.innerHTML = '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px">' + tag(T.beta, 't-mid') + tag(env, 't-mid') + '</div><div style="margin-top:14px"><div style="display:flex;justify-content:space-between;gap:8px;font-size:13px"><span>' + (tm.closed || 0) + ' ' + e(T.of) + ' ' + (tm.total || S0.length) + ' ' + e(T.seated) + '</span><span class="bl-muted">' + (tm.filled || 0) + ' ' + e(L('seatedN', 'seated')) + (tm.introductions_requested ? ', ' + tm.introductions_requested + ' ' + e(L('requestedN', 'requested')) : '') + '</span></div><div style="height:8px;border-radius:9px;background:rgba(255,255,255,.25);margin-top:6px;overflow:hidden"><span style="display:block;height:100%;width:' + Math.round(100 * (tm.closed || 0) / Math.max(1, tm.total || S0.length)) + '%;background:#fff;border-radius:9px"></span></div></div>' + (D.notice ? '<div style="display:flex;gap:8px;align-items:center;margin-top:12px;font-size:13px"><i class="ti ti-circle-check" aria-hidden="true"></i>' + e(D.notice) + '</div>' : '');
    var nx = D.next_step, acts = [];
    if (tm.empty) acts.push('<button class="bl-pill a" data-say="' + e('Seat the recommended team for ' + D.name + '.') + '">' + e(T.seatTeam) + ' ↗</button>');
    if (missing) acts.push('<button class="bl-pill o" data-say="' + e('Show me the details still missing for ' + D.name + '.') + '">' + e(T.details) + ': ' + missing + ' ' + e(T.left) + ' ↗</button>');
    acts.push('<button class="bl-pill o" data-flow>' + e(T.flow) + '</button>');
    S.B.innerHTML = (nx ? '<div class="bl-card bl-white"><div style="font-size:13px;color:#0A6FCC;font-weight:600">' + e(T.nextStep) + '</div><div style="font:600 19px/1.25 var(--f);margin-top:2px">' + e(nx.label) + '</div><div class="bl-muted" style="font-size:13px;margin-top:4px">' + e(nx.why) + '</div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px">' + acts.join('') + '</div></div>' : '<div style="display:flex;flex-wrap:wrap;gap:8px">' + acts.join('') + '</div>') + P.flowHTML() + '<div class="bl-card bl-night" style="display:grid;gap:14px"><div><div class="bl-h">' + e(T.team) + '</div><div class="bl-muted" style="font-size:13px;margin-top:2px">' + e(L('tapSeat', 'Tap a seat to close it. Each one shows its steps.')) + '</div></div>' + P.teamHTML(S0, function (s) { return 'data-say="' + e('Open the ' + s.role + ' seat for ' + D.name + '.') + '"'; }) + ((tm.run_by_metatron || []).length ? '<div style="border-top:1px solid #1B2C4B;padding-top:12px;display:flex;flex-wrap:wrap;gap:6px;align-items:center"><span class="bl-muted" style="font-size:12px;margin-inline-end:4px">' + e(T.run) + '</span>' + tm.run_by_metatron.map(function (r) { return tag(typeof r === 'string' ? r : r.title, 't-req'); }).join('') + '</div>' : '') + '</div><div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center"><button class="bl-pill o" data-say="' + e('Show me the first year of ' + D.name + '.') + '">' + e(L('year', 'Watch the first year')) + ' ↗</button><button class="bl-pill o" data-say="' + e('What is left before ' + D.name + ' goes live?') + '">' + e(L('whatLeft', 'What is left before launch')) + ' ↗</button>' + (D.app_url ? '<a class="bl-pill o" href="' + e(D.app_url) + '" target="_blank" rel="noopener">' + e(T.open) + ' <i class="ti ti-external-link" aria-hidden="true"></i></a>' : '') + '</div>' + (D.beta ? '<div class="bl-muted" style="font-size:12px">' + e(D.beta) + '</div>' : '');
    P.wireFlow(D.flow);
    K.done();
  };

  CARDS['rwa.seat'] = function (D, root, K) {
    var T = K.T, L = K.L, tag = K.tag, $ = K.$;
    var s = D.seat || {}, C = s.closing || [], O = s.options || [], cur = s.current || '';
    var S = shell(K, root, { rtl: K.rtl, sr: 'The ' + s.role + ' seat for ' + D.name + ': who sits in it and how it closes', hero: '<div class="bl-muted" style="font-size:13px">' + e(D.name) + ', ' + e(s.step) + '</div><div style="font:600 26px/1.15 var(--f);letter-spacing:-.02em;margin-top:4px">' + e(s.role) + '</div>' });
    S.H.innerHTML = '<div style="font-size:14px;line-height:1.5;margin-top:6px;max-width:560px">' + e(s.does) + '</div><div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px">' + tag(s.closed ? T.closed : s.state) + '<span style="font-size:13px">' + e(s.who) + '</span></div>' + (D.notice ? '<div style="display:flex;gap:8px;align-items:center;margin-top:10px;font-size:13px"><i class="ti ti-circle-check" aria-hidden="true"></i>' + e(D.notice) + '</div>' : '');
    var by = { metatron: T.metatronActs, partner: T.partnerActs, counsel: T.counselActs, you: T.youAct };
    var pickKey = (O.find(function (o) { return o.key === cur; }) || O.find(function (o) { return o.recommended; }) || O[0] || {}).key || '';
    var optsHTML = '<div style="background:#EEF6FF;border-radius:14px;padding:12px 14px"><div style="font:600 13px var(--f);color:#0A6FCC"><i class="ti ti-sparkles" aria-hidden="true"></i> ' + e(T.recommended) + ': ' + e(s.recommended_label) + '</div><div style="font-size:13px;line-height:1.45;margin-top:4px">' + e(s.why) + '</div></div><div style="display:grid;gap:8px;margin-top:12px">' + O.map(function (o) { return '<button class="bl-opt" data-op="' + e(o.key) + '" aria-pressed="' + (o.key === pickKey) + '"><span style="flex:1"><span style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;font-weight:600">' + e(o.label) + (o.key === cur ? tag(T.now, 't-ok') : o.recommended ? tag(T.recommended, 't-req') : '') + '</span><span class="bl-muted" style="display:block;margin-top:2px">' + e(o.blurb) + '</span><span style="display:block;margin-top:6px">' + tag(o.chip, 't-mid') + '</span></span></button>'; }).join('') + '</div><input id="fn" class="bl-in-f" style="display:none;margin-top:10px" maxlength="120" placeholder="' + e(T.firmName) + '"><div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px"><button class="bl-pill a" id="seat">' + e(T.seatIt) + ' ↗</button>' + errSpan('err1') + '</div>';
    var pickCard = !cur ? '<div class="bl-card bl-white"><div class="bl-h" style="margin-bottom:12px">' + e(T.whoSits) + '</div>' + optsHTML + '</div>' : O.some(function (o) { return o.key !== cur || o.needsName; }) ? '<details class="bl-card bl-white" id="chg"><summary style="cursor:pointer;font:600 14px var(--f)">' + e(T.changeWho) + '</summary><div style="margin-top:12px">' + optsHTML + '</div></details>' : '';
    var OI = C.map(function (c, i) { return !c.done && !c.later ? i : -1; }).filter(function (i) { return i >= 0; }), first = OI.length ? OI[0] : -1;
    var live = new Set([first]); if (C[first] && (C[first].action || {}).kind === 'wait' && OI[1] != null) live.add(OI[1]);
    var stepRow = function (c, i) {
      var a = c.action || {}, open = !c.done && !c.later && (live.has(i) || a.kind === 'wait'), ctl = '';
      if (open && a.kind === 'name_spv') ctl = '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><input id="spv" class="bl-in-f" style="flex:1;min-width:180px" maxlength="120" placeholder="' + e(T.spvName) + '"><button class="bl-pill a" id="spvgo">' + e(T.saveName) + ' ↗</button></div>' + errSpan('err2');
      else if (open && a.kind === 'details') ctl = '<button class="bl-pill a" style="margin-top:8px" data-say="' + e('Show me the details still missing for ' + D.name + '.') + '">' + e(T.details) + ' ↗</button>';
      else if (open && a.kind === 'documents') ctl = '<button class="bl-pill a" style="margin-top:8px" data-say="' + e('Draft the documents for ' + D.name + '.') + '">' + e(T.draft) + ' ↗</button>';
      else if (open && a.kind === 'ask_metatron') ctl = '<button class="bl-pill a" style="margin-top:8px" data-say="' + e('Ask Metatron to start the ' + s.role + ' seat for ' + D.name + '.') + '">' + e(T.ask) + ' ↗</button>';
      else if (open && a.kind === 'signoff') ctl = '<div data-so="' + e(a.gate) + '" data-lb="' + e(a.label) + '" style="display:grid;gap:8px;margin-top:8px"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px"><input class="bl-in-f" data-f="n" maxlength="120" placeholder="' + e(T.signer) + '"><input class="bl-in-f" data-f="r" maxlength="120" placeholder="' + e(T.signerRole) + '"></div><label style="display:flex;gap:8px;align-items:flex-start;font-size:13px"><input type="checkbox" class="bl-cb" data-f="h">' + e(T.hold) + '</label><div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center"><button class="bl-pill a" data-rec>' + e(T.record) + ' ↗</button>' + errSpan() + '</div></div>';
      else if (open && a.kind === 'app' && D.app_url) ctl = '<a class="bl-pill o" style="margin-top:8px" href="' + e(D.app_url + '?section=' + a.section) + '" target="_blank" rel="noopener">' + e(T.open) + ' <i class="ti ti-external-link" aria-hidden="true"></i></a>';
      else if (open && a.kind === 'seat') ctl = '<button class="bl-pill o" style="margin-top:8px" data-say="' + e('Open the ' + (ROLE[a.role] || a.role) + ' seat for ' + D.name + '.') + '">' + e(L('role_' + a.role, ROLE[a.role] || a.role)) + ' ↗</button>';
      else if (open && a.kind === 'wait') ctl = '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:6px"><span class="bl-muted" style="font-size:12px"><i class="ti ti-clock" aria-hidden="true"></i> ' + e(by[c.by] || '') + '</span>' + (c.key === 'choose' && O.some(function (o) { return o.needsName; }) ? '<button class="bl-pill o sm" data-own>' + e(T.bringOwn) + '</button>' : '') + '</div>';
      return '<div class="bl-in" style="--i:' + i + ';display:flex;gap:12px;align-items:flex-start;border-top:1px solid #E3ECF8;padding-top:12px"><span class="' + (i === first ? 'bl-pulse' : '') + '" style="flex:none;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;' + (c.done ? 'background:#1F6FE5;color:#fff' : 'border:2px solid ' + (c.later ? '#DCE7F7' : '#3A92FC')) + '">' + (c.done ? '<i class="ti ti-check" style="font-size:14px" aria-hidden="true"></i>' : '') + '</span><div style="flex:1;min-width:0"><div style="font:600 14px/1.35 var(--f)' + (i === first ? ';color:#0A4FB4' : '') + '">' + e(c.title) + (c.later ? ' <span class="bl-muted" style="font-weight:400;font-size:12px">' + e(T.later) + '</span>' : '') + '</div><div class="bl-muted" style="font-size:13px;line-height:1.45">' + e(c.plain) + '</div>' + ctl + '</div></div>';
    };
    var steps = '<div class="bl-card bl-white"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px"><div class="bl-h">' + e(T.closeSteps) + '</div><span class="bl-muted" style="font-size:13px">' + C.filter(function (c) { return c.done && !c.later; }).length + ' ' + e(T.of) + ' ' + C.filter(function (c) { return !c.later; }).length + '</span></div>' + C.map(stepRow).join('') + '</div>';
    S.B.innerHTML = (cur ? steps + pickCard : pickCard + steps) + ((s.look_for || []).length ? '<details class="bl-card bl-night"><summary style="cursor:pointer;font:600 14px var(--f)">' + e(T.lookFor) + '</summary>' + s.look_for.map(function (l) { return '<div style="font-size:13px;margin-top:6px"><i class="ti ti-check" style="color:#8EC5FB" aria-hidden="true"></i> ' + e(l) + '</div>'; }).join('') + (s.when ? '<div class="bl-muted" style="font-size:12px;margin-top:8px">' + e(T.when) + ': ' + e(s.when) + '</div>' : '') + '</details>' : '') + '<div><button class="bl-pill o" data-say="' + e('Back to the team for ' + D.name + '.') + '">' + e(T.backTeam) + ' ↗</button></div>';
    var opt = function (k) { return O.find(function (o) { return o.key === k; }) || {}; };
    var fnShow = function () { if ($('fn')) $('fn').style.display = opt(pickKey).needsName ? 'block' : 'none'; }; fnShow();
    var choose = function (k) { pickKey = k; root.querySelectorAll('[data-op]').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.op === k)); }); fnShow(); if ($('err1')) $('err1').textContent = ''; };
    root.querySelectorAll('[data-op]').forEach(function (b) { b.onclick = function () { choose(b.dataset.op); }; });
    root.querySelectorAll('[data-own]').forEach(function (b) { b.onclick = function () { var o = O.find(function (x) { return x.needsName; }), d = $('chg'); if (!o) return; if (d) d.open = true; choose(o.key); $('fn').focus(); }; });
    if ($('seat')) $('seat').onclick = function () { var o = opt(pickKey); if (!o.key) return; var n = $('fn').value.trim(); if (o.needsName && n.length < 2) { $('err1').textContent = T.errName; return; } if (o.key === cur && !o.needsName) { $('err1').textContent = T.already; return; } say('Seat the ' + s.role + ' for ' + D.name + ': ' + (o.needsName ? n + ', our own firm' : o.label) + '.'); };
    if ($('spvgo')) $('spvgo').onclick = function () { var n = $('spv').value.trim(); if (n.length < 2) { $('err2').textContent = T.errName; return; } say('Name the SPV for ' + D.name + ': ' + n + '.'); };
    root.querySelectorAll('[data-so]').forEach(function (f) { f.querySelector('[data-rec]').onclick = function () { var n = f.querySelector('[data-f=n]').value.trim(), r = f.querySelector('[data-f=r]').value.trim(), h = f.querySelector('[data-f=h]').checked, er = f.querySelector('[data-err]'); if (n.length < 2 || r.length < 2) { er.textContent = T.errSigner; return; } if (!h) { er.textContent = T.errHold; return; } say('Record "' + f.dataset.lb + '" for ' + D.name + ': signed by ' + n + ', ' + r + '. I hold the signed document.'); }; });
    K.done();
  };

  CARDS['rwa.details'] = function (D, root, K) {
    var T = K.T, L = K.L, all = D.fields || (D.details && D.details.fields) || [];
    var S = shell(K, root, { rtl: K.rtl, sr: 'The asset details for ' + D.name, hero: '<div class="bl-muted" style="font-size:13px">' + e(D.name) + '</div><div style="font:600 24px/1.15 var(--f);letter-spacing:-.02em;margin-top:4px">' + e(L('detailsTitle', 'The details partners read')) + '</div><div class="bl-muted" style="font-size:13px;margin-top:6px">' + e(L('detailsSub', 'The structure, documents and simulation are built from them.')) + '</div>' });
    var F = all.filter(function (f) { return f.missing; }).length ? all.filter(function (f) { return f.missing; }) : all;
    var val = {}; F.forEach(function (f) { val[f.key] = f.value; });
    var money = function (t) { var m = String(t).trim().toLowerCase().replace(/[$,\s]/g, '').match(/^(\d+(?:\.\d+)?)([kmb])?$/); return m ? +m[1] * ({ k: 1e3, m: 1e6, b: 1e9 }[m[2]] || 1) : null; };
    var field = function (f) {
      var h = '';
      if (f.kind === 'choice') h = '<div style="display:flex;flex-wrap:wrap;gap:6px">' + (f.options || []).map(function (o) { return '<button class="bl-chip" data-k="' + e(f.key) + '" data-v="' + e(o.value) + '" aria-pressed="' + (val[f.key] === o.value) + '">' + e(o.label) + '</button>'; }).join('') + '</div>';
      else if (f.kind === 'country' || f.kind === 'countries') h = '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:6px">' + (f.common || []).map(function (c) { return '<button class="bl-chip" data-k="' + e(f.key) + '" data-c="' + c + '" aria-pressed="' + (f.kind === 'countries' ? (val[f.key] || []).indexOf(c) >= 0 : val[f.key] === c) + '">' + c + '</button>'; }).join('') + '</div><input class="bl-in-f" data-x="' + e(f.key) + '" maxlength="' + (f.kind === 'countries' ? 120 : 2) + '" placeholder="' + e(f.kind === 'countries' ? L('otherCodes', 'Other codes, for example FR, JP') : L('otherCode', 'Other code, for example FR')) + '">';
      else h = '<input class="bl-in-f" data-t="' + e(f.key) + '" value="' + e(f.value == null ? '' : f.value) + '" ' + (f.kind === 'money' || f.kind === 'number' ? 'inputmode="decimal" placeholder="' + e(f.kind === 'money' ? L('exMoney', 'For example 2.4m') : L('exNumber', 'For example 1')) + '"' : 'maxlength="120"') + '>';
      return '<div><div style="font:600 14px var(--f);margin-bottom:6px">' + e(f.label) + '</div>' + (f.hint ? '<div class="bl-muted" style="font-size:12px;margin:-2px 0 6px">' + e(f.hint) + '</div>' : '') + h + '</div>';
    };
    S.B.innerHTML = '<div class="bl-card bl-white" style="display:grid;gap:16px">' + F.map(field).join('') + '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center"><button class="bl-pill a" id="go">' + e(T.save) + ' ↗</button>' + errSpan('err') + '</div></div>';
    root.querySelectorAll('[data-v]').forEach(function (b) { b.onclick = function () { val[b.dataset.k] = b.dataset.v; root.querySelectorAll('[data-k="' + b.dataset.k + '"][data-v]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); }; });
    root.querySelectorAll('[data-c]').forEach(function (b) { b.onclick = function () { var f = F.find(function (x) { return x.key === b.dataset.k; }); if (f.kind === 'countries') { var a = new Set(val[f.key] || []); a.has(b.dataset.c) ? a.delete(b.dataset.c) : a.add(b.dataset.c); val[f.key] = Array.from(a); b.setAttribute('aria-pressed', String(a.has(b.dataset.c))); } else { val[f.key] = b.dataset.c; root.querySelectorAll('[data-k="' + f.key + '"][data-c]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); } }; });
    K.$('go').onclick = function () {
      var er = K.$('err'), out = []; er.textContent = '';
      for (var i = 0; i < F.length; i++) {
        var f = F[i], v = val[f.key], t = root.querySelector('[data-t="' + f.key + '"]'), x = root.querySelector('[data-x="' + f.key + '"]');
        if (t) { var raw = t.value.trim(); if (!raw) continue; if (f.kind === 'money' || f.kind === 'number') { v = money(raw); if (!v) { er.textContent = f.label + ': ' + L('errNumber', 'enter a number'); return; } } else v = raw; }
        if (x && x.value.trim()) { var codes = x.value.toUpperCase().split(/[^A-Z]+/).filter(function (c) { return c.length === 2; }); if (f.kind === 'countries') v = Array.from(new Set((v || []).concat(codes))); else if (codes[0]) v = codes[0]; }
        if (v == null || v === '' || (Array.isArray(v) && !v.length)) continue;
        var o = (f.options || []).find(function (o) { return o.value === v; });
        out.push(f.label + ': ' + (Array.isArray(v) ? v.join(', ') : o ? o.label : f.kind === 'money' ? usd(v) : v));
      }
      if (!out.length) { er.textContent = L('errOne', 'Fill at least one detail'); return; }
      say('Save the details for ' + D.name + ': ' + out.join('; ') + '.');
    };
    K.done();
  };

  CARDS['rwa.documents'] = function (D, root, K) {
    var T = K.T, L = K.L, tag = K.tag, be = D.broker_estimate;
    var S = shell(K, root, { rtl: K.rtl, sr: 'Documents drafted for counsel for ' + D.name, hero: '<div class="bl-muted" style="font-size:13px">' + e(D.name) + '</div><div style="font:600 24px/1.15 var(--f);letter-spacing:-.02em;margin-top:4px">' + e(L('docsTitle', 'Drafts for counsel')) + '</div>' });
    S.H.innerHTML = D.note ? '<div class="bl-muted" style="font-size:13px;margin-top:6px">' + e(D.note) + '</div>' : '';
    var total = be && (be.totalUsd || be.total_usd);
    S.B.innerHTML = '<div class="bl-card bl-white"><div style="display:grid;gap:8px">' + (D.documents || []).map(function (d, i) { return '<div class="bl-in" style="--i:' + i + ';display:flex;gap:10px;align-items:center;border:1px solid #E3ECF8;border-radius:12px;padding:10px 12px"><i class="ti ti-file-text" style="font-size:20px;color:#1F6FE5" aria-hidden="true"></i><span style="font:600 14px var(--f)">' + e(d.title) + '</span><span style="margin-inline-start:auto">' + tag(L('draftTag', 'Draft'), 't-mid') + '</span></div>'; }).join('') + '</div>' + (total && be.covered !== false ? '<div style="margin-top:12px;background:#F5F9FF;border-radius:12px;padding:10px 12px"><div class="bl-muted" style="font-size:12px">' + e(T.estimate) + '</div><div style="font:600 20px var(--f)">' + usd(total) + '</div><div class="bl-muted" style="font-size:12px">' + e(be.note) + '</div></div>' : '') + '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px">' + (D.review_url ? '<a class="bl-pill a" href="' + e(D.review_url) + '" target="_blank" rel="noopener">' + e(L('review', 'Review and download')) + ' <i class="ti ti-external-link" aria-hidden="true"></i></a>' : '') + '<button class="bl-pill o" data-say="' + e('Back to the team for ' + D.name + '.') + '">' + e(T.backTeam) + ' ↗</button></div></div>';
    K.done();
  };

  CARDS['rwa.year'] = function (D, root, K) {
    var T = K.T, L = K.L, u = D.summary || {};
    var S = shell(K, root, { rtl: K.rtl, sr: 'The first year of ' + D.name + ', simulated on its own numbers', hero: '<div class="bl-muted" style="font-size:13px">' + e(D.name) + '</div><div style="font:600 24px/1.15 var(--f);letter-spacing:-.02em;margin-top:4px">' + e(L('yearTitle', 'The first year, on your numbers')) + '</div>' });
    S.H.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin-top:14px">' + [[L('raised', 'Raised'), usd(u.raisedUsd), u.raisePct != null ? u.raisePct + '% ' + L('ofRaise', 'of the raise') : ''], [L('holders', 'Holders'), u.holders, ''], [L('paid', 'Paid to holders'), usd(u.distributedUsd), ''], [L('refused', 'Transfers refused'), u.blockedTransfers, L('byContract', 'by the contract')]].map(function (x) { return '<div style="background:rgba(255,255,255,.14);border-radius:14px;padding:10px 12px"><div class="bl-muted" style="font-size:12px">' + e(x[0]) + '</div><div style="font:600 22px var(--f)">' + e(x[1]) + '</div>' + (x[2] ? '<div class="bl-muted" style="font-size:11px">' + e(x[2]) + '</div>' : '') + '</div>'; }).join('') + '</div>';
    S.B.innerHTML = '<div class="bl-card bl-night"><div style="display:grid;gap:10px">' + (D.key_moments || []).map(function (k, i) { return '<div class="bl-in" style="--i:' + i + ';display:flex;gap:12px"><span class="bl-mono" style="flex:none;width:56px;color:#8EC5FB">' + e(L('day', 'Day')) + ' ' + e(k.day) + '</span><span><span style="display:block;font-weight:600;font-size:14px">' + e(k.title) + '</span><span class="bl-muted" style="font-size:13px">' + e(k.detail) + '</span></span></div>'; }).join('') + '</div><div class="bl-muted" style="font-size:12px;margin-top:14px">' + e(D.disclaimer) + '</div></div><div><button class="bl-pill o" data-say="' + e('Back to the team for ' + D.name + '.') + '">' + e(T.backTeam) + ' ↗</button></div>';
    K.done();
  };

  CARDS['rwa.ready'] = function (D, root, K) {
    var T = K.T, L = K.L, G = D.gates || [], a = G.filter(function (g) { return !g.mainnet_only; }), b = G.filter(function (g) { return g.mainnet_only; });
    var S = shell(K, root, { rtl: K.rtl, sr: 'What is left before ' + D.name + ' goes live', hero: '<div class="bl-muted" style="font-size:13px">' + e(D.name) + '</div><div style="font:600 24px/1.15 var(--f);letter-spacing:-.02em;margin-top:4px">' + e(L('readyTitle', 'From rehearsal to Ethereum')) + '</div>' });
    S.H.innerHTML = D.beta ? '<div class="bl-muted" style="font-size:13px;margin-top:6px">' + e(D.beta) + '</div>' : '';
    var list = function (t, xs) { return xs.length ? '<div><div class="bl-h" style="margin-bottom:8px">' + e(t) + '</div><div style="display:grid;gap:8px">' + xs.map(function (g, i) { return '<div class="bl-in" style="--i:' + i + ';display:flex;gap:10px;align-items:center"><span style="flex:none;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;' + (g.done ? 'background:#3A92FC;color:#fff' : 'border:1px solid #2A3E63') + '">' + (g.done ? '<i class="ti ti-check" style="font-size:13px" aria-hidden="true"></i>' : '') + '</span><span style="font-size:14px' + (g.done ? '' : ';color:#B9CCE6') + '">' + e(g.label) + '</span></div>'; }).join('') + '</div></div>' : ''; };
    var nx = D.next_step, iv = D.investor;
    S.B.innerHTML = '<div class="bl-card bl-night" style="display:grid;gap:18px">' + list(L('beforeTest', 'Before the test network'), a) + list(L('beforeMain', 'Before Ethereum'), b) + '</div>' + (nx ? '<div class="bl-card bl-white" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><div style="flex:1;min-width:200px"><div style="font-size:13px;color:#0A6FCC;font-weight:600">' + e(T.nextStep) + '</div><div style="font:600 19px/1.25 var(--f)">' + e(nx.label) + '</div><div class="bl-muted" style="font-size:13px">' + e(nx.why) + '</div></div><a class="bl-pill a" href="' + e(nx.app_url || D.app_url) + '" target="_blank" rel="noopener">' + e(nx.fix || T.open) + ' <i class="ti ti-external-link" aria-hidden="true"></i></a></div>' : '') + (iv && iv.ready ? '<div class="bl-card bl-white"><div class="bl-h">' + e(L('investorPage', 'Investor page')) + ', ' + e(iv.network) + '</div><div class="bl-muted" style="font-size:13px;margin:4px 0 10px">' + e(iv.message) + '</div><a class="bl-pill o" href="' + e(iv.link) + '" target="_blank" rel="noopener">' + e(L('openInvestor', 'Open the investor page')) + ' <i class="ti ti-external-link" aria-hidden="true"></i></a></div>' : '') + '<div class="bl-muted" style="font-size:12px">' + e(L('walletNote', 'Wallet steps open in the app and are signed in your own wallet. Nobody at Metatron ever holds a key.')) + '</div>';
    K.done();
  };

  /* ---------- Metatron Launch (tokens) ---------- */

  var NETS = { base: ['Base', 'ETH', 8453], ethereum: ['Ethereum', 'ETH', 1], polygon: ['Polygon', 'POL', 137] };
  var netKey = function (n) { n = String(n || '').toLowerCase(); return n === '1' || n.indexOf('eth') === 0 ? 'ethereum' : n === '137' || n.indexOf('pol') === 0 ? 'polygon' : 'base'; };
  var short = function (t) { t = String(t || ''); return t.length <= 5 ? t : t.slice(0, 4); };
  var tickerFrom = function (name) { var w = String(name || '').toUpperCase().replace(/[^A-Z0-9 ]/g, '').split(/\s+/).filter(Boolean); var t = w.length > 1 ? w.map(function (x) { return x[0]; }).join('') : (w[0] || 'TKN'); return (t.length < 3 && w[0] ? w[0].slice(0, 4) : t).slice(0, 5); };
  var amberRows = function (notes) { return (notes || []).slice(0, 3).map(function (n) { return '<div style="display:flex;gap:10px;align-items:baseline"><span style="flex:none;width:8px;height:8px;border-radius:50%;background:#F5B544"></span><span>' + e(n) + '</span></div>'; }).join(''); };
  function plain(root, K, sr) { root.className = 'bl'; if (K.rtl) root.setAttribute('dir', 'rtl'); root.innerHTML = '<h2 class="sr-only">' + e(sr) + '</h2>'; }

  CARDS['launch.path'] = function (D, root, K) {
    plain(root, K, 'The path to launch ' + (D.goal || ''));
    root.innerHTML += '<div class="bl-card bl-night"><div class="bl-mono" style="color:#8EC5FB">Metatron Launch: plan_my_intent</div><div style="font:600 20px/1.2 var(--f);margin:6px 0 16px">' + e(D.rail || D.title) + '</div><div style="display:grid;gap:10px">' + (D.steps || []).map(function (s, i) { return '<div class="bl-in" style="--i:' + i + ';display:flex;gap:12px;align-items:flex-start"><span style="flex:none;width:30px;height:30px;border-radius:50%;background:#0F2A4A;color:#8EC5FB;display:grid;place-items:center;font-size:16px"><i class="ti ' + e(s.icon || 'ti-point') + '" aria-hidden="true"></i></span><div><div style="font-size:15px;font-weight:500">' + e(s.title) + '</div><div style="font-size:13px;color:#93A6C6">' + e(s.happens) + '</div></div>' + (s.where ? '<span style="margin-inline-start:auto;flex:none;font-size:12px;color:#8EC5FB;border:1px solid #1B2C4B;border-radius:999px;padding:3px 10px">' + e(s.where) + '</span>' : '') + '</div>'; }).join('') + '</div></div>';
    K.done();
  };

  CARDS['launch.editor'] = function (D, root, K) {
    var L = K.L, rtl = !!K.rtl;
    var name = D.name || '', tk0 = String(D.ticker || tickerFrom(name)).toUpperCase(), S = Number(D.supply) || 1e9;
    var kept = Math.max(0, Math.min(99, D.kept != null ? +D.kept : D.dex != null ? 100 - D.dex : 5));
    var keptLabel = D.keptLabel || 'Your wallet', keptWord = (D.keptWord || (keptLabel === 'Your wallet' ? 'kept part' : keptLabel)).toLowerCase();
    var where = D.where || '', months = [6, 12, 24].indexOf(+D.months) >= 0 ? +D.months : 12, cap = +D.cap || 4000;
    var net = netKey(D.network), quote = String(D.quote || '').toUpperCase() === 'USDC' ? 'USDC' : 'ETH', typeTitle = D.typeTitle || D.type || 'meme coin';
    var fund = D.fund != null ? D.fund : keptLabel !== 'Your wallet';
    var splitSource = D.splitSource || (D.fromMessage === false ? L('recommendedFor', 'Recommended for a ') + typeTitle : L('fromMessage', 'Set from your message'));
    plain(root, K, 'Launch editor for ' + name + ': pick the network, drag the split, pick where the kept part sits, then create it');
    var opt = function (w, icon, t, sub) { return '<button class="bl-opt" data-w="' + w + '" aria-pressed="false"><i class="ti ti-' + icon + '" style="font-size:18px;color:#1F6FE5" aria-hidden="true"></i><span><span style="display:block;font-weight:600">' + e(t) + '</span><span style="color:#4A6488">' + e(sub) + '</span></span></button>'; };
    root.innerHTML += '<div class="bl-card bl-field"><div style="display:flex;align-items:center;gap:14px"><div id="em" style="flex:none;width:54px;height:54px;border-radius:50%;background:#fff;color:#1F6FE5;display:grid;place-items:center;font:600 13px var(--f)">' + e(short(tk0)) + '</div><div style="flex:1;min-width:0"><input id="nm" class="bl-edit" value="' + e(name) + '" maxlength="60" aria-label="Token name" style="display:block;width:100%;font:600 24px/1.25 var(--f);letter-spacing:-.02em"><div style="display:flex;align-items:center;gap:8px;margin-top:6px;font-size:13px;color:#DCEBFF;flex-wrap:wrap">' + e(L('ticker', 'Ticker')) + ' <input id="tk" class="bl-edit" value="' + e(tk0) + '" maxlength="11" aria-label="Ticker" style="display:inline-block;width:96px;font:500 13px var(--font-mono);text-transform:uppercase"> <span>' + e(L('on', 'on')) + ' <span class="nwx">' + NETS[net][0] + '</span>, ' + e(typeTitle) + '</span></div></div><i class="ti ti-pencil" style="flex:none;font-size:18px;color:#DCEBFF" aria-hidden="true"></i></div><div style="font-size:13px;color:#DCEBFF;margin-top:18px">' + e(L('totalSupply', 'Total supply')) + '</div><div style="font:600 38px/1.05 var(--f);letter-spacing:-.03em"><span data-count="' + S + '">' + fmt(S) + '</span> <span class="tkx" style="font-size:16px;font-weight:500">' + e(tk0) + '</span></div></div>'
      + '<div class="bl-card bl-white"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:16px"><span style="font:500 13px var(--f);margin-inline-end:6px">' + e(L('network', 'Network')) + '</span><button class="bl-chip" data-n="base" aria-pressed="false">Base</button><button class="bl-chip" data-n="ethereum" aria-pressed="false">Ethereum</button><button class="bl-chip" data-n="polygon" aria-pressed="false">Polygon</button></div>'
      + '<div id="nomk" style="display:none;font-size:13px;line-height:1.45;color:#4A6488"><i class="ti ti-info-circle" aria-hidden="true"></i> ' + e(L('noPool', 'No pool at launch on')) + ' <span class="nwx">' + NETS[net][0] + '</span>. ' + e(L('noPool2', 'The token launches with the recommended split for its type, and liquidity is added later in the app, paired with')) + ' <span id="nat">ETH</span>.</div>'
      + '<div id="mk"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap"><div style="font:600 16px var(--f)">' + e(L('dragSplit', 'Drag to split')) + '</div><div style="font-size:12px;color:#4A6488">' + e(splitSource) + '</div></div>'
      + '<div id="bar" class="bl-drag" role="slider" tabindex="0" aria-label="Share kept as the ' + e(keptWord) + '" aria-valuemin="0" aria-valuemax="99" aria-valuenow="' + kept + '" style="margin:14px 0 4px"><span id="sk" class="bl-seg" style="--i:0;flex:' + kept + ' 1 0;background:#0A5FB4"></span><span id="sd" class="bl-seg" style="--i:1;flex:' + (100 - kept) + ' 1 0;background:#3A92FC"></span><span id="kn" class="bl-knob" style="inset-inline-start:' + kept + '%"><i class="ti ti-arrows-horizontal" aria-hidden="true"></i></span></div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px;margin-top:14px"><div class="bl-in" style="--i:0"><div style="display:flex;align-items:center;gap:6px;font-size:13px;color:#4A6488"><span style="width:8px;height:8px;border-radius:50%;background:#0A5FB4"></span>' + e(D.keptLine || (keptLabel === 'Your wallet' ? L('yourWallet', 'Your wallet') : keptLabel + ', ' + L('keptSuffix', 'kept'))) + '</div><div style="font:600 28px/1.1 var(--f);letter-spacing:-.02em;margin-top:4px"><span id="kp">' + kept + '</span>%</div><div id="ka" style="font-size:12px;color:#4A6488"></div>'
      + '<div style="font:500 13px var(--f);margin:14px 0 8px">' + e(L('whereSit', 'Where does it sit?')) + '</div><div style="display:grid;gap:8px">' + opt('wallet', 'wallet', L('wallet', 'In your wallet'), L('walletSub', 'Yours to move any time')) + opt('utila', 'building-bank', L('utila', 'Utila custody'), L('utilaSub', 'Institutional vault with team approvals')) + opt('lock', 'lock', L('lock', 'Locked'), L('lockSub', 'Nothing moves until the date you pick')) + '</div>'
      + '<div id="lockm" style="display:none;flex-wrap:wrap;gap:6px;margin-top:8px">' + [6, 12, 24].map(function (m) { return '<button class="bl-chip" data-m="' + m + '" aria-pressed="false">' + m + ' ' + e(L('months', 'months')) + '</button>'; }).join('') + '</div>'
      + (fund ? '<div id="hint" style="display:none;font-size:12px;color:#4A6488;margin-top:8px"><i class="ti ti-info-circle" aria-hidden="true"></i> ' + e(L('fundHint', 'Holders trust a fund more when it is locked or in custody.')) + '</div>' : '') + '</div>'
      + '<div class="bl-in" style="--i:1"><div style="display:flex;align-items:center;gap:6px;font-size:13px;color:#4A6488"><span style="width:8px;height:8px;border-radius:50%;background:#3A92FC"></span><span>' + e(L('poolOn', 'DEX pool on')) + ' <span class="nwx">' + NETS[net][0] + '</span></span></div><div style="font:600 28px/1.1 var(--f);letter-spacing:-.02em;margin-top:4px"><span id="dp">' + (100 - kept) + '</span>%</div><div id="da" style="font-size:12px;color:#4A6488"></div><div style="font-size:12px;color:#4A6488">' + e(L('poolForever', 'Locked in the pool forever')) + '</div>'
      + '<div id="ethfee" style="display:none;font-size:12px;color:#4A6488;margin-top:6px"><i class="ti ti-gas-station" aria-hidden="true"></i> ' + e(L('ethFee', 'Network fees on Ethereum are much higher than on Base: a few dollars on a quiet day, over $100 when the network is busy.')) + '</div>'
      + '<div style="font:500 13px var(--f);margin:14px 0 8px">' + e(L('pairedWith', 'Paired with')) + '</div><div style="display:flex;flex-wrap:wrap;gap:6px"><button class="bl-chip" data-q="ETH" aria-pressed="false">ETH</button><button class="bl-chip" data-q="USDC" aria-pressed="false">USDC</button></div>'
      + '<div style="font:500 13px var(--f);margin:14px 0 8px">' + e(L('startValue', 'Starting value of the whole token')) + '</div><div style="display:flex;flex-wrap:wrap;gap:6px">' + [4000, 25000, 100000].map(function (c) { return '<button class="bl-chip" data-c="' + c + '" aria-pressed="false">$' + fmt(c) + '</button>'; }).join('') + '</div>'
      + '<div style="display:flex;align-items:center;gap:6px;margin-top:8px;font-size:12px;color:#4A6488">' + e(L('recommendedV', 'Recommended')) + ': $' + fmt(D.recommendedCap || 4000) + '<button class="bl-pill xs" data-say="' + e('Why is a $' + fmt(D.recommendedCap || 4000) + ' starting value recommended?') + '">' + e(L('whyBtn', 'Why')) + ' ↗</button></div></div></div></div></div>'
      + ((D.notes || []).length ? '<div class="bl-card bl-night" style="padding:12px 16px;border-radius:16px;display:grid;gap:6px;font-size:13px">' + amberRows(D.notes) + '</div>' : '')
      + '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center"><button id="go" class="bl-pill a">' + e(L('createIt', 'Create it')) + ' ↗</button><button class="bl-pill o" data-say="' + e('Help me choose where the ' + keptWord + ' should sit') + '">' + e(L('helpChoose', 'Help me choose')) + ' ↗</button>' + errSpan('err') + '</div>';
    var $ = K.$;
    var tk = function () { return $('tk').value.trim().toUpperCase(); };
    var draw = function () { var d = 100 - kept, t = tk(); $('sk').style.flex = kept + ' 1 0'; $('sd').style.flex = d + ' 1 0'; $('kn').style.insetInlineStart = kept + '%'; $('kp').textContent = kept; $('dp').textContent = d; $('ka').textContent = fmt(S * kept / 100) + ' ' + t; $('da').textContent = fmt(S * d / 100) + ' ' + t; var b = $('bar'); b.setAttribute('aria-valuenow', kept); b.setAttribute('aria-valuetext', kept + '% kept, ' + d + '% to the DEX'); };
    var bar = $('bar'), at = function (ev) { var b = bar.getBoundingClientRect(), x = (ev.clientX - b.left) / b.width; if (rtl) x = 1 - x; kept = Math.min(99, Math.max(0, Math.round(x * 100))); draw(); };
    bar.addEventListener('pointerdown', function (ev) { bar.setPointerCapture(ev.pointerId); at(ev); });
    bar.addEventListener('pointermove', function (ev) { if (bar.hasPointerCapture(ev.pointerId)) at(ev); });
    bar.addEventListener('keydown', function (ev) { var m = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1, ArrowUp: 1, ArrowDown: -1, PageUp: 10, PageDown: -10 }[ev.key]; if (m) { ev.preventDefault(); kept = Math.min(99, Math.max(0, kept + m)); draw(); } });
    var err = function (t) { $('err').textContent = t; };
    var pick = function (sel, b) { root.querySelectorAll(sel).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); };
    root.querySelectorAll('[data-n]').forEach(function (b) { b.addEventListener('click', function () { net = b.dataset.n; pick('[data-n]', b); var pool = net !== 'polygon'; $('mk').style.display = pool ? '' : 'none'; $('nomk').style.display = pool ? 'none' : 'block'; $('ethfee').style.display = net === 'ethereum' ? 'block' : 'none'; root.querySelectorAll('.nwx').forEach(function (x) { x.textContent = NETS[net][0]; }); $('nat').textContent = NETS[net][1]; err(''); }); });
    root.querySelectorAll('[data-q]').forEach(function (b) { b.addEventListener('click', function () { quote = b.dataset.q; pick('[data-q]', b); }); });
    root.querySelectorAll('[data-w]').forEach(function (b) { b.addEventListener('click', function () { where = b.dataset.w; pick('[data-w]', b); $('lockm').style.display = where === 'lock' ? 'flex' : 'none'; if ($('hint')) $('hint').style.display = where === 'wallet' ? 'block' : 'none'; err(''); }); });
    root.querySelectorAll('[data-m]').forEach(function (b) { b.addEventListener('click', function () { months = +b.dataset.m; pick('[data-m]', b); }); });
    root.querySelectorAll('[data-c]').forEach(function (b) { b.addEventListener('click', function () { cap = +b.dataset.c; pick('[data-c]', b); }); });
    $('tk').addEventListener('input', function () { var t = tk(); $('em').textContent = short(t); root.querySelectorAll('.tkx').forEach(function (x) { x.textContent = t; }); draw(); err(''); });
    $('nm').addEventListener('input', function () { err(''); });
    $('go').addEventListener('click', function () {
      var n = $('nm').value.trim(), t = tk(), N = NETS[net][0];
      if (!n) return err(L('errTokenName', 'Enter a name'));
      if (!/^[A-Z0-9]{1,11}$/.test(t)) return err(L('errTicker', 'Ticker: 1 to 11 letters or numbers'));
      if (net === 'polygon') return say('Create ' + n + ' (' + t + ') on ' + N + ': ' + fmt(S) + ' supply, no pool at launch.');
      if (kept > 0 && !where) return err(L('errWhereSit', 'Pick where the ' + keptWord + ' sits'));
      var w = { wallet: 'in my wallet', utila: 'in Utila custody', lock: 'locked for ' + months + ' months' }[where];
      say('Create ' + n + ' (' + t + ') on ' + N + ': ' + fmt(S) + ' supply, ' + (100 - kept) + '% to the DEX pool paired with ' + quote + (kept > 0 ? ', ' + kept + '% kept as the ' + keptWord + ' ' + w : '') + ', starting value $' + fmt(cap) + '.');
    });
    pick('[data-m]', root.querySelector('[data-m="' + months + '"]')); pick('[data-c]', root.querySelector('[data-c="' + cap + '"]')); pick('[data-q]', root.querySelector('[data-q="' + quote + '"]'));
    root.querySelector('[data-n="' + net + '"]').click();
    if (where) { var wb = root.querySelector('[data-w="' + where + '"]'); if (wb) wb.click(); }
    draw();
    K.count(); K.done();
  };

  CARDS['launch.token'] = function (D, root, K) {
    var L = K.L, tk = String(D.ticker || ''), S = Number(D.supply) || 0, parts = (D.parts || []).slice().sort(function (a, b) { return b.percent - a.percent; });
    plain(root, K, D.name + ' (' + tk + '): ' + fmt(S) + ' tokens on ' + (D.network || ''));
    root.innerHTML += '<div class="bl-card bl-field"><div style="display:flex;align-items:center;gap:14px"><div style="flex:none;width:54px;height:54px;border-radius:50%;background:#fff;color:#1F6FE5;display:grid;place-items:center;font:600 13px var(--f)">' + e(short(tk)) + '</div><div style="min-width:0"><div style="font:600 26px/1.1 var(--f);letter-spacing:-.02em">' + e(D.name) + '</div><div style="font-size:13px;color:#DCEBFF;margin-top:4px">' + e(tk) + ' ' + e(L('on', 'on')) + ' ' + e(D.network) + (D.typeTitle ? ', ' + e(D.typeTitle) : '') + '</div></div></div><div style="font-size:13px;color:#DCEBFF;margin-top:20px">' + e(L('totalSupply', 'Total supply')) + '</div><div style="font:600 44px/1.05 var(--f);letter-spacing:-.03em"><span data-count="' + S + '">' + fmt(S) + '</span> <span style="font-size:18px;font-weight:500">' + e(tk) + '</span></div>' + (D.supplyPlain ? '<div style="font-size:13px;color:#DCEBFF;margin-top:6px">' + e(D.supplyPlain) + '</div>' : '') + '</div>'
      + '<div class="bl-card bl-white"><div style="font:600 16px var(--f);margin-bottom:12px">' + e(L('whoGets', 'Who gets what')) + '</div><div class="bl-bar" style="margin-bottom:18px">' + parts.map(function (p, i) { return '<span class="bl-seg" style="--p:' + Math.max(0.6, p.percent) + ';--i:' + i + ';background:' + PALETTE[i % 5] + '"></span>'; }).join('') + '</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px">' + parts.map(function (p, i) { return '<div class="bl-in" style="--i:' + i + '"><div style="display:flex;align-items:center;gap:6px;font-size:13px;color:#4A6488"><span style="width:8px;height:8px;border-radius:50%;background:' + PALETTE[i % 5] + '"></span>' + e(p.label) + '</div><div style="font:600 28px/1.1 var(--f);letter-spacing:-.02em;margin-top:4px">' + e(p.percent) + '%</div><div style="font-size:12px;color:#4A6488">' + fmt(p.amount != null ? p.amount : S * p.percent / 100) + ' ' + e(tk) + '</div>' + (p.note ? '<div style="font-size:12px;color:#4A6488">' + e(p.note) + '</div>' : '') + '</div>'; }).join('') + '</div>' + (D.marketLine ? '<div style="font-size:13px;color:#4A6488;margin-top:14px">' + e(D.marketLine) + '</div>' : '') + '</div>'
      + (D.beforeSave ? '<div style="display:flex;flex-wrap:wrap;gap:8px"><button class="bl-pill a" data-say="' + e('Yes, create ' + D.name + ' (' + tk + ')') + '">' + e(L('createIt', 'Create it')) + ' ↗</button><button class="bl-pill o" data-say="I want to change the split">' + e(L('changeSplit', 'Change the split')) + ' ↗</button></div>' : '');
    K.count(); K.done();
  };

  CARDS['launch.checkout'] = function (D, root, K) {
    var L = K.L;
    plain(root, K, 'Draft saved and checkout ready for ' + D.name + ' (' + D.ticker + ')');
    root.innerHTML += '<div class="bl-card bl-night bl-in" style="display:flex;gap:12px;align-items:center;padding:12px 16px;border-radius:16px"><span style="flex:none;width:26px;height:26px;border-radius:50%;background:#0F2A4A;color:#8EC5FB;display:grid;place-items:center"><i class="ti ti-check" aria-hidden="true"></i></span><div><div class="bl-mono" style="color:#8EC5FB">Metatron Launch: create_token_draft</div><div style="font-size:14px">' + e(L('draftSaved', 'Draft saved')) + ': ' + e(D.name) + ' (' + e(D.ticker) + ') ' + e(L('on', 'on')) + ' ' + e(D.network) + '</div></div></div>'
      + '<div class="bl-card bl-field" style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><span style="flex:none;width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.16);display:grid;place-items:center;font-size:22px"><i class="ti ti-receipt" aria-hidden="true"></i></span><div style="flex:1;min-width:190px"><div style="font:600 18px/1.2 var(--f)">' + e(L('checkoutFor', 'Checkout for')) + ' ' + e(D.name) + ' (' + e(D.ticker) + ')</div><div class="bl-mono" style="color:#DCEBFF;margin-top:2px">launch.metatron.systems/checkout</div>' + (D.note ? '<div style="font-size:12px;color:#DCEBFF;margin-top:6px">' + e(D.note) + '</div>' : '') + '</div><a class="bl-pill w" href="' + e(D.url) + '" target="_blank" rel="noopener">' + e(L('payCredit', 'Pay with Metatron Credit')) + '</a></div>'
      + '<div><button class="bl-pill o" data-say="Paid. Where does my launch stand?">' + e(L('paidCheck', 'I paid, check it')) + ' ↗</button></div>';
    K.done();
  };

  CARDS['launch.status'] = function (D, root, K) {
    var L = K.L, st = D.steps || [], cur = st.findIndex(function (s) { return !s.done; }), nx = D.next;
    plain(root, K, D.name + ' launch status');
    root.innerHTML += '<div class="bl-card bl-night"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap"><div style="font:600 18px var(--f)">' + e(D.name) + ' (' + e(D.ticker) + ')</div><div class="bl-mono" style="color:#8EC5FB">' + e(D.network) + '</div></div><div style="display:grid;gap:12px;margin-top:16px">' + st.map(function (s, i) { return s.done ? '<div class="bl-in" style="--i:' + i + ';display:flex;gap:12px;align-items:center"><span style="flex:none;width:26px;height:26px;border-radius:50%;background:#3A92FC;color:#fff;display:grid;place-items:center;font-size:15px"><i class="ti ti-check" aria-hidden="true"></i></span><span style="font-size:15px">' + e(s.title) + '</span></div>' : i === cur ? '<div class="bl-in" style="--i:' + i + ';display:flex;gap:12px;align-items:center"><span class="bl-pulse" style="flex:none;width:26px;height:26px;border-radius:50%;border:2px solid #3A92FC"></span><span style="font-size:15px;font-weight:500">' + e(s.title) + '</span><span style="margin-inline-start:auto;font-size:12px;color:#8EC5FB">' + e(L('nextLbl', 'Next')) + '</span></div>' : '<div class="bl-in" style="--i:' + i + ';display:flex;gap:12px;align-items:center"><span style="flex:none;width:26px;height:26px;border-radius:50%;border:1px solid #2A3E63"></span><span style="font-size:15px;color:#93A6C6">' + e(s.title) + '</span></div>'; }).join('') + '</div></div>'
      + (nx && nx.url ? '<div class="bl-card bl-field" style="display:flex;align-items:center;gap:14px;flex-wrap:wrap"><div style="flex:1;min-width:200px"><div style="font-size:13px;color:#DCEBFF">' + e(K.T.nextStep) + '</div><div style="font:600 20px/1.2 var(--f);margin-top:2px">' + e(nx.title) + '</div>' + (nx.explain ? '<div style="font-size:13px;color:#DCEBFF;margin-top:6px">' + e(nx.explain) + '</div>' : '') + '</div><a class="bl-pill w" href="' + e(nx.url) + '" target="_blank" rel="noopener">' + e(nx.button || nx.title) + '</a></div>' : '');
    K.done();
  };

  CARDS['launch.sign'] = function (D, root, K) {
    var L = K.L;
    plain(root, K, 'Signing link ready: ' + (D.summary || ''));
    root.innerHTML += '<div class="bl-card bl-field"><div style="display:flex;align-items:center;gap:10px"><i class="ti ti-wallet" style="font-size:22px" aria-hidden="true"></i><div style="font:600 19px var(--f)">' + e(L('signTitle', 'Sign in your own wallet')) + '</div></div><div style="font-size:14px;color:#EAF3FF;margin-top:8px">' + e(D.summary) + '</div><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:14px"><a class="bl-pill w" href="' + e(D.url) + '" target="_blank" rel="noopener">' + e(L('openSign', 'Open and sign')) + '</a><span style="font-size:12px;color:#DCEBFF">' + e(L('signNote', 'Open it within 30 minutes. Only your wallet can sign.')) + '</span></div></div><div><button class="bl-pill o" data-say="I signed. Check the link.">' + e(L('signedCheck', 'I signed, check it')) + ' ↗</button></div>';
    K.done();
  };

  CARDS['launch.utila'] = function (D, root, K) {
    var L = K.L, word = D.keptWord || 'kept part';
    plain(root, K, 'Move the ' + word + ' to Utila custody');
    root.innerHTML += '<div class="bl-card bl-white"><div style="display:flex;align-items:center;gap:10px"><i class="ti ti-building-bank" style="font-size:22px;color:#1F6FE5" aria-hidden="true"></i><div style="font:600 18px var(--f)">' + e(L('moveTo', 'Move the ' + word + ' to Utila')) + '</div></div><div style="font-size:14px;color:#4A6488;margin-top:6px">' + fmt(D.amount) + ' ' + e(D.ticker) + ' ' + e(L('moveSub', 'go to your Utila vault on')) + ' ' + e(D.network) + '. ' + e(L('moveSub2', 'You sign the move in your own wallet.')) + '</div><input id="va" class="bl-in-f mono" style="margin-top:14px" placeholder="0x..." aria-label="Your Utila vault address"><div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:12px"><button id="go" class="bl-pill a">' + e(L('prepareMove', 'Prepare the move')) + ' ↗</button>' + errSpan('err') + '</div></div>';
    K.$('va').addEventListener('input', function () { K.$('err').textContent = ''; });
    K.$('go').addEventListener('click', function () { var a = K.$('va').value.trim(); if (!/^0x[0-9a-fA-F]{40}$/.test(a)) { K.$('err').textContent = L('errVault', 'Paste the vault address from Utila: 0x and 40 characters'); return; } say('Move the ' + word + ' to my Utila vault ' + a); });
    K.done();
  };

  CARDS['launch.live'] = function (D, root, K) {
    var L = K.L, tk = String(D.ticker || ''), G = D.groups || [], addr = String(D.address || '');
    plain(root, K, D.name + ' is live on ' + D.network + '; where the supply sits');
    var badge = D.logo ? '<img src="' + e(D.logo) + '" alt="" style="flex:none;width:54px;height:54px;border-radius:50%;background:#fff;object-fit:cover">' : '<div style="flex:none;width:54px;height:54px;border-radius:50%;background:#fff;color:#1F6FE5;display:grid;place-items:center;font:600 13px var(--f)">' + e(short(tk)) + '</div>';
    root.innerHTML += '<div class="bl-card bl-field"><div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">' + badge + '<div style="flex:1;min-width:180px"><div style="font:600 26px/1.1 var(--f);letter-spacing:-.02em">' + e(D.name) + '</div><div style="font-size:13px;color:#DCEBFF;margin-top:4px">' + e(tk) + ', ' + e(L('liveOn', 'live on')) + ' ' + e(D.network) + '</div>' + (addr ? '<div class="bl-mono" style="color:#DCEBFF;margin-top:4px">' + e(addr.length > 14 ? addr.slice(0, 6) + '...' + addr.slice(-4) : addr) + '</div>' : '') + '</div><span style="font-size:12px;border:1px solid rgba(255,255,255,.5);border-radius:999px;padding:4px 12px"><i class="ti ti-circle-check" aria-hidden="true"></i> ' + e(L('live', 'Live')) + '</span></div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:16px">' + (D.addUrl ? '<a class="bl-pill w" href="' + e(D.addUrl) + '" target="_blank" rel="noopener"><i class="ti ti-wallet" aria-hidden="true"></i>' + e(L('addWallet', 'Add to wallet')) + '</a>' : '') + (D.pageUrl ? '<a class="bl-pill fo" href="' + e(D.pageUrl) + '" target="_blank" rel="noopener">' + e(L('tokenPage', 'Token page')) + '</a>' : '') + '</div></div>'
      + (G.length ? '<div class="bl-card bl-white"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap;margin-bottom:12px"><div style="font:600 16px var(--f)">' + e(L('whereSupply', 'Where the supply sits')) + '</div>' + (D.checked ? '<div style="font-size:12px;color:#4A6488">' + e(L('fromChain', 'From the chain,')) + ' ' + e(D.checked) + '</div>' : '') + '</div><div class="bl-bar" style="margin-bottom:18px">' + G.map(function (g, i) { return '<span class="bl-seg" style="--p:' + Math.max(0.6, g.share) + ';--i:' + i + ';background:' + PALETTE[i % 5] + '"></span>'; }).join('') + '</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px">' + G.map(function (g, i) { return '<div class="bl-in" style="--i:' + i + '"><div style="display:flex;align-items:center;gap:6px;font-size:13px;color:#4A6488"><span style="width:8px;height:8px;border-radius:50%;background:' + PALETTE[i % 5] + '"></span>' + e(g.label) + '</div><div style="font:600 28px/1.1 var(--f);letter-spacing:-.02em;margin-top:4px">' + e(g.share) + '%</div><div style="font-size:12px;color:#4A6488">' + fmt(g.amount) + ' ' + e(tk) + '</div></div>'; }).join('') + '</div></div>' : '');
    K.done();
  };

  CARDS['launch.market'] = function (D, root, K) {
    var L = K.L, slug = netKey(D.network) === 'ethereum' ? 'ethereum' : 'base', ps = Number(D.poolShare) || 0;
    plain(root, K, D.ticker + ' market on ' + D.network);
    root.innerHTML += '<div class="bl-card bl-white"><div style="font:600 24px/1.15 var(--f);letter-spacing:-.02em">' + (D.ready ? e(L('marketReady', 'Your market, ready')) : e(D.ticker) + ' ' + e(L('onDex', 'is on a DEX'))) + '</div><div style="font-size:14px;color:#4A6488;margin-top:6px">' + e(L('anyone', 'Anyone can buy and sell on Uniswap. The pool is locked forever.')) + '</div><div class="bl-bar" style="margin:18px 0 8px"><span class="bl-seg" style="--p:' + Math.max(0.6, ps) + ';--i:0;background:#3A92FC"></span><span class="bl-seg" style="--p:' + Math.max(0.6, 100 - ps) + ';--i:1;background:#8EC5FB"></span></div><div style="display:flex;justify-content:space-between;font-size:12px;color:#4A6488"><span><i class="ti ti-lock" aria-hidden="true"></i> ' + e(L('inPool', 'In the pool')) + ' ' + ps + '%</span><span>' + e(L('yourWallet', 'Your wallet')) + ' ' + (100 - ps) + '%</span></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:14px;margin-top:18px">' + [[L('startWhole', 'Starting value, whole token'), D.startValue != null ? '$' + fmt(D.startValue) : ''], [L('buyersPay', 'Buyers pay with'), D.quote || 'ETH'], [L('firstBuy', 'First buy'), D.firstBuy != null ? '$' + fmt(D.firstBuy) : '']].filter(function (x) { return x[1]; }).map(function (x, i) { return '<div class="bl-in" style="--i:' + i + '"><div style="font-size:12px;color:#4A6488">' + e(x[0]) + '</div><div style="font:600 22px var(--f)">' + e(x[1]) + '</div></div>'; }).join('') + '</div>' + (!D.ready && D.pool ? '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:18px"><a class="bl-pill a" href="https://dexscreener.com/' + slug + '/' + e(D.pool) + '" target="_blank" rel="noopener">' + e(L('dexScreener', 'See it on DEX Screener')) + ' <i class="ti ti-external-link" aria-hidden="true"></i></a><a class="bl-pill so" href="https://app.uniswap.org/explore/pools/' + slug + '/' + e(D.pool) + '" target="_blank" rel="noopener">' + e(L('tradeUni', 'Trade on Uniswap')) + ' <i class="ti ti-external-link" aria-hidden="true"></i></a></div>' : '') + '</div>';
    K.done();
  };

  CARDS['launch.needs'] = function (D, root, K) {
    var L = K.L, I = (D.items || []).slice().sort(function (a, b) { var o = { red: 0, amber: 1, blue: 2 }; return (o[a.level] || 1) - (o[b.level] || 1); }).slice(0, 4);
    var dot = { red: '#FF7A7A', amber: '#F5B544', blue: '#8EC5FB' };
    plain(root, K, I.length + ' things need attention on ' + (D.name || ''));
    root.innerHTML += '<div class="bl-card bl-night"><div style="font:600 18px var(--f);margin-bottom:12px">' + I.length + ' ' + e(L('needYou', 'things need you')) + '</div><div style="display:grid;gap:12px">' + I.map(function (x, i) { return '<div class="bl-in" style="--i:' + i + ';display:flex;gap:12px;align-items:flex-start;border-top:1px solid #1B2C4B;padding-top:12px"><span style="flex:none;width:9px;height:9px;border-radius:50%;background:' + (dot[x.level] || dot.amber) + ';margin-top:6px"></span><div style="flex:1"><div style="font-size:15px;font-weight:500">' + e(x.title) + '</div><div style="font-size:13px;color:#93A6C6">' + e(x.explanation) + '</div></div>' + (x.url ? '<a class="bl-pill no" href="' + e(x.url) + '" target="_blank" rel="noopener">' + e(x.action || 'Fix it') + '</a>' : '') + '</div>'; }).join('') + '</div></div>';
    K.done();
  };

  function countUp(root) {
    var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.querySelectorAll('[data-count]').forEach(function (el) { var end = Number(el.dataset.count); if (still || !isFinite(end)) { el.textContent = fmt(end); return; } var t0 = performance.now(); var s = function (t) { var k = Math.min(1, (t - t0) / 1100); el.textContent = fmt(end * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(s); }; requestAnimationFrame(s); });
  }

  function render(kind, data, el) {
    ensureStyle();
    var root = el || document.getElementById('mt');
    if (!root) { root = document.createElement('div'); document.body.appendChild(root); }
    var D = data || {}, card = CARDS[kind];
    if (!card) { root.textContent = 'Unknown card: ' + kind; return; }
    var K = kit(D, root);
    K.rtl = D.lang === 'he' || D.lang === 'ar' || D.dir === 'rtl';
    K.count = function () { countUp(root); };
    onSay(root);
    try { card(D, root, K); } catch (err) { root.className = 'bl'; root.innerHTML = '<div class="bl-card bl-white" style="font-size:14px">This card could not draw. Ask for it again.</div>'; if (window.console) console.error(err); }
  }

  window.MetatronCards = { render: render, version: VERSION, cards: Object.keys(CARDS) };
})();
