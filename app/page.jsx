"use client";
import { useState, useEffect, useRef } from "react";

/* ---------- default questionnaire ---------- */
const DEFAULTS = [
  { id: "s_snapshot", title: "Snapshot", q: [
    { id: "q_department", label: "Department", hint: "", type: "text", ph: "e.g. Procurement" },
    { id: "q_team", label: "Team or sub-unit", hint: "", type: "text", ph: "e.g. Vendor Management" },
    { id: "q_people", label: "Who we spoke to", hint: "roles, not names", type: "text", ph: "e.g. Procurement lead, 2 buyers" },
    { id: "q_size", label: "Team size", hint: "", type: "text", ph: "e.g. 8 people" }]},
  { id: "s_work", title: "What the team does", q: [
    { id: "q_responsibilities", label: "What does this team own day to day?", hint: "", type: "textarea", ph: "Core responsibilities and outputs…", wide: true },
    { id: "q_week", label: "Walk us through a typical week — where does the workload go?", hint: "", type: "textarea", ph: "The rhythm of the work, busy points…", wide: true },
    { id: "q_timesink", label: "Which tasks eat the most time?", hint: "", type: "textarea", ph: "The things that take hours…" },
    { id: "q_seasonal", label: "Anything that spikes at certain times?", hint: "month-end, quarter-end", type: "textarea", ph: "Predictable peaks in workload…" }]},
  { id: "s_manual", title: "Repetitive & manual work", q: [
    { id: "q_repetitive", label: "What do you do over and over, the same way each time?", hint: "the gold for automation", type: "textarea", ph: "Routine, rules-based, predictable tasks…", wide: true },
    { id: "q_rekey", label: "Where are you copying or re-typing data between systems?", hint: "", type: "textarea", ph: "Moving data from A to B by hand…" },
    { id: "q_offsystem", label: "What's still done in spreadsheets, email, or on paper?", hint: "", type: "textarea", ph: "Work that lives outside the main systems…" }]},
  { id: "s_pain", title: "Pain points & bottlenecks", q: [
    { id: "q_frustration", label: "What's the most frustrating part of the job?", hint: "", type: "textarea", ph: "Where people sigh and roll their eyes…", wide: true },
    { id: "q_delays", label: "Where do delays happen — what are you waiting on?", hint: "", type: "textarea", ph: "Hand-offs, approvals, other teams…" },
    { id: "q_errors", label: "Where do mistakes or rework happen most?", hint: "", type: "textarea", ph: "What gets done twice, or wrong…" },
    { id: "q_magic", label: "If you had a magic assistant, what would you hand off first?", hint: "", type: "textarea", ph: "The dream delegation…", wide: true }]},
  { id: "s_tools", title: "Tools & data", q: [
    { id: "q_software", label: "What software and systems do you use daily?", hint: "", type: "textarea", ph: "SAP, Outlook, Excel, internal portal…" },
    { id: "q_integration", label: "Do your systems talk to each other, or is there manual handoff?", hint: "", type: "textarea", ph: "Where the chain breaks and goes manual…" },
    { id: "q_data", label: "Where does your important data live?", hint: "", type: "textarea", ph: "Systems, shared drives, inboxes…" },
    { id: "q_docs", label: "What documents do you handle most?", hint: "types & rough volume", type: "textarea", ph: "RFQs, contracts, invoices, datasheets…" }]},
  { id: "s_decisions", title: "Decisions, approvals & reporting", q: [
    { id: "q_approvals", label: "What approvals run through this team — who signs off, how long?", hint: "", type: "textarea", ph: "The approval chain and its delays…", wide: true },
    { id: "q_reports", label: "What reports do you produce — for whom, how often?", hint: "", type: "textarea", ph: "Recurring reports and who consumes them…" },
    { id: "q_decisions", label: "What decisions rely on data you gather by hand first?", hint: "", type: "textarea", ph: "Pulling numbers before you can decide…" }]},
  { id: "s_comms", title: "Communication", q: [
    { id: "q_email", label: "How much time goes to email, chat and follow-ups?", hint: "", type: "textarea", ph: "Chasing, replying, coordinating…" },
    { id: "q_faq", label: "What questions do you answer again and again?", hint: "internal or to customers", type: "textarea", ph: "The same questions on repeat…" }]},
  { id: "s_measure", title: "Measurement & ambition", q: [
    { id: "q_kpis", label: "How is this team's success measured?", hint: "KPIs", type: "textarea", ph: "Cycle time, cost, SLA, accuracy…" },
    { id: "q_2x", label: "What would 'twice as good' look like here?", hint: "", type: "textarea", ph: "If a constraint vanished…" }]},
  { id: "s_ready", title: "Readiness & constraints", q: [
    { id: "q_compliance", label: "Any data sensitivity, compliance or security constraints?", hint: "", type: "textarea", ph: "Regulated data, privacy, approvals…", wide: true },
    { id: "q_existing", label: "Already using any automation or AI tools?", hint: "", type: "textarea", ph: "What's in place today…" },
    { id: "q_openness", label: "How open is the team to changing how they work?", hint: "", type: "textarea", ph: "Appetite for change…" }]},
];

