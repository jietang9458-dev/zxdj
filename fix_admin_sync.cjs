const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

content = content.replace(
  "setAppSlogan(pages.settings?.slogan || '联动你我 · 链接未来');",
  "setAppSlogan(pages.settings?.slogan || '联动你我 · 链接未来');\n    setAppEnName(pages.settings?.enName || 'ZX Eco-Chain Premium');"
);

fs.writeFileSync('src/pages/Admin.tsx', content);
