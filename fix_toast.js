const fs = require('fs');
let content = fs.readFileSync('src/pages/UserSubPages.tsx', 'utf-8');

if (!content.includes('缓存已清理完毕')) {
  content = content.replace(
    /        <\/div>\n      <\/div>\n    <\/div>\n  \);\n}\n\n\/\/ 5\. 帮助中心/,
    '        </div>\n      </div>\n      {showToast && (\n        <div className="fixed top-[40%] left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full text-[14px] font-bold shadow-xl z-[999]">\n          缓存已清理完毕\n        </div>\n      )}\n    </div>\n  );\n}\n\n// 5. 帮助中心'
  );
  fs.writeFileSync('src/pages/UserSubPages.tsx', content);
  console.log('Added toast to Settings');
}
