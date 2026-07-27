const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');
content = `import * as XLSX from 'xlsx';\n` + content;
fs.writeFileSync('src/pages/Admin.tsx', content);
