const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const targetStr = `onClick={() => navigate('/audition/registration')}
          className="w-full mt-8 h-14 bg-[#1A1108] text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all text-[16px] flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={20} />
          我要报名`;

const replacementStr = `onClick={() => navigate('/register')}
          className="w-full mt-8 h-14 bg-[#1A1108] text-white font-black rounded-2xl shadow-xl active:scale-95 transition-all text-[16px] flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={20} />
          我要报名`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/pages/SubPages.tsx', content);
