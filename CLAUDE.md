# Deep Dive — Full PRD for Claude Code
# Covers: bug fixes + Phase 2 LLM + Monument Valley tree visualisation

---

## CURRENT STATE (what exists right now)

```
deepdive/
├── app.jsx          ← 458 lines, needs significant changes
├── data.js          ← 8 categories, 4 levels deep fixed tree
├── style.css        ← needs progfill keyframe, minor additions
├── index.html       ← fine as-is
└── particles.js     ← untouched
```

---

## TARGET STATE (what you're building toward)

```
deepdive/
├── frontend/        ← move all existing files here
│   ├── index.html
│   ├── app.jsx
│   ├── data.js
│   ├── style.css
│   └── particles.js
├── server/
│   └── index.js     ← new, ~40 lines, zero npm dependencies
├── .gitignore
└── README.md
```

---

## PART 1 — BUG FIXES (do these first, they are blocking)

---

### BUG 1 — "undefined" appearing on Silence screen

**Root cause:**
Line 299: `const node = getNode(cat, path)` returns the leaf node `{label, q}`.
Line 322: `disp !== node.q` — this comparison never resolves cleanly due to
React re-renders causing the node reference to shift, appending "undefined" to disp.

**Fix — replace the entire Silence function (lines 295–332) with:**

```jsx
function Silence({ cat, path, onDone }) {
  const [disp, setDisp] = useState('');
  const [ready, setReady] = useState(false);
  const ran = useRef(false);

  const node = getNode(cat, path);
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
    <div className="lay" style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 28px', background: '#000', textAlign: 'center'
    }}>
      <div style={{ width: 1, height: 52, background: `${cat.col}33`, marginBottom: 44 }} />
      <p style={{
        fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
        fontSize: 'clamp(19px,5.2vw,27px)', lineHeight: 1.85,
        color: 'var(--tx)', maxWidth: 340, marginBottom: 52, minHeight: '5em'
      }}>
        {disp}
        {disp.length < question.length && <span style={{ opacity: .25 }}>▋</span>}
      </p>
      <div style={{ width: 40, height: 1, background: `${cat.col}33`, marginBottom: ready ? 36 : 0, transition: 'margin .6s' }} />
      {ready && (
        <button onClick={onDone} style={{
          background: 'none', border: 'none', color: 'var(--tx2)',
          fontSize: 12, letterSpacing: '.1em', cursor: 'pointer',
          padding: '20px', touchAction: 'manipulation'
        }}>
          WHEN YOU'RE READY →
        </button>
      )}
    </div>
  );
}
```

**What changed:**
- `ran` ref prevents double-execution in React Strict Mode
- `disp.length < question.length` replaces `disp !== node.q` — no string comparison
- Progress bar div removed entirely
- Wait reduced to 2 seconds
- `ctaOp` state removed (was causing extra renders)

---

### BUG 2 — Sound calls on a removed audio system

`audio.js` is no longer loaded in `index.html` but `app.jsx` still calls
`Aud.init()`, `Aud.depth()`, `Aud.silence()`, `Aud.restore()`, `Aud.mute()`.
These throw errors in the console and can cause unexpected behaviour.

**Fix — in app.jsx, remove every reference to Aud:**

Remove from line 2 (comment):
```
Globals expected: CATS, SUBS (data.js), Aud (audio.js), startParticles (particles.js)
```
Replace with:
```
Globals expected: CATS, SUBS (data.js), startParticles (particles.js)
```

Remove these calls throughout app.jsx:
- `Aud.init()` — appears in startCat and onStart
- `Aud.depth(path.length)` — in useEffect
- `Aud.silence(.8)` — in chooseBranch
- `Aud.restore()` — in Silence onDone
- `Aud.mute()` — in toggleMute
- `const [muted, setMuted] = useState(false)` — remove this state
- `const toggleMute = () => setMuted(Aud.mute())` — remove
- The entire mute button JSX block (lines 89–93)

