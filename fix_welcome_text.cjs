const fs = require('fs');
let jsContent = fs.readFileSync('miniprogram/pages/index/index.js', 'utf-8');

jsContent = jsContent.replace(
  'splashType: "image",',
  'splashType: "image",\n    welcomeTitle: "中星影视生态链",'
);

jsContent = jsContent.replace(
  'splashType: res.data.splashType || \'image\',',
  'splashType: res.data.splashType || \'image\','
);

jsContent = jsContent.replace(
  'this.startCountdown();\n        }',
  'this.startCountdown();\n        }\n        if (res.data.welcomeTitle) {\n          this.setData({ welcomeTitle: res.data.welcomeTitle });\n        }\n        if (res.data.welcomeNavTitle) {\n          wx.setNavigationBarTitle({ title: res.data.welcomeNavTitle });\n        }'
);

fs.writeFileSync('miniprogram/pages/index/index.js', jsContent);

let wxmlContent = fs.readFileSync('miniprogram/pages/index/index.wxml', 'utf-8');
wxmlContent = wxmlContent.replace(
  '<text class="title">中星影视生态链</text>',
  '<text class="title">{{welcomeTitle}}</text>'
);
fs.writeFileSync('miniprogram/pages/index/index.wxml', wxmlContent);
