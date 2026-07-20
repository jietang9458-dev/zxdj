const fs = require('fs');
let code = fs.readFileSync('src/pages/UserSubPages.tsx', 'utf-8');

// Replace onChange={(e) => updateProfile({ nickname: e.target.value })}
//           onBlur={() => setEditing(null)}
// with     onBlur={() => setEditing(null)} />
code = code.replace(/nickname: e\.target\.value \}\})\s+onBlur\{\(\) => setEditing\(null\)\}/g, "nickname: e.target.value })}\n                  onBlur={() => setEditing(null)} />");

code = code.replace(/bio: e\.target\.value \}\})\s+onBlur\{\(\) => setEditing\(null\)\}/g, "bio: e.target.value })}\n                  onBlur={() => setEditing(null)} />");

fs.writeFileSync('src/pages/UserSubPages.tsx', code);
