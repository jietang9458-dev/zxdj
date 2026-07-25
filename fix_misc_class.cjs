const fs = require('fs');
let content = fs.readFileSync('src/pages/MiscPages.tsx', 'utf-8');

const targetStr = `<div key={i} className="flex gap-4 p-4 bg-white dark:bg-[#2A1D0F] rounded-2xl shadow-sm border border-gray-50 dark:border-white/5">`;
const replacementStr = `<div key={i} onClick={() => navigate('/audition/class/' + i)} className="flex gap-4 p-4 bg-white dark:bg-[#2A1D0F] rounded-2xl shadow-sm border border-gray-50 dark:border-white/5 cursor-pointer active:scale-95 transition-transform">`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/pages/MiscPages.tsx', content);
