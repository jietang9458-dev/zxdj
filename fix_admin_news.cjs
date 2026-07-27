const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetShortDramaNews = `schema={[
                        { key: 'imageUrl', label: '图片 (建议16:9)', type: 'image', aspectRatio: 16/9 },
                        { key: 'title', label: '资讯标题 (必填)', type: 'text' },
                        { key: 'desc', label: '文字内容', type: 'text' }
                      ]}`;
const replacementShortDramaNews = `schema={[
                        { key: 'imageUrl', label: '图片 (建议16:9)', type: 'image', aspectRatio: 16/9 },
                        { key: 'title', label: '资讯标题 (必填)', type: 'text' },
                        { key: 'desc', label: '文字内容', type: 'text' },
                        { key: 'isRecommended', label: '设为推荐', type: 'boolean' }
                      ]}`;
content = content.replace(targetShortDramaNews, replacementShortDramaNews);

const targetBts = `schema={[
                        { key: 'imageUrl', label: '图片 (建议16:9)', type: 'image', aspectRatio: 16/9 },
                        { key: 'title', label: '标题 (必填)', type: 'text' },
                        { key: 'desc', label: '文字内容', type: 'text' }
                      ]}`;
const replacementBts = `schema={[
                        { key: 'imageUrl', label: '图片 (建议16:9)', type: 'image', aspectRatio: 16/9 },
                        { key: 'title', label: '标题 (必填)', type: 'text' },
                        { key: 'desc', label: '文字内容', type: 'text' },
                        { key: 'isRecommended', label: '设为推荐', type: 'boolean' }
                      ]}`;
content = content.replace(targetBts, replacementBts);
// it will replace both since successCases also has exactly the same string.

fs.writeFileSync('src/pages/Admin.tsx', content);
