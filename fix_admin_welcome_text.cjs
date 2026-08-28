const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

content = content.replace(
  "const [splashType, setSplashType] = useState(pages.settings?.splashType || 'image');",
  "const [splashType, setSplashType] = useState(pages.settings?.splashType || 'image');\n  const [welcomeTitle, setWelcomeTitle] = useState(pages.settings?.welcomeTitle || '中星影视生态链');\n  const [welcomeNavTitle, setWelcomeNavTitle] = useState(pages.settings?.welcomeNavTitle || '中星影视生态链');"
);

content = content.replace(
  "setSplashType(pages.settings?.splashType || 'image');",
  "setSplashType(pages.settings?.splashType || 'image');\n    setWelcomeTitle(pages.settings?.welcomeTitle || '中星影视生态链');\n    setWelcomeNavTitle(pages.settings?.welcomeNavTitle || '中星影视生态链');"
);

content = content.replace(
  "splashType: splashType",
  "splashType: splashType,\n        welcomeTitle: welcomeTitle,\n        welcomeNavTitle: welcomeNavTitle"
);

const newUI = `
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-[#A69984] ml-2">顶部导航栏标题</label>
                    <input 
                      value={welcomeNavTitle}
                      onChange={(e) => setWelcomeNavTitle(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                      placeholder="中星影视生态链"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-[#A69984] ml-2">欢迎页面中间主标题</label>
                    <input 
                      value={welcomeTitle}
                      onChange={(e) => setWelcomeTitle(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                      placeholder="中星影视生态链"
                    />
                  </div>
                </div>
`;

content = content.replace(
  "</div>\n                </div>\n              </div>\n            </div>",
  "</div>\n                </div>\n" + newUI + "\n              </div>\n            </div>"
);

fs.writeFileSync('src/pages/Admin.tsx', content);
