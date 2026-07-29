const fs = require('fs');

let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

// Fix CopyrightPurchase
const target1 = `        </div>

        <div className="bg-white dark:bg-[#2A1D0F] p-8 rounded-[32px] border border-gray-100 dark:border-white/5">
          <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-4">
            购买流程细节
          </h3>`;
const replace1 = `        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 mb-8">
          <div onClick={() => navigate('/copyright/rights')} className="bg-white dark:bg-[#2A1D0F] rounded-[24px] p-5 shadow-sm border border-gray-50 dark:border-white/5 cursor-pointer active:scale-95 transition-transform group">
            <h4 className="text-[15px] font-black text-[#1A1108] dark:text-white mb-1">购买版权的权益</h4>
            <p className="text-[12px] text-[#A69984] font-medium">了解作为联合制片人的专属权益</p>
          </div>
          <div onClick={() => navigate('/copyright/full-purchase-instructions')} className="bg-white dark:bg-[#2A1D0F] rounded-[24px] p-5 shadow-sm border border-gray-50 dark:border-white/5 cursor-pointer active:scale-95 transition-transform group">
            <h4 className="text-[15px] font-black text-[#1A1108] dark:text-white mb-1">全版权购买</h4>
            <p className="text-[12px] text-[#A69984] font-medium">全版权定制开发专属爆款短剧</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#2A1D0F] p-8 rounded-[32px] border border-gray-100 dark:border-white/5">
          <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-4">
            购买流程细节
          </h3>`;

content = content.replace(target1, replace1);

// Fix PurchaseInstructions header
const target2 = `  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <div className="p-6">
        <div className="bg-[#1A1108] dark:bg-[#2A1D0F] p-8 rounded-[32px] mb-8 text-center">
          <h2 className="text-[20px] font-black text-white mb-2">标准化版权购买流程</h2>
          <p className="text-[#A69984] text-[13px]">合规、透明、专业的一站式版权转让服务</p>
        </div>`;
const replace2 = `  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="购买须知及办法" dark />
      <div className="p-6">
        <div className="bg-[#1A1108] dark:bg-[#2A1D0F] p-8 rounded-[32px] mb-8 text-center">
          <h2 className="text-[20px] font-black text-white mb-2">标准化版权购买流程</h2>
          <p className="text-[#A69984] text-[13px]">合规、透明、专业的一站式版权转让服务</p>
        </div>`;

content = content.replace(target2, replace2);

// Fix FullCopyrightInstructions header
const target4 = `  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <div className="p-6">
        <div className="bg-[#1A1108] dark:bg-[#2A1D0F] p-8 rounded-[32px] mb-8 text-center">
          <h2 className="text-[20px] font-black text-white mb-2">全版权定制说明</h2>
          <p className="text-[#A69984] text-[13px]">打造属于您的专属爆款短剧</p>
        </div>`;
const replace4 = `  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="全版权购买说明" dark />
      <div className="p-6">
        <div className="bg-[#1A1108] dark:bg-[#2A1D0F] p-8 rounded-[32px] mb-8 text-center">
          <h2 className="text-[20px] font-black text-white mb-2">全版权定制说明</h2>
          <p className="text-[#A69984] text-[13px]">打造属于您的专属爆款短剧</p>
        </div>`;

content = content.replace(target4, replace4);

// Fix buttons at the end of both instructions
const targetEnd = `        </div>
      </div>
    </div>
  );
}`;
const replaceEnd = `        </div>
        <button 
          onClick={() => navigate('/help')}
          className="mt-10 w-full bg-[#8B6E4E] hover:bg-[#6A523A] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-lg shadow-[#8B6E4E]/20"
        >
          <MessageSquare size={18} />
          立即咨询
        </button>
      </div>
    </div>
  );
}`;
// Apply twice since there are two matches (PurchaseInstructions and FullCopyrightInstructions)
content = content.replace(targetEnd, replaceEnd);
content = content.replace(targetEnd, replaceEnd);

fs.writeFileSync('src/pages/SubPages.tsx', content);
