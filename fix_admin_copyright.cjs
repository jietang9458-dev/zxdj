const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const hotCopyrightsRegex = /<label className="text-\[11px\] font-bold text-\[#A69984\] ml-2 font-mono">[\s\S]*?<\/textarea>/g;

const newHotCopyrights = `<AdminListEditor 
                      title="热门可购版权"
                      items={copyrightData.hotCopyrights || [
                          { title: 'AI制作短剧', imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?q=80&w=400&h=600&fit=crop', desc: '每部短剧共50份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (A)0021 001~050' },
                          { title: '精品短剧', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&h=600&fit=crop', desc: '每部短剧共100份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (B)0101 001~100' },
                          { title: '明星短剧', imageUrl: 'https://images.unsplash.com/photo-1544208453-ca422f28b7e2?q=80&w=400&h=600&fit=crop', desc: '每部短剧共200份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (C)0201 001~200，注：明星演员的定义、标准和人选由中星影视生态链确定，版权购买方不存有异议。' },
                          { title: '互动影游', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&h=600&fit=crop', desc: '请联系中星影视生态链客服咨询详情。' }
                      ]}
                      onChange={(items: any) => setCopyrightData({...copyrightData, hotCopyrights: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '海报', type: 'image', aspectRatio: 3/4 },
                        { key: 'title', label: '标题', type: 'text' },
                        { key: 'desc', label: '文字介绍', type: 'textarea' }
                      ]}
                    />`;

content = content.replace(hotCopyrightsRegex, newHotCopyrights);

const purchaseInstructionsStr = `
                    <AdminListEditor 
                      title="购买须知及办法"
                      items={copyrightData.purchaseInstructions || [
                        { t: '购买须知', d: '购买版权是自己真实意愿的表达，共享收益，共担风险。版权购买需线下签订版权购买合同和版权授权协议，版权销售款不委托任何企业和个人代收，按照正式签订的合同里明确的收款方付款。签订合同时需要明确介绍人的姓名和电话。' },
                        { t: '选择版权', d: '在热销中短剧版权里，购买短剧版权号。版权库里的仅供参考，在截止该部短剧的版权销售开始筹备时，官方平台会即时公布版权号所对应的短剧内容，任何购买版权者不持有异议。' },
                        { t: '签署合约', d: '线下签署正式的版权购买合同和版权授权协议。' },
                        { t: '票房收益', d: '所购买的短剧版权的短剧上线后，根据播放平台的结算收益按照版权购买合同约定支付票房收益。' }
                      ]}
                      onChange={(items: any) => setCopyrightData({...copyrightData, purchaseInstructions: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 't', label: '标题', type: 'text' },
                        { key: 'd', label: '文字说明', type: 'textarea' }
                      ]}
                    />`;

content = content.replace('                    <AdminListEditor \n                      title="版权库内容管理"', purchaseInstructionsStr + '\n\n                    <AdminListEditor \n                      title="版权库内容管理"');

fs.writeFileSync('src/pages/Admin.tsx', content);
