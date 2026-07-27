const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const newComponent = `
export function AuditionProjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pages } = useCMS();
  const actorsData = pages.actors || {};
  const auditions = actorsData.auditions && actorsData.auditions.length > 0 ? actorsData.auditions : [
    {
      id: '1',
      title: '逆袭之星途璀璨',
      imageUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400&h=600&fit=crop',
      desc: '一部讲述草根少女通过努力一步步攀登演艺巅峰的励志短剧。',
      requirement: '形象气质佳，演技自然，有舞蹈基础者优先。',
      date: '海选截止：2024-07-30'
    }
  ];
  
  // Try finding by id, otherwise index if id is numeric, otherwise just pick first
  const project = auditions.find((a: any) => a.id === id) || (isNaN(Number(id)) ? auditions[0] : auditions[Number(id)]) || auditions[0];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-screen pb-24 transition-colors duration-300">
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
            招募要求
          </h3>
          <p className="text-[14px] text-[#4A443E] dark:text-[#A69984] leading-relaxed">
            {project.requirement || "暂无招募要求"}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-50 dark:border-white/5">
            <span className="text-[11px] text-[#A69984] font-black">{project.date}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2A1D0F] p-6 rounded-[28px] shadow-sm border border-gray-50 dark:border-white/5">
          <h3 className="text-[16px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-3 flex items-center gap-2">
            <FileText className="text-[#D4AF37]" size={18} />
            项目介绍
          </h3>
          {project.introImages && project.introImages.length > 0 && (
            <div className={\`grid gap-2 mb-4 \${project.introImages.length === 1 ? 'grid-cols-1' : project.introImages.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}\`}>
              {project.introImages.map((img: string, idx: number) => (
                <div key={idx} className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-50 dark:border-white/5 aspect-square">
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </div>
              ))}
            </div>
          )}
          <p className="text-[14px] text-[#4A443E] dark:text-[#A69984] leading-relaxed whitespace-pre-wrap">
            {project.introText || project.desc || "暂无项目介绍"}
          </p>
        </div>
      </div>
      
      {/* Fixed bottom action */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent dark:from-[#1A1108] dark:via-[#1A1108] z-50">
        <button 
          onClick={() => navigate('/audition/registration')}
          className="w-full h-14 bg-[#1A1108] dark:bg-[#D4AF37] text-white dark:text-[#1A1108] font-black rounded-2xl shadow-xl active:scale-95 transition-all text-[16px] flex items-center justify-center gap-2"
        >
          我要参演
        </button>
      </div>
    </div>
  );
}
`;

content = content + "\n" + newComponent;
fs.writeFileSync('src/pages/SubPages.tsx', content);
