const fs = require('fs');
let content = fs.readFileSync('src/pages/UserSubPages.tsx', 'utf-8');

const target1 = `          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
          </div>`;
const replace1 = `          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 overflow-hidden">
            <img src={pages?.settings?.customerAvatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&fit=crop"} alt="" className="w-full h-full object-cover" />
          </div>`;

const target2 = `                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8B6E4E] flex items-center justify-center text-white">
                  </div>
                  <div>`;
const replace2 = `                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8B6E4E] flex items-center justify-center text-white overflow-hidden">
                    <img src={pages?.settings?.customerAvatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&fit=crop"} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>`;

content = content.replace(target1, replace1);
content = content.replace(target2, replace2);
fs.writeFileSync('src/pages/UserSubPages.tsx', content);
