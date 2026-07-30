const fs = require('fs');
let content = fs.readFileSync('src/pages/UserSubPages.tsx', 'utf-8');
content = content.replace('sticky top-[72px]', 'sticky top-24');
fs.writeFileSync('src/pages/UserSubPages.tsx', content);
