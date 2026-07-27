const fs = require('fs');
let content = fs.readFileSync('src/pages/Discover.tsx', 'utf-8');

const targetCmsPosts = `  const cmsPosts = [
    ...(newsData.shortDramaNews || []).map((n: any, i: number) => ({ id: \`sd_\${i}\`, t: n.title, u: '短剧资讯', d: n.desc || '刚刚发布', l: 0, c: 0, img: n.imageUrl, cat: '短剧资讯' })),
    ...(newsData.bts || []).map((n: any, i: number) => ({ id: \`bts_\${i}\`, t: n.title, u: '拍摄花絮', d: n.desc || '刚刚发布', l: 0, c: 0, img: n.imageUrl, cat: '拍摄花絮' })),
    ...(newsData.successCases || []).map((n: any, i: number) => ({ id: \`sc_\${i}\`, t: n.title, u: '成功案例', d: n.desc || '刚刚发布', l: 0, c: 0, img: n.imageUrl, cat: '成功案例' }))
  ];`;

const replacementCmsPosts = `  const cmsPosts = [
    ...(newsData.shortDramaNews || []).map((n: any, i: number) => ({ id: \`sd_\${i}\`, t: n.title, u: '短剧资讯', d: n.desc || '刚刚发布', l: 0, c: 0, img: n.imageUrl, cat: '短剧资讯', isRecommended: !!n.isRecommended })),
    ...(newsData.bts || []).map((n: any, i: number) => ({ id: \`bts_\${i}\`, t: n.title, u: '拍摄花絮', d: n.desc || '刚刚发布', l: 0, c: 0, img: n.imageUrl, cat: '拍摄花絮', isRecommended: !!n.isRecommended })),
    ...(newsData.successCases || []).map((n: any, i: number) => ({ id: \`sc_\${i}\`, t: n.title, u: '成功案例', d: n.desc || '刚刚发布', l: 0, c: 0, img: n.imageUrl, cat: '成功案例', isRecommended: !!n.isRecommended }))
  ];`;

content = content.replace(targetCmsPosts, replacementCmsPosts);

const targetFilter = `  const filteredPosts = (activeTab === '推荐' 
    ? allPosts 
    : allPosts.filter(p => p.cat === activeTab)
  ).filter(p => !urlSearchQuery || p.t?.includes(urlSearchQuery) || p.u?.includes(urlSearchQuery));`;

const replacementFilter = `  const filteredPosts = (activeTab === '推荐' 
    ? allPosts.filter((p: any) => p.isRecommended || DISCOVER_POSTS.includes(p) || p.cat === '互动交流') 
    : allPosts.filter(p => p.cat === activeTab)
  ).filter(p => !urlSearchQuery || p.t?.includes(urlSearchQuery) || p.u?.includes(urlSearchQuery));`;

content = content.replace(targetFilter, replacementFilter);
fs.writeFileSync('src/pages/Discover.tsx', content);
