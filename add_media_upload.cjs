const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

const mediaUploadBtn = `
const MediaUploadButton = ({ value, onChange, className, children, accept = "image/*,video/*" }: { value: string, onChange: (url: string) => void, className?: string, children?: React.ReactNode, accept?: string }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert("文件太大，请选择 100MB 以下的文件");
        return;
      }
      setUploading(true);
      try {
        const url = await uploadFile(file);
        onChange(url);
      } catch (err: any) {
        alert("上传失败: " + err.message);
      } finally {
        setUploading(false);
      }
    }
    e.target.value = '';
  };

  return (
    <label className={\`cursor-pointer \${className || ''} \${uploading ? 'opacity-50 pointer-events-none relative' : ''}\`}>
      {children}
      {uploading && <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10 font-bold text-xs">...</div>}
      <input type="file" accept={accept} onChange={handleFileUpload} className="hidden" disabled={uploading} />
    </label>
  );
};
`;

content = content.replace("const FormDialog = ", mediaUploadBtn + "\nconst FormDialog = ");

// Now update Splash Settings to use MediaUploadButton instead of ImageUploadButton
content = content.replace(
  /<ImageUploadButton \n                      value=\{splashUrl\}\n                      onChange=\{setSplashUrl\}\n                      className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors"\n                    >/g,
  `<MediaUploadButton 
                      value={splashUrl}
                      onChange={setSplashUrl}
                      accept={splashType === 'video' ? 'video/*' : 'image/*'}
                      className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >`
);
content = content.replace(
  /<\/ImageUploadButton>\n                  <\/div>\n                <\/div>\n              <\/div>\n            <\/div>\n            \{\/\* Save Button \*\/\}/g,
  `</MediaUploadButton>
                  </div>
                </div>
              </div>
            </div>
            {/* Save Button */}`
);

fs.writeFileSync('src/pages/Admin.tsx', content);
