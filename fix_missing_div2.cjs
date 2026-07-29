const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

content = content.replace(
  /            \)\)\}\n        <\/div>\n\n        <div className="bg-white dark:bg-\[#2A1D0F\] p-8/g,
  `            ))}\n          </div>\n        </div>\n\n        <div className="bg-white dark:bg-[#2A1D0F] p-8`
);

fs.writeFileSync('src/pages/SubPages.tsx', content);
