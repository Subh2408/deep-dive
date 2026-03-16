/* Deep Dive — React App
   Globals expected: CATS, SUBS (data.js), startParticles (particles.js) */

const { useState, useEffect, useRef } = React;

/* ── Utils ── */
function encSession(name, catId, path) {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify({ n: name, c: catId, p: path })))); }
  catch { return ''; }
}
function decSession(s) {
  try { return JSON.parse(decodeURIComponent(escape(atob(s)))); }
  catch { return null; }
}
function getNode(cat, path) {
  let n = cat.root;
  for (const i of path) { if (!n.br || n.br[i] === undefined) break; n = n.br[i]; }
  return n;
}
function getHist(cat, path) {
  let h = [], n = cat.root;
  for (let i = 0; i < path.length; i++) {
    const b = n.br[path[i]]; if (!b) break;
    h.push({ q: n.q, label: b.label, d: i }); n = b;
  }
  h.push({ q: n.q, label: null, d: path.length });
  return h;
}
const dname = d => ['The surface', 'Deeper', 'Deeper still', 'The descent', 'The final question'][d] ?? 'Reflection';

/* ── Mood color system ── */
const BG_COLORS  = ['#05080f','#080810','#0f0805','#100508','#000000'];
const TX_COLORS  = ['#ede8de','#ede8de','#f0e6d0','#f0e6d0','#ffffff'];
const TX2_COLORS = ['rgba(237,232,222,0.5)','rgba(237,232,222,0.5)','rgba(240,230,208,0.5)','rgba(240,230,208,0.5)','rgba(255,255,255,0.5)'];
const TX3_COLORS = ['rgba(237,232,222,0.24)','rgba(237,232,222,0.24)','rgba(240,230,208,0.24)','rgba(240,230,208,0.24)','rgba(255,255,255,0.24)'];
const AC_COLORS  = ['#b8924e','#b8924e','#c9902a','#c9902a','#c4622a'];
const ACD_COLORS = ['rgba(184,146,78,0.12)','rgba(184,146,78,0.12)','rgba(201,144,42,0.12)','rgba(201,144,42,0.12)','rgba(196,98,42,0.12)'];

/* ── App ── */
function App() {
  const [screen, setScreen] = useState('splash');
  const [cat, setCat]       = useState(null);
  const [path, setPath]     = useState([]);
  const [name, setName]     = useState('');
  const [replyText, setReplyText] = useState('');
  const pRef = useRef(null);

  const dep = path.length;
  const node = cat ? getNode(cat, path) : null;

  useEffect(() => {
    const loader = document.getElementById('loader');
    if (loader) { setTimeout(() => { loader.classList.add('gone'); setTimeout(() => loader.remove(), 750); }, 300); }
    const canvas = document.getElementById('bgc');
    if (canvas) pRef.current = startParticles(canvas);
    // Check for shared session
    const params = new URLSearchParams(window.location.search);
    const s = params.get('s');
    const r = params.get('r');
    if (s) {
      const d = decSession(s);
      if (d) {
        const f = CATS.find(c => c.id === d.c);
        if (r) {
          try { setReplyText(decodeURIComponent(escape(atob(r)))); } catch {}
          if (f) { setCat(f); setPath(d.p || []); setName(d.n || ''); setScreen('reply'); }
        } else if (f) {
          setCat(f); setPath(d.p || []); setName(d.n || ''); setScreen('review');
        }
      }
    }
    return () => pRef.current && pRef.current.destroy();
  }, []);

  useEffect(() => {
    if (pRef.current) pRef.current.setDepth(path.length);
  }, [path]);

  useEffect(() => {
    const d = Math.min(dep, 4);
    document.body.style.backgroundColor = BG_COLORS[d];
    const r = document.documentElement.style;
    r.setProperty('--tx',  TX_COLORS[d]);
    r.setProperty('--tx2', TX2_COLORS[d]);
    r.setProperty('--tx3', TX3_COLORS[d]);
    r.setProperty('--ac',  AC_COLORS[d]);
    r.setProperty('--acd', ACD_COLORS[d]);
  }, [dep]);

  const startCat = c => { setCat(c); setPath([]); setScreen('question'); };
  const chooseBranch = idx => {
    const np = [...path, idx];
    const node = getNode(cat, np);
    setPath(np);
    if (!node.br || !node.br.length) { setScreen('silence'); }
  };
  const goHome = () => { setCat(null); setPath([]); setScreen('splash'); window.history.replaceState(null, '', window.location.pathname); };
  const startSameCat = () => { setPath([]); setScreen('question'); };
  const goToCategories = () => setScreen('categories');
  const goBack = () => { if (path.length > 0) setPath(path.slice(0, -1)); };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
      {screen === 'splash'     && <Splash    onStart={() => setScreen('categories')} />}
      {screen === 'categories' && <CardGrid  onSelect={startCat} onBack={goHome} />}
      {screen === 'question'   && cat && <Question cat={cat} node={node} depth={dep} path={path} onChoose={chooseBranch} onHome={goHome} onBack={goBack} />}
      {screen === 'silence'    && cat && <Silence  cat={cat} path={path} onDone={() => setScreen('send')} />}
      {screen === 'send'       && cat && <Send     cat={cat} path={path} name={name} onNameChange={setName} onDone={() => setScreen('final')} onHome={goHome} />}
      {screen === 'final'      && cat && <Final    cat={cat} path={path} name={name} onHome={goHome} />}
      {screen === 'review'     && cat && <Review    cat={cat} path={path} senderName={name} onStartSame={startSameCat} onCategories={goToCategories} />}
      {screen === 'reply'      && cat && <ReplyView cat={cat} path={path} senderName={name} replyText={replyText} onHome={goHome} />}
    </div>
  );
}

