const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetStr = `{ key: 'imageUrl', label: '课程封面 (可选)', type: 'image' },
                        { key: 'title', label: '班级名称 (必填)', type: 'text' },
                        { key: 'desc', label: '相关文字内容', type: 'text' },
                        { key: 'date', label: '开班时间', type: 'text' }`;

const replacementStr = `{ key: 'imageUrl', label: '课程封面 (可选)', type: 'image' },
                        { key: 'title', label: '班级名称 (必填)', type: 'text' },
                        { key: 'desc', label: '相关文字内容', type: 'text' },
                        { key: 'date', label: '开班时间', type: 'text' },
                        { key: 'details', label: '详细介绍', type: 'textarea' }`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/pages/Admin.tsx', content);
