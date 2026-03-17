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
  if (!res.ok) {
    const err = await res.text();
    throw new Error('Anthropic error ' + res.status + ': ' + err);
  }
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
      if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error('ANTHROPIC_API_KEY environment variable is not set');
      }
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
