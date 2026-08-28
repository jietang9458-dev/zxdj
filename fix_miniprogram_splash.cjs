const fs = require('fs');
let content = fs.readFileSync('miniprogram/pages/index/index.js', 'utf-8');

content = content.replace(
  "splashUrl: res.data.splashUrl,",
  "splashUrl: res.data.splashUrl.startsWith('/') ? (this.data.appUrl + res.data.splashUrl) : res.data.splashUrl,"
);

fs.writeFileSync('miniprogram/pages/index/index.js', content);
