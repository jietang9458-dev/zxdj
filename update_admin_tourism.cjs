const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const titleTarget = `<div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#A69984] ml-2">页面主标题 (如有)</label>
                    <input 
                      value={`;

const targetReplacement = `
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#A69984] ml-2">页面主标题 (顶部导航栏显示)</label>
                    <input 
                      value={activeTab === 'tourism' ? (tourismData as any).pageTitle || '' : ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (activeTab === 'tourism') setTourismData({...tourismData, pageTitle: val});
                      }}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#A69984] ml-2">页面主标题 (如有)</label>
                    <input 
                      value={`

// wait, let's just insert before the existing "页面主标题 (如有)"
content = content.replace(`<div className="space-y-2">\n                    <label className="text-[11px] font-bold text-[#A69984] ml-2">页面主标题 (如有)</label>`, 
`<div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#A69984] ml-2">导航栏页面主标题</label>
                    <input 
                      value={
                        activeTab === 'tourism' ? (tourismData as any).pageTitle || '' : ''
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        if (activeTab === 'tourism') setTourismData({...tourismData, pageTitle: val});
                      }}
                      className="w-full px-4 py-3 mb-4 bg-gray-50 rounded-xl outline-none border border-gray-50"
                      placeholder="仅在影视文化旅游中心单独设置导航栏标题时使用"
                    />
                  </div>\n                  <div className="space-y-2">\n                    <label className="text-[11px] font-bold text-[#A69984] ml-2">页面主标题 (如有)</label>`);

// Also we need to add fields for project details to actorsData.auditions
const arrayEditorTarget = `schema={[
                        { key: 'imageUrl', label: '活动封面 (3:4)', type: 'image', aspectRatio: 3/4 },
                        { key: 'title', label: '项目名称 (必填)', type: 'text' },
                        { key: 'desc', label: '相关文字内容', type: 'text' },
                        { key: 'requirement', label: '招募要求', type: 'text' },
                        { key: 'date', label: '截止日期', type: 'text' },
                      ]}`;
                      
const arrayEditorReplacement = `schema={[
                        { key: 'imageUrl', label: '活动封面 (3:4)', type: 'image', aspectRatio: 3/4 },
                        { key: 'title', label: '项目名称 (必填)', type: 'text' },
                        { key: 'desc', label: '相关文字内容', type: 'text' },
                        { key: 'requirement', label: '招募要求', type: 'text' },
                        { key: 'date', label: '截止日期', type: 'text' },
                        { key: 'introImages', label: '项目介绍图片 (最多9张)', type: 'image_list', maxCount: 9 },
                        { key: 'introText', label: '项目介绍文字', type: 'textarea' },
                      ]}`;
                      
content = content.replace(arrayEditorTarget, arrayEditorReplacement);

fs.writeFileSync('src/pages/Admin.tsx', content);
