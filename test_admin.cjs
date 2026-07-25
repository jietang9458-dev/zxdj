const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');
if (!content.includes('热门可购版权') || !content.includes('购买须知及办法')) {
  console.log('Error: missing strings');
} else {
  console.log('Success: Admin.tsx updated');
}
