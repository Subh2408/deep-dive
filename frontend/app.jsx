/* Deep Dive — React App (Phase 2)
   Globals: CATS, SUBS (data.js), startParticles (particles.js) */

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

/* ── Server API ── */
// Update API_URL in index.html to your Render service URL after deploying server/index.js
const API_BASE = window.API_URL || 'http://localhost:3001';

async function callClaude(systemPrompt, userPrompt) {
  try {
    const res = await fetch(API_BASE + '/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ system: systemPrompt, user: userPrompt }),
    });
    if (!res.ok) throw new Error('Server error ' + res.status);
    const data = await res.json();
    return data.text;
  } catch (e) {
    console.error('callClaude failed:', e);
    return null;
  }
}

async function generateNextNode(cat, nodeHistory) {
  const system = `You are a facilitator of deep one-on-one conversations.
You generate the next question and exactly 3 branch responses for a philosophical conversation game.
Rules:
- The question must be 10–30 words, deeply personal, impossible to answer superficially
- Never use vague pronouns — name the specific thing being referred to
- Each branch is 4–10 words, written in first person ("I...", "Something...", "Not sure...")
- One branch should always be a genuine stopping point or moment of recognition
- The question and branches must only make sense given this specific path
- Return ONLY valid JSON in exactly this shape, nothing else:
{"question":"...","branches":["...","...","..."]}`;

  const pathText = nodeHistory
    .map(n => `Q: ${n.q}\nChose: "${n.chosenLabel}"`)
    .join('\n\n');

  const user = `Theme: ${cat.name} — ${cat.sub}

Path taken so far:
${pathText}

Generate the next question and 3 branches that go one precise level deeper into this specific person's territory. Return only the JSON.`;

  const raw = await callClaude(system, user);
  if (!raw) return null;
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

/* ── Mood color system ── */
const BG_COLORS  = ['#05080f','#080810','#0f0805','#100508','#000000'];
const TX_COLORS  = ['#ede8de','#ede8de','#f0e6d0','#f0e6d0','#ffffff'];
const TX2_COLORS = ['rgba(237,232,222,0.5)','rgba(237,232,222,0.5)','rgba(240,230,208,0.5)','rgba(240,230,208,0.5)','rgba(255,255,255,0.5)'];
const TX3_COLORS = ['rgba(237,232,222,0.24)','rgba(237,232,222,0.24)','rgba(240,230,208,0.24)','rgba(240,230,208,0.24)','rgba(255,255,255,0.24)'];
const AC_COLORS  = ['#b8924e','#b8924e','#c9902a','#c9902a','#c4622a'];
const ACD_COLORS = ['rgba(184,146,78,0.12)','rgba(184,146,78,0.12)','rgba(201,144,42,0.12)','rgba(201,144,42,0.12)','rgba(196,98,42,0.12)'];
const BG_BLOOM = [
  'radial-gradient(ellipse 80% 60% at 85% 15%, #1a1f3a 0%, transparent 70%)',
  'radial-gradient(ellipse 70% 55% at 20% 45%, #1a1428 0%, transparent 70%)',
  'radial-gradient(ellipse 65% 65% at 80% 80%, #2a1a08 0%, transparent 70%)',
  'radial-gradient(ellipse 60% 60% at 50% 85%, #2a0a10 0%, transparent 70%)',
  'radial-gradient(ellipse 50% 50% at 50% 50%, #1a0f04 0%, transparent 70%)',
];

/* ── App ── */
function App() {
  const [screen, setScreen]             = useState('splash');
  const [cat, setCat]                   = useState(null);
  const [path, setPath]                 = useState([]);
  const [name, setName]                 = useState('');
  const [replyText, setReplyText]       = useState('');
  const [nodeHistory, setNodeHistory]   = useState([]);
  const [llmNode, setLlmNode]           = useState(null);
  const [llmLoading, setLlmLoading]     = useState(false);
  const [totalDepth, setTotalDepth]     = useState(0);
  const [black, setBlack]               = useState(false);
  const pRef = useRef(null);

  const dep  = path.length;
  const node = cat ? getNode(cat, path) : null;

  useEffect(() => {
    const loader = document.getElementById('loader');
    if (loader) { setTimeout(() => { loader.classList.add('gone'); setTimeout(() => loader.remove(), 750); }, 300); }
    const canvas = document.getElementById('bgc');
    if (canvas) pRef.current = startParticles(canvas);
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

  const resetSession = () => { setPath([]); setNodeHistory([]); setLlmNode(null); setTotalDepth(0); };

  const fade = (fn, fast) => {
    setBlack(true);
    setTimeout(() => {
      fn();
      setTimeout(() => setBlack(false), fast ? 100 : 180);
    }, fast ? 150 : 400);
  };

  const startCat = c => { setCat(c); resetSession(); fade(() => setScreen('question')); };

  const chooseBranch = idx => {
    const np = [...path, idx];
    const nextNode = getNode(cat, np);
    const chosenLabel = nextNode.label || '';
    const currentQ = getNode(cat, path).q;
    const newHistory = [...(nodeHistory || []), {
      q: currentQ,
      chosenLabel,
      branches: nextNode.br ? nextNode.br.map(b => b.label) : [],
    }];
    fade(() => {
      setPath(np);
      setNodeHistory(newHistory);
      setTotalDepth(d => d + 1);
      if (!nextNode.br || !nextNode.br.length) {
        if (np.length < 3) {
          setScreen('silence');
        } else {
          setScreen('llm_loading');
          generateNextNode(cat, newHistory).then(result => {
            if (result) { setLlmNode(result); setScreen('llm_question'); }
            else { setScreen('silence'); }
          });
        }
      }
    });
  };

  const chooseLLMBranch = (branchLabel, isStop) => {
    if (isStop) { fade(() => setScreen('silence')); return; }
    const newHistory = [
      ...(nodeHistory || []),
      { q: llmNode.question, chosenLabel: branchLabel, branches: llmNode.branches },
    ];
    fade(() => {
      setNodeHistory(newHistory);
      setTotalDepth(d => d + 1);
      setLlmNode(null);
      setScreen('llm_loading');
      generateNextNode(cat, newHistory).then(result => {
        if (result) { setLlmNode(result); setScreen('llm_question'); }
        else { setScreen('silence'); }
      });
    });
  };

  const goHome = () => {
    fade(() => {
      setCat(null); resetSession(); setScreen('splash');
      window.history.replaceState(null, '', window.location.pathname);
    }, true);
  };
  const goToCategories = () => fade(() => setScreen('categories'));
  const goBack = () => {
    if (path.length > 0) {
      fade(() => {
        setPath(path.slice(0, -1));
        setNodeHistory(nodeHistory.slice(0, -1));
        setTotalDepth(d => Math.max(0, d - 1));
        setScreen('question');
      });
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1 }}>
      {black && <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 200, pointerEvents: 'none' }} />}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: BG_BLOOM[Math.min(dep, 4)], pointerEvents: 'none' }} />
      {screen === 'splash'       && <Splash    onStart={() => fade(() => setScreen('categories'))} />}
      {screen === 'categories'   && <CardGrid  onSelect={startCat} onBack={goHome} />}
      {screen === 'question'     && cat && <Question cat={cat} node={node} depth={dep} path={path} onChoose={chooseBranch} onHome={goHome} onBack={goBack} />}
      {screen === 'silence'      && cat && <Silence  cat={cat} path={path} onDone={() => fade(() => setScreen('send'))} />}
      {screen === 'llm_loading'  && <LLMLoading />}
      {screen === 'llm_question' && cat && llmNode && <LLMQuestion cat={cat} node={llmNode} depth={totalDepth} onChoose={chooseLLMBranch} onHome={goHome} />}
      {screen === 'send'         && cat && <Send     cat={cat} path={path} name={name} nodeHistory={nodeHistory} onNameChange={setName} onDone={() => fade(() => setScreen('final'))} onHome={goHome} />}
      {screen === 'final'        && cat && <Final    cat={cat} path={path} name={name} nodeHistory={nodeHistory} onHome={goHome} onShowTree={() => fade(() => setScreen('tree'))} />}
      {screen === 'tree'         && cat && <TreeView cat={cat} path={path} nodeHistory={nodeHistory} onBack={() => fade(() => setScreen('final'))} />}
      {screen === 'review'       && cat && <Review    cat={cat} path={path} senderName={name} onHome={goHome} />}
      {screen === 'reply'        && cat && <ReplyView cat={cat} path={path} senderName={name} replyText={replyText} onHome={goHome} />}
    </div>
  );
}

