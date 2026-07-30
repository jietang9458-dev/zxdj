const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

content = content.replace(/admin123/g, 'fy18038060388');
// To be safe, change the instruction text too if it was explicitly there.
content = content.replace("请输入管理员密码进行操作 (fy18038060388)", "请输入管理员密码进行操作");
content = content.replace('请输入管理员密码 (fy18038060388):', '请输入管理员密码:');

fs.writeFileSync('src/pages/Admin.tsx', content);
