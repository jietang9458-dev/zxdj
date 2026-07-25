const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');
content = content.replace("import { useNavigate } from 'react-router-dom';", "import { useNavigate, useParams } from 'react-router-dom';");
fs.writeFileSync('src/pages/SubPages.tsx', content);
