const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const booleanField = `              ) : field.type === 'boolean' ? (
                <div className="flex items-center gap-2 px-1">
                  <input 
                    type="checkbox"
                    checked={!!data[field.key]}
                    onChange={(e) => setData({...data, [field.key]: e.target.checked})}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-[14px] text-gray-700">{field.label}</span>
                </div>
              ) : (`

content = content.replace(
  `              ) : (\n                <input `,
  booleanField + `\n                <input `
);

const oldDialog = `        fields: [
          { key: 'imageUrl', label: '封面图 (竖版3:4)', type: 'image', aspectRatio: 3/4 },
          { key: 'title', label: '短剧名称', type: 'text' }
        ],`;

const newDialog = `        fields: [
          { key: 'imageUrl', label: '封面图 (竖版3:4)', type: 'image', aspectRatio: 3/4 },
          { key: 'title', label: '短剧名称', type: 'text' },
          { key: 'description', label: '故事介绍', type: 'textarea' },
          { key: 'playUrl', label: '播放链接', type: 'text' },
          { key: 'recommended', label: '推荐到首页', type: 'boolean' }
        ],`;

content = content.replace(oldDialog, newDialog);
fs.writeFileSync('src/pages/Admin.tsx', content);