/* ── Splash ── */
function Splash({ onStart }) {
  const [letters, setLetters] = useState('');
  const [subIdx, setSubIdx]   = useState(0);
  const [subVis, setSubVis]   = useState(true);
  const full = "Deep Dive.";

  useEffect(() => {
    let i = 0;
    const delays = [80,80,80,80,180,80,80,80,80,80];
    const next = () => {
      if (i >= full.length) return;
      setLetters(full.slice(0, i + 1)); i++;
      setTimeout(next, (delays[i - 1] || 80) + (Math.random() < .12 ? 240 : 0));
    };
    setTimeout(next, 600);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setSubVis(false);
      setTimeout(() => { setSubIdx(n => (n + 1) % SUBS.length); setSubVis(true); }, 680);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="lay" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'max(72px,11vh) 28px max(64px,10vh)', animation: 'fi .32s ease both' }}>
      <div>
        <div style={{ width: 28, height: 2, background: 'var(--ac)', marginBottom: 32, animation: 'fi .6s ease .1s both' }} />
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(48px,13vw,72px)', fontWeight: 400, lineHeight: 1.05, color: 'var(--tx)', letterSpacing: '-.02em', minHeight: '2.2em' }}>
          {letters}<span style={{ animation: 'blink 1.1s ease infinite', opacity: .35 }}>▋</span>
        </h1>
        <p style={{ marginTop: 22, fontSize: 14, color: 'var(--tx3)', lineHeight: 1.9, maxWidth: 280, fontStyle: 'italic', opacity: subVis ? 1 : 0, transition: 'opacity .55s ease', minHeight: '3em' }}>
          {SUBS[subIdx]}
        </p>
      </div>
      <div style={{ animation: 'fi .6s ease .4s both' }}>
        <p style={{ fontSize: 11, color: 'var(--tx3)', marginBottom: 22, letterSpacing: '.12em' }}>TAP TO BEGIN</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div onClick={onStart}
            style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--bg2)', border: '0.5px solid var(--boh)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, touchAction: 'manipulation' }}>
            <span style={{ fontSize: 19, color: 'var(--tx3)', userSelect: 'none', animation: 'breathe 3s ease infinite' }}>↓</span>
          </div>
          <div>
            <div style={{ fontSize: 13, color: 'var(--tx2)', fontWeight: 500, marginBottom: 3 }}>8 themes</div>
            <div style={{ fontSize: 12, color: 'var(--tx3)' }}>5 levels · 900+ paths</div>
            <div style={{ fontSize: 12, color: 'var(--tx3)' }}>shareable sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Category Grid ── */
