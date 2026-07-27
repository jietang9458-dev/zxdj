const fs = require('fs');
let content = fs.readFileSync('src/pages/MiscPages.tsx', 'utf-8');

// Separate Page Title
content = content.replace(`title={pageData.title || "影视文化旅游中心"}`, `title={pageData.pageTitle || "影视文化旅游中心"}`);

// Fix "拍摄体验" link
content = content.replace(`{ l: '拍摄体验', Icon: Film, path: '/tourism/experience' }`, `{ l: '拍摄体验', Icon: Film, path: '/audition/projects' }`);

fs.writeFileSync('src/pages/MiscPages.tsx', content);
