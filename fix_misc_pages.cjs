const fs = require('fs');
let content = fs.readFileSync('src/pages/MiscPages.tsx', 'utf-8');

content = content.replace(
  '<Header title={pageData.title || "制作发行中心"} dark />',
  '<Header title={pageData.headerTitle || "制作发行中心"} dark />'
);

content = content.replace(
  '<Header title={pageData.title || "明星演员孵化中心"} dark />',
  '<Header title={pageData.headerTitle || "明星演员孵化中心"} dark />'
);

fs.writeFileSync('src/pages/MiscPages.tsx', content);
