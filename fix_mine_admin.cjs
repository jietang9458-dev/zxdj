const fs = require('fs');
let content = fs.readFileSync('src/pages/Mine.tsx', 'utf-8');

// The block to remove is:
/*
      {/* Admin Portal Entry *\/}
      <div className="flex justify-center pb-12">
        <button 
          onClick={() => {
            // Forcing navigation outside the mobile layout via window location
            // so that if they were inside iframe, it hard-reloads the layout
            window.location.href = '/admin';
          }} 
          className="text-[11px] text-[#A69984] font-medium opacity-50 hover:opacity-100 transition-opacity"
        >
          - 电脑版后台管理入口 -
        </button>
      </div>
*/

content = content.replace(/\{\/\* Admin Portal Entry \*\/\}[\s\S]*?<\/div>/, '');

fs.writeFileSync('src/pages/Mine.tsx', content);
