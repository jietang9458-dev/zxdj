const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add import
const importTarget = "SalesModel, CopyrightLibrary, CopyrightPublicity, FullCopyrightInstructions } from './pages/SubPages';";
const importReplacement = "SalesModel, CopyrightLibrary, CopyrightPublicity, FullCopyrightInstructions, ProjectDetails } from './pages/SubPages';";

content = content.replace(importTarget, importReplacement);

// Add route
const routeTarget = '<Route path="/copyright/library" element={<CopyrightLibrary />} />';
const routeReplacement = '<Route path="/copyright/library" element={<CopyrightLibrary />} />\n                    <Route path="/copyright/project/:id" element={<ProjectDetails />} />';

content = content.replace(routeTarget, routeReplacement);

fs.writeFileSync('src/App.tsx', content);
