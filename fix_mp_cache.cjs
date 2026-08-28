const fs = require('fs');
let content = fs.readFileSync('miniprogram/pages/index/index.js', 'utf-8');

content = content.replace(
  "url: this.data.appUrl + '/api/pages/settings',",
  "url: this.data.appUrl + '/api/pages/settings?_t=' + Date.now(),"
);

fs.writeFileSync('miniprogram/pages/index/index.js', content);
