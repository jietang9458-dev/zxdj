const fs = require('fs');

// Update App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf-8');
const appImportTarget = `AuditionProjectList, ProjectDetails, ClassDetails , VisitBooking } from './pages/SubPages';`;
const appImportReplacement = `AuditionProjectList, ProjectDetails, ClassDetails , VisitBooking, AuditionProjectDetail } from './pages/SubPages';`;
appContent = appContent.replace(appImportTarget, appImportReplacement);

const appRouteTarget = `<Route path="/audition/projects" element={<AuditionProjectList />} />`;
const appRouteReplacement = `<Route path="/audition/projects" element={<AuditionProjectList />} />\n                    <Route path="/audition/project/:id" element={<AuditionProjectDetail />} />`;
appContent = appContent.replace(appRouteTarget, appRouteReplacement);
fs.writeFileSync('src/App.tsx', appContent);

// Update SubPages.tsx inside AuditionProjectList
let subContent = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');
const clickTarget = `onClick={() => navigate(project.id ? \`/drama/\${project.id}\` : '#')}`;
const clickReplacement = `onClick={() => navigate(\`/audition/project/\${project.id || index}\`)}`;
subContent = subContent.replace(clickTarget, clickReplacement);
fs.writeFileSync('src/pages/SubPages.tsx', subContent);