function CardGrid({ onSelect, onBack }) {
  return (
    <div className="lay" style={{ padding: 'max(56px,8vh) 16px max(32px,5vh)', animation: 'fi .32s ease both' }}>
      <button onClick={onBack} style={{ position: 'fixed', top: 20, left: 20, zIndex: 10, background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 20, cursor: 'pointer', padding: '8px' }}>←</button>
      <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.12em', marginBottom: 22, paddingLeft: 4 }}>CHOOSE A THEME</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {CATS.map((c, i) => (
          <button key={c.id} onClick={() => onSelect(c)} className="card-btn"
            style={{ background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 16,
              padding: '20px 16px', textAlign: 'left', cursor: 'pointer', minHeight: 80,
              animation: `up .35s ease ${i * 40}ms both`,
              touchAction: 'manipulation' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.col, marginBottom: 10 }} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, color: 'var(--tx)', fontWeight: 400, marginBottom: 4 }}>{c.name}</div>
            <div style={{ fontSize: 11, color: 'var(--tx3)', fontStyle: 'italic', lineHeight: 1.4 }}>{c.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Question ── */
function Question({ cat, node, depth, path, onChoose, onHome, onBack }) {
  const [disp, setDisp]     = useState('');
  const [showBr, setShowBr] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [scan, setScan]     = useState(false);
  const tRef = useRef(null);
  const MAX = 4;

  useEffect(() => {
    setDisp(''); setShowBr(false); setChosen(null); setScan(true);
    setTimeout(() => setScan(false), 1500);
    const words = node.q.split(' '); let i = 0;
    const next = () => {
      if (i >= words.length) { setShowBr(true); return; }
      const w = words[i];
      setDisp(p => p + (i > 0 ? ' ' : '') + w); i++;
      const dl = w.endsWith(',') ? 300 : w.endsWith('—') ? 560 : (w.endsWith('?') || w.endsWith('.')) ? 340 : 62;
      tRef.current = setTimeout(next, dl);
    };
    tRef.current = setTimeout(next, 250);
    return () => clearTimeout(tRef.current);
  }, [node]);

  const pick = i => { if (chosen !== null) return; setChosen(i); setTimeout(() => onChoose(i), 380); };
  const hist = getHist(cat, path);

  return (
    <div className="lay" style={{ display: 'flex', flexDirection: 'column', padding: 'max(48px,7vh) 22px 32px', minHeight: '100%', position: 'relative', animation: 'fi .32s ease both' }}>
      {scan && <div className="scanbar" />}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'max(28px,4vh)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={onHome} style={{ background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 14, cursor: 'pointer', padding: '4px 2px' }}>✕</button>
          {depth > 0 && <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 12, letterSpacing: '.08em', cursor: 'pointer', padding: '4px 2px' }}>← back</button>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: cat.col }} />
          <span style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.08em' }}>{cat.name.toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {Array.from({ length: MAX + 1 }).map((_, i) => (
            <div key={i} style={{ height: 2, borderRadius: 1, width: i < depth ? 14 : i === depth ? 20 : 5, background: i <= depth ? cat.col : 'var(--bo)', transition: 'all .45s cubic-bezier(.22,.68,0,1.2)', opacity: i <= depth ? 1 : .35 }} />
          ))}
        </div>
      </div>
      {depth > 0 && (
        <div style={{ marginBottom: 12, flexShrink: 0, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {hist.slice(0, -1).map((h, i) => (
            <span key={i} style={{ fontSize: 10, color: 'var(--tx3)', opacity: Math.max(.12, 1 - (depth - i - 1) * .3) }}>
              {h.label}{i < depth - 1 && <span style={{ marginLeft: 4, opacity: .28 }}>›</span>}
            </span>
          ))}
        </div>
      )}
      <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 18, flexShrink: 0 }}>{dname(depth)}</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,5vw,23px)', lineHeight: 1.72, color: 'var(--tx)', marginBottom: 'max(26px,4vh)', fontStyle: depth >= 2 ? 'italic' : 'normal', minHeight: '3em' }}>
          {disp}{disp !== node.q && <span style={{ opacity: .32 }}>▋</span>}
        </p>
        {showBr && node.br && node.br.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, animation: 'fi .28s ease both' }}>
            {node.br.map((b, i) => (
              <button key={i} onClick={() => pick(i)} className="branch-btn"
                style={{ background: 'var(--bg2)', border: `0.5px solid ${chosen === i ? cat.col : 'var(--bo)'}`, borderRadius: 14, padding: '18px 20px', textAlign: 'left', color: chosen !== null && chosen !== i ? 'var(--tx3)' : 'var(--tx)', fontSize: 14, lineHeight: 1.7, minHeight: 56, cursor: chosen !== null ? 'default' : 'pointer', opacity: chosen !== null && chosen !== i ? 0 : 1, transform: chosen !== null && chosen !== i ? 'translateY(4px)' : 'none', transition: `opacity .4s ease ${i * .07}s,transform .4s ease ${i * .07}s,border-color .15s` }}>
                {b.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Silence (final question) ── */
function Silence({ cat, path, onDone }) {
  const [disp, setDisp] = useState('');
  const [ready, setReady] = useState(false);
  const ran = useRef(false);

  // The final question lives on parentNode.br[lastIdx], not at getNode(cat, path)
  const parentPath = path.slice(0, -1);
  const lastIdx    = path[path.length - 1];
  const parentNode = getNode(cat, parentPath);
  const question   = parentNode.br[lastIdx].q;

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const words = question.split(' ');
    let i = 0;
    const timers = [];
    const next = () => {
      if (i >= words.length) {
        timers.push(setTimeout(() => setReady(true), 5000));
        return;
      }
      setDisp(p => p + (i > 0 ? ' ' : '') + words[i]);
      i++;
      timers.push(setTimeout(next, 100));
    };
    timers.push(setTimeout(next, 800));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="lay" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', background: '#000', textAlign: 'center', position: 'relative', animation: 'fi .32s ease both' }}>
      <div style={{ width: 1, height: 52, background: `${cat.col}33`, marginBottom: 44 }} />
      <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(19px,5.2vw,27px)', lineHeight: 1.85, color: 'var(--tx)', maxWidth: 340, marginBottom: 52, minHeight: '5em' }}>
        {disp}
        {disp.length < question.length && <span style={{ opacity: .25 }}>▋</span>}
      </p>
      <div style={{ width: 40, height: 1, background: `${cat.col}33`, marginBottom: ready ? 36 : 0, transition: 'margin .6s' }} />
      {ready && (
        <button onClick={onDone} style={{ background: 'none', border: 'none', color: 'var(--tx2)', fontSize: 12, letterSpacing: '.1em', cursor: 'pointer', padding: '20px', touchAction: 'manipulation' }}>
          WHEN YOU'RE READY →
        </button>
      )}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, background: cat.col, opacity: .4, animation: 'progfill 5s linear forwards' }} />
    </div>
  );
}

/* ── Send (name + optional note before sharing) ── */
function Send({ cat, path, name, onNameChange, onDone, onHome }) {
  const hist = getHist(cat, path);
  const last = hist[hist.length - 1];
  const [note, setNote] = useState('');

  return (
    <div className="lay" style={{ padding: 'max(52px,8vh) 22px max(52px,8vh)', animation: 'fi .32s ease both' }}>
      <div style={{ animation: 'up .4s ease both', marginBottom: 24 }}>
        <div style={{ width: 22, height: 2, background: cat.col, marginBottom: 18 }} />
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 400, color: 'var(--tx)', marginBottom: 6 }}>You went deep.</h2>
        <p style={{ fontSize: 14, color: 'var(--tx2)', lineHeight: 1.7, marginBottom: 24 }}>Now send it. Your friend will see your path — and answer the final question.</p>
      </div>
      {/* Final question preview */}
      <div style={{ animation: 'up .4s ease .06s both', background: 'var(--bg2)', border: `0.5px solid ${cat.col}55`, borderRadius: 14, padding: '16px', marginBottom: 22 }}>
        <div style={{ fontSize: 10, color: cat.col, letterSpacing: '.08em', marginBottom: 8 }}>THE QUESTION LEFT FOR THEM</div>
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 15, color: 'var(--tx)', lineHeight: 1.65 }}>{last.q}</p>
      </div>
      {/* Name input */}
      <div style={{ animation: 'up .4s ease .12s both', marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 8 }}>YOUR NAME</div>
        <input
          value={name} onChange={e => onNameChange(e.target.value)}
          placeholder="So they know who sent this"
          style={{ width: '100%', background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 12, padding: '13px 14px', color: 'var(--tx)', fontSize: 14, outline: 'none', fontFamily: "'DM Sans',sans-serif" }}
          onFocus={e => e.target.style.borderColor = 'var(--boh)'}
          onBlur={e => e.target.style.borderColor = 'var(--bo)'}
        />
      </div>
      {/* Optional note */}
      <div style={{ animation: 'up .4s ease .18s both', marginBottom: 22 }}>
        <div style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 8 }}>ADD A NOTE <span style={{ opacity: .4 }}>— OPTIONAL</span></div>
        <textarea
          value={note} onChange={e => setNote(e.target.value)}
          placeholder="Why you're sending this..."
          rows={2}
          style={{ width: '100%', background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 12, padding: '13px 14px', color: 'var(--tx)', fontSize: 14, outline: 'none', fontFamily: "'DM Sans',sans-serif", resize: 'none', lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = 'var(--boh)'}
          onBlur={e => e.target.style.borderColor = 'var(--bo)'}
        />
      </div>
      <div style={{ animation: 'up .4s ease .22s both', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={onDone} style={{ width: '100%', padding: '17px', background: 'var(--tx)', color: 'var(--bg)', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'opacity .2s' }}>
          {name.trim() ? `Share as ${name.trim()} →` : 'Share anonymously →'}
        </button>
        <button onClick={onHome} style={{ background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 11, padding: '12px', cursor: 'pointer', letterSpacing: '.08em', textAlign: 'center' }}>DISCARD SESSION</button>
      </div>
    </div>
  );
}

/* ── Final (share screen) ── */
function Final({ cat, path, name, onHome }) {
  const hist = getHist(cat, path);
  const [copied, setCopied] = useState('');

  const copyIt = async type => {
    const enc = encSession(name || 'Someone', cat.id, path);
    const url = `${location.origin}${location.pathname}?s=${enc}`;
    const displayName = name.trim() || 'Someone';
    const finalQ = hist[hist.length - 1].q;
    const parent = hist.length >= 2 ? hist[hist.length - 2] : null;
    const text = type === 'link' ? url :
      `${displayName} went deep into ${cat.name} and left you this.\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      (parent ? `${parent.q}\n→ "${parent.label}"\n\n` : '') +
      `They're asking you:\n${finalQ}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Open it: ${url}`;
    try { await navigator.clipboard.writeText(text); }
    catch { const ta = Object.assign(document.createElement('textarea'), { value: text, style: 'position:fixed;opacity:0' }); document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    setCopied(type); setTimeout(() => setCopied(''), 2400);
  };

  return (
    <div className="lay" style={{ padding: 'max(52px,8vh) 22px max(52px,8vh)', animation: 'fi .32s ease both' }}>
      <div style={{ animation: 'up .4s ease both', marginBottom: 22 }}>
        <div style={{ width: 22, height: 2, background: cat.col, marginBottom: 16 }} />
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 400, color: 'var(--tx)', marginBottom: 6 }}>Ready to send.</h2>
        <p style={{ fontSize: 14, color: 'var(--tx2)', lineHeight: 1.7 }}>Send your path — your friend sees where you went and answers the final question back.</p>
      </div>
      {/* Path summary */}
      <div style={{ animation: 'up .4s ease .08s both', background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 16, padding: '18px 16px', marginBottom: 18 }}>
        {hist.map((h, i) => (
          <div key={i} style={{ borderLeft: `1.5px solid ${i === hist.length - 1 ? cat.col : 'var(--bo)'}`, paddingLeft: 13, paddingBottom: i < hist.length - 1 ? 16 : 0, marginLeft: 4 }}>
            <div style={{ fontSize: 10, color: 'var(--tx3)', marginBottom: 3, letterSpacing: '.08em', textTransform: 'uppercase' }}>{dname(i)}</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: i >= 2 ? 'italic' : 'normal', fontSize: i === hist.length - 1 ? 14 : 12, color: i === hist.length - 1 ? 'var(--tx)' : 'var(--tx2)', lineHeight: 1.6, marginBottom: h.label ? 5 : 0 }}>{h.q}</p>
            {h.label && <span style={{ fontSize: 10, color: 'var(--tx3)', background: 'var(--bg3)', border: '0.5px solid var(--bo)', borderRadius: 100, padding: '2px 10px', display: 'inline-block' }}>"{h.label}"</span>}
          </div>
        ))}
      </div>
      <div style={{ animation: 'up .4s ease .16s both', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 3 }}>SEND TO YOUR FRIEND</p>
        {[
          { t: 'link', l: 'Copy link', s: 'They open it and see your path + the question' },
          { t: 'text', l: 'Copy as text', s: 'One question + context — paste anywhere' }
        ].map(({ t, l, s }) => (
          <button key={t} onClick={() => copyIt(t)} className="copy-btn"
            style={{ background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 14, padding: '13px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'border-color .15s' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 13, color: 'var(--tx)', fontWeight: 500, marginBottom: 2 }}>{l}</div>
              <div style={{ fontSize: 11, color: 'var(--tx3)' }}>{s}</div>
            </div>
            <span style={{ fontSize: 12, color: copied === t ? '#6bcf8a' : 'var(--ac)', minWidth: 52, textAlign: 'right', fontWeight: 500 }}>{copied === t ? '✓ copied' : '→'}</span>
          </button>
        ))}
        <button onClick={onHome} style={{ background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 11, padding: '13px', cursor: 'pointer', letterSpacing: '.08em', textAlign: 'center', marginTop: 4 }}>START OVER</button>
      </div>
    </div>
  );
}

