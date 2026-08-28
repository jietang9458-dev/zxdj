const fs = require('fs');

// 1. Update CMSContext.tsx
let cmsContent = fs.readFileSync('src/context/CMSContext.tsx', 'utf-8');

const defaultNews = `(newsContent && Object.keys(newsContent).length > 0) ? newsContent : {
          shortDramaNews: [
            { title: "短剧版权保护进入新阶段：AI技术赋能监测", desc: "法务观察", imageUrl: "https://images.unsplash.com/photo-1589252392322-450144a11b05?w=400", isRecommended: true }
          ],
          ecosystemNews: [
            { title: "中星影视生态链战略发布会圆满成功", desc: "官方小助手", imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400", isRecommended: true },
            { title: "如何高效完成短剧拍摄？资深导演经验分享", desc: "影人周刊", imageUrl: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400", isRecommended: true }
          ],
          bts: [
            { title: "新兴短剧演员招募计划正式启动！", desc: "演员孵化中心", imageUrl: "https://images.unsplash.com/photo-1543533966-70e9f09280a6?w=400", isRecommended: true },
            { title: "片场花絮：为了一个镜头重拍30次背后的故事", desc: "幕后人", imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400", isRecommended: true }
          ],
          successCases: [
            { title: "《总裁的秘密》斩获年度最具潜力短剧奖", desc: "成功案例库", imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400", isRecommended: true }
          ]
        }`;

cmsContent = cmsContent.replace('news: newsContent || {},', `news: ${defaultNews},`);
fs.writeFileSync('src/context/CMSContext.tsx', cmsContent);


// 2. Update Admin.tsx
let adminContent = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

adminContent = adminContent.replace(
  "const [newsData, setNewsData] = useState(pages.news || { shortDramaNews: [], bts: [], successCases: [] });",
  "const [newsData, setNewsData] = useState(pages.news || { shortDramaNews: [], ecosystemNews: [], bts: [], successCases: [] });"
);

// We need to change "短剧资讯" title to "行业资讯" and add ecosystemNews section
const newsBlocksOld = `
                    <AdminListEditor 
                      title="短剧资讯"
                      items={(newsData as any).shortDramaNews || []}
                      onChange={(items: any) => setNewsData({...(newsData as any), shortDramaNews: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '图片 (建议16:9)', type: 'image', aspectRatio: 16/9 },
                        { key: 'title', label: '资讯标题 (必填)', type: 'text' },
                        { key: 'blocks', label: '图文详情', type: 'content_blocks' },
                        { key: 'isRecommended', label: '设为推荐', type: 'boolean' }
                      ]}
                    />
                    <AdminListEditor 
                      title="拍摄花絮"
`;

const newsBlocksNew = `
                    <AdminListEditor 
                      title="行业资讯"
                      items={(newsData as any).shortDramaNews || []}
                      onChange={(items: any) => setNewsData({...(newsData as any), shortDramaNews: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '图片 (建议16:9)', type: 'image', aspectRatio: 16/9 },
                        { key: 'title', label: '资讯标题 (必填)', type: 'text' },
                        { key: 'desc', label: '发布者', type: 'text' },
                        { key: 'blocks', label: '图文详情', type: 'content_blocks' },
                        { key: 'isRecommended', label: '设为推荐', type: 'boolean' }
                      ]}
                    />
                    <AdminListEditor 
                      title="生态链资讯"
                      items={(newsData as any).ecosystemNews || []}
                      onChange={(items: any) => setNewsData({...(newsData as any), ecosystemNews: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '图片 (建议16:9)', type: 'image', aspectRatio: 16/9 },
                        { key: 'title', label: '资讯标题 (必填)', type: 'text' },
                        { key: 'desc', label: '发布者', type: 'text' },
                        { key: 'blocks', label: '图文详情', type: 'content_blocks' },
                        { key: 'isRecommended', label: '设为推荐', type: 'boolean' }
                      ]}
                    />
                    <AdminListEditor 
                      title="拍摄花絮"
`;
adminContent = adminContent.replace(newsBlocksOld.trim(), newsBlocksNew.trim());

