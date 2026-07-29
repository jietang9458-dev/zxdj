const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

content = content.replace(
  /\n\s*\}\)\)\}\n\s*<\/div>\n\s*<div className="bg-white dark:bg-\[#2A1D0F\] p-8/g,
  `\n            ))}\n          </div>\n        </div>\n        <div className="bg-white dark:bg-[#2A1D0F] p-8`
);

fs.writeFileSync('src/pages/SubPages.tsx', content);
