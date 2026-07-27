const fs = require('fs');
let content = fs.readFileSync('src/pages/BaseDetail.tsx', 'utf-8');

// Replace tags handling
const tagsTarget = `  const tagsStr = base.tagsStr || '';
  const tags = tagsStr ? tagsStr.split(',').map((t: string) => t.trim()).filter(Boolean) : ['海景基地', '高级配套'];`;
const tagsReplacement = `  const tags = Array.isArray(base.tags) && base.tags.length > 0 ? base.tags : (base.tagsStr ? base.tagsStr.split(',').map((t: string) => t.trim()).filter(Boolean) : ['海景基地', '高级配套']);`;
content = content.replace(tagsTarget, tagsReplacement);

// Replace intro images handling
const introImgTarget = `          {base.introImage && (
            <div className="w-full rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-50 dark:border-white/5">
              <img src={base.introImage} className="w-full object-cover" alt="" />
            </div>
          )}`;
const introImgReplacement = `          {base.introImages && base.introImages.length > 0 ? (
            <div className={\`grid gap-2 mb-4 \${base.introImages.length === 1 ? 'grid-cols-1' : base.introImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}\`}>
              {base.introImages.map((img: string, idx: number) => (
                <div key={idx} className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-50 dark:border-white/5 aspect-square">
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
          ) : base.introImage && (
            <div className="w-full rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-50 dark:border-white/5">
              <img src={base.introImage} className="w-full object-cover" alt="" />
            </div>
          )}`;
content = content.replace(introImgTarget, introImgReplacement);

// Replace Visit booking navigate
const btnTarget = `<button className="flex-1 h-14 bg-[#8B6E4E] text-white font-black rounded-2xl shadow-xl shadow-[#8B6E4E]/30 active:scale-95 transition-all tracking-widest text-[16px]">
          预约参观
        </button>`;
const btnReplacement = `<button onClick={() => navigate(\`/visit-booking/\${base.id}\`)} className="flex-1 h-14 bg-[#8B6E4E] text-white font-black rounded-2xl shadow-xl shadow-[#8B6E4E]/30 active:scale-95 transition-all tracking-widest text-[16px]">
          预约参观
        </button>`;
content = content.replace(btnTarget, btnReplacement);

fs.writeFileSync('src/pages/BaseDetail.tsx', content);