/* ── Review (received link) ── */
function Review({ cat, path, senderName, onStartSame, onCategories }) {
  const hist = getHist(cat, path);
  const last = hist[hist.length - 1];
  const [answer, setAnswer] = useState('');
  const [sent, setSent] = useState(false);
  const sender = senderName || 'Someone';

  const sendBack = async () => {
    const orig = new URLSearchParams(window.location.search).get('s');
    const enc = btoa(unescape(encodeURIComponent(answer)));
    const url = `${location.origin}${location.pathname}?s=${orig}&r=${enc}`;
    try { await navigator.clipboard.writeText(url); }
    catch { const ta = Object.assign(document.createElement('textarea'), { value: url, style: 'position:fixed;opacity:0' }); document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    setSent(true);
  };

  return (
    <div className="lay" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'max(64px,10vh) 24px max(48px,8vh)', animation: 'fi .32s ease both' }}>
      <div>
        <p style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.12em', marginBottom: 18, animation: 'fi .6s ease both' }}>
          {sender.toUpperCase()} LEFT YOU THIS
        </p>
        <div style={{ width: 22, height: 2, background: cat.col, marginBottom: 28, animation: 'fi .6s ease .1s both' }} />
        {hist.length >= 2 && (
          <div style={{ marginBottom: 20, animation: 'fi .6s ease .12s both' }}>
            <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.08em', marginBottom: 6 }}>TO UNDERSTAND WHY THEY'RE ASKING —</div>
            <p style={{ fontSize: 12, color: 'var(--tx3)', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{hist[hist.length - 2].q}"
            </p>
            <p style={{ fontSize: 11, color: 'var(--tx3)', marginTop: 4, opacity: .6 }}>
              They answered: "{hist[hist.length - 2].label}"
            </p>
          </div>
        )}
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(20px,5.5vw,28px)', lineHeight: 1.75, color: 'var(--tx)', animation: 'up .7s ease .2s both' }}>
          {last.q}
        </p>
      </div>
      {!sent ? (
        <div style={{ animation: 'up .5s ease .3s both' }}>
          <div style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 10 }}>WHAT'S YOUR ANSWER?</div>
          <textarea
            value={answer} onChange={e => setAnswer(e.target.value)}
            placeholder="Take your time..."
            rows={4}
            style={{ width: '100%', background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 12, padding: '14px', color: 'var(--tx)', fontSize: 14, outline: 'none', fontFamily: "'DM Sans',sans-serif", resize: 'none', lineHeight: 1.6, marginBottom: 12 }}
            onFocus={e => e.target.style.borderColor = 'var(--boh)'}
            onBlur={e => e.target.style.borderColor = 'var(--bo)'}
          />
          {answer.trim() && (
            <button onClick={sendBack} style={{ width: '100%', padding: '17px', background: 'var(--tx)', color: 'var(--bg)', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 14 }}>
              Send back to {sender} →
            </button>
          )}
          <button onClick={onStartSame} style={{ background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 11, letterSpacing: '.1em', cursor: 'pointer', padding: '8px 0', width: '100%', textAlign: 'center' }}>
            WANT TO PLAY YOUR OWN ROUND?
          </button>
        </div>
      ) : (
        <div style={{ animation: 'up .5s ease both', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ fontSize: 13, color: 'var(--tx3)', textAlign: 'center', marginBottom: 8 }}>✓ Copied — paste the link back to {sender}</p>
          <button onClick={onStartSame} style={{ background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 14, padding: '16px', fontSize: 14, color: 'var(--tx)', cursor: 'pointer' }}>
            Play {cat.name} →
          </button>
          <button onClick={onCategories} style={{ background: 'none', border: '0.5px solid var(--bo)', borderRadius: 14, padding: '16px', fontSize: 14, color: 'var(--tx2)', cursor: 'pointer' }}>
            Choose a different theme →
          </button>
        </div>
      )}
    </div>
  );
}

