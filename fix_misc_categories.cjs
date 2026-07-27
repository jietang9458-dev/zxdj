const fs = require('fs');

// SubPages: replace all
let subPagesContent = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');
subPagesContent = subPagesContent.replace(/onClick=\{\(\) => navigate\('\/register'\)\}/g, "onClick={() => navigate('/register?type=培训报名表')}");
subPagesContent = subPagesContent.replace(/onClick=\{\(\) => navigate\('\/audition\/registration'\)\}/g, "onClick={() => navigate('/audition/registration?type=参演报名表')}");
subPagesContent = subPagesContent.replace(/onClick=\{\(e\) => \{\n\s*e.stopPropagation\(\);\n\s*navigate\('\/audition\/registration'\);\n\s*\}\}/g, "onClick={(e) => { e.stopPropagation(); navigate('/audition/registration?type=海选报名表'); }}");
fs.writeFileSync('src/pages/SubPages.tsx', subPagesContent);

// MiscPages: replace all
let miscPagesContent = fs.readFileSync('src/pages/MiscPages.tsx', 'utf-8');
// For Tourism: '旅游报名表'
miscPagesContent = miscPagesContent.replace(/onClick=\{\(\) => navigate\('\/register'\)\}/g, "onClick={() => navigate('/register?type=旅游报名表')}");
fs.writeFileSync('src/pages/MiscPages.tsx', miscPagesContent);

// Details.tsx
let detailsContent = fs.readFileSync('src/pages/Details.tsx', 'utf-8');
detailsContent = detailsContent.replace(/onClick=\{\(\) => navigate\('\/audition\/registration'\)\}/g, "onClick={() => navigate('/audition/registration?type=参演报名表')}");
fs.writeFileSync('src/pages/Details.tsx', detailsContent);

