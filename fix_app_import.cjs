const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace("LearningArt, AuditionProjectList } from './pages/SubPages';", "LearningArt, AuditionProjectList, ProjectDetails } from './pages/SubPages';");
fs.writeFileSync('src/App.tsx', content);
