const fs = require('fs');
let content = fs.readFileSync('src/pages/Copyright.tsx', 'utf-8');

const regexDynamic = /<div className="space-y-3">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}/;

const replacementDynamic = `<div className="space-y-3">
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#A69984]">已售罄短剧版权:</span>
            <ScrollingText items={pages.copyright?.salesDynamics?.soldOut ? pages.copyright.salesDynamics.soldOut.split('\\n').filter(Boolean) : ["暂无"]} />
          </div>
          <div className="flex justify-between items-center text-[13px]">
            <span className="text-[#A69984]">热销中短剧版权:</span>
            <ScrollingText items={pages.copyright?.salesDynamics?.hotSelling ? pages.copyright.salesDynamics.hotSelling.split('\\n').filter(Boolean) : ["暂无"]} />
          </div>
        </div>
      </div>
    </div>
  );
}`;

content = content.replace(regexDynamic, replacementDynamic);

fs.writeFileSync('src/pages/Copyright.tsx', content);
