const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

if (!content.includes('import HotDramas')) {
  content = content.replace(
    "import Discover from './pages/Discover';",
    "import Discover from './pages/Discover';\nimport HotDramas from './pages/HotDramas';"
  );
  
  content = content.replace(
    "<Route path=\"/discover\" element={<Discover />} />",
    "<Route path=\"/discover\" element={<Discover />} />\n          <Route path=\"/hot-dramas\" element={<HotDramas />} />"
  );
  
  fs.writeFileSync('src/App.tsx', content);
}
