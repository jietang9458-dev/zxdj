const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetStr = `                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#A69984] ml-2">页面主标题</label>`;

const replacementStr = `                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#A69984] ml-2">页面主标题</label>`;

if (content.includes(targetStr)) {
  // Let's first add headerTitle logic
  let newFields = `                  {activeTab === 'copyright' && (
                    <div className="space-y-2 col-span-2">
                      <label className="text-[11px] font-bold text-[#A69984] ml-2">顶部导航标题</label>
                      <input 
                        value={copyrightData.headerTitle || ''}
                        onChange={(e) => setCopyrightData({...copyrightData, headerTitle: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-50"
                        placeholder="显示在页面顶部的标题"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#A69984] ml-2">页面主标题(Banner横幅内)</label>`;
  
  content = content.replace(targetStr, newFields);
  fs.writeFileSync('src/pages/Admin.tsx', content);
}
