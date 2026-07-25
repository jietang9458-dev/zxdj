const fs = require('fs');
let content = fs.readFileSync('src/pages/Copyright.tsx', 'utf-8');

// Fix Header title
content = content.replace(
  '<Header title={pageData.title || "版权营销中心"} dark />',
  '<Header title={pageData.headerTitle || pageData.title || "版权营销中心"} dark />'
);

// Fix navigation for live streaming
content = content.replace(
  'onClick={() => navigate(`/drama/${drama.id || idx}?live=true`)}',
  'onClick={() => navigate(`/live`)}'
);

fs.writeFileSync('src/pages/Copyright.tsx', content);
