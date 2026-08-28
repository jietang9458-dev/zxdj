const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// Replace the UI to add a delete button next to the input
const newUI = `
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-[#A69984] ml-2">{splashType === 'video' ? '视频 URL' : '图片 URL'} (9:16)</label>
                  <div className="flex gap-3">
                    <input 
                      value={splashUrl}
                      onChange={(e) => setSplashUrl(e.target.value)}
                      className="flex-1 px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                    />
                    <MediaUploadButton 
                      value={splashUrl}
                      onChange={setSplashUrl}
                      accept={splashType === 'video' ? 'video/*' : 'image/*'}
                      className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
                    >
                      {splashUrl ? (splashType === 'video' ? <Video className="text-blue-400" /> : <img src={splashUrl} className="w-full h-full object-cover" alt="" />) : <ImageIcon className="text-gray-300" />}
                    </MediaUploadButton>
                    <button 
                      onClick={() => setSplashUrl('')}
                      className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-100 transition-colors shrink-0"
                      title="删除媒体"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
`;

// Find the target to replace
const targetMatch = content.match(/<div className="space-y-2">\s*<label className="text-\[12px\] font-bold text-\[#A69984\] ml-2">\{splashType === 'video' \? '视频 URL' : '图片 URL'\} \(9:16\)<\/label>[\s\S]*?<\/MediaUploadButton>\s*<\/div>\s*<\/div>/);

if (targetMatch) {
  content = content.replace(targetMatch[0], newUI.trim());
  fs.writeFileSync('src/pages/Admin.tsx', content);
  console.log('Successfully updated Admin.tsx to include Delete button');
} else {
  console.log('Target not found in Admin.tsx');
}
