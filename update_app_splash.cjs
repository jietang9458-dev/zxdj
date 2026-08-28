const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

if (!content.includes('SplashScreen')) {
  content = content.replace(
    "import Layout from './components/Layout';",
    "import Layout from './components/Layout';\nimport SplashScreen from './components/SplashScreen';"
  );

  content = content.replace(
    "<CMSProvider>\n          <Router>",
    "<CMSProvider>\n          <SplashScreen />\n          <Router>"
  );
}

fs.writeFileSync('src/App.tsx', content);
console.log('Updated src/App.tsx with SplashScreen');
