const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetLabel = `{ key: 'category', label: '所属类别 (如 文创产品)', type: 'text' }`;
const newLabel = `{ key: 'category', label: '所属类别 (如: 文创产品, 明星周边, 数字藏品)', type: 'text' }`;
content = content.replace(targetLabel, newLabel);

const targetPavilions = `            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <h3 className="font-black text-[#1A1108] px-2 mb-4">特色产品馆配置</h3>`;
              
const newPavilions = `            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="font-black text-[#1A1108] px-2 mb-4">商品大类海报配置 (文创产品 / 明星周边 / 数字藏品)</h3>
              <ListEditor 
                items={Object.keys(mallData.categories || {}).map(k => ({ id: k, ...mallData.categories[k] }))}
                onChange={(items: any) => {
                  const newCats: any = {};
                  items.forEach((it: any) => {
                    if(it.id) newCats[it.id] = it;
                  });
                  setMallData({...mallData, categories: newCats});
                }}
                setDialogState={setDialogState}
                schema={[
                  { key: 'id', label: '类别标识 (必须为: creative, star, 或 digital)', type: 'text' },
                  { key: 'title', label: '展示名称', type: 'text' },
                  { key: 'banner', label: '海报图片 (建议比例 2:1)', type: 'image', aspectRatio: 2/1 }
                ]}
              />
            </div>

            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <h3 className="font-black text-[#1A1108] px-2 mb-4">特色产品馆配置</h3>`;

content = content.replace(targetPavilions, newPavilions);

fs.writeFileSync('src/pages/Admin.tsx', content);
