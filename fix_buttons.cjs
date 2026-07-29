const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const targetPurchaseInst = `        <div className="mt-10 p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-500/20">
          <h5 className="text-[14px] font-black text-orange-800 dark:text-orange-400 mb-2">特别提醒</h5>
          <p className="text-[12px] text-orange-700 dark:text-orange-300 leading-relaxed font-bold">
            所有版权交易均与中星影视生态链官方产生。如遇私下交易请及时反馈和投诉，私下交易产生的所有风险，平台概不负责，同时平台保留追究法律责任的权利。
          </p>
        </div>
      </div>
    </div>
  );
}`;

const replacePurchaseInst = `        <div className="mt-10 p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-500/20">
          <h5 className="text-[14px] font-black text-orange-800 dark:text-orange-400 mb-2">特别提醒</h5>
          <p className="text-[12px] text-orange-700 dark:text-orange-300 leading-relaxed font-bold">
            所有版权交易均与中星影视生态链官方产生。如遇私下交易请及时反馈和投诉，私下交易产生的所有风险，平台概不负责，同时平台保留追究法律责任的权利。
          </p>
        </div>
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

content = content.replace(targetPurchaseInst, replacePurchaseInst);

const targetFullCopyright = `            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

const replaceFullCopyright = `            </div>
          ))}
        </div>
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

content = content.replace(targetFullCopyright, replaceFullCopyright);

fs.writeFileSync('src/pages/SubPages.tsx', content);
