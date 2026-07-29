const fs = require('fs');
let content = fs.readFileSync('src/pages/BaseList.tsx', 'utf-8');

content = content.replace(
  /\{\(base\.tags \|\| \[\]\)\.map/g,
  `{(Array.isArray(base.tags) ? base.tags : (typeof base.tags === 'string' ? base.tags.split(',').map(t => t.trim()).filter(Boolean) : [])).map`
);

fs.writeFileSync('src/pages/BaseList.tsx', content);
