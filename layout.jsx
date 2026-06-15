@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Inter:wght@400;450;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

:root{
  --bg:#EDF0F4; --surface:#FFFFFF; --surface-2:#F6F8FA;
  --ink:#15181E; --muted:#586172; --faint:#8C95A3;
  --line:#E3E8EE; --line-2:#EDF0F4;
  --brand:#F0502E; --brand-ink:#C13A1C; --brand-soft:#FCE7E0;
  --deep:#191F2B;
  --good:#1C8A63; --good-soft:#DCF0E8;
  --warn:#B0801A; --warn-soft:#F6ECD3;
  --bad:#C04A36; --bad-soft:#F6E0DB;
  --r:13px;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:'Inter',system-ui,sans-serif;color:var(--ink);background:var(--bg);-webkit-font-smoothing:antialiased;min-height:100vh}
button{font-family:inherit}
::selection{background:var(--brand-soft)}
:focus-visible{outline:2px solid var(--brand);outline-offset:2px}

/* header */
.hdr{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.86);backdrop-filter:saturate(1.4) blur(10px);border-bottom:1px solid var(--line)}
.hdr-in{max-width:1140px;margin:0 auto;padding:0 22px;height:62px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.logo{display:flex;align-items:baseline;gap:10px}
.wordmark{font-family:'Bricolage Grotesque';font-weight:700;font-size:25px;letter-spacing:-1px;color:var(--ink);line-height:1}
.wordmark .dot{color:var(--brand)}
.logo .div{width:1px;height:20px;background:var(--line);margin:0 2px}
.logo .sub{font-family:'IBM Plex Mono';font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);font-weight:500}
.hdr-r{display:flex;align-items:center;gap:10px}
nav{display:flex;gap:4px;background:var(--surface-2);padding:4px;border-radius:11px;border:1px solid var(--line)}
.tab{border:none;background:none;cursor:pointer;font-size:13px;font-weight:550;color:var(--muted);padding:7px 14px;border-radius:8px;transition:.14s;display:flex;align-items:center;gap:7px}
.tab:hover{color:var(--ink)}
.tab.on{background:var(--surface);color:var(--ink);box-shadow:0 1px 3px rgba(20,24,30,.08)}
.tab .pip{font-family:'IBM Plex Mono';font-size:10px;background:var(--brand);color:#fff;border-radius:20px;padding:1px 6px;font-weight:600}
.gear{width:38px;height:38px;border-radius:10px;border:1px solid var(--line);background:var(--surface);cursor:pointer;color:var(--muted);display:flex;align-items:center;justify-content:center;transition:.14s}
.gear:hover{color:var(--ink);border-color:var(--faint)}
.gear svg{width:18px;height:18px}

.wrap{max-width:1140px;margin:0 auto;padding:30px 22px 132px}
.view{animation:fade .25s ease}
@keyframes fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}

/* hero */
.hero{margin-bottom:26px}
.eyebrow{font-family:'IBM Plex Mono';font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--brand-ink);margin-bottom:11px}
.hero h1{font-family:'Bricolage Grotesque';font-weight:600;font-size:34px;line-height:1.06;letter-spacing:-1.2px;margin:0 0 10px;max-width:18ch}
.hero p{font-size:14.5px;color:var(--muted);max-width:60ch;line-height:1.6;margin:0}
.hero .note{margin-top:14px;display:inline-flex;align-items:center;gap:9px;font-size:12.5px;color:var(--muted);background:var(--surface);border:1px solid var(--line);padding:8px 13px;border-radius:9px}
.hero .note b{color:var(--ink);font-weight:600}

