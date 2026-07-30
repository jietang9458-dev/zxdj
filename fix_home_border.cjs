const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

const targetStr = `        <div className="bg-white dark:bg-[#2A1D0F] rounded-[40px] p-7 shadow-sm border border-gray-50 dark:border-white/5 grid grid-cols-3 gap-y-8 gap-x-2">`;
const replaceStr = `        <div className="bg-white dark:bg-[#2A1D0F] rounded-[40px] p-7 shadow-sm border-[0.5px] border-gray-200 dark:border-white/5 grid grid-cols-3 gap-y-8 gap-x-2">`;
content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/pages/Home.tsx', content);
