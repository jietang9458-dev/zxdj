const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const oldState = `  const [appLogo, setAppLogo] = useState(pages.settings?.logo || '');`;
const newState = `  const [appLogo, setAppLogo] = useState(pages.settings?.logo || '');
  const [customerAvatar, setCustomerAvatar] = useState(pages.settings?.customerAvatar || '');`;
content = content.replace(oldState, newState);

const oldSave = `      await updatePageContent('settings', { 
        logo: appLogo,
        name: appName,
        slogan: appSlogan,
        auditionEmail: auditionEmail
      });`;
const newSave = `      await updatePageContent('settings', { 
        logo: appLogo,
        name: appName,
        slogan: appSlogan,
        auditionEmail: auditionEmail,
        customerAvatar: customerAvatar
      });`;
content = content.replace(oldSave, newSave);

const oldUI = `              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#A69984] ml-2">Logo 图片 URL</label>`;
const newUI = `              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#A69984] ml-2">客服头像 URL</label>
                <div className="flex gap-3">
                  <input 
                    value={customerAvatar}
                    onChange={(e) => setCustomerAvatar(e.target.value)}
                    className="flex-1 px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                  />
                  <ImageUploadButton 
                    value={customerAvatar}
                    onChange={setCustomerAvatar}
                    className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aspectRatio={1}
                  >
                    {customerAvatar ? <img src={customerAvatar} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="text-gray-300" />}
                  </ImageUploadButton>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#A69984] ml-2">Logo 图片 URL (支持PNG透明)</label>`;
content = content.replace(oldUI, newUI);

fs.writeFileSync('src/pages/Admin.tsx', content);
