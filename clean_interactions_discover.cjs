const fs = require('fs');

let content = fs.readFileSync('src/pages/Discover.tsx', 'utf-8');

// Remove interactions state and functions
content = content.replace(/const \[interactions, setInteractions\] = useState<any>\(\{\}\);\n/, '');
content = content.replace(/const \[expandedComments, setExpandedComments\] = useState<string\[\]>\(\[\]\);\n/, '');
content = content.replace(/const \[isPosting, setIsPosting\] = useState\(false\);\n/, '');
content = content.replace(/const \[postContent, setPostContent\] = useState\(''\);\n/, '');
content = content.replace(/const \[postImage, setPostImage\] = useState\(''\);\n/, '');
content = content.replace(/const \[shareToast, setShareToast\] = useState\(false\);\n/, '');
content = content.replace(/const fileInputRef = useRef<HTMLInputElement>\(null\);\n/, '');

// The fetch interactions useEffect
const interactionEffectRegex = /useEffect\(\(\) => \{[\s\S]*?fetch\(`\/api\/interactions`\)[\s\S]*?\} \}, \[\]\);/;
content = content.replace(interactionEffectRegex, '');

// The handlers
const handleImageUploadRegex = /const handleImageUpload =[\s\S]*?e\.target\.value = '';\n  \};\n/;
content = content.replace(handleImageUploadRegex, '');

const handleCreatePostRegex = /const handleCreatePost =[\s\S]*?alert\('发布失败，请重试'\);\n    \}\n  \};\n/;
content = content.replace(handleCreatePostRegex, '');

const handleLikeV2Regex = /const handleLikeV2 = async[\s\S]*?catch\(e => console\.error\(e\)\);\n  \};\n/;
content = content.replace(handleLikeV2Regex, '');

const handleReplyV2Regex = /const handleReplyV2 = async[\s\S]*?catch\(e => console\.error\(e\)\);\n  \};\n/;
content = content.replace(handleReplyV2Regex, '');

const handleShareRegex = /const handleShare = \(\) => \{[\s\S]*?setShareToast\(false\), 2000\);\n  \};\n/;
content = content.replace(handleShareRegex, '');

// Remove interactions parsing in the map block
content = content.replace(/const inter = interactions\[post\.id\][\s\S]*?const isExpanded = expandedComments\.includes\(post\.id\);\n/, '');

// Remove floating post box
const floatingPostBoxRegex = /\{activeTab === '互动交流' && \([\s\S]*?<\/motion\.div>\n          \)\}/;
content = content.replace(floatingPostBoxRegex, '');

fs.writeFileSync('src/pages/Discover.tsx', content);
