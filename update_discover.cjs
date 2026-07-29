const fs = require('fs');

let content = fs.readFileSync('src/pages/Discover.tsx', 'utf-8');

// Update cmsPosts
content = content.replace(
  /const cmsPosts = \[([\s\S]*?)\];/g,
  `const cmsPosts = [
    ...(newsData.shortDramaNews || []).map((n: any, i: number) => ({ id: \`sd_\${i}\`, t: n.title, d: n.desc, blocks: n.blocks, img: n.imageUrl, cat: '短剧资讯', isRecommended: !!n.isRecommended })),
    ...(newsData.bts || []).map((n: any, i: number) => ({ id: \`bts_\${i}\`, t: n.title, d: n.desc, blocks: n.blocks, img: n.imageUrl, cat: '拍摄花絮', isRecommended: !!n.isRecommended })),
    ...(newsData.successCases || []).map((n: any, i: number) => ({ id: \`sc_\${i}\`, t: n.title, d: n.desc, blocks: n.blocks, img: n.imageUrl, cat: '成功案例', isRecommended: !!n.isRecommended }))
  ];`
);

// We should also remove the old `u` (user) logic if we want, or just keep it and ignore it. I removed u, l, c.

// Replace the render block
const renderBlockRegex = /<motion\.div\s+key=\{post\.id\}[\s\S]*?<\/motion\.div>/g;

const newRenderBlock = `<motion.div 
                  key={post.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5"
                >
                  {post.img && (
                    <div className="w-full aspect-[16/9] overflow-hidden relative">
                      <img src={post.img} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold rounded-full">
                        {post.cat}
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-[18px] font-black text-[#1A1108] dark:text-white leading-tight mb-4">
                      {post.t}
                    </h3>
                    
                    {post.blocks && post.blocks.length > 0 ? (
                      <div className="space-y-4 mt-4">
                        {post.blocks.map((block: any, idx: number) => (
                          <div key={idx}>
                            {block.type === 'text' ? (
                              <p className="text-[14px] text-[#4A443E] dark:text-[#E6D5B8] leading-relaxed whitespace-pre-wrap">
                                {block.content}
                              </p>
                            ) : block.type === 'image' && block.url ? (
                              <img src={block.url} alt="" className="w-full rounded-2xl" />
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : post.d && post.d !== '刚刚发布' ? (
                      <p className="text-[14px] text-[#4A443E] dark:text-[#E6D5B8] leading-relaxed whitespace-pre-wrap">
                        {post.d}
                      </p>
                    ) : null}
                  </div>
                </motion.div>`;

content = content.replace(renderBlockRegex, newRenderBlock);

fs.writeFileSync('src/pages/Discover.tsx', content);
