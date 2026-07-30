const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const targetList = `<AdminListEditor 
                      title="版权库内容管理"
                      items={copyrightData.libraryItems || []}
                      onChange={(items: any) => setCopyrightData({...copyrightData, libraryItems: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '海报 (建议3:4)', type: 'image', aspectRatio: 3/4 },
                        { key: 'title', label: '片名 (必填)', type: 'text' },
                        { key: 'synopsis', label: '故事梗概', type: 'textarea' },
                        { key: 'desc', label: '相关介绍', type: 'textarea' }
                      ]}
                    />`;
                    
const replaceList = `<AdminListEditor 
                      title="版权库类目管理"
                      items={copyrightData.libraryCategories || [
                        { name: '现代都市' },
                        { name: '古装玄幻' },
                        { name: '悬疑惊悚' },
                        { name: '年代励志' }
                      ]}
                      onChange={(items: any) => setCopyrightData({...copyrightData, libraryCategories: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'name', label: '类目名称', type: 'text' }
                      ]}
                    />
                    <AdminListEditor 
                      title="版权库内容管理"
                      items={copyrightData.libraryItems || []}
                      onChange={(items: any) => setCopyrightData({...copyrightData, libraryItems: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '海报 (建议3:4)', type: 'image', aspectRatio: 3/4 },
                        { key: 'title', label: '片名 (必填)', type: 'text' },
                        { key: 'cat', label: '所属类目 (填写上面配置的类目)', type: 'text' },
                        { key: 'synopsis', label: '故事梗概', type: 'textarea' },
                        { key: 'desc', label: '相关介绍', type: 'textarea' }
                      ]}
                    />`;

content = content.replace(targetList, replaceList);
fs.writeFileSync('src/pages/Admin.tsx', content);
