const fs = require('fs');

let content = fs.readFileSync('src/pages/Discover.tsx', 'utf-8');

// The interactions block
const interactionStart = `                  {/* Interactions */}`;
const commentsSectionStart = `                  {/* Comments Section */}`;

// Let's remove everything from {/* Interactions */} to </motion.div> (end of post)
// But we need to make sure we don't break the map block.
// The map block ends with:
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               );

content = content.replace(/\{\/\* Interactions \*\/\}[\s\S]*?\{\/\* Comments Section \*\/\}[\s\S]*?<\/AnimatePresence>\n                <\/motion\.div>/g, '</motion.div>');

// Remove floating action button and share toast
content = content.replace(/\{\/\* Floating Action Button \*\/\}[\s\S]*?\{\/\* Share Toast \*\/\}[\s\S]*?\{\/\* Post Modal \*\/\}[\s\S]*?<\/AnimatePresence>\n    <\/div>\n  \);\n\}/, '    </div>\n  );\n}');

// Remove ReplyForm function
content = content.replace(/function ReplyForm\(\{ onReply \}: \{ onReply: \(text: string, img: string\) => void \}\) \{[\s\S]*?\n\}/, '');

fs.writeFileSync('src/pages/Discover.tsx', content);
