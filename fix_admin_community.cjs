const fs = require('fs');

let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// Remove import
content = content.replace(/import CommunityManager from "\.\.\/components\/CommunityManager";\n/, '');

// Remove community tab definition
content = content.replace(/ \{ id: 'community', label: '社区审核', icon: MessageSquare \},/, '');

// Remove community tab rendering
content = content.replace(/\{activeTab === 'community' && <CommunityManager \/>\}/, '');

fs.writeFileSync('src/pages/Admin.tsx', content);
