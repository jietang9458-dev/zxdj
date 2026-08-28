const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const oldGet = `app.get('/api/pages/:id', (req, res) => {
  const row = db.prepare('SELECT data FROM pages WHERE id = ?').get(req.params.id) as any;
  if (row) {
    res.json(JSON.parse(row.data));
  } else {
    res.json(null);
  }
});`;

const newGet = `app.get('/api/pages/:id', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const row = db.prepare('SELECT data FROM pages WHERE id = ?').get(req.params.id) as any;
  if (row) {
    res.json(JSON.parse(row.data));
  } else {
    res.json(null);
  }
});`;

content = content.replace(oldGet, newGet);

// Also do it for all GET routes just in case
const oldGetAll = `app.get('/api/:table', (req, res) => {
  const { table } = req.params;`;

const newGetAll = `app.get('/api/:table', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  const { table } = req.params;`;

content = content.replace(oldGetAll, newGetAll);

fs.writeFileSync('server.ts', content);
