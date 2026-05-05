import express from "express";
import { createServer as createViteServer } from "vite";
import Database from 'better-sqlite3';
import cors from 'cors';
import path from 'path';
import multer from 'multer';
import fs from 'fs';

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Init sqlite db
const db = new Database('database.sqlite');
db.pragma('journal_mode = WAL');

// Simple initialization of tables
db.exec(`
  CREATE TABLE IF NOT EXISTS pages (
    id TEXT PRIMARY KEY,
    data TEXT
  );
  
  CREATE TABLE IF NOT EXISTS dramas (
    id TEXT PRIMARY KEY,
    data TEXT
  );

  CREATE TABLE IF NOT EXISTS bases (
    id TEXT PRIMARY KEY,
    data TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    data TEXT
  );
  
  CREATE TABLE IF NOT EXISTS liveStreams (
    id TEXT PRIMARY KEY,
    data TEXT
  );
  CREATE TABLE IF NOT EXISTS feedbacks (
    id TEXT PRIMARY KEY,
    data TEXT
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    data TEXT
  );

  CREATE TABLE IF NOT EXISTS course_registrations (
    id TEXT PRIMARY KEY,
    data TEXT
  );
`);

// API Routes

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }
  // Return the path relative to public
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Serve uploads statically to ensure they reflect immediately in both dev/prod
app.use('/uploads', express.static(uploadDir));

// Pages
app.get('/api/pages/:id', (req, res) => {
  const row = db.prepare('SELECT data FROM pages WHERE id = ?').get(req.params.id) as any;
  if (row) {
    res.json(JSON.parse(row.data));
  } else {
    res.json(null);
  }
});

app.post('/api/pages/:id', (req, res) => {
  const id = req.params.id;
  const data = JSON.stringify(req.body);
  db.prepare('INSERT INTO pages (id, data) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data').run(id, data);
  res.json({ success: true });
});

// Generic Collection Handlers
const collections = ['dramas', 'bases', 'products', 'liveStreams', 'feedbacks', 'course_registrations', 'users'];

collections.forEach(col => {
  app.get(`/api/${col}`, (req, res) => {
    const rows = db.prepare(`SELECT * FROM ${col}`).all() as any[];
    res.json(rows.map(row => ({ id: row.id, ...JSON.parse(row.data) })));
  });

  app.post(`/api/${col}`, (req, res) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(7);
    const data = JSON.stringify(req.body);
    db.prepare(`INSERT INTO ${col} (id, data) VALUES (?, ?)`).run(id, data);
    res.json({ id });
  });

  app.put(`/api/${col}/:id`, (req, res) => {
    const id = req.params.id;
    const data = JSON.stringify(req.body);
    db.prepare(`UPDATE ${col} SET data = ? WHERE id = ?`).run(data, id);
    res.json({ success: true });
  });

  app.delete(`/api/${col}/:id`, (req, res) => {
    const id = req.params.id;
    db.prepare(`DELETE FROM ${col} WHERE id = ?`).run(id);
    res.json({ success: true });
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