---

### BUG 3 — `dep` declared after it is used

In App(), `const dep = path.length` is on line 81 but the `useEffect` on line 59
has `Aud.depth(path.length)` which can be removed (Bug 2). However `dep` is also
used in the JSX filter on line 86 which renders before line 81 is reached in
execution order in some React render cycles.

**Fix — move `const dep = path.length` to immediately after the useState
declarations, before any useEffect:**

```js
function App() {
  const [screen, setScreen] = useState('splash');
  const [cat, setCat]       = useState(null);
  const [path, setPath]     = useState([]);
  const [name, setName]     = useState('');
  const [black, setBlack]   = useState(false);
  const pRef = useRef(null);

  const dep = path.length;   // ← HERE, before any useEffect

  useEffect(() => {          // ← loader + URL check
    ...
  }, []);

  useEffect(() => {
    if (pRef.current) pRef.current.setDepth(path.length);
  }, [path]);
  ...
```

---

### BUG 4 — CatMap uses hold gesture (broken on mobile)

The current CatMap uses a 650ms hold timer to reveal categories. On mobile,
this conflicts with native long-press gestures (text selection, context menus).

**Fix — replace entire CatMap component with CardGrid:**

```jsx
function CardGrid({ onSelect, onBack }) {
  return (
    <div className="lay" style={{ padding: 'max(56px,8vh) 16px max(32px,5vh)', overflowY: 'auto' }}>
      <button onClick={onBack} style={{
        position: 'fixed', top: 20, left: 20, zIndex: 10,
        background: 'none', border: 'none', color: 'var(--tx3)',
        fontSize: 20, cursor: 'pointer', padding: '8px'
      }}>←</button>
      <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.12em', marginBottom: 22, paddingLeft: 4 }}>
        CHOOSE A THEME
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {CATS.map((c, i) => (
          <button key={c.id} onClick={() => onSelect(c)}
            style={{
              background: 'var(--bg2)', border: '0.5px solid var(--bo)',
              borderRadius: 16, padding: '20px 16px', textAlign: 'left',
              cursor: 'pointer', minHeight: 88,
              animation: `up .35s ease ${i * 40}ms both`,
              touchAction: 'manipulation', transition: 'border-color .15s, transform .1s'
            }}
            onTouchStart={e => {
              e.currentTarget.style.transform = 'scale(0.97)';
              e.currentTarget.style.borderColor = c.col;
            }}
            onTouchEnd={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.borderColor = 'var(--bo)';
            }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.col, marginBottom: 12 }} />
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, color: 'var(--tx)', fontWeight: 400, marginBottom: 4 }}>
              {c.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--tx3)', fontStyle: 'italic', lineHeight: 1.4 }}>
              {c.sub}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
```

Update App render:
```jsx
{screen === 'categories' && <CardGrid onSelect={startCat} onBack={goHome} />}
```

---

### BUG 5 — Question screen cursor never hides

Line 275: `{disp}{disp !== node.q && <span style={{ opacity: .32 }}>▋</span>}`

Same string comparison bug as Silence. Fix:

```jsx
{disp}
{disp.length < node.q.length && <span style={{ opacity: .32 }}>▋</span>}
```

---

### BUG 6 — Review component is broken (line 444 has orphaned JSX)

Lines 444–455 contain orphaned JSX from a partial edit. The Review component
is incomplete. Replace everything from line 443 to 455 with a clean Review:

