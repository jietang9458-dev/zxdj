const fs = require('fs');
let content = fs.readFileSync('src/pages/MiscPages.tsx', 'utf-8');
content = content.replace(`title={pageData.title || "明星俱乐部"}`, `title={pageData.pageTitle || "明星俱乐部"}`);
fs.writeFileSync('src/pages/MiscPages.tsx', content);
