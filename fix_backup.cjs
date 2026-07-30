const fs = require('fs');
let content = fs.readFileSync('miniprogram_backup_0725/pages/index/index.wxml', 'utf-8');

const tipsRegex = /<view class="tips">[\s\S]*?<\/view>/;
content = content.replace(tipsRegex, '');

fs.writeFileSync('miniprogram_backup_0725/pages/index/index.wxml', content);