/* ── Splash ── */
function Splash({ onStart }) {
  const [letters, setLetters] = useState('');
  const [subIdx, setSubIdx]   = useState(0);
  const [subVis, setSubVis]   = useState(true);
  const full = 'Deep Dive.';

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
          <div onClick={onStart} style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--bg2)', border: '0.5px solid var(--boh)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, touchAction: 'manipulation' }}>
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
    <div className="lay" style={{ padding: 'max(56px,8vh) 16px max(32px,5vh)', overflowY: 'auto', animation: 'fi .32s ease both' }}>
      <button onClick={onBack} style={{ position: 'fixed', top: 20, left: 20, zIndex: 10, background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 20, cursor: 'pointer', padding: '8px' }}>←</button>
      <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.12em', marginBottom: 22, paddingLeft: 4 }}>CHOOSE A THEME</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {CATS.map((c, i) => (
          <button key={c.id} onClick={() => onSelect(c)}
            style={{ background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 16, padding: '20px 16px', textAlign: 'left', cursor: 'pointer', minHeight: 88, animation: `up .35s ease ${i * 40}ms both`, touchAction: 'manipulation', transition: 'border-color .15s, transform .1s' }}
            onTouchStart={e => { e.currentTarget.style.transform = 'scale(0.97)'; e.currentTarget.style.borderColor = c.col; }}
            onTouchEnd={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--bo)'; }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.col, marginBottom: 12 }} />
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
      {/* Ambient tree background */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: Math.min(0.08 + depth * 0.04, 0.35), transition: 'opacity 1s ease', pointerEvents: 'none', overflow: 'hidden' }}>
        <AmbientTree cat={cat} path={path} depth={depth} />
      </div>
      {scan && <div className="scanbar" />}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'max(28px,4vh)', flexShrink: 0 }}>
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
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 12, flexShrink: 0, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {hist.slice(0, -1).map((h, i) => (
            <span key={i} style={{ fontSize: 10, color: 'var(--tx3)', opacity: Math.max(.12, 1 - (depth - i - 1) * .3) }}>
              {h.label}{i < depth - 1 && <span style={{ marginLeft: 4, opacity: .28 }}>›</span>}
            </span>
          ))}
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1, fontSize: 10, color: 'var(--tx3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 18, flexShrink: 0 }}>{dname(depth)}</div>
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(18px,5vw,23px)', lineHeight: 1.72, color: 'var(--tx)', marginBottom: 'max(26px,4vh)', fontStyle: depth >= 2 ? 'italic' : 'normal', minHeight: '3em' }}>
          {disp}{disp.length < node.q.length && <span style={{ opacity: .32 }}>▋</span>}
        </p>
        {showBr && node.br && node.br.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, animation: 'fi .28s ease both' }}>
            {node.br.map((b, i) => (
              <button key={i} onClick={() => pick(i)} className="branch-btn"
                style={{ background: 'var(--bg2)', border: `0.5px solid ${chosen === i ? cat.col : 'var(--bo)'}`, borderRadius: 14, padding: '18px 20px', textAlign: 'left', color: chosen !== null && chosen !== i ? 'var(--tx3)' : 'var(--tx)', fontSize: 14, lineHeight: 1.7, minHeight: 56, cursor: chosen !== null ? 'default' : 'pointer', opacity: chosen !== null && chosen !== i ? 0 : 1, transform: chosen !== null && chosen !== i ? 'translateY(4px)' : 'none', transition: `opacity .4s ease ${i * .07}s,transform .4s ease ${i * .07}s,border-color .15s`, touchAction: 'manipulation' }}
                onTouchStart={e => { if (chosen === null) e.currentTarget.style.background = 'var(--bg3)'; }}
                onTouchEnd={e => { e.currentTarget.style.background = 'var(--bg2)'; }}>
                {b.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Ambient Tree (background during question screen) ── */
function AmbientTree({ cat, path, depth }) {
  if (depth < 1) return null;
  const svgW = 300, svgH = 400;
  const cx = svgW / 2;
  const V_GAP = 60;
  const points = [{ x: cx, y: 20 }];
  let cur = cat.root;
  for (let d = 0; d < path.length && d < depth; d++) {
    if (!cur.br) break;
    points.push({ x: cx, y: 20 + (d + 1) * V_GAP });
    cur = cur.br[path[d]];
  }
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="ambglow">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {points.map((p, i) => (
        <g key={i}>
          {i > 0 && (
            <line x1={points[i-1].x} y1={points[i-1].y} x2={p.x} y2={p.y}
              stroke={cat.col} strokeWidth={1} opacity={0.4} filter="url(#ambglow)" />
          )}
          <circle cx={p.x} cy={p.y} r={4} fill={cat.col} opacity={0.6} filter="url(#ambglow)" />
        </g>
      ))}
    </svg>
  );
}

/* ── Silence (final fixed-tree question) ── */
function Silence({ cat, path, onDone }) {
  const [disp, setDisp] = useState('');
  const [ready, setReady] = useState(false);
  const ran = useRef(false);

  const node     = getNode(cat, path);
  const question = node && node.q ? node.q : '';

  useEffect(() => {
    if (ran.current || !question) return;
    ran.current = true;
    const words = question.split(' ');
    let i = 0;
    const timers = [];
    const next = () => {
      if (i >= words.length) {
        timers.push(setTimeout(() => setReady(true), 2000));
        return;
      }
      setDisp(p => p + (i > 0 ? ' ' : '') + words[i]);
      i++;
      timers.push(setTimeout(next, 95));
    };
    timers.push(setTimeout(next, 800));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="lay" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', background: '#000', textAlign: 'center' }}>
      <div style={{ width: 1, height: 52, background: `${cat.col}33`, marginBottom: 44 }} />
      <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(19px,5.2vw,27px)', lineHeight: 1.85, color: 'var(--tx)', maxWidth: 340, marginBottom: 52, minHeight: '5em' }}>
        {disp}
        {disp.length < question.length && <span style={{ opacity: .25 }}>▋</span>}
      </p>
      <div style={{ width: 40, height: 1, background: `${cat.col}33`, marginBottom: ready ? 36 : 0, transition: 'margin .6s' }} />
      {ready && (
        <button onClick={onDone} style={{ background: 'none', border: 'none', color: 'var(--tx2)', fontSize: 12, letterSpacing: '.1em', cursor: 'pointer', padding: '20px', touchAction: 'manipulation', animation: 'fi .5s ease both' }}>
          WHEN YOU'RE READY →
        </button>
      )}
    </div>
  );
}

/* ── LLM Loading ── */
function LLMLoading() {
  return (
    <div className="lay" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <div className="ld" /><div className="ld" /><div className="ld" />
      </div>
      <p style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.1em' }}>GOING DEEPER...</p>
    </div>
  );
}

/* ── LLM Question (Beyond the Map) ── */
function LLMQuestion({ cat, node, depth, onChoose, onHome }) {
  const [disp, setDisp]     = useState('');
  const [showBr, setShowBr] = useState(false);
  const [chosen, setChosen] = useState(null);
  const ran = useRef(false);
  const question = node.question;

  useEffect(() => {
    if (ran.current || !question) return;
    ran.current = true;
    const words = question.split(' ');
    let i = 0;
    const timers = [];
    const next = () => {
      if (i >= words.length) {
        timers.push(setTimeout(() => setShowBr(true), 400));
        return;
      }
      setDisp(p => p + (i > 0 ? ' ' : '') + words[i]);
      i++;
      timers.push(setTimeout(next, 90));
    };
    timers.push(setTimeout(next, 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  const pick = (label, idx) => {
    if (chosen !== null) return;
    setChosen(idx);
    const isStop = idx === node.branches.length - 1 &&
      (label.toLowerCase().includes('sit with') ||
       label.toLowerCase().includes('not sure') ||
       label.toLowerCase().includes('done') ||
       label.toLowerCase().includes('enough') ||
       label.toLowerCase().includes('stop'));
    setTimeout(() => onChoose(label, isStop), 380);
  };

  return (
    <div className="lay" style={{ display: 'flex', flexDirection: 'column', padding: 'max(48px,7vh) 22px 32px', minHeight: '100%', position: 'relative', animation: 'fi .32s ease both' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'max(28px,4vh)', flexShrink: 0 }}>
        <button onClick={onHome} style={{ background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 14, cursor: 'pointer', padding: '4px 2px' }}>✕</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: cat.col }} />
          <span style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.08em' }}>{cat.name.toUpperCase()}</span>
        </div>
        <div style={{ fontSize: 10, color: cat.col, letterSpacing: '.08em' }}>LEVEL {depth}</div>
      </div>
      <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 18, flexShrink: 0 }}>BEYOND THE MAP</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(18px,5vw,23px)', lineHeight: 1.72, color: 'var(--tx)', marginBottom: 'max(26px,4vh)', minHeight: '3em' }}>
          {disp}{disp.length < question.length && <span style={{ opacity: .32 }}>▋</span>}
        </p>
        {showBr && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, animation: 'fi .28s ease both' }}>
            {node.branches.map((b, i) => (
              <button key={i} onClick={() => pick(b, i)}
                style={{ background: 'var(--bg2)', border: `0.5px solid ${chosen === i ? cat.col : 'var(--bo)'}`, borderRadius: 14, padding: '18px 20px', textAlign: 'left', color: chosen !== null && chosen !== i ? 'var(--tx3)' : 'var(--tx)', fontSize: 14, lineHeight: 1.6, minHeight: 56, cursor: chosen !== null ? 'default' : 'pointer', opacity: chosen !== null && chosen !== i ? 0 : 1, transform: chosen !== null && chosen !== i ? 'translateY(4px)' : 'none', transition: `opacity .4s ease ${i * .07}s,transform .4s ease ${i * .07}s,border-color .15s`, animationDelay: `${i * .06}s`, touchAction: 'manipulation' }}
                onTouchStart={e => { if (chosen === null) e.currentTarget.style.background = 'var(--bg3)'; }}
                onTouchEnd={e => { e.currentTarget.style.background = 'var(--bg2)'; }}>
                {b}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Send ── */
function Send({ cat, path, name, nodeHistory, onNameChange, onDone, onHome }) {
  const node     = getNode(cat, path);
  const question = node && node.q ? node.q : '';
  const llmEntries = nodeHistory.filter((_, i) => i >= path.length);
  const [note, setNote] = useState('');

  return (
    <div className="lay" style={{ padding: 'max(52px,8vh) 22px max(52px,8vh)', animation: 'fi .32s ease both' }}>
      <div style={{ animation: 'up .4s ease both', marginBottom: 24 }}>
        <div style={{ width: 22, height: 2, background: cat.col, marginBottom: 18 }} />
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 400, color: 'var(--tx)', marginBottom: 6 }}>You went deep.</h2>
        <p style={{ fontSize: 14, color: 'var(--tx2)', lineHeight: 1.7, marginBottom: 24 }}>Now send it. Your friend will see your path — and answer the final question.</p>
      </div>
      <div style={{ animation: 'up .4s ease .06s both', background: 'var(--bg2)', border: `0.5px solid ${cat.col}55`, borderRadius: 14, padding: '16px', marginBottom: 22 }}>
        <div style={{ fontSize: 10, color: cat.col, letterSpacing: '.08em', marginBottom: 8 }}>THE QUESTION LEFT FOR THEM</div>
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 15, color: 'var(--tx)', lineHeight: 1.65 }}>{question}</p>
        {llmEntries.length > 0 && (
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '0.5px solid var(--bo)' }}>
            <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.08em', marginBottom: 6 }}>YOU ALSO EXPLORED {llmEntries.length} LEVEL{llmEntries.length > 1 ? 'S' : ''} BEYOND THE MAP</div>
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 13, color: 'var(--tx2)', lineHeight: 1.6 }}>{llmEntries[llmEntries.length - 1].q}</p>
          </div>
        )}
      </div>
      <div style={{ animation: 'up .4s ease .12s both', marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 8 }}>YOUR NAME</div>
        <input value={name} onChange={e => onNameChange(e.target.value)} placeholder="So they know who sent this"
          style={{ width: '100%', background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 12, padding: '13px 14px', color: 'var(--tx)', fontSize: 14, outline: 'none', fontFamily: "'DM Sans',sans-serif" }}
          onFocus={e => e.target.style.borderColor = 'var(--boh)'}
          onBlur={e => e.target.style.borderColor = 'var(--bo)'} />
      </div>
      <div style={{ animation: 'up .4s ease .18s both', marginBottom: 22 }}>
        <div style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 8 }}>ADD A NOTE <span style={{ opacity: .4 }}>— OPTIONAL</span></div>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Why you're sending this..." rows={2}
          style={{ width: '100%', background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 12, padding: '13px 14px', color: 'var(--tx)', fontSize: 14, outline: 'none', fontFamily: "'DM Sans',sans-serif", resize: 'none', lineHeight: 1.6 }}
          onFocus={e => e.target.style.borderColor = 'var(--boh)'}
          onBlur={e => e.target.style.borderColor = 'var(--bo)'} />
      </div>
      <div style={{ animation: 'up .4s ease .22s both', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={onDone} style={{ width: '100%', padding: '17px', background: 'var(--tx)', color: 'var(--bg)', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
          {name.trim() ? `Share as ${name.trim()} →` : 'Share anonymously →'}
        </button>
        <button onClick={onHome} style={{ background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 11, padding: '12px', cursor: 'pointer', letterSpacing: '.08em', textAlign: 'center' }}>DISCARD SESSION</button>
      </div>
    </div>
  );
}

/* ── Final ── */
function Final({ cat, path, name, nodeHistory, onHome, onShowTree }) {
  const hist       = getHist(cat, path);
  const llmEntries = nodeHistory.filter((_, i) => i >= path.length);
  const [copied, setCopied] = useState('');

  const copyIt = async type => {
    const enc = encSession(name || 'Someone', cat.id, path);
    const url = `${location.origin}${location.pathname}?s=${enc}`;
    const displayName = name.trim() || 'Someone';
    const finalQ = hist[hist.length - 1].q;
    const parent = hist.length >= 2 ? hist[hist.length - 2] : null;
    const llmSummary = llmEntries.length > 0
      ? `\nThey also went ${llmEntries.length} level${llmEntries.length > 1 ? 's' : ''} beyond the map.\n`
      : '';
    const text = type === 'link' ? url :
      `${displayName} went deep into ${cat.name} and left you this.\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      (parent ? `${parent.q}\n→ "${parent.label}"\n\n` : '') +
      `They're asking you:\n${finalQ}\n` +
      llmSummary +
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
        {llmEntries.length > 0 && (
          <div style={{ borderLeft: `1.5px solid ${cat.col}44`, paddingLeft: 13, marginLeft: 4, marginTop: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--tx3)', marginBottom: 6, letterSpacing: '.08em' }}>+{llmEntries.length} BEYOND THE MAP</div>
            {llmEntries.map((e, i) => (
              <div key={i} style={{ marginBottom: i < llmEntries.length - 1 ? 10 : 0 }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 12, color: 'var(--tx2)', lineHeight: 1.6, marginBottom: e.chosenLabel ? 4 : 0 }}>{e.q}</p>
                {e.chosenLabel && <span style={{ fontSize: 10, color: 'var(--tx3)', background: 'var(--bg3)', border: '0.5px solid var(--bo)', borderRadius: 100, padding: '2px 10px', display: 'inline-block' }}>"{e.chosenLabel}"</span>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ animation: 'up .4s ease .16s both', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={onShowTree} style={{ background: 'none', border: `0.5px solid ${cat.col}44`, borderRadius: 14, padding: '13px 15px', color: cat.col, fontSize: 13, cursor: 'pointer', width: '100%', marginBottom: 4, letterSpacing: '.04em', touchAction: 'manipulation' }}>
          See your path →
        </button>
        <p style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 3 }}>SEND TO YOUR FRIEND</p>
        {[
          { t: 'link', l: 'Copy link', s: 'They open it and see your path + the question' },
          { t: 'text', l: 'Copy as text', s: 'One question + context — paste anywhere' },
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

/* ── Review (received link — answer screen) ── */
function Review({ cat, path, senderName, onHome }) {
  const hist   = getHist(cat, path);
  const last   = hist[hist.length - 1];
  const parent = hist.length >= 2 ? hist[hist.length - 2] : null;
  const [answer, setAnswer] = useState('');
  const [sent, setSent]     = useState(false);
  const sender = senderName || 'Someone';

  const sendBack = async () => {
    const orig = new URLSearchParams(window.location.search).get('s');
    const enc  = btoa(unescape(encodeURIComponent(answer)));
    const url  = `${location.origin}${location.pathname}?s=${orig}&r=${enc}`;
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
        <div style={{ width: 22, height: 2, background: cat.col, marginBottom: 24, animation: 'fi .6s ease .1s both' }} />
        {parent && (
          <div style={{ marginBottom: 20, animation: 'fi .6s ease .12s both' }}>
            <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.08em', marginBottom: 6 }}>TO UNDERSTAND WHY THEY'RE ASKING —</div>
            <p style={{ fontSize: 12, color: 'var(--tx3)', lineHeight: 1.6, fontStyle: 'italic' }}>"{parent.q}"</p>
            <p style={{ fontSize: 11, color: 'var(--tx3)', marginTop: 4, opacity: .6 }}>They answered: "{parent.label}"</p>
          </div>
        )}
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(20px,5.5vw,28px)', lineHeight: 1.75, color: 'var(--tx)', animation: 'up .7s ease .2s both' }}>
          {last.q}
        </p>
      </div>
      {!sent ? (
        <div style={{ animation: 'up .5s ease .3s both' }}>
          <div style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 10 }}>WHAT'S YOUR ANSWER?</div>
          <textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Take your time..." rows={4}
            style={{ width: '100%', background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 12, padding: '14px', color: 'var(--tx)', fontSize: 14, outline: 'none', fontFamily: "'DM Sans',sans-serif", resize: 'none', lineHeight: 1.6, marginBottom: 12 }}
            onFocus={e => e.target.style.borderColor = 'var(--boh)'}
            onBlur={e => e.target.style.borderColor = 'var(--bo)'} />
          {answer.trim() && (
            <button onClick={sendBack} style={{ width: '100%', padding: '17px', background: 'var(--tx)', color: 'var(--bg)', border: 'none', borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 14, touchAction: 'manipulation' }}>
              Send back to {sender} →
            </button>
          )}
          <button onClick={onHome} style={{ background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 11, letterSpacing: '.1em', cursor: 'pointer', padding: '8px 0', width: '100%', textAlign: 'center' }}>
            WANT TO PLAY YOUR OWN ROUND?
          </button>
        </div>
      ) : (
        <div style={{ animation: 'up .5s ease both', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ fontSize: 13, color: 'var(--tx3)', textAlign: 'center', marginBottom: 8 }}>✓ Copied — paste the link back to {sender}</p>
          <button onClick={onHome} style={{ background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 14, padding: '16px', fontSize: 14, color: 'var(--tx)', cursor: 'pointer', touchAction: 'manipulation' }}>
            Play your own round →
          </button>
        </div>
      )}
    </div>
  );
}

/* ── ReplyView (sender sees receiver's answer) ── */
function ReplyView({ cat, path, senderName, replyText, onHome }) {
  const hist   = getHist(cat, path);
  const last   = hist[hist.length - 1];
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

/* ── TreeView (Monument Valley hexagonal tree) ── */
function TreeView({ cat, path, nodeHistory, onBack }) {
  const [assembled, setAssembled] = useState(false);
  const [rotation, setRotation]   = useState(0);

  useEffect(() => {
    setTimeout(() => setAssembled(true), 100);
    let r = 0;
    const rot = setInterval(() => { r += 0.03; setRotation(r); }, 50);
    return () => clearInterval(rot);
  }, []);

  const NODE_R = 18;
  const V_GAP  = 90;
  const H_GAP  = 80;

  // Build levels from fixed tree data + LLM nodeHistory
  const levels = [];
  let cur = cat.root;
  for (let d = 0; d < path.length && d < 3; d++) {
    if (!cur.br) break;
    levels.push({
      depth: d,
      nodes: cur.br.map((b, i) => ({
        label: b.label.length > 16 ? b.label.slice(0, 16) + '…' : b.label,
        chosen: i === path[d],
        isLLM: false,
      })),
    });
    cur = cur.br[path[d]];
  }
  nodeHistory.slice(3).forEach((n, i) => {
    levels.push({
      depth: 3 + i,
      nodes: (n.branches || []).map(b => ({
        label: b.length > 16 ? b.slice(0, 16) + '…' : b,
        chosen: b === n.chosenLabel,
        isLLM: true,
      })),
    });
  });

  const totalLevels = levels.length;
  const maxSiblings = Math.max(...levels.map(l => l.nodes.length), 1);
  const svgW  = Math.max(maxSiblings * H_GAP * 2 + NODE_R * 4, 360);
  const svgH  = (totalLevels + 1.5) * V_GAP + 60;
  const cx    = svgW / 2;
  const glowId = `glow-${cat.id}`;

  const hex = (x, y, r, rounded) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return [x + r * Math.cos(a), y + r * Math.sin(a)];
    });
    if (rounded) {
      return `M ${pts[0][0]} ${pts[0][1]} ` +
        pts.map((p, i) => {
          const next = pts[(i + 1) % 6];
          const mx = (p[0] + next[0]) / 2, my = (p[1] + next[1]) / 2;
          return `Q ${p[0]} ${p[1]} ${mx} ${my}`;
        }).join(' ') + ' Z';
    }
    return `M ${pts.map(p => p.join(',')).join(' L ')} Z`;
  };

  const nodeX = (level, nodeIdx) => {
    const count = level.nodes.length;
    const start = cx - ((count - 1) * H_GAP) / 2;
    return start + nodeIdx * H_GAP;
  };

  const chosenX = li => {
    if (li < 0) return cx;
    const level = levels[li];
    if (!level) return cx;
    const ci = level.nodes.findIndex(n => n.chosen);
    return nodeX(level, ci >= 0 ? ci : 0);
  };

  return (
    <div className="lay" style={{ background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12, padding: '20px 20px 0' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 20, cursor: 'pointer', padding: '4px', touchAction: 'manipulation' }}>←</button>
        <span style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.1em' }}>YOUR PATH</span>
      </div>

      <div style={{ width: '100%', height: '100%', overflow: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 60, paddingBottom: 200 }}>
        <svg width={svgW} height={svgH}
          style={{ transform: `rotate(${rotation * 0.5}deg)`, transition: 'transform 0.05s linear', transformOrigin: 'center center' }}>
          <defs>
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id={`${glowId}-soft`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Root node */}
          <path d={hex(cx, 30, NODE_R, false)} fill={`${cat.col}33`} stroke={cat.col} strokeWidth={1.5}
            filter={`url(#${glowId})`} opacity={assembled ? 1 : 0} style={{ transition: 'opacity .6s ease' }} />
          <text x={cx} y={30} textAnchor="middle" dominantBaseline="middle" fontSize={8} fill="#ede8de"
            fontFamily="DM Sans, sans-serif" style={{ pointerEvents: 'none' }}>
            {cat.name.slice(0, 10)}
          </text>

          {levels.map((level, li) => {
            const y  = 30 + (li + 1) * V_GAP;
            const pX = chosenX(li - 1);
            const pY = li === 0 ? 30 : 30 + li * V_GAP;
            return level.nodes.map((n, ni) => {
              const x     = nodeX(level, ni);
              const delay = (li * 3 + ni) * 120;
              return (
                <g key={`${li}-${ni}`} opacity={assembled ? 1 : 0} style={{ transition: `opacity .4s ease ${delay}ms` }}>
                  <line x1={pX} y1={pY + NODE_R} x2={x} y2={y - NODE_R}
                    stroke={n.chosen ? cat.col : `${cat.col}22`}
                    strokeWidth={n.chosen ? 1.5 : 0.5}
                    filter={n.chosen ? `url(#${glowId}-soft)` : undefined} />
                  <path d={hex(x, y, NODE_R, n.isLLM)}
                    fill={n.chosen ? `${cat.col}33` : 'rgba(255,255,255,0.02)'}
                    stroke={n.chosen ? cat.col : `${cat.col}22`}
                    strokeWidth={n.chosen ? 1.5 : 0.5}
                    filter={n.chosen ? `url(#${glowId})` : undefined} />
                  {n.chosen && (
                    <path d={hex(x, y, NODE_R + 6, n.isLLM)} fill="none"
                      stroke={cat.col} strokeWidth={0.5} opacity={0.3}
                      style={{ animation: 'breathe 2s ease infinite' }} />
                  )}
                  <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={7}
                    fill={n.chosen ? '#ede8de' : `${cat.col}55`} fontFamily="DM Sans, sans-serif"
                    style={{ pointerEvents: 'none' }}>
                    {n.label}
                  </text>
                </g>
              );
            });
          })}
        </svg>
      </div>

      {/* Stats overlay */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, #000 40%)', padding: '40px 20px 32px', zIndex: 10 }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid var(--bo)', borderRadius: 16, padding: '16px', backdropFilter: 'blur(10px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'DEPTH',  value: `${path.length + Math.max(0, nodeHistory.length - path.length)} levels` },
              { label: 'THEME',  value: cat.name },
              { label: 'BEYOND', value: nodeHistory.length > path.length ? `${nodeHistory.length - path.length} LLM` : '—' },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 9, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: 'var(--tx)', fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