const K_CFG = "tabany:cfg", K_RECS = "tabany:recs", K_DRAFT = "tabany:draft";

/* ---------- helpers ---------- */
const clone = (x) => JSON.parse(JSON.stringify(x));
const rid = () => Math.random().toString(36).slice(2, 8);
const lsGet = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
const lsDel = (k) => { try { localStorage.removeItem(k); } catch {} };

const answeredCount = (cfg, answers) => { let n = 0; cfg.forEach((s) => s.q.forEach((q) => { if ((answers[q.id] || "").trim()) n++; })); return n; };
const findItem = (r, id) => { for (const s of r.sections) { const it = s.items.find((x) => x.id === id); if (it) return it; } return null; };
const firstItem = (r) => (r.sections[0] && r.sections[0].items[0]) || null;
const deptOf = (r) => { const d = findItem(r, "q_department"); if (d && d.value) return d.value; const f = firstItem(r); return f ? f.value : "Untitled interview"; };
const teamOf = (r) => { const t = findItem(r, "q_team"); return t ? t.value : ""; };
const itemCount = (r) => r.sections.reduce((n, s) => n + s.items.length, 0);
function recToMd(r) {
  let s = `# Discovery interview — ${deptOf(r)}${teamOf(r) ? ` (${teamOf(r)})` : ""}\n\nSaved ${new Date(r.createdAt).toLocaleString()}\n`;
  r.sections.forEach((sec) => { s += `\n## ${sec.title}\n`; sec.items.forEach((it) => { s += `\n**${it.label}**\n${it.value}\n`; }); });
  if ((r.notes || "").trim()) s += `\n## Notes\n${r.notes}\n`;
  return s;
}

const GearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

