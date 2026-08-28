const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');
content = content.replace("</ImageUploadButton>\n                    </div>\n                  </div>\n                </div>\n              </div>", "</MediaUploadButton>\n                    </div>\n                  </div>\n                </div>\n              </div>");
// A more aggressive replace for the mismatched tag
content = content.replace(/<\/ImageUploadButton>(\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* Save Button \*\/})/g, "</MediaUploadButton>$1");
fs.writeFileSync('src/pages/Admin.tsx', content);
