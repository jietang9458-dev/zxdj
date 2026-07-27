const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const importTarget = `import { InvestDetail, NewsDetail, LearningArt, AuditionRegistration, GeneralRegistration, MyRegistrations, AuditionProjectList, ProjectDetails, ClassDetails } from './pages/SubPages';`;
const importReplacement = `import { InvestDetail, NewsDetail, LearningArt, AuditionRegistration, GeneralRegistration, MyRegistrations, AuditionProjectList, ProjectDetails, ClassDetails, VisitBooking } from './pages/SubPages';`;

content = content.replace(importTarget, importReplacement);

const routeTarget = `                    <Route path="/register" element={<GeneralRegistration />} />`;
const routeReplacement = `                    <Route path="/register" element={<GeneralRegistration />} />
                    <Route path="/visit-booking/:id" element={<VisitBooking />} />`;

content = content.replace(routeTarget, routeReplacement);

fs.writeFileSync('src/App.tsx', content);
