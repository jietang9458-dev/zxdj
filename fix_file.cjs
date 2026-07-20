const fs = require('fs');
let code = fs.readFileSync('src/pages/UserSubPages.tsx', 'utf-8');

// Fix input tags that are missing /> after onBlur={() => setEditing(null)}
// Let's use regex to find `<input ... onBlur={() => setEditing(null)}` followed by `\s*\) : \(`
code = code.replace(/onBlur=\{\(\) => setEditing\(null\)\}\s*\) : \(/g, "onBlur={() => setEditing(null)} />\n              ) : (");

fs.writeFileSync('src/pages/UserSubPages.tsx', code);
