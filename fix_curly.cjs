const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

// Find the spot where I missed the `}`
// It looks like:
//               </div>
//             ))        </div>
//         <div className="bg-white dark:bg-[#2A1D0F] p-8 rounded-[32px] border border-gray-100 dark:border-white/5">
// Wait, I replaced it with `))` but the original might have had spaces or newlines.
// My replacement ended with `))`;

content = content.replace(
  /<\/div>\s*\)\)\s*<\/div>\s*<div className="bg-white dark:bg-\[#2A1D0F\] p-8/,
  `</div>\n            ))}\n        </div>\n        <div className="bg-white dark:bg-[#2A1D0F] p-8`
);

fs.writeFileSync('src/pages/SubPages.tsx', content);
