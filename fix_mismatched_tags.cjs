const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// Change ALL </MediaUploadButton> back to </ImageUploadButton>
content = content.replace(/<\/MediaUploadButton>/g, '</ImageUploadButton>');

// Now find the opening <MediaUploadButton and properly close it
content = content.replace(
  /<MediaUploadButton([\s\S]*?)<\/ImageUploadButton>/, 
  '<MediaUploadButton$1</MediaUploadButton>'
);

fs.writeFileSync('src/pages/Admin.tsx', content);
