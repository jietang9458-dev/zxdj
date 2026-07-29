const fs = require('fs');

let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const contentBlocksJSX = `
              ) : field.type === 'content_blocks' ? (
                <div className="space-y-4">
                  {(data[field.key] || []).map((block: any, idx: number) => (
                    <div key={idx} className="relative p-3 bg-gray-50 rounded-xl border border-gray-100 group">
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => {
                          if (idx > 0) {
                            const newArr = [...data[field.key]];
                            [newArr[idx - 1], newArr[idx]] = [newArr[idx], newArr[idx - 1]];
                            setData({...data, [field.key]: newArr});
                          }
                        }} className="p-1 bg-white rounded shadow text-gray-500 hover:text-blue-500 text-xs">上移</button>
                        <button onClick={() => {
                          if (idx < data[field.key].length - 1) {
                            const newArr = [...data[field.key]];
                            [newArr[idx + 1], newArr[idx]] = [newArr[idx], newArr[idx + 1]];
                            setData({...data, [field.key]: newArr});
                          }
                        }} className="p-1 bg-white rounded shadow text-gray-500 hover:text-blue-500 text-xs">下移</button>
                        <button onClick={() => {
                          const newArr = [...data[field.key]];
                          newArr.splice(idx, 1);
                          setData({...data, [field.key]: newArr});
                        }} className="p-1 bg-white rounded shadow text-gray-500 hover:text-red-500 text-xs">删除</button>
                      </div>
                      {block.type === 'text' ? (
                        <textarea
                          value={block.content || ''}
                          onChange={(e) => {
                            const newArr = [...data[field.key]];
                            newArr[idx] = { ...block, content: e.target.value };
                            setData({...data, [field.key]: newArr});
                          }}
                          className="w-full mt-6 px-3 py-2 bg-white rounded border border-gray-200 outline-none focus:border-orange-300 min-h-[80px]"
                          placeholder="输入文字内容"
                        />
                      ) : (
                        <div className="mt-6">
                          <ImageUploadButton
                            value={block.url || ''}
                            onChange={(val) => {
                              const newArr = [...data[field.key]];
                              newArr[idx] = { ...block, url: val };
                              setData({...data, [field.key]: newArr});
                            }}
                          >
                            <div className="w-full flex items-center justify-center p-4 bg-white rounded-lg border border-dashed border-gray-300 cursor-pointer min-h-[100px]">
                              {block.url ? (
                                <img src={block.url} className="max-h-40 rounded object-contain" alt="" />
                              ) : (
                                <span className="text-gray-400 text-sm">点击上传图片</span>
                              )}
                            </div>
                          </ImageUploadButton>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <button onClick={(e) => {
                      e.preventDefault();
                      const newArr = [...(data[field.key] || []), { type: 'text', content: '' }];
                      setData({...data, [field.key]: newArr});
                    }} className="flex-1 py-2 bg-gray-100 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200">
                      + 添加文字
                    </button>
                    <button onClick={(e) => {
                      e.preventDefault();
                      const newArr = [...(data[field.key] || []), { type: 'image', url: '' }];
                      setData({...data, [field.key]: newArr});
                    }} className="flex-1 py-2 bg-gray-100 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-200">
                      + 添加图片
                    </button>
                  </div>
                </div>`;

content = content.replace("              ) : field.type === 'textarea' ? (", contentBlocksJSX + "\n              ) : field.type === 'textarea' ? (");

// Now let's update the schemas for news
content = content.replace(/\{ key: 'desc', label: '文字内容', type: 'text' \}/g, "{ key: 'blocks', label: '图文详情', type: 'content_blocks' }");

fs.writeFileSync('src/pages/Admin.tsx', content);
