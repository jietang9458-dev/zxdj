const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const target = `{activeTab === 'copyright' && (
                    <div className="space-y-2 col-span-2">
                      <label className="text-[11px] font-bold text-[#A69984] ml-2">顶部导航标题</label>
                      <input 
                        value={copyrightData.headerTitle || ''}
                        onChange={(e) => setCopyrightData({...copyrightData, headerTitle: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-50"
                        placeholder="显示在页面顶部的标题"
                      />
                    </div>
                  )}`;

const replacement = `{(activeTab === 'copyright' || activeTab === 'production' || activeTab === 'actors') && (
                    <div className="space-y-2 col-span-2">
                      <label className="text-[11px] font-bold text-[#A69984] ml-2">顶部导航标题</label>
                      <input 
                        value={
                          activeTab === 'copyright' ? copyrightData.headerTitle || '' :
                          activeTab === 'production' ? productionData.headerTitle || '' :
                          activeTab === 'actors' ? actorsData.headerTitle || '' : ''
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (activeTab === 'copyright') setCopyrightData({...copyrightData, headerTitle: val});
                          if (activeTab === 'production') setProductionData({...productionData, headerTitle: val});
                          if (activeTab === 'actors') setActorsData({...actorsData, headerTitle: val});
                        }}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-50"
                        placeholder="显示在页面顶部的标题"
                      />
                    </div>
                  )}`;

content = content.replace(target, replacement);
fs.writeFileSync('src/pages/Admin.tsx', content);
