const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetStr = `<h4 className="font-bold text-[#1A1108] mt-6">热门可购版权</h4>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-[#A69984] ml-2 font-mono">
                        编辑此 JSON 数组进行管理热门可购版权（支持4个板块或以上）
                      </label>
                      <textarea
                        value={JSON.stringify(copyrightData.hotCopyrights || [
                          { title: 'AI制作短剧', imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?q=80&w=400&h=600&fit=crop', desc: '每部短剧共50份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (A)0021 001~050' },
                          { title: '精品短剧', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&h=600&fit=crop', desc: '每部短剧共100份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (B)0101 001~100' },
                          { title: '明星短剧', imageUrl: 'https://images.unsplash.com/photo-1544208453-ca422f28b7e2?q=80&w=400&h=600&fit=crop', desc: '每部短剧共200份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (C)0201 001~200，注：明星演员的定义、标准和人选由中星影视生态链确定，版权购买方不存有异议。' },
                          { title: '互动影游', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&h=600&fit=crop', desc: '请联系中星影视生态链客服咨询详情。' }
                        ], null, 2)}
                        onChange={(e) => {
                          try {
                            setCopyrightData({...copyrightData, hotCopyrights: JSON.parse(e.target.value)});
                          } catch (e) {}
                        }}
                        className="w-full px-5 py-4 bg-gray-50 rounded-2xl min-h-[200px] outline-none border border-gray-50 font-mono text-xs"
                      />
                    </div>`;

const newHotCopyrights = `<AdminListEditor 
                      title="热门可购版权"
                      items={copyrightData.hotCopyrights || [
                          { title: 'AI制作短剧', imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?q=80&w=400&h=600&fit=crop', desc: '每部短剧共50份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (A)0021 001~050' },
                          { title: '精品短剧', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&h=600&fit=crop', desc: '每部短剧共100份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (B)0101 001~100' },
                          { title: '明星短剧', imageUrl: 'https://images.unsplash.com/photo-1544208453-ca422f28b7e2?q=80&w=400&h=600&fit=crop', desc: '每部短剧共200份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (C)0201 001~200，注：明星演员的定义、标准和人选由中星影视生态链确定，版权购买方不存有异议。' },
                          { title: '互动影游', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&h=600&fit=crop', desc: '请联系中星影视生态链客服咨询详情。' }
                      ]}
                      onChange={(items: any) => setCopyrightData({...copyrightData, hotCopyrights: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '海报', type: 'image', aspectRatio: 3/4 },
                        { key: 'title', label: '标题', type: 'text' },
                        { key: 'desc', label: '文字介绍', type: 'textarea' }
                      ]}
                    />`;

content = content.replace(targetStr, newHotCopyrights);
fs.writeFileSync('src/pages/Admin.tsx', content);
