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

  CREATE TABLE IF NOT EXISTS visit_bookings (
    id TEXT PRIMARY KEY,
    data TEXT
  );
  CREATE TABLE IF NOT EXISTS course_registrations (
    id TEXT PRIMARY KEY,
    data TEXT
  );
  CREATE TABLE IF NOT EXISTS community_posts (
    id TEXT PRIMARY KEY,
    data TEXT
  );
  CREATE TABLE IF NOT EXISTS interactions (
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

// Serve uploads statically with complete Range request & video streaming headers
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type, Accept, X-Requested-With');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges');
  res.setHeader('Accept-Ranges', 'bytes');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
}, express.static(uploadDir, {
  acceptRanges: true,
  setHeaders: (res, filePath) => {
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Access-Control-Allow-Origin', '*');
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.mp4') {
      res.setHeader('Content-Type', 'video/mp4');
    } else if (ext === '.mov') {
      res.setHeader('Content-Type', 'video/quicktime');
    } else if (ext === '.webm') {
      res.setHeader('Content-Type', 'video/webm');
    } else if (ext === '.m4v') {
      res.setHeader('Content-Type', 'video/mp4');
    }
  }
}));

// Pages
const DEFAULT_PAGE_SETTINGS = {
  logo: '/logo_main.png',
  appName: '中星影视生态链',
  slogan: '联动你我 · 链接未来',
  welcomeNavTitle: '中星影视生态链',
  welcomeTitle: '中星影视生态链',
  splashType: 'video',
  splashUrl: '/uploads/splash_ad.mp4',
  splashPoster: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1080&h=1920&fit=crop'
};

app.get('/api/pages/:id', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const row = db.prepare('SELECT data FROM pages WHERE id = ?').get(req.params.id) as any;
  if (row && row.data) {
    try {
      const parsed = JSON.parse(row.data);
      if (req.params.id === 'settings') {
        res.json({ ...DEFAULT_PAGE_SETTINGS, ...parsed });
      } else {
        res.json(parsed);
      }
    } catch (e) {
      res.json(req.params.id === 'settings' ? DEFAULT_PAGE_SETTINGS : null);
    }
  } else {
    if (req.params.id === 'settings') {
      res.json(DEFAULT_PAGE_SETTINGS);
    } else {
      res.json(null);
    }
  }
});

app.post('/api/pages/:id', (req, res) => {
  const id = req.params.id;
  const data = JSON.stringify(req.body);
  db.prepare('INSERT INTO pages (id, data) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data').run(id, data);
  res.json({ success: true });
});

// Custom Upsert for interactions
app.post('/api/interactions_upsert', (req, res) => {
  const { id, ...rest } = req.body;
  if (!id) return res.status(400).json({ error: 'id required' });
  const data = JSON.stringify(rest);
  db.prepare('INSERT INTO interactions (id, data) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data').run(id, data);
  res.json({ success: true });
});

// Generic Collection Handlers
const collections = ['dramas', 'bases', 'products', 'liveStreams', 'feedbacks', 'course_registrations', 'visit_bookings', 'users', 'community_posts', 'interactions'];

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
