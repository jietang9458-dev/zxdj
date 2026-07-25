const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const targetStr = `export function PurchaseInstructions() {
  const steps = [
    { t: '购买须知', d: '购买版权是自己真实意愿的表达，共享收益，共担风险。版权购买需线下签订版权购买合同和版权授权协议，版权销售款不委托任何企业和个人代收，按照正式签订的合同里明确的收款方付款。签订合同时需要明确介绍人的姓名和电话。' },
    { t: '选择版权', d: '在热销中短剧版权里，购买短剧版权号。版权库里的仅供参考，在截止该部短剧的版权销售开始筹备时，官方平台会即时公布版权号所对应的短剧内容，任何购买版权者不持有异议。' },
    { t: '签署合约', d: '线下签署正式的版权购买合同和版权授权协议。' },
    { t: '票房收益', d: '所购买的短剧版权的短剧上线后，根据播放平台的结算收益按照版权购买合同约定支付票房收益。' }
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="购买须知及办法" dark />
      <div className="p-6">
        <div className="bg-[#1A1108] dark:bg-[#2A1D0F] p-8 rounded-[32px] mb-8 text-center">
          <Info className="text-[#D4AF37] mx-auto mb-4" size={40} />
          <h2 className="text-[20px] font-black text-white mb-2">标准化版权购买流程</h2>
          <p className="text-[#A69984] text-[13px]">合规、透明、专业的一站式版权转让服务</p>
        </div>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-white dark:bg-[#2A1D0F] p-6 rounded-[24px] shadow-sm border border-gray-50 dark:border-white/5 relative overflow-hidden">
              <div className="absolute -left-2 -top-2 w-12 h-12 bg-[#FAF5EE] dark:bg-black/20 rounded-full flex items-center justify-center -rotate-12">
                <span className="text-[20px] font-black text-[#D4AF37] opacity-20">{i + 1}</span>
              </div>
              <h4 className="text-[16px] font-black text-[#1A1108] dark:text-white mb-2 relative z-10">{s.t}</h4>
              <p className="text-[13px] text-[#4A443E] dark:text-[#A69984] leading-relaxed font-medium relative z-10">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-500/20">
          <h5 className="text-[14px] font-black text-orange-800 dark:text-orange-400 mb-2">特别提醒</h5>
          <p className="text-[12px] text-orange-700 dark:text-orange-300 leading-relaxed font-bold">
            所有版权交易均与中星影视生态链官方产生。如遇私下交易请及时反馈和投诉，私下交易产生的所有风险，平台概不负责，同时平台保留追究法律责任的权利。
          </p>
        </div>
      </div>
    </div>
  );
}`;

const replacementStr = `export function PurchaseInstructions() {
  const navigate = useNavigate();
  const { pages } = useCMS();
  const steps = pages.copyright?.purchaseInstructions || [
    { t: '购买须知', d: '购买版权是自己真实意愿的表达，共享收益，共担风险。版权购买需线下签订版权购买合同和版权授权协议，版权销售款不委托任何企业和个人代收，按照正式签订的合同里明确的收款方付款。签订合同时需要明确介绍人的姓名和电话。' },
    { t: '选择版权', d: '在热销中短剧版权里，购买短剧版权号。版权库里的仅供参考，在截止该部短剧的版权销售开始筹备时，官方平台会即时公布版权号所对应的短剧内容，任何购买版权者不持有异议。' },
    { t: '签署合约', d: '线下签署正式的版权购买合同和版权授权协议。' },
    { t: '票房收益', d: '所购买的短剧版权的短剧上线后，根据播放平台的结算收益按照版权购买合同约定支付票房收益。' }
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="购买须知及办法" dark />
      <div className="p-6">
        <div className="bg-[#1A1108] dark:bg-[#2A1D0F] p-8 rounded-[32px] mb-8 text-center">
          <Info className="text-[#D4AF37] mx-auto mb-4" size={40} />
          <h2 className="text-[20px] font-black text-white mb-2">标准化版权购买流程</h2>
          <p className="text-[#A69984] text-[13px]">合规、透明、专业的一站式版权转让服务</p>
        </div>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-white dark:bg-[#2A1D0F] p-6 rounded-[24px] shadow-sm border border-gray-50 dark:border-white/5 relative overflow-hidden">
              <div className="absolute -left-2 -top-2 w-12 h-12 bg-[#FAF5EE] dark:bg-black/20 rounded-full flex items-center justify-center -rotate-12">
                <span className="text-[20px] font-black text-[#D4AF37] opacity-20">{i + 1}</span>
              </div>
              <h4 className="text-[16px] font-black text-[#1A1108] dark:text-white mb-2 relative z-10">{s.t}</h4>
              <p className="text-[13px] text-[#4A443E] dark:text-[#A69984] leading-relaxed font-medium relative z-10">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-500/20">
          <h5 className="text-[14px] font-black text-orange-800 dark:text-orange-400 mb-2">特别提醒</h5>
          <p className="text-[12px] text-orange-700 dark:text-orange-300 leading-relaxed font-bold">
            所有版权交易均与中星影视生态链官方产生。如遇私下交易请及时反馈和投诉，私下交易产生的所有风险，平台概不负责，同时平台保留追究法律责任的权利。
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/help')}
          className="mt-6 w-full bg-[#8B6E4E] hover:bg-[#6A523A] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <MessageSquare size={18} />
          立即咨询
        </button>
      </div>
    </div>
  );
}`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/pages/SubPages.tsx', content);
