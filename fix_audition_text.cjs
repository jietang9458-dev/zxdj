const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const oldText = `{auditionEmail}
              </span>
            </div>`;
const newText = `{auditionEmail}
              </span>。
            </div>`;
content = content.replace(oldText, newText);

fs.writeFileSync('src/pages/SubPages.tsx', content);
