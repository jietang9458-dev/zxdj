const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

content = content.replace(
  "ZX Eco-Chain Premium",
  "{appSettings.enName || 'ZX Eco-Chain Premium'}"
);

fs.writeFileSync('src/pages/Home.tsx', content);