/* section cards */
.sec{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);margin-bottom:16px;overflow:hidden}
.sec-h{display:flex;align-items:center;gap:13px;padding:16px 20px;border-bottom:1px solid var(--line-2);cursor:pointer;user-select:none}
.sec-h .ix{font-family:'IBM Plex Mono';font-size:11px;font-weight:600;color:var(--brand);flex:none}
.sec-h .nm{font-family:'Bricolage Grotesque';font-weight:600;font-size:16px;letter-spacing:-.2px;flex:1}
.sec-h .meta{font-family:'IBM Plex Mono';font-size:10.5px;color:var(--faint)}
.sec-h .chev{color:var(--faint);transition:.2s;font-size:13px}
.sec.collapsed .chev{transform:rotate(-90deg)}
.sec.collapsed .sec-h{border-bottom:none}
.sec-b{padding:18px 20px;display:grid;grid-template-columns:1fr 1fr;gap:16px 20px}
@media(max-width:640px){.sec-b{grid-template-columns:1fr}}
.q.wide{grid-column:1/-1}
.q label{display:block;font-size:12.5px;font-weight:550;color:var(--ink);margin-bottom:6px;line-height:1.35}
.q .hint{display:block;font-size:11.5px;color:var(--faint);font-weight:400;margin-bottom:7px;margin-top:-2px}
input,textarea,select{width:100%;font-family:'Inter';font-size:13.5px;color:var(--ink);background:var(--surface-2);border:1px solid var(--line);border-radius:10px;padding:10px 13px;outline:none;transition:.15s;resize:vertical}
textarea{min-height:62px;line-height:1.5}
input::placeholder,textarea::placeholder{color:var(--faint)}
input:focus,textarea:focus,select:focus{border-color:var(--brand);box-shadow:0 0 0 3px var(--brand-soft);background:#fff}
.notes-sec textarea{min-height:120px}
.notes-sec .sec-h .ix{color:var(--deep)}

/* generate bar */
.gobar{position:fixed;bottom:0;left:0;right:0;z-index:25;background:rgba(25,31,43,.97);backdrop-filter:blur(8px);border-top:1px solid rgba(255,255,255,.08)}
.gobar-in{max-width:1140px;margin:0 auto;padding:14px 22px;display:flex;align-items:center;gap:18px}
.gobar .status{color:#cdd5e0;font-size:13px;flex:1}
.gobar .clr{background:none;border:none;color:#9aa6b6;cursor:pointer;font-size:12.5px;font-weight:500}
.gobar .clr:hover{color:#fff}
.go{border:none;cursor:pointer;background:var(--brand);color:#fff;font-weight:600;font-size:14px;padding:12px 24px;border-radius:11px;display:flex;align-items:center;gap:9px;transition:.14s;white-space:nowrap}
.go:hover:not(:disabled){background:#e2461f}
.go:active:not(:disabled){transform:translateY(1px)}
.go:disabled{opacity:.4;cursor:not-allowed;background:#3b4555}

/* loading */
.scan{display:flex;flex-direction:column;align-items:center;gap:20px;padding:90px 20px}
.bars{display:flex;gap:6px;align-items:flex-end;height:46px}
.bars span{width:8px;background:var(--deep);border-radius:3px;animation:bar 1s ease-in-out infinite}
.bars span:nth-child(2){animation-delay:.12s;background:var(--brand)}
.bars span:nth-child(3){animation-delay:.24s}
.bars span:nth-child(4){animation-delay:.36s;background:var(--brand)}
.bars span:nth-child(5){animation-delay:.48s}
@keyframes bar{0%,100%{height:14px;opacity:.5}50%{height:46px;opacity:1}}
.scan .t{font-family:'IBM Plex Mono';font-size:13px;color:var(--muted)}

/* analysis */
.a-bar{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:6px}
.a-kicker{font-family:'IBM Plex Mono';font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--faint);margin-bottom:8px}
.a-dept{font-family:'Bricolage Grotesque';font-weight:600;font-size:30px;letter-spacing:-1px;margin:0;line-height:1.05}
.a-team{font-size:13.5px;color:var(--muted);margin-top:4px}
.a-tools{display:flex;gap:8px}
.iconbtn{border:1px solid var(--line);background:var(--surface);cursor:pointer;font-size:12px;font-weight:550;color:var(--muted);padding:8px 13px;border-radius:9px;display:flex;gap:7px;align-items:center;transition:.13s}
.iconbtn:hover{border-color:var(--brand);color:var(--brand-ink)}
.iconbtn.danger:hover{border-color:var(--bad);color:var(--bad)}
.summary{font-size:15px;line-height:1.62;margin:18px 0 22px;padding:16px 18px;background:var(--surface);border:1px solid var(--line);border-left:3px solid var(--deep);border-radius:11px}
.readout{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px}
@media(max-width:560px){.readout{grid-template-columns:1fr}}
.gauge{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:15px 17px}
.gauge .gl{font-family:'IBM Plex Mono';font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint)}
.gauge .gv{font-family:'Bricolage Grotesque';font-weight:600;font-size:21px;margin-top:6px;letter-spacing:-.4px}
.seclabel{font-family:'IBM Plex Mono';font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--brand-ink);margin:0 0 15px;display:flex;align-items:center;gap:12px}
.seclabel::after{content:"";flex:1;height:1px;background:var(--line)}
.opp{background:var(--surface);border:1px solid var(--line);border-radius:13px;margin-bottom:14px;overflow:hidden;transition:.15s}
.opp:hover{border-color:var(--brand);box-shadow:0 6px 22px -12px rgba(240,80,46,.5)}
.opp-h{display:flex;gap:14px;padding:17px 19px 12px}
.opp-n{font-family:'IBM Plex Mono';font-weight:600;font-size:12px;color:#fff;background:var(--brand);width:27px;height:27px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex:none;margin-top:2px}
.opp-t{font-family:'Bricolage Grotesque';font-weight:600;font-size:16.5px;letter-spacing:-.2px;margin:0}
.opp-w{font-size:13.5px;color:var(--muted);margin:4px 0 0;line-height:1.55}
.opp-b{padding:0 19px 17px 60px}
.addr{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 13px}
.tagp{font-size:11.5px;color:var(--muted);background:var(--surface-2);border:1px solid var(--line);padding:3px 10px;border-radius:20px}
.how{font-size:12.5px;color:var(--muted);line-height:1.55}
.how b{color:var(--ink)}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.chip{font-family:'IBM Plex Mono';font-size:11px;padding:5px 11px;border-radius:8px;display:flex;gap:7px;align-items:center;border:1px solid transparent}
.chip .k{font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;opacity:.72}
.chip .v{font-weight:600}
.hi{background:var(--good-soft);color:var(--good)} .me{background:var(--warn-soft);color:var(--warn)}
.lo{background:var(--surface-2);color:var(--muted);border-color:var(--line)} .hard{background:var(--bad-soft);color:var(--bad)}
.chip.time{background:#fff;border-color:var(--line);color:var(--ink)} .chip.time .v{color:var(--brand-ink)}
.start{margin-top:10px;padding:16px 18px;border-radius:12px;background:var(--deep);color:#e7ecf3;font-size:13.5px;line-height:1.55}
.start .sl{display:block;font-family:'IBM Plex Mono';font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:6px}

/* log */
.viewtitle{font-family:'Bricolage Grotesque';font-weight:600;font-size:30px;letter-spacing:-1px;margin:0 0 22px}
.loggrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(252px,1fr));gap:14px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:13px;padding:17px 18px;cursor:pointer;transition:.14s;text-align:left;width:100%}
.card:hover{border-color:var(--brand);transform:translateY(-2px);box-shadow:0 10px 26px -16px rgba(20,24,30,.4)}
.card .cd{font-family:'Bricolage Grotesque';font-weight:600;font-size:17px;letter-spacing:-.3px}
.card .ct{font-size:12.5px;color:var(--muted);margin-top:2px}
.card .cm{font-family:'IBM Plex Mono';font-size:10.5px;color:var(--faint);margin-top:13px;display:flex;gap:8px;align-items:center}
.card .cm .b{background:var(--brand-soft);color:var(--brand-ink);padding:2px 7px;border-radius:6px;font-weight:600}

/* editor */
.ed-tools{display:flex;gap:10px;margin:18px 0;flex-wrap:wrap}
.btn{border:1px solid var(--line);background:var(--surface);cursor:pointer;font-size:13px;font-weight:550;color:var(--ink);padding:10px 16px;border-radius:10px;transition:.13s}
.btn:hover{border-color:var(--ink)}
.btn.primary{background:var(--deep);color:#fff;border-color:var(--deep)}
.btn.primary:hover{background:#10141d}
.btn.ghost{color:var(--muted)} .btn.ghost:hover{color:var(--bad);border-color:var(--bad)}
.ed-sec{background:var(--surface);border:1px solid var(--line);border-radius:13px;margin-bottom:14px;padding:16px 18px}
.ed-sec-h{display:flex;gap:10px;align-items:center;margin-bottom:12px}
.ed-sec-h input{font-family:'Bricolage Grotesque';font-weight:600;font-size:15px}
.ed-q{display:grid;grid-template-columns:1fr 150px 96px 34px;gap:8px;margin-bottom:8px;align-items:start}
@media(max-width:680px){.ed-q{grid-template-columns:1fr}}
.ed-q input,.ed-q select{font-size:12.5px;padding:8px 10px}
.xbtn{border:1px solid var(--line);background:var(--surface-2);color:var(--faint);border-radius:8px;cursor:pointer;font-size:14px;line-height:1;height:35px;transition:.12s}
.xbtn:hover{border-color:var(--bad);color:var(--bad);background:var(--bad-soft)}
.addq{border:1px dashed var(--line);background:none;color:var(--muted);cursor:pointer;font-size:12.5px;font-weight:500;padding:8px 12px;border-radius:9px;margin-top:4px;transition:.12s}
.addq:hover{border-color:var(--brand);color:var(--brand-ink)}

/* empty */
.empty{text-align:center;padding:80px 24px}
.empty .em{width:52px;height:52px;border-radius:13px;background:var(--deep);margin:0 auto 18px;position:relative}
.empty .em::before{content:"";position:absolute;inset:14px;border:2px solid rgba(255,255,255,.4);border-radius:50%}
.empty .em::after{content:"";position:absolute;width:9px;height:9px;background:var(--brand);border-radius:50%;right:11px;bottom:11px}
.empty h3{font-family:'Bricolage Grotesque';font-weight:600;font-size:19px;margin:0 0 7px}
.empty p{font-size:13.5px;color:var(--muted);max-width:360px;margin:0 auto;line-height:1.6}
.empty .btn{margin-top:18px}

/* settings modal */
.scrim{position:fixed;inset:0;background:rgba(17,19,26,.5);backdrop-filter:blur(3px);z-index:50;display:flex;align-items:flex-start;justify-content:center;padding:70px 20px;overflow:auto}
.modal{background:var(--surface);border-radius:16px;max-width:440px;width:100%;box-shadow:0 30px 70px -20px rgba(0,0,0,.5);animation:fade .2s ease}
.modal-h{display:flex;justify-content:space-between;align-items:center;padding:18px 22px;border-bottom:1px solid var(--line-2)}
.modal-h h2{font-family:'Bricolage Grotesque';font-weight:600;font-size:18px;margin:0;letter-spacing:-.3px}
.modal-h button{border:none;background:none;cursor:pointer;font-size:18px;color:var(--faint)}
.modal-b{padding:20px 22px}
.modal-b h4{font-family:'IBM Plex Mono';font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);margin:0 0 10px}
.modal-b p{font-size:12.5px;color:var(--muted);line-height:1.55;margin:0 0 12px}
.modal-b a{color:var(--brand-ink);font-weight:550}
.keyrow{display:flex;gap:8px;flex-wrap:wrap}

.toast{position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:var(--ink);color:#fff;font-size:13px;padding:11px 19px;border-radius:11px;box-shadow:0 10px 34px -10px rgba(0,0,0,.45);z-index:70;animation:tp .2s ease}
@keyframes tp{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}

/* saved interview read view */
.record-meta{font-family:'IBM Plex Mono';font-size:11px;color:var(--faint);margin-top:7px}
.recsec{background:var(--surface);border:1px solid var(--line);border-radius:13px;padding:4px 18px;margin-bottom:18px}
.qa{padding:14px 0;border-bottom:1px solid var(--line-2)}
.qa:last-child{border-bottom:none}
.qa .ql{font-size:12px;font-weight:600;color:var(--muted);margin-bottom:4px}
.qa .qv{font-size:14px;color:var(--ink);line-height:1.55;white-space:pre-wrap}
.notesblock{background:var(--surface);border:1px solid var(--line);border-left:3px solid var(--deep);border-radius:11px;padding:16px 18px;white-space:pre-wrap;font-size:14px;line-height:1.6;color:var(--ink)}