// Update desc in bts and success cases too
adminContent = adminContent.replace(
  "{ key: 'title', label: '资讯标题 (必填)', type: 'text' },\n                        { key: 'blocks', label: '图文详情', type: 'content_blocks' },\n                        { key: 'isRecommended', label: '设为推荐', type: 'boolean' }",
  "{ key: 'title', label: '资讯标题 (必填)', type: 'text' },\n                        { key: 'desc', label: '发布者', type: 'text' },\n                        { key: 'blocks', label: '图文详情', type: 'content_blocks' },\n                        { key: 'isRecommended', label: '设为推荐', type: 'boolean' }"
);
adminContent = adminContent.replace(
  "{ key: 'title', label: '资讯标题 (必填)', type: 'text' },\n                        { key: 'blocks', label: '图文详情', type: 'content_blocks' },\n                        { key: 'isRecommended', label: '设为推荐', type: 'boolean' }",
  "{ key: 'title', label: '资讯标题 (必填)', type: 'text' },\n                        { key: 'desc', label: '发布者', type: 'text' },\n                        { key: 'blocks', label: '图文详情', type: 'content_blocks' },\n                        { key: 'isRecommended', label: '设为推荐', type: 'boolean' }"
);

fs.writeFileSync('src/pages/Admin.tsx', adminContent);

// 3. Update Discover.tsx
let discoverContent = fs.readFileSync('src/pages/Discover.tsx', 'utf-8');
discoverContent = discoverContent.replace(/const DISCOVER_POSTS = \[[\s\S]*?\];/, ''); // Remove the hardcoded DISCOVER_POSTS

// Find the mapping array
const oldCmsPosts = `const cmsPosts = [
    ...(newsData.shortDramaNews || []).map((n: any, i: number) => ({ id: \`sd_\${i}\`, t: n.title, d: n.desc, blocks: n.blocks, img: n.imageUrl, cat: '短剧资讯', isRecommended: !!n.isRecommended })),
    ...(newsData.bts || []).map((n: any, i: number) => ({ id: \`bts_\${i}\`, t: n.title, d: n.desc, blocks: n.blocks, img: n.imageUrl, cat: '拍摄花絮', isRecommended: !!n.isRecommended })),
    ...(newsData.successCases || []).map((n: any, i: number) => ({ id: \`sc_\${i}\`, t: n.title, d: n.desc, blocks: n.blocks, img: n.imageUrl, cat: '成功案例', isRecommended: !!n.isRecommended }))
  ];`;

const newCmsPosts = `const cmsPosts = [
    ...(newsData.shortDramaNews || []).map((n: any, i: number) => ({ id: \`sd_\${i}\`, t: n.title, u: n.desc, d: '刚刚', blocks: n.blocks, img: n.imageUrl, cat: '行业资讯', isRecommended: !!n.isRecommended })),
    ...(newsData.ecosystemNews || []).map((n: any, i: number) => ({ id: \`eco_\${i}\`, t: n.title, u: n.desc, d: '刚刚', blocks: n.blocks, img: n.imageUrl, cat: '生态链资讯', isRecommended: !!n.isRecommended })),
    ...(newsData.bts || []).map((n: any, i: number) => ({ id: \`bts_\${i}\`, t: n.title, u: n.desc, d: '刚刚', blocks: n.blocks, img: n.imageUrl, cat: '拍摄花絮', isRecommended: !!n.isRecommended })),
    ...(newsData.successCases || []).map((n: any, i: number) => ({ id: \`sc_\${i}\`, t: n.title, u: n.desc, d: '刚刚', blocks: n.blocks, img: n.imageUrl, cat: '成功案例', isRecommended: !!n.isRecommended }))
  ];`;
discoverContent = discoverContent.replace(oldCmsPosts, newCmsPosts);

// change allPosts
discoverContent = discoverContent.replace('const allPosts = [...cmsPosts, ...DISCOVER_POSTS];', 'const allPosts = [...cmsPosts];');
discoverContent = discoverContent.replace('|| DISCOVER_POSTS.includes(p)', ''); // filter fix

// Update tabs array
discoverContent = discoverContent.replace(
  `{['推荐', '短剧资讯', '拍摄花絮', '成功案例'].map((t) => (`,
  `{['推荐', '行业资讯', '生态链资讯', '拍摄花絮', '成功案例'].map((t) => (`
);

fs.writeFileSync('src/pages/Discover.tsx', discoverContent);

