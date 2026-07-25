const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');
content = content.replace(
  'export function CopyrightLibrary() {\n  const { pages } = useCMS();',
  'export function CopyrightLibrary() {\n  const navigate = useNavigate();\n  const { pages } = useCMS();'
);
fs.writeFileSync('src/pages/SubPages.tsx', content);
