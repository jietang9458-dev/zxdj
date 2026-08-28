const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const targetStr = `// Serve uploads statically to ensure they reflect immediately in both dev/prod
app.use('/uploads', express.static(uploadDir));`;

const replacementStr = `// Serve uploads statically with complete Range request & video streaming headers
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
}));`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('server.ts', content);
console.log('Updated server.ts streaming support');
