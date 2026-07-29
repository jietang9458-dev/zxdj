const fs = require('fs');

let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

content = content.replace("const navigate = require('react-router-dom').useNavigate();", "const navigate = useNavigate();");
content = content.replace("const navigate = require('react-router-dom').useNavigate();", "const navigate = useNavigate();");
content = content.replace("const { pages } = require('../context/CMSContext').useCMS();", "const { pages } = useCMS();");
content = content.replace("const { pages } = require('../context/CMSContext').useCMS();", "const { pages } = useCMS();");

fs.writeFileSync('src/pages/SubPages.tsx', content);