```jsx
function Review({ cat, path, senderName, onHome }) {
  const hist      = getHist(cat, path);
  const last      = hist[hist.length - 1];
  const parent    = hist.length >= 2 ? hist[hist.length - 2] : null;
  const [answer, setAnswer] = useState('');
  const [sent, setSent]     = useState(false);
  const sender = senderName || 'Someone';

  const sendBack = async () => {
    const orig = new URLSearchParams(window.location.search).get('s');
    const enc  = btoa(unescape(encodeURIComponent(answer)));
    const url  = `${location.origin}${location.pathname}?s=${orig}&r=${enc}`;
    try { await navigator.clipboard.writeText(url); }
    catch {
      const ta = Object.assign(document.createElement('textarea'), { value: url, style: 'position:fixed;opacity:0' });
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    }
    setSent(true);
  };

  return (
    <div className="lay" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 'max(64px,10vh) 24px max(48px,8vh)' }}>
      <div>
        <p style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.12em', marginBottom: 18, animation: 'fi .6s ease both' }}>
          {sender.toUpperCase()} LEFT YOU THIS
        </p>
        <div style={{ width: 22, height: 2, background: cat.col, marginBottom: 24, animation: 'fi .6s ease .1s both' }} />
        {parent && (
          <div style={{ marginBottom: 20, animation: 'fi .6s ease .12s both' }}>
            <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.08em', marginBottom: 6 }}>
              TO UNDERSTAND WHY THEY'RE ASKING —
            </div>
            <p style={{ fontSize: 12, color: 'var(--tx3)', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{parent.q}"
            </p>
            <p style={{ fontSize: 11, color: 'var(--tx3)', marginTop: 4, opacity: .6 }}>
              They answered: "{parent.label}"
            </p>
          </div>
        )}
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 'clamp(20px,5.5vw,28px)', lineHeight: 1.75, color: 'var(--tx)', animation: 'up .7s ease .2s both' }}>
          {last.q}
        </p>
      </div>

      {!sent ? (
        <div style={{ animation: 'up .5s ease .3s both' }}>
          <div style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.1em', marginBottom: 10 }}>
            WHAT'S YOUR ANSWER?
          </div>
          <textarea
            value={answer} onChange={e => setAnswer(e.target.value)}
            placeholder="Take your time..."
            rows={4}
            style={{ width: '100%', background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 12, padding: '14px', color: 'var(--tx)', fontSize: 14, outline: 'none', fontFamily: "'DM Sans',sans-serif", resize: 'none', lineHeight: 1.6, marginBottom: 12 }}
            onFocus={e => e.target.style.borderColor = 'var(--boh)'}
            onBlur={e => e.target.style.borderColor = 'var(--bo)'}
          />
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
          <p style={{ fontSize: 13, color: 'var(--tx3)', textAlign: 'center', marginBottom: 8 }}>
            ✓ Copied — paste the link back to {sender}
          </p>
          <button onClick={onHome} style={{ background: 'var(--bg2)', border: '0.5px solid var(--bo)', borderRadius: 14, padding: '16px', fontSize: 14, color: 'var(--tx)', cursor: 'pointer', touchAction: 'manipulation' }}>
            Play your own round →
          </button>
        </div>
      )}
    </div>
  );
}
```

Also update App render to pass onHome:
```jsx
{screen === 'review' && cat && <Review cat={cat} path={path} senderName={name} onHome={goHome} />}
```

---

## PART 2 — FOLDER RESTRUCTURE

Move all files into `frontend/` subfolder.
Create `server/` subfolder.

After restructure:
```
deepdive/
├── frontend/
│   ├── index.html
│   ├── app.jsx
│   ├── data.js
│   ├── style.css
│   └── particles.js
├── server/
│   └── index.js
├── .gitignore
└── README.md
```

Update Render Static Site publish directory from `.` to `frontend`.

---

## PART 3 — SERVER (API key protection)

Create `server/index.js` — no npm packages, no package.json needed.
Node 18+ has fetch built in. Uses only the built-in `http` module.

```js
const http = require('http');

const ALLOWED_ORIGIN = process.env.FRONTEND_URL || '*';
const PORT = process.env.PORT || 3001;

async function callAnthropic(system, user) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error('Anthropic error ' + res.status);
  const data = await res.json();
  return data.content[0].text.trim();
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  if (req.method !== 'POST' || req.url !== '/ask') {
    res.writeHead(404); res.end(); return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      const { system, user } = JSON.parse(body);
      const text = await callAnthropic(system, user);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ text }));
    } catch (e) {
      console.error(e.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
  });
});

server.listen(PORT, () => console.log('Deep Dive API on port ' + PORT));
```

