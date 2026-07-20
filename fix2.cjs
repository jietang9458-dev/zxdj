const fs = require('fs');
let code = fs.readFileSync('src/pages/UserSubPages.tsx', 'utf-8');

code = code.replace(/\) : \(\s*\)/g, ') : (\n            <div className="text-center text-gray-400 font-bold py-10">暂无收藏</div>\n          )');

fs.writeFileSync('src/pages/UserSubPages.tsx', code);