/* ── ReplyView (sender sees receiver's answer) ── */
function ReplyView({ cat, path, senderName, replyText, onHome }) {
  const hist = getHist(cat, path);
  const last = hist[hist.length - 1];
  const sender = senderName || 'Someone';

  return (
    <div className="lay" style={{ padding: 'max(64px,10vh) 24px max(48px,8vh)', animation: 'fi .32s ease both' }}>
      <p style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.12em', marginBottom: 18, animation: 'fi .6s ease both' }}>
        {sender.toUpperCase()} ANSWERED
      </p>
      <div style={{ width: 22, height: 2, background: cat.col, marginBottom: 32, animation: 'fi .6s ease .1s both' }} />
      <div style={{ marginBottom: 28, animation: 'up .5s ease .15s both' }}>
        <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 10 }}>YOU ASKED</div>
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(16px,4.5vw,20px)', color: 'var(--tx2)', lineHeight: 1.72 }}>{last.q}</p>
      </div>
      <div style={{ width: '100%', height: 1, background: 'var(--bo)', marginBottom: 28 }} />
      <div style={{ marginBottom: 40, animation: 'up .5s ease .25s both' }}>
        <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 10 }}>THEY SAID</div>
        <p style={{ fontSize: 16, color: 'var(--tx)', lineHeight: 1.75, fontStyle: 'italic' }}>{replyText}</p>
      </div>
      <button onClick={onHome} style={{ background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 14, padding: '16px', fontSize: 14, color: 'var(--tx)', cursor: 'pointer', width: '100%', animation: 'up .5s ease .35s both' }}>
        Play another round →
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
