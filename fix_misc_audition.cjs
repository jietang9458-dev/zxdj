const fs = require('fs');
let content = fs.readFileSync('src/pages/MiscPages.tsx', 'utf-8');

content = content.replace(
  "onClick={() => navigate(item.id ? `/drama/${item.id}` : '#')} className=\"text-center group cursor-pointer\"",
  "onClick={() => navigate('/audition/projects')} className=\"text-center group cursor-pointer\""
);

fs.writeFileSync('src/pages/MiscPages.tsx', content);