export default function App() {
  const [view, setView] = useState("interview"); // interview | record | log | questions
  const [cfg, setCfg] = useState(() => clone(DEFAULTS));
  const [answers, setAnswers] = useState({});
  const [notes, setNotes] = useState("");
  const [recs, setRecs] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [collapsed, setCollapsed] = useState({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    try { const c = lsGet(K_CFG); if (c) { const p = JSON.parse(c); if (Array.isArray(p) && p.length) setCfg(p); } } catch {}
    try { const r = lsGet(K_RECS); if (r) { const p = JSON.parse(r); if (Array.isArray(p)) setRecs(p); } } catch {}
    try { const d = lsGet(K_DRAFT); if (d) { const p = JSON.parse(d); setAnswers(p.answers || {}); setNotes(p.notes || ""); setEditingId(p.editingId || null); } } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) lsSet(K_CFG, JSON.stringify(cfg)); }, [cfg, hydrated]);
  useEffect(() => { if (hydrated) lsSet(K_RECS, JSON.stringify(recs)); }, [recs, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    const t = setTimeout(() => lsSet(K_DRAFT, JSON.stringify({ answers, notes, editingId })), 300);
    return () => clearTimeout(t);
  }, [answers, notes, editingId, hydrated]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2200); return () => clearTimeout(t); }, [toast]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSettingsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(v) { setView(v); window.scrollTo({ top: 0, behavior: "smooth" }); }
  const setAns = (id, v) => setAnswers((a) => ({ ...a, [id]: v }));
  const toggleSec = (id) => setCollapsed((c) => ({ ...c, [id]: !c[id] }));

  function buildSections() {
    const sections = [];
    cfg.forEach((sec) => {
      const items = sec.q.filter((q) => (answers[q.id] || "").trim()).map((q) => ({ id: q.id, label: q.label, value: answers[q.id].trim() }));
      if (items.length) sections.push({ title: sec.title, items });
    });
    return sections;
  }

  function save() {
    if (answeredCount(cfg, answers) === 0 && !notes.trim()) { setToast("Add at least one answer or note first"); return; }
    const sections = buildSections();
    let id;
    if (editingId) {
      id = editingId;
      setRecs((r) => r.map((x) => (x.id === editingId ? { ...x, sections, notes, updatedAt: Date.now() } : x)));
    } else {
      id = String(Date.now());
      setRecs((r) => [{ id, createdAt: Date.now(), sections, notes }, ...r]);
    }
    setSelectedId(id); setAnswers({}); setNotes(""); setEditingId(null); lsDel(K_DRAFT);
    setToast(editingId ? "Interview updated" : "Interview saved");
    go("record");
  }

  function editRec(r) {
    const a = {}; r.sections.forEach((s) => s.items.forEach((it) => { a[it.id] = it.value; }));
    setAnswers(a); setNotes(r.notes || ""); setEditingId(r.id); go("interview");
  }
  function newInterview() { setAnswers({}); setNotes(""); setEditingId(null); lsDel(K_DRAFT); go("interview"); }
  function clearOrDiscard() {
    if (!answeredCount(cfg, answers) && !notes && !editingId) return;
    const msg = editingId ? "Discard your changes to this interview?" : "Clear all answers?";
    if (confirm(msg)) { setAnswers({}); setNotes(""); setEditingId(null); lsDel(K_DRAFT); setToast(editingId ? "Changes discarded" : "Cleared"); }
  }
  function deleteRec(id) { setRecs((r) => r.filter((x) => x.id !== id)); setToast("Interview deleted"); go("log"); }
  function copyRec(r) { navigator.clipboard?.writeText(recToMd(r)).then(() => setToast("Copied as text")).catch(() => setToast("Copy failed")); }

  function exportData() {
    const data = { app: "tabany-discovery", version: 3, exportedAt: new Date().toISOString(), config: cfg, records: recs };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "tabany-interviews-backup.json"; a.click(); URL.revokeObjectURL(a.href);
    setToast("Backup downloaded");
  }
  function importData(e) {
    const f = e.target.files[0]; if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const d = JSON.parse(rd.result);
        if (Array.isArray(d.config)) setCfg(d.config);
        if (Array.isArray(d.records)) setRecs(d.records);
        setSettingsOpen(false); go("log"); setToast("Imported");
      } catch { setToast("That file couldn't be read"); }
    };
    rd.readAsText(f); e.target.value = "";
  }

  const setSecTitle = (si, v) => setCfg((c) => c.map((s, i) => (i === si ? { ...s, title: v } : s)));
  const setQField = (si, qi, field, v) => setCfg((c) => c.map((s, i) => (i === si ? { ...s, q: s.q.map((q, j) => (j === qi ? { ...q, [field]: v } : q)) } : s)));
  const addQ = (si) => setCfg((c) => c.map((s, i) => (i === si ? { ...s, q: [...s.q, { id: "q_" + rid(), label: "New question", hint: "", type: "textarea", ph: "" }] } : s)));
  const delQ = (si, qi) => setCfg((c) => c.map((s, i) => (i === si ? { ...s, q: s.q.filter((_, j) => j !== qi) } : s)));
  const addSec = () => setCfg((c) => [...c, { id: "s_" + rid(), title: "New section", q: [{ id: "q_" + rid(), label: "New question", hint: "", type: "textarea", ph: "" }] }]);
  const delSec = (si) => { if (confirm("Delete this whole section?")) setCfg((c) => c.filter((_, i) => i !== si)); };
  const resetCfg = () => { if (confirm("Reset all questions to the tabany defaults? Saved interviews are kept.")) { setCfg(clone(DEFAULTS)); setToast("Questions reset"); } };

  const current = recs.find((r) => r.id === selectedId);

  return (
    <>
      <header className="hdr">
        <div className="hdr-in">
          <div className="logo">
            <span className="wordmark">tabany<span className="dot">.</span></span>
            <span className="div" />
            <span className="sub">Discovery Notes</span>
          </div>
          <div className="hdr-r">
            <nav>
              <button className={"tab" + (view === "interview" ? " on" : "")} onClick={() => go("interview")}>Interview</button>
              <button className={"tab" + (view === "log" || view === "record" ? " on" : "")} onClick={() => go("log")}>
                Saved {recs.length > 0 && <span className="pip">{recs.length}</span>}
              </button>
              <button className={"tab" + (view === "questions" ? " on" : "")} onClick={() => go("questions")}>Questions</button>
            </nav>
            <button className="gear" title="Settings" aria-label="Settings" onClick={() => setSettingsOpen(true)}><GearIcon /></button>
          </div>
        </div>
      </header>

      <div className="wrap">
        {/* INTERVIEW */}
        {view === "interview" && (
          <section className="view">
            <div className="hero">
              <div className="eyebrow">{editingId ? "Editing a saved interview" : "Discovery interview"}</div>
              <h1>Capture what you heard. Save it for later.</h1>
              <p>Run through whatever the conversation allows — every question is optional, so skip freely when you're short on time. Note the friction, repetition and manual work; it all saves to your log.</p>
              <div className="note">◆ <span><b>No required fields.</b> Fill in what's useful and save.</span></div>
            </div>

            {cfg.map((sec, i) => (
              <div className={"sec" + (collapsed[sec.id] ? " collapsed" : "")} key={sec.id}>
                <div className="sec-h" onClick={() => toggleSec(sec.id)}>
                  <span className="ix">{String(i + 1).padStart(2, "0")}</span>
                  <span className="nm">{sec.title}</span>
                  <span className="chev">▾</span>
                </div>
                {!collapsed[sec.id] && (
                  <div className="sec-b">
                    {sec.q.map((q) => (
                      <div className={"q" + (q.wide ? " wide" : "")} key={q.id}>
                        <label>{q.label}</label>
                        {q.hint && <span className="hint">{q.hint}</span>}
                        {q.type === "text"
                          ? <input value={answers[q.id] || ""} placeholder={q.ph || ""} onChange={(e) => setAns(q.id, e.target.value)} />
                          : <textarea value={answers[q.id] || ""} placeholder={q.ph || ""} onChange={(e) => setAns(q.id, e.target.value)} />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className={"sec notes-sec" + (collapsed.__notes ? " collapsed" : "")}>
              <div className="sec-h" onClick={() => toggleSec("__notes")}>
                <span className="ix">✎</span>
                <span className="nm">Open notes</span>
                <span className="meta">anything the questions missed</span>
                <span className="chev">▾</span>
              </div>
              {!collapsed.__notes && (
                <div className="sec-b">
                  <div className="q wide">
                    <label>Quotes, side comments, observations — capture anything useful that didn't fit a question.</label>
                    <textarea value={notes} placeholder={"\u201CWe lose two days every month just reconciling that spreadsheet\u2026\u201D"} onChange={(e) => setNotes(e.target.value)} />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SAVED RECORD */}
        {view === "record" && (
          current ? (
            <section className="view">
              <div className="a-bar">
                <div><div className="a-kicker">Saved interview</div></div>
                <div className="a-tools">
                  <button className="iconbtn" onClick={() => editRec(current)}>✎ Edit</button>
                  <button className="iconbtn" onClick={() => copyRec(current)}>⧉ Copy</button>
                  <button className="iconbtn danger" onClick={() => deleteRec(current.id)}>Delete</button>
                </div>
              </div>
              <h2 className="a-dept">{deptOf(current)}</h2>
              {teamOf(current) && <div className="a-team">{teamOf(current)}</div>}
              <div className="record-meta">
                Saved {new Date(current.createdAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                {current.updatedAt && ` · edited ${new Date(current.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`}
              </div>
              <div style={{ marginTop: 24 }}>
                {current.sections.map((sec, si) => (
                  <div key={si}>
                    <div className="seclabel">{sec.title}</div>
                    <div className="recsec">
                      {sec.items.map((it, ii) => (
                        <div className="qa" key={ii}>
                          <div className="ql">{it.label}</div>
                          <div className="qv">{it.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {(current.notes || "").trim() && (
                  <>
                    <div className="seclabel">Open notes</div>
                    <div className="notesblock">{current.notes}</div>
                  </>
                )}
              </div>
            </section>
          ) : (
            <section className="view">
              <div className="empty"><div className="em" /><h3>Nothing selected</h3>
                <p>Pick an interview from Saved, or start a new one.</p>
                <button className="btn primary" onClick={newInterview}>Start an interview</button>
              </div>
            </section>
          )
        )}

        {/* SAVED LIST */}
        {view === "log" && (
          <section className="view">
            {recs.length === 0 ? (
              <div className="empty"><div className="em" /><h3>No saved interviews yet</h3>
                <p>Fill in an interview and save it — they collect here, one card per department.</p>
                <button className="btn primary" onClick={newInterview}>Start an interview</button>
              </div>
            ) : (
              <>
                <div className="a-kicker">Saved interviews</div>
                <h1 className="viewtitle">{recs.length} {recs.length === 1 ? "interview" : "interviews"}</h1>
                <div className="loggrid">
                  {recs.map((r) => (
                    <button className="card" key={r.id} onClick={() => { setSelectedId(r.id); go("record"); }}>
                      <div className="cd">{deptOf(r)}</div>
                      {teamOf(r) && <div className="ct">{teamOf(r)}</div>}
                      <div className="cm"><span className="b">{itemCount(r)} answers</span> {new Date(r.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* QUESTIONS EDITOR */}
        {view === "questions" && (
          <section className="view">
            <div className="a-kicker">Question library</div>
            <h1 className="viewtitle">Tune the questions</h1>
            <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: "62ch", lineHeight: 1.6, margin: "0 0 4px" }}>
              Edit anything, drop sections you never use, or add ones for a specific client. Changes save automatically and apply to every new interview. The open-notes box is always there and isn't listed here.
            </p>
            <div className="ed-tools">
              <button className="btn primary" onClick={addSec}>+ Add section</button>
              <button className="btn ghost" onClick={resetCfg}>Reset to defaults</button>
            </div>
            {cfg.map((sec, si) => (
              <div className="ed-sec" key={sec.id}>
                <div className="ed-sec-h">
                  <input value={sec.title} placeholder="Section title" onChange={(e) => setSecTitle(si, e.target.value)} />
                  <button className="xbtn" title="Delete section" onClick={() => delSec(si)}>✕</button>
                </div>
                {sec.q.map((q, qi) => (
                  <div className="ed-q" key={q.id}>
                    <input value={q.label} placeholder="Question" onChange={(e) => setQField(si, qi, "label", e.target.value)} />
                    <input value={q.hint || ""} placeholder="Hint (optional)" onChange={(e) => setQField(si, qi, "hint", e.target.value)} />
                    <select value={q.type} onChange={(e) => setQField(si, qi, "type", e.target.value)}>
                      <option value="textarea">Long</option>
                      <option value="text">Short</option>
                    </select>
                    <button className="xbtn" title="Delete question" onClick={() => delQ(si, qi)}>✕</button>
                  </div>
                ))}
                <button className="addq" onClick={() => addQ(si)}>+ Add question</button>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* save bar */}
      {view === "interview" && (
        <div className="gobar">
          <div className="gobar-in">
            <div className="status">All optional · your answers save automatically as you type.</div>
            <button className="clr" onClick={clearOrDiscard}>{editingId ? "Discard changes" : "Clear answers"}</button>
            <button className="go" onClick={save}>◆ {editingId ? "Update interview" : "Save interview"}</button>
          </div>
        </div>
      )}

      {/* settings */}
      {settingsOpen && (
        <div className="scrim" onClick={(e) => { if (e.target === e.currentTarget) setSettingsOpen(false); }}>
          <div className="modal" role="dialog" aria-modal="true">
            <div className="modal-h"><h2>Settings</h2><button aria-label="Close" onClick={() => setSettingsOpen(false)}>✕</button></div>
            <div className="modal-b">
              <h4>Your data</h4>
              <p>Interviews and custom questions are saved in this browser. Export a backup to keep them safe or move them to another device; import to restore.</p>
              <div className="keyrow">
                <button className="btn" onClick={exportData}>Export backup</button>
                <button className="btn" onClick={() => fileRef.current?.click()}>Import</button>
                <input ref={fileRef} type="file" accept="application/json" style={{ display: "none" }} onChange={importData} />
              </div>
              <h4 style={{ marginTop: 22, paddingTop: 20, borderTop: "1px solid var(--line-2)" }}>About</h4>
              <p>tabany Discovery Notes — capture and save discovery interviews. Everything runs in your browser; no account, no server, no keys.</p>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
