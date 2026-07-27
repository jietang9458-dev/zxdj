const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const target = `              ) : field.type === 'textarea' ? (`;
const replacement = `              ) : field.type === 'tag_list' ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {(data[field.key] || []).map((tag, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-[13px] rounded-xl flex items-center gap-1">
                        {tag}
                        <button onClick={() => {
                          const newArr = [...data[field.key]];
                          newArr.splice(idx, 1);
                          setData({...data, [field.key]: newArr});
                        }} className="text-gray-400 hover:text-red-500"><X size={14}/></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="输入新标签 (回车添加)" 
                      id={\`tag-input-\${field.key}\`}
                      className="flex-1 px-4 py-2 bg-gray-50 rounded-xl outline-none text-[13px] focus:ring-2 ring-orange-200"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const val = e.currentTarget.value.trim();
                          if (val) {
                            const newArr = [...(data[field.key] || []), val];
                            setData({...data, [field.key]: newArr});
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        const input = document.getElementById(\`tag-input-\${field.key}\`);
                        const val = input.value.trim();
                        if (val) {
                          const newArr = [...(data[field.key] || []), val];
                          setData({...data, [field.key]: newArr});
                          input.value = '';
                        }
                      }}
                      className="px-4 py-2 bg-[#1A1108] text-white rounded-xl text-[13px] font-bold"
                    >
                      添加
                    </button>
                  </div>
                </div>
              ) : field.type === 'image_list' ? (
                <div className="grid grid-cols-3 gap-3">
                  {(data[field.key] || []).map((imgUrl, idx) => (
                    <div key={idx} className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden group">
                      <img src={imgUrl} className="w-full h-full object-cover" alt="" />
                      <button 
                        onClick={() => {
                          const newArr = [...data[field.key]];
                          newArr.splice(idx, 1);
                          setData({...data, [field.key]: newArr});
                        }}
                        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      ><X size={14}/></button>
                    </div>
                  ))}
                  {(!data[field.key] || data[field.key].length < (field.maxCount || 9)) && (
                    <ImageUploadButton 
                      value=""
                      onChange={(val) => {
                        const newArr = [...(data[field.key] || [])];
                        newArr.push(val);
                        setData({...data, [field.key]: newArr});
                      }}
                      className="w-full aspect-square"
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100 cursor-pointer min-h-[100px]">
                        <Upload size={20} className="text-gray-400 mb-1" />
                        <span className="text-[11px] text-gray-400 font-bold">上传图片</span>
                        <span className="text-[10px] text-gray-400">({data[field.key]?.length || 0}/{field.maxCount || 9})</span>
                      </div>
                    </ImageUploadButton>
                  )}
                </div>
              ) : field.type === 'textarea' ? (`;

content = content.replace(target, replacement);

const fieldsTarget = `        fields: [
          { key: 'imageUrl', label: '基地图片', type: 'image', aspectRatio: 16/9 },
          { key: 'title', label: '基地名称', type: 'text' },
          { key: 'location', label: '地点描述', type: 'text' },
          { key: 'region', label: '大区 (如 华南)', type: 'text' },
          { key: 'tagsStr', label: '标签 (逗号分隔)', type: 'text' },
          { key: 'introImage', label: '基地介绍图片', type: 'image', aspectRatio: 16/9 },
          { key: 'introText', label: '基地介绍文字', type: 'textarea' },
          { key: 'facilities', label: '基地设施', type: 'textarea' }
        ],`;

const fieldsReplacement = `        fields: [
          { key: 'imageUrl', label: '基地图片', type: 'image', aspectRatio: 16/9 },
          { key: 'title', label: '基地名称', type: 'text' },
          { key: 'location', label: '地点描述', type: 'text' },
          { key: 'region', label: '大区 (如 华南)', type: 'text' },
          { key: 'tags', label: '标签 (海景基地、高级配置等)', type: 'tag_list' },
          { key: 'introImages', label: '基地介绍图片 (最多9张)', type: 'image_list', maxCount: 9 },
          { key: 'introText', label: '基地介绍文字', type: 'textarea' },
          { key: 'facilities', label: '基地设施', type: 'textarea' }
        ],`;

content = content.replace(fieldsTarget, fieldsReplacement);

const saveTarget = `            const formattedData = {
              ...data,
              tags: data.tagsStr ? data.tagsStr.split(',').map((t:string) => t.trim()) : data.tags || []
            };
            delete formattedData.tagsStr;`;

const saveReplacement = `            const formattedData = { ...data };`;

content = content.replace(saveTarget, saveReplacement);
fs.writeFileSync('src/pages/Admin.tsx', content);
