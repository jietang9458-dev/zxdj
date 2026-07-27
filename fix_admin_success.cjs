const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetSuccess = `schema={[
                        { key: 'imageUrl', label: '图片 (建议16:9)', type: 'image', aspectRatio: 16/9 },
                        { key: 'title', label: '案例标题 (必填)', type: 'text' },
                        { key: 'desc', label: '文字内容', type: 'text' }
                      ]}`;
const replacementSuccess = `schema={[
                        { key: 'imageUrl', label: '图片 (建议16:9)', type: 'image', aspectRatio: 16/9 },
                        { key: 'title', label: '案例标题 (必填)', type: 'text' },
                        { key: 'desc', label: '文字内容', type: 'text' },
                        { key: 'isRecommended', label: '设为推荐', type: 'boolean' }
                      ]}`;
content = content.replace(targetSuccess, replacementSuccess);
fs.writeFileSync('src/pages/Admin.tsx', content);
