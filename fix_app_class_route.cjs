const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const importTarget = "AuditionProjectList, ProjectDetails } from './pages/SubPages';";
const importReplacement = "AuditionProjectList, ProjectDetails, ClassDetails } from './pages/SubPages';";
content = content.replace(importTarget, importReplacement);

const routeTarget = '<Route path="/audition/learning" element={<LearningArt />} />';
const routeReplacement = '<Route path="/audition/learning" element={<LearningArt />} />\n                    <Route path="/audition/class/:id" element={<ClassDetails />} />';
content = content.replace(routeTarget, routeReplacement);

fs.writeFileSync('src/App.tsx', content);
