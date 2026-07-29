const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const regex = /<div key=\{i\} className="flex gap-4 p-3 bg-gray-50 dark:bg-black\/20 rounded-2xl items-center">[\s\S]*?<\/div>\s*<\/div>\s*\)\)/;

const replacement = `<div key={i} className="flex gap-4 p-3 bg-gray-50 dark:bg-black/20 rounded-2xl items-stretch h-36">
                <div className="w-24 flex-shrink-0 flex flex-col gap-2">
                  <div className="w-full flex-1 rounded-xl overflow-hidden shadow-sm relative">
                    <img src={drama.imageUrl} className="w-full h-full object-cover" alt="" />
                    <div className="absolute top-1 right-1 bg-black/60 rounded-md p-1 backdrop-blur-sm">
                      <ShieldCheck size={12} className="text-[#D4AF37]" />
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/copyright/purchase-instructions')}
                    className="w-full bg-[#8B6E4E] text-white py-1.5 rounded-lg text-[11px] font-bold active:scale-95 transition-transform flex items-center justify-center gap-1 flex-shrink-0"
                  >
                    <MessageSquare size={12} /> 咨询
                  </button>
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <h4 className="font-black text-[14px] text-[#1A1108] dark:text-[#E6D5B8] mb-1 truncate">{drama.title}</h4>
                  <div className="flex-1 overflow-y-auto scrollbar-hide pr-1">
                    <p className="text-[10px] sm:text-[11px] text-[#A69984] leading-relaxed whitespace-pre-wrap break-words">
                      {drama.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/pages/SubPages.tsx', content);
