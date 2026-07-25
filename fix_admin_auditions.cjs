const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetStr = `{ key: 'imageUrl', label: '活动封面 (16:9)', type: 'image', aspectRatio: 16/9 },
                        { key: 'title', label: '项目名称 (必填)', type: 'text' },
                        { key: 'desc', label: '相关文字内容', type: 'text' }`;

const replacementStr = `{ key: 'imageUrl', label: '活动封面 (3:4)', type: 'image', aspectRatio: 3/4 },
                        { key: 'title', label: '项目名称 (必填)', type: 'text' },
                        { key: 'desc', label: '相关文字内容', type: 'text' },
                        { key: 'requirement', label: '招募要求', type: 'textarea' }`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/pages/Admin.tsx', content);
