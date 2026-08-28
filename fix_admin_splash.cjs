const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// 1. Add states for splash screen
content = content.replace(
  "const [appLogo, setAppLogo] = useState(pages.settings?.logo || '');",
  "const [appLogo, setAppLogo] = useState(pages.settings?.logo || '');\n  const [splashUrl, setSplashUrl] = useState(pages.settings?.splashUrl || '');\n  const [splashType, setSplashType] = useState(pages.settings?.splashType || 'image');"
);

// Update in refresh
content = content.replace(
  "setAppLogo(pages.settings?.logo || '');",
  "setAppLogo(pages.settings?.logo || '');\n    setSplashUrl(pages.settings?.splashUrl || '');\n    setSplashType(pages.settings?.splashType || 'image');"
);

// 2. Update save handler
content = content.replace(
  "auditionEmail: auditionEmail",
  "auditionEmail: auditionEmail,\n        splashUrl: splashUrl,\n        splashType: splashType"
);

// 3. Add UI for Splash screen
const splashUI = `
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                  <Image size={20} />
                </div>
                <h2 className="text-[18px] font-black text-[#1A1108]">小程序欢迎页 (Splash Screen)</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-[#A69984] ml-2">媒体类型</label>
                  <div className="flex gap-4">
                    <button onClick={() => setSplashType('image')} className={\`flex-1 py-3 rounded-xl font-bold transition-all \${splashType === 'image' ? 'bg-[#1A1108] text-white' : 'bg-gray-100 text-gray-500'}\`}>图片</button>
                    <button onClick={() => setSplashType('video')} className={\`flex-1 py-3 rounded-xl font-bold transition-all \${splashType === 'video' ? 'bg-[#1A1108] text-white' : 'bg-gray-100 text-gray-500'}\`}>视频 (9:16, 5秒内)</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-[#A69984] ml-2">{splashType === 'video' ? '视频 URL' : '图片 URL'} (9:16)</label>
                  <div className="flex gap-3">
                    <input 
                      value={splashUrl}
                      onChange={(e) => setSplashUrl(e.target.value)}
                      className="flex-1 px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                    />
                    <ImageUploadButton 
                      value={splashUrl}
                      onChange={setSplashUrl}
                      className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      {splashUrl ? (splashType === 'video' ? <Video className="text-blue-400" /> : <img src={splashUrl} className="w-full h-full object-cover" alt="" />) : <ImageIcon className="text-gray-300" />}
                    </ImageUploadButton>
                  </div>
                </div>
              </div>
            </div>
`;

content = content.replace(
  "{/* Save Button */}",
  splashUI + "\n            {/* Save Button */}"
);

// We need to also add Image to lucide-react imports if it's missing, let's just use ImageIcon as Image
content = content.replace("<Image size={20} />", "<ImageIcon size={20} />");

// Let's find where to insert the UI
content = content.replace(
  "            <button \n              onClick={handleSaveSettings}",
  splashUI + "\n            <button \n              onClick={handleSaveSettings}"
);

fs.writeFileSync('src/pages/Admin.tsx', content);
