const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');
content = content.replace(/\/terms\?type=service/g, '/doc/terms');
content = content.replace(/\/terms\?type=privacy/g, '/doc/privacy');
fs.writeFileSync('src/pages/SubPages.tsx', content);
