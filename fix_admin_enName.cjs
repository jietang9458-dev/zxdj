const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

content = content.replace(
  "const [appName, setAppName] = useState(pages.settings?.name || '中星短剧');",
  "const [appName, setAppName] = useState(pages.settings?.name || '中星短剧');\n  const [appEnName, setAppEnName] = useState(pages.settings?.enName || 'ZX Eco-Chain Premium');"
);

content = content.replace(
  "slogan: appSlogan,",
  "slogan: appSlogan,\n        enName: appEnName,"
);

const newUI = `
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#A69984] ml-2">首页英文副标题</label>
                <input 
                  value={appEnName}
                  onChange={(e) => setAppEnName(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                  placeholder="ZX Eco-Chain Premium"
                />
              </div>
`;

content = content.replace(
  /<div className="space-y-2">\s*<label className="text-\[12px\] font-bold text-\[#A69984\] ml-2">应用标语 \(Slogan\)<\/label>[\s\S]*?<\/div>/,
  match => match + "\n" + newUI
);

fs.writeFileSync('src/pages/Admin.tsx', content);
