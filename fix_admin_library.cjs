const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetStr = `{ key: 'imageUrl', label: '图片 (建议3:4)', type: 'image', aspectRatio: 3/4 },
                        { key: 'title', label: '片名 (必填)', type: 'text' },
                        { key: 'desc', label: '相关文字内容', type: 'text' }`;

const replacementStr = `{ key: 'imageUrl', label: '海报 (建议3:4)', type: 'image', aspectRatio: 3/4 },
                        { key: 'title', label: '片名 (必填)', type: 'text' },
                        { key: 'synopsis', label: '故事梗概', type: 'textarea' },
                        { key: 'desc', label: '相关介绍', type: 'textarea' }`;

if(content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync('src/pages/Admin.tsx', content);
  console.log("Replaced schema");
} else {
  console.log("Could not find target string");
}
