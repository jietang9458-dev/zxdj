const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetSelect = `) : field.type === 'textarea' ? (`;
const replaceSelect = `) : field.type === 'select' ? (
                <select 
                  value={data[field.key] || (field.options?.[0]?.value || '')}
                  onChange={(e) => setData({...data, [field.key]: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200"
                >
                  {field.options?.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (`;
content = content.replace(targetSelect, replaceSelect);

const targetCategoryAdmin = `{ key: 'cat', label: '所属类目 (填写上面配置的类目)', type: 'text' },`;
const replaceCategoryAdmin = `{ key: 'cat', label: '所属类目', type: 'select', options: (copyrightData.libraryCategories || [{name:'现代都市'},{name:'古装玄幻'},{name:'悬疑惊悚'},{name:'年代励志'}]).map((c: any) => ({ label: c.name, value: c.name })) },`;
content = content.replace(targetCategoryAdmin, replaceCategoryAdmin);

fs.writeFileSync('src/pages/Admin.tsx', content);