### Render Web Service setup (manual, in Render dashboard):
- Root directory: `server`
- Runtime: Node 18
- Build command: (leave empty)
- Start command: `node index.js`
- Environment variables:
  - `ANTHROPIC_API_KEY` = your key (paste directly in Render dashboard)
  - `FRONTEND_URL` = https://your-frontend.onrender.com
  - `PORT` = 3001

---

## PART 4 — LLM QUESTION ENGINE

### Overview

First 3 questions per theme come from `data.js` (anchor questions — fixed, quality-controlled).
From level 4 onwards, the server generates the next question AND 3 branch options
tailored to this person's specific path.

The LLM returns structured JSON:
```json
{
  "question": "You keep choosing distance — what specifically are you protecting by staying at arm's length?",
  "branches": [
    "Something I've already lost once",
    "Something I'm not sure I deserve",
    "I'm not sure I'm protecting anything anymore"
  ]
}
```

### API helper — add to frontend/app.jsx after utility functions

```js
const API_URL = 'https://YOUR-SERVICE.onrender.com'; // update after Render deploy

async function callClaude(systemPrompt, userPrompt) {
  try {
    const res = await fetch(API_URL + '/ask', {
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

Generate the next question and 3 branches that go one precise level deeper
into this specific person's territory. Return only the JSON.`;

  const raw = await callClaude(system, user);
  if (!raw) return null;
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}
```

### State changes in App()

Add these after existing useState declarations, BEFORE any useEffect:

```js
const [nodeHistory, setNodeHistory]   = useState([]); // full path as {q, chosenLabel, branches}
const [llmNode, setLlmNode]           = useState(null); // current LLM-generated node
const [llmLoading, setLlmLoading]     = useState(false);
const [totalDepth, setTotalDepth]     = useState(0);
```

### Modified chooseBranch

Replace existing chooseBranch with:

```js
const chooseBranch = idx => {
  const np = [...path, idx];
  const node = getNode(cat, np);
  const chosenLabel = node.label || '';

  // Record this choice in history
  const currentQ = getNode(cat, path).q;
  const newHistory = [...nodeHistory, { q: currentQ, chosenLabel, branches: node.br ? node.br.map(b => b.label) : [] }];

  fade(() => {
    setPath(np);
    setNodeHistory(newHistory);
    setTotalDepth(d => d + 1);

    if (!node.br || !node.br.length) {
      // At a leaf — but if depth < 3, go to silence as before
      // If depth >= 3, generate LLM continuation instead
      if (np.length < 3) {
        setScreen('silence');
      } else {
        // Generate LLM question
        setLlmLoading(true);
        setScreen('llm_loading');
        generateNextNode(cat, newHistory).then(result => {
          setLlmLoading(false);
          if (result) {
            setLlmNode(result);
            setScreen('llm_question');
          } else {
            // LLM failed — fall through to silence
            setScreen('silence');
          }
        });
      }
    }
  });
};
```

### chooseLLMBranch — new function

```js
const chooseLLMBranch = (branchLabel, isStop) => {
  if (isStop) {
    // User chose to stop — go to silence then send
    setScreen('silence');
    return;
  }

  const newHistory = [
    ...nodeHistory,
    { q: llmNode.question, chosenLabel: branchLabel, branches: llmNode.branches }
  ];
  setNodeHistory(newHistory);
  setTotalDepth(d => d + 1);
  setLlmLoading(true);
  setLlmNode(null);
  setScreen('llm_loading');

  generateNextNode(cat, newHistory).then(result => {
    setLlmLoading(false);
    if (result) {
      setLlmNode(result);
      setScreen('llm_question');
    } else {
      setScreen('silence');
    }
  });
};
```

### New screens in App render

Add these alongside existing screen conditionals:

```jsx
{screen === 'llm_loading'  && <LLMLoading />}
{screen === 'llm_question' && cat && llmNode && (
  <LLMQuestion
    cat={cat}
    node={llmNode}
    depth={totalDepth}
    onChoose={chooseLLMBranch}
    onHome={goHome}
  />
)}
```

Also update silence and send to pass nodeHistory:
```jsx
{screen === 'silence' && cat && (
  <Silence cat={cat} path={path} onDone={() => fade(() => setScreen('send'))} />
)}
{screen === 'send' && cat && (
  <Send cat={cat} path={path} name={name} nodeHistory={nodeHistory}
    onNameChange={setName} onDone={() => fade(() => setScreen('final'))} onHome={goHome} />
)}
{screen === 'final' && cat && (
  <Final cat={cat} path={path} name={name} nodeHistory={nodeHistory}
    onHome={goHome} onShowTree={() => fade(() => setScreen('tree'))} />
)}
```

### New LLMLoading component

```jsx
function LLMLoading() {
  return (
    <div className="lay" style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#000', gap: 16
    }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <div className="ld" /><div className="ld" /><div className="ld" />
      </div>
      <p style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.1em' }}>
        GOING DEEPER...
      </p>
    </div>
  );
}
```

### New LLMQuestion component

```jsx
function LLMQuestion({ cat, node, depth, onChoose, onHome }) {
  const [disp, setDisp]   = useState('');
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
       label.toLowerCase().includes('done'));
    setTimeout(() => onChoose(label, isStop), 380);
  };

  return (
    <div className="lay" style={{
      display: 'flex', flexDirection: 'column',
      padding: 'max(48px,7vh) 22px 32px', minHeight: '100%', position: 'relative'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'max(28px,4vh)', flexShrink: 0 }}>
        <button onClick={onHome} style={{ background: 'none', border: 'none', color: 'var(--tx3)', fontSize: 14, cursor: 'pointer', padding: '4px 2px' }}>✕</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: cat.col }} />
          <span style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.08em' }}>{cat.name.toUpperCase()}</span>
        </div>
        <div style={{ fontSize: 10, color: cat.col, letterSpacing: '.08em' }}>LEVEL {depth}</div>
      </div>
      <div style={{ fontSize: 10, color: 'var(--tx3)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 18, flexShrink: 0 }}>
        BEYOND THE MAP
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{
          fontFamily: "'Playfair Display',serif", fontStyle: 'italic',
          fontSize: 'clamp(18px,5vw,23px)', lineHeight: 1.72, color: 'var(--tx)',
          marginBottom: 'max(26px,4vh)', minHeight: '3em'
        }}>
          {disp}
          {disp.length < question.length && <span style={{ opacity: .32 }}>▋</span>}
        </p>
        {showBr && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {node.branches.map((b, i) => (
              <button key={i} onClick={() => pick(b, i)} className="up"
                style={{
                  background: 'var(--bg2)',
                  border: `0.5px solid ${chosen === i ? cat.col : 'var(--bo)'}`,
                  borderRadius: 14, padding: '18px 20px', textAlign: 'left',
                  color: chosen !== null && chosen !== i ? 'var(--tx3)' : 'var(--tx)',
                  fontSize: 14, lineHeight: 1.6, minHeight: 56,
                  cursor: chosen !== null ? 'default' : 'pointer',
                  opacity: chosen !== null && chosen !== i ? 0 : 1,
                  transform: chosen !== null && chosen !== i ? 'translateY(4px)' : 'none',
                  transition: `opacity .4s ease ${i * .07}s, transform .4s ease ${i * .07}s, border-color .15s`,
                  animationDelay: `${i * .06}s`,
                  touchAction: 'manipulation'
                }}
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
```

---

## PART 5 — MONUMENT VALLEY TREE VISUALISATION

### Aesthetic

- Dark background, glowing edges, hexagonal nodes
- Category colour fills the glow — each theme has its own light
- Chosen path: bright, glowing, animated pulse
- Unchosen branches: dim, barely visible, ghost-like
- LLM-generated nodes: softer geometry (more rounded), subtle shimmer
- The tree assembles itself when revealed — nodes bloom into existence
- Slow rotation on the full reveal screen

### Tree runs in background during session

The tree SVG renders at 15% opacity behind the question screen during play.
As depth increases, opacity increases: `opacity = 0.08 + depth * 0.04`.
By level 8 it is at ~40% opacity — you're inside the structure.

### New TreeView component

```jsx
function TreeView({ cat, path, nodeHistory, onBack }) {
  const [assembled, setAssembled] = useState(false);
  const [rotation, setRotation]   = useState(0);

  useEffect(() => {
    // Assembly animation — bloom each node in sequence
    setTimeout(() => setAssembled(true), 100);
    // Slow rotation after assembly
    let r = 0;
    const rot = setInterval(() => {
      r += 0.03;
      setRotation(r);
    }, 50);
    return () => clearInterval(rot);
  }, []);

  // Build node positions from nodeHistory
  // Each level has nodes spread horizontally
  // Chosen path runs down the center, unchosen branches fan out
  const NODE_R  = 18;   // hexagon circumradius
  const V_GAP   = 90;   // vertical spacing between levels
  const H_GAP   = 80;   // horizontal spacing between siblings

  // Reconstruct full tree from data.js anchor + nodeHistory
  const levels = [];

  // Fixed anchor levels from data.js
  let cur = cat.root;
  for (let d = 0; d < path.length && d < 3; d++) {
    if (!cur.br) break;
    levels.push({
      depth: d,
      nodes: cur.br.map((b, i) => ({
        label: b.label.length > 16 ? b.label.slice(0,16)+'…' : b.label,
        chosen: i === path[d],
        isLLM: false,
      })),
    });
    cur = cur.br[path[d]];
  }

  // LLM levels from nodeHistory (depth >= 3)
  nodeHistory.slice(3).forEach((n, i) => {
    levels.push({
      depth: 3 + i,
      nodes: n.branches.map(b => ({
        label: b.length > 16 ? b.slice(0,16)+'…' : b,
        chosen: b === n.chosenLabel,
        isLLM: true,
      })),
    });
  });

  const totalLevels = levels.length;
  const maxSiblings = Math.max(...levels.map(l => l.nodes.length), 1);
  const svgW = Math.max(maxSiblings * H_GAP * 2 + NODE_R * 4, 360);
  const svgH = (totalLevels + 1.5) * V_GAP + 60;
  const cx   = svgW / 2;

  // Hexagon path generator
  const hex = (x, y, r, rounded) => {
    const pts = Array.from({length: 6}, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return [x + r * Math.cos(a), y + r * Math.sin(a)];
    });
    if (rounded) {
      // Smooth hexagon for LLM nodes
      return `M ${pts[0][0]} ${pts[0][1]} ` +
        pts.map((p,i) => {
          const next = pts[(i+1)%6];
          const mx = (p[0]+next[0])/2, my = (p[1]+next[1])/2;
          return `Q ${p[0]} ${p[1]} ${mx} ${my}`;
        }).join(' ') + ' Z';
    }
    return `M ${pts.map(p => p.join(',')).join(' L ')} Z`;
  };

  // Calculate x position for each node in a level
  const nodeX = (level, nodeIdx) => {
    const count = level.nodes.length;
    const start = cx - ((count - 1) * H_GAP) / 2;
    return start + nodeIdx * H_GAP;
  };

  // Find chosen node x at a given level index
  const chosenX = (li) => {
    if (li < 0) return cx;
    const level = levels[li];
    if (!level) return cx;
    const ci = level.nodes.findIndex(n => n.chosen);
    return nodeX(level, ci >= 0 ? ci : 0);
  };

  const glowId = `glow-${cat.id}`;

  return (
    <div className="lay" style={{ background: '#000', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 12, padding: '20px 20px 0' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none',
          color: 'var(--tx3)', fontSize: 20, cursor: 'pointer', padding: '4px',
          touchAction: 'manipulation' }}>←</button>
        <span style={{ fontSize: 11, color: 'var(--tx3)', letterSpacing: '.1em' }}>
          YOUR PATH
        </span>
      </div>

      {/* SVG Tree */}
      <div style={{ width: '100%', height: '100%', overflow: 'auto',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: 60, paddingBottom: 200 }}>
        <svg
          width={svgW} height={svgH}
          style={{
            transform: `rotate(${rotation * 0.5}deg)`,
            transition: 'transform 0.05s linear',
            transformOrigin: 'center center'
          }}
        >
          <defs>
            <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`${glowId}-soft`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Root node */}
          <path
            d={hex(cx, 30, NODE_R, false)}
            fill={`${cat.col}33`}
            stroke={cat.col}
            strokeWidth={1.5}
            filter={`url(#${glowId})`}
            opacity={assembled ? 1 : 0}
            style={{ transition: 'opacity .6s ease' }}
          />

          {levels.map((level, li) => {
            const y = 30 + (li + 1) * V_GAP;
            const pX = chosenX(li - 1);
            const pY = li === 0 ? 30 : 30 + li * V_GAP;

            return level.nodes.map((node, ni) => {
              const x = nodeX(level, ni);
              const delay = (li * 3 + ni) * 120;

              return (
                <g key={`${li}-${ni}`}
                  opacity={assembled ? 1 : 0}
                  style={{ transition: `opacity .4s ease ${delay}ms` }}>

                  {/* Edge from parent */}
                  <line
                    x1={pX} y1={pY + NODE_R}
                    x2={x}  y2={y - NODE_R}
                    stroke={node.chosen ? cat.col : `${cat.col}22`}
                    strokeWidth={node.chosen ? 1.5 : 0.5}
                    filter={node.chosen ? `url(#${glowId}-soft)` : undefined}
                  />

                  {/* Node hexagon */}
                  <path
                    d={hex(x, y, NODE_R, node.isLLM)}
                    fill={node.chosen ? `${cat.col}33` : 'rgba(255,255,255,0.02)'}
                    stroke={node.chosen ? cat.col : `${cat.col}22`}
                    strokeWidth={node.chosen ? 1.5 : 0.5}
                    filter={node.chosen ? `url(#${glowId})` : undefined}
                  />

                  {/* Pulse ring on chosen nodes */}
                  {node.chosen && (
                    <path
                      d={hex(x, y, NODE_R + 6, node.isLLM)}
                      fill="none"
                      stroke={cat.col}
                      strokeWidth={0.5}
                      opacity={0.3}
                      style={{ animation: 'breathe 2s ease infinite' }}
                    />
                  )}

                  {/* Label */}
                  <text
                    x={x} y={y}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize={8}
                    fill={node.chosen ? '#ede8de' : `${cat.col}55`}
                    fontFamily="DM Sans, sans-serif"
                    style={{ pointerEvents: 'none' }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            });
          })}
        </svg>
      </div>

      {/* Stats overlay at bottom */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, #000 40%)',
        padding: '40px 20px 32px', zIndex: 10
      }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid var(--bo)', borderRadius: 16, padding: '16px', backdropFilter: 'blur(10px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'DEPTH',  value: `${path.length + Math.max(0, nodeHistory.length - 3)} levels` },
              { label: 'THEME',  value: cat.name },
              { label: 'BEYOND', value: nodeHistory.length > 3 ? `${nodeHistory.length - 3} LLM` : '—' },
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
```

### Ambient tree during session

Add this inside the Question component render, before the scanbar:

```jsx
{/* Ambient tree background */}
<div style={{
  position: 'fixed', inset: 0, zIndex: 0,
  opacity: Math.min(0.08 + depth * 0.04, 0.35),
  transition: 'opacity 1s ease',
  pointerEvents: 'none',
  overflow: 'hidden'
}}>
  <AmbientTree cat={cat} path={path} depth={depth} />
</div>
```

Add this lightweight ambient tree component — simplified version, just chosen path:

```jsx
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
    <svg width="100%" height="100%" viewBox={`0 0 ${svgW} ${svgH}`}
      style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="xMidYMid meet">
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
              stroke={cat.col} strokeWidth={1} opacity={0.4}
              filter="url(#ambglow)" />
          )}
          <circle cx={p.x} cy={p.y} r={4} fill={cat.col} opacity={0.6}
            filter="url(#ambglow)" />
        </g>
      ))}
    </svg>
  );
}
```

### Add "See your path" button to Final screen

In the Final component, add before the share buttons:

```jsx
<button onClick={onShowTree} style={{
  background: 'none', border: `0.5px solid ${cat.col}44`,
  borderRadius: 14, padding: '13px 15px',
  color: cat.col, fontSize: 13,
  cursor: 'pointer', width: '100%', marginBottom: 12,
  letterSpacing: '.04em', touchAction: 'manipulation'
}}>
  See your path →
