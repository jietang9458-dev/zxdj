const fs = require('fs');
let content = fs.readFileSync('miniprogram/pages/index/index.wxml', 'utf-8');

const tipsRegex = /<view class="tips">[\s\S]*?<\/view>/;
content = content.replace(tipsRegex, '');

fs.writeFileSync('miniprogram/pages/index/index.wxml', content);
