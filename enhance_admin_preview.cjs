const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetSection = `                <div className="space-y-4 pt-4 border-t border-gray-100">
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
              </div>
            </div>`;

const replacementSection = `                <div className="space-y-4 pt-4 border-t border-gray-100">
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

                {/* 实时欢迎页预览效果 */}
                {splashUrl && (
                  <div className="pt-4 border-t border-gray-100">
                    <label className="text-[12px] font-bold text-[#A69984] ml-2 mb-2 block">欢迎页效果实时预览 (手机比例 9:16)</label>
                    <div className="relative w-48 h-80 mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 bg-black flex flex-col justify-between">
                      {splashType === 'video' ? (
                        <video 
                          src={splashUrl} 
                          autoPlay 
                          muted 
                          loop 
                          playsInline 
                          className="absolute inset-0 w-full h-full object-cover" 
                        />
                      ) : (
                        <img 
                          src={splashUrl} 
                          alt="" 
                          className="absolute inset-0 w-full h-full object-cover" 
                        />
                      )}
                      <div className="relative z-10 p-3 flex justify-end">
                        <span className="bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full border border-white/20">
                          跳过 5s
                        </span>
                      </div>
                      <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-center">
                        <p className="text-[#D4AF37] font-black text-xs">{welcomeTitle || '中星影视生态链'}</p>
                        <p className="text-white/70 text-[9px] mt-0.5">{appSlogan}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>`;

content = content.replace(targetSection, replacementSection);
fs.writeFileSync('src/pages/Admin.tsx', content);
console.log('Admin preview added successfully');
