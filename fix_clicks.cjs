const fs = require('fs');

function replaceOnClick(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/window\.open\(drama\.playUrl,\s*'_blank'\);/g, 'window.location.href = drama.playUrl;');
  fs.writeFileSync(filePath, content);
}

replaceOnClick('src/pages/Home.tsx');
replaceOnClick('src/pages/HotDramas.tsx');
