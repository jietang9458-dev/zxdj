const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetSection = `            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                  <ImageIcon size={20} />
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
                    <MediaUploadButton 
                      value={splashUrl}
                      onChange={setSplashUrl}
                      accept={splashType === 'video' ? 'video/*' : 'image/*'}
                      className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
                    >
                      {splashUrl ? (splashType === 'video' ? <Video className="text-blue-400" /> : <img src={splashUrl} className="w-full h-full object-cover" alt="" />) : <ImageIcon className="text-gray-300" />}
                    </MediaUploadButton>
                    <button 
                      onClick={() => setSplashUrl('')}
                      className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-100 transition-colors shrink-0"
                      title="删除媒体"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
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
              </div>
            </div>`;

const replacementSection = `            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                  <PlayCircle size={20} />
                </div>
                <div>
                  <h2 className="text-[18px] font-black text-[#1A1108]">小程序 5秒开屏广告与欢迎页流程</h2>
                  <p className="text-[12px] text-[#A69984]">第一步展示 5秒视频/图片广告 ➔ 第二步展示欢迎页面 ➔ 点击进入应用主界面</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* 广告配置 */}
                <div className="bg-gray-50 p-4 rounded-2xl space-y-3 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-black text-[#1A1108]">步骤一：5秒开屏广告 (视频 / 图片)</span>
                    <span className="text-[11px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full">优先弹出</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-[#A69984] ml-1">媒体类型</label>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setSplashType('image')} className={\`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all \${splashType === 'image' ? 'bg-[#1A1108] text-white shadow' : 'bg-white text-gray-600 border border-gray-200'}\`}>图片广告 (9:16)</button>
                      <button type="button" onClick={() => setSplashType('video')} className={\`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all \${splashType === 'video' ? 'bg-[#1A1108] text-white shadow' : 'bg-white text-gray-600 border border-gray-200'}\`}>视频广告 (9:16, 5秒内)</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[12px] font-bold text-[#A69984] ml-1">{splashType === 'video' ? '视频 URL (MP4 / WebM)' : '图片 URL'}</label>
                    <div className="flex gap-3">
                      <input 
                        value={splashUrl}
                        onChange={(e) => setSplashUrl(e.target.value)}
                        placeholder={splashType === 'video' ? '请上传或填入 5秒内视频 URL' : '请上传或填入图片 URL'}
                        className="flex-1 px-4 py-3 bg-white rounded-xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-200 text-sm"
                      />
                      <MediaUploadButton 
                        value={splashUrl}
                        onChange={setSplashUrl}
                        accept={splashType === 'video' ? 'video/*' : 'image/*'}
                        className="w-12 h-12 bg-white rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0 shadow-sm"
                      >
                        {splashUrl ? (splashType === 'video' ? <Video className="text-amber-500" size={20} /> : <img src={splashUrl} className="w-full h-full object-cover" alt="" />) : <ImageIcon className="text-gray-300" size={20} />}
                      </MediaUploadButton>
                      <button 
                        type="button"
                        onClick={() => setSplashUrl('')}
                        className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors shrink-0"
                        title="删除媒体"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 欢迎页配置 */}
                <div className="bg-gray-50 p-4 rounded-2xl space-y-3 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-black text-[#1A1108]">步骤二：欢迎页面 (广告结束后展示)</span>
                    <span className="text-[11px] text-gray-500 font-bold bg-white px-2 py-0.5 rounded-full border border-gray-200">点击进入主应用</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-[#A69984] ml-1">顶部导航栏标题</label>
                      <input 
                        value={welcomeNavTitle}
                        onChange={(e) => setWelcomeNavTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-white rounded-xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-200 text-sm"
                        placeholder="中星影视生态链"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[12px] font-bold text-[#A69984] ml-1">欢迎页面主标题</label>
                      <input 
                        value={welcomeTitle}
                        onChange={(e) => setWelcomeTitle(e.target.value)}
                        className="w-full px-4 py-3 bg-white rounded-xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-200 text-sm"
                        placeholder="中星影视生态链"
                      />
                    </div>
                  </div>
                </div>

                {/* 双步骤效果实时预览 */}
                <div className="pt-2">
                  <label className="text-[12px] font-bold text-[#A69984] ml-1 mb-2 block">小程序流程实时预览对比 (9:16)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 1. 广告预览 */}
                    <div className="bg-black/90 p-3 rounded-2xl border border-gray-200 text-center">
                      <p className="text-white/80 text-[11px] font-bold mb-2">第 1 步：5秒广告开屏</p>
                      <div className="relative w-40 h-64 mx-auto rounded-2xl overflow-hidden shadow-md border-2 border-amber-500/40 bg-black flex flex-col justify-between">
                        {splashUrl ? (
                          splashType === 'video' ? (
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
                          )
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs p-3">
                            未上传广告媒体
                          </div>
                        )}
                        <div className="relative z-10 p-2 flex justify-end">
                          <span className="bg-black/60 text-white text-[9px] px-2 py-0.5 rounded-full border border-white/20">
                            跳过 5s
                          </span>
                        </div>
                        <div className="relative z-10 p-2.5 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-center">
                          <p className="text-[#D4AF37] font-black text-[11px] truncate">{welcomeTitle || '中星影视生态链'}</p>
                          <p className="text-white/70 text-[8px] truncate mt-0.5">{appSlogan}</p>
                        </div>
                      </div>
                    </div>

                    {/* 2. 欢迎页预览 */}
                    <div className="bg-[#120B05] p-3 rounded-2xl border border-gray-200 text-center">
                      <p className="text-white/80 text-[11px] font-bold mb-2">第 2 步：欢迎页面</p>
                      <div className="relative w-40 h-64 mx-auto rounded-2xl overflow-hidden shadow-md border-2 border-[#D4AF37]/40 bg-[#120B05] flex flex-col justify-between p-3">
                        <div className="my-auto flex flex-col items-center">
                          {appLogo ? (
                            <img src={appLogo} alt="" className="w-10 h-10 rounded-xl mb-2 object-cover shadow" />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8B6E4E] flex items-center justify-center text-black font-black text-sm mb-2">
                              ZX
                            </div>
                          )}
                          <p className="text-[#D4AF37] font-black text-xs">{welcomeTitle || '中星影视生态链'}</p>
                          <p className="text-[#A69984] text-[9px] mt-1">{appSlogan}</p>
                          <div className="mt-3 w-full bg-[#D4AF37] text-[#120B05] font-black text-[10px] py-1.5 rounded-full shadow">
                            点击进入应用 →
                          </div>
                        </div>
                        <p className="text-white/30 text-[7px]">中星短剧 · 官方生态链</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

content = content.replace(targetSection, replacementSection);
fs.writeFileSync('src/pages/Admin.tsx', content);
console.log('Updated Admin.tsx successfully');
