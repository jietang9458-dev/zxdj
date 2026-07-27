const fs = require('fs');

let content = fs.readFileSync('src/pages/Discover.tsx', 'utf-8');

// Remove CommunityPosts state and fetch
content = content.replace(/const \[communityPosts, setCommunityPosts\] = useState<any\[\]>\(\[\]\);/, '');

// Remove community posts fetch from useEffect
content = content.replace(/fetch\('\/api\/community_posts'\).then\(r => r.json\(\)\),/g, '');
content = content.replace(/const \[_, communityData\] = await Promise.all\(\[[\s\S]*?\]\);/, 'await Promise.all([\n          fetch(`/api/discover_likes?uid=${profile.uid}`).then(r => r.json())\n        ]);');
content = content.replace(/if \(communityData && Array.isArray\(communityData\)\) \{[\s\S]*?\}/, '');

// Remove communityPosts from allPosts
content = content.replace(/const approvedCommunityPosts = communityPosts\.filter\(p => p\.approved \|\| p\.uid === profile\.uid\)\.map\(p => \(\{[\s\S]*?\}\)\)\.sort\(\(a, b\) => b\.d_raw - a\.d_raw\);/, '');
content = content.replace(/const allPosts = \[\.\.\.cmsPosts, \.\.\.DISCOVER_POSTS, \.\.\.approvedCommunityPosts\];/, 'const allPosts = [...cmsPosts, ...DISCOVER_POSTS];');

content = content.replace(/p\.cat === '互动交流'/g, "false");

// Update categories tabs
content = content.replace(/\['推荐', '短剧资讯', '拍摄花絮', '互动交流', '成功案例'\]/, "['推荐', '短剧资讯', '拍摄花絮', '成功案例']");

fs.writeFileSync('src/pages/Discover.tsx', content);
