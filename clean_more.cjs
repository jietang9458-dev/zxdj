const fs = require('fs');

let content = fs.readFileSync('src/pages/Discover.tsx', 'utf-8');

// Remove useEffect
content = content.replace(/useEffect\(\(\) => \{\n    fetchData\(\);\n  \}, \[activeTab\]\);\n/, '');

// Remove fetchData
const fetchDataRegex = /const fetchData = async \(\) => \{[\s\S]*?\}\n  \};\n/;
content = content.replace(fetchDataRegex, '');

// Remove interactions state (if any left)
content = content.replace(/const \[interactions, setInteractions\] = useState<Record<string, any>>\(\{\}\);\n/, '');

// Remove crop image stuff and upsert stuff
const handleCropRegex = /const \[cropImageSrc, setCropImageSrc\] = useState<string \| null>\(null\);\n[\s\S]*?setCropImageSrc\(null\);\n  \};\n/
content = content.replace(handleCropRegex, '');

const handleUpsertRegex = /const handleUpsertInteraction = async[\s\S]*?\}\n  \};\n/
content = content.replace(handleUpsertRegex, '');

fs.writeFileSync('src/pages/Discover.tsx', content);