</button>
```

Add to App render:

```jsx
{screen === 'tree' && cat && (
  <TreeView
    cat={cat}
    path={path}
    nodeHistory={nodeHistory}
    onBack={() => fade(() => setScreen('final'))}
  />
)}
```

---

## PART 6 — style.css ADDITIONS

Add these keyframes and rules to style.css:

```css
/* Progress fill — used by Silence in future */
@keyframes progfill { from { width: 0 } to { width: 100% } }

/* Tree node shimmer for LLM nodes */
@keyframes shimmer {
  0%, 100% { opacity: 0.6 }
  50%      { opacity: 1.0 }
}

/* Grain texture over everything */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}
```

---

## PART 7 — .gitignore

Create at project root:

```
.env
.env.local
node_modules
```

---

## IMPLEMENTATION ORDER

Do these in order. Test after each step before moving to the next.

1. **Bug fixes** (Part 1) — fix Silence undefined, remove Aud calls, fix dep placement, replace CatMap with CardGrid, fix Question cursor, fix Review
2. **Folder restructure** (Part 2) — move files to frontend/
3. **Server** (Part 3) — create server/index.js, test locally with `node index.js`
4. **API helper + generateNextNode** (Part 4, first section) — add to app.jsx, test that callClaude returns text
5. **LLM question engine** (Part 4, state + chooseBranch) — wire up the new flow
6. **LLMLoading + LLMQuestion components** (Part 4)
7. **TreeView + AmbientTree** (Part 5) — start with static tree, add animation after
8. **style.css additions** (Part 6)

---

## TESTING CHECKLIST

**Bug fixes:**
- [ ] Silence screen shows question without "undefined"
- [ ] No console errors about Aud
- [ ] Category picker shows card grid, single tap selects
- [ ] Question cursor hides when typing completes
- [ ] Review screen renders correctly, sendBack works

**LLM engine:**
- [ ] Fixed questions show for levels 1–3
- [ ] After level 3, LLMLoading screen appears
- [ ] LLM question types in correctly
- [ ] 3 LLM branches appear after typing
- [ ] Choosing a branch triggers another LLM question
- [ ] LLM failure falls through to Silence gracefully

**Tree:**
- [ ] Ambient tree visible (faint) during question screen from depth 2+
- [ ] Full tree shows after session ends
- [ ] Chosen path is bright, unchosen is dim
- [ ] LLM nodes have rounded geometry
- [ ] Glow filter visible on chosen path
- [ ] Stats card shows correct depth

**Sharing:**
- [ ] Copy link works
- [ ] Copy text includes LLM questions
- [ ] Receiver sees context (parent question) before final question
- [ ] API key is not visible in any frontend file