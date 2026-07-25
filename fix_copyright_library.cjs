const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const targetLibrary = `<div className="grid grid-cols-2 gap-4 mb-10">
          {filtered.map((drama, i) => (
            <div key={i} className="bg-white dark:bg-[#2A1D0F] rounded-[28px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5 flex flex-col group cursor-pointer">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img src={drama.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-black border border-white/30 flex items-center gap-1">
                  <Clock size={10} /> 待售
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] line-clamp-1">{drama.title}</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#A69984] mt-1.5">
                  <LayoutList size={12} className="text-[#D4AF37]" />
                  <span>作品集数：80集</span>
                </div>
              </div>
            </div>
          ))}
        </div>`;

const newLibrary = `<div className="grid grid-cols-2 gap-4 mb-10">
          {filtered.map((drama, i) => (
            <div key={i} onClick={() => navigate('/copyright/project/' + i)} className="bg-white dark:bg-[#2A1D0F] rounded-[28px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5 flex flex-col group cursor-pointer">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img src={drama.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-black border border-white/30 flex items-center gap-1">
                  <Clock size={10} /> 待售
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] line-clamp-1">{drama.title}</h4>
              </div>
            </div>
          ))}
        </div>`;

content = content.replace(targetLibrary, newLibrary);

const projectDetailsComponent = `
export function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pages } = useCMS();
  const libraryItems = pages.copyright?.libraryItems || HOT_DRAMAS.concat(HOT_DRAMAS);
  const project = libraryItems[Number(id)] || libraryItems[0];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="项目介绍" dark />
      <div className="w-full aspect-[3/4] max-h-[60vh] overflow-hidden relative shadow-2xl">
        <img src={project.imageUrl} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-[28px] font-black text-white mb-2 leading-tight drop-shadow-md">{project.title}</h1>
        </div>
      </div>
      
      <div className="p-6 -mt-4 relative z-10 space-y-6">
        <div className="bg-white dark:bg-[#2A1D0F] p-6 rounded-[28px] shadow-sm border border-gray-50 dark:border-white/5">
          <h3 className="text-[16px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-3 flex items-center gap-2">
            <FileText className="text-[#D4AF37]" size={18} />
            故事梗概
          </h3>
          <p className="text-[14px] text-[#4A443E] dark:text-[#A69984] leading-relaxed whitespace-pre-line">
            {project.synopsis || "暂无故事梗概"}
          </p>
        </div>

        <div className="bg-white dark:bg-[#2A1D0F] p-6 rounded-[28px] shadow-sm border border-gray-50 dark:border-white/5">
          <h3 className="text-[16px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-3 flex items-center gap-2">
            <Info className="text-[#D4AF37]" size={18} />
            相关介绍
          </h3>
          <p className="text-[14px] text-[#4A443E] dark:text-[#A69984] leading-relaxed whitespace-pre-line">
            {project.desc || "暂无相关介绍"}
          </p>
        </div>
      </div>
    </div>
  );
}
`;

content = content.replace("export function CopyrightPublicity() {", projectDetailsComponent + "\nexport function CopyrightPublicity() {");

const importReactRouter = "import { useNavigate } from 'react-router-dom';";
if (content.includes(importReactRouter) && !content.includes("useParams")) {
  content = content.replace(importReactRouter, "import { useNavigate, useParams } from 'react-router-dom';");
}

fs.writeFileSync('src/pages/SubPages.tsx', content);
