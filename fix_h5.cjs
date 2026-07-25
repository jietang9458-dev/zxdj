const fs = require('fs');
let content = fs.readFileSync('miniprogram/pages/index/index.js', 'utf-8');
content = content.replace(
  'duration: 3000\n    });',
  'duration: 3000\n    });\n    this.setData({ showWebview: false });'
);
fs.writeFileSync('miniprogram/pages/index/index.js', content);
