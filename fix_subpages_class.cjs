const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const classDetailsComponent = `
export function ClassDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pages } = useCMS();
  const actorsData = pages.actors || {};
  const classes = actorsData.classes || [
    { title: '少儿演艺周末班', desc: '形体、台词、表演基础', date: '每月初开班', imageUrl: 'https://images.unsplash.com/photo-1544208453-ca422f28b7e2?w=100&h=100&fit=crop', details: '通过科学的课程体系，培养孩子的艺术表现力和自信心。' },
    { title: '青年演员特训营', desc: '剧组实战、进阶表演', date: '寒暑假开班', imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=100&h=100&fit=crop', details: '为有志于演艺事业的青年提供专业的进阶培训，直接对接剧组资源。' }
  ];
  const classInfo = classes[Number(id)] || classes[0];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="详细介绍" dark />
      <div className="w-full aspect-[16/9] max-h-[40vh] overflow-hidden relative shadow-2xl">
        <img src={classInfo.imageUrl} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-[12px] text-[#D4AF37] font-bold mb-2 bg-[#D4AF37]/20 px-3 py-1 rounded-full inline-block backdrop-blur-md border border-[#D4AF37]/30">
            {classInfo.date}
          </div>
          <h1 className="text-[24px] font-black text-white mb-1 leading-tight drop-shadow-md">{classInfo.title}</h1>
        </div>
      </div>
      
      <div className="p-6 -mt-4 relative z-10 space-y-6">
        <div className="bg-white dark:bg-[#2A1D0F] p-6 rounded-[28px] shadow-sm border border-gray-50 dark:border-white/5">
          <h3 className="text-[16px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-3 flex items-center gap-2">
            <Info className="text-[#D4AF37]" size={18} />
            详细介绍
          </h3>
          <p className="text-[14px] text-[#4A443E] dark:text-[#A69984] leading-relaxed whitespace-pre-line">
            {classInfo.details || classInfo.desc || "暂无相关介绍"}
          </p>
        </div>

        <button 
          onClick={() => navigate('/audition/registration')}
          className="w-full mt-8 h-14 bg-[#1A1108] text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all text-[16px] flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={20} />
          我要报名
        </button>
      </div>
    </div>
  );
}
`;

content = content.replace("export function AuditionProjectList() {", classDetailsComponent + "\nexport function AuditionProjectList() {");

fs.writeFileSync('src/pages/SubPages.tsx', content);
