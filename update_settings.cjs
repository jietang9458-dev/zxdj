const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// Add state
const stateTarget = `const [appSlogan, setAppSlogan] = useState(pages.settings?.slogan || '联动你我 · 链接未来');`;
const stateReplacement = `const [appSlogan, setAppSlogan] = useState(pages.settings?.slogan || '联动你我 · 链接未来');\n  const [auditionEmail, setAuditionEmail] = useState(pages.settings?.auditionEmail || 'szfyuan@163.com');`;
content = content.replace(stateTarget, stateReplacement);

// Add to handleSave
const handleSaveTarget = `slogan: appSlogan`;
const handleSaveReplacement = `slogan: appSlogan,\n        auditionEmail: auditionEmail`;
content = content.replace(handleSaveTarget, handleSaveReplacement);

// Add to UI
const uiTarget = `<div className="space-y-2">
                <label className="text-[12px] font-bold text-[#A69984] ml-2">应用标语 (Slogan)</label>
                <input 
                  value={appSlogan}
                  onChange={(e) => setAppSlogan(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                  placeholder="例如: 联动你我 · 链接未来"
                />
              </div>`;

const uiReplacement = `<div className="space-y-2">
                <label className="text-[12px] font-bold text-[#A69984] ml-2">应用标语 (Slogan)</label>
                <input 
                  value={appSlogan}
                  onChange={(e) => setAppSlogan(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                  placeholder="例如: 联动你我 · 链接未来"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#A69984] ml-2">海选报名接收邮箱</label>
                <input 
                  value={auditionEmail}
                  onChange={(e) => setAuditionEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                  placeholder="例如: szfyuan@163.com"
                />
              </div>`;

content = content.replace(uiTarget, uiReplacement);

fs.writeFileSync('src/pages/Admin.tsx', content);
