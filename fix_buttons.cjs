const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

// I will look for `<button` that is inside a `<form>` and has `type="submit"` and prepend the checkbox if not already there.

content = content.replace(
  /<button\s+type="submit"/g,
  (match, offset, string) => {
     const before = string.substring(offset - 200, offset);
     if (before.includes('type="checkbox"')) {
         return match; // Already added
     }
     return `<div className="flex items-start gap-2 mt-4 px-1 mb-4">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 shrink-0 accent-[#D4AF37]"
              />
              <div className="text-[12px] text-gray-500 leading-tight">
                我已阅读并同意
                <span onClick={(e) => { e.preventDefault(); navigate('/doc/terms'); }} className="text-[#D4AF37] cursor-pointer">《用户服务协议》</span>
                及
                <span onClick={(e) => { e.preventDefault(); navigate('/doc/privacy'); }} className="text-[#D4AF37] cursor-pointer">《隐私政策》</span>
                ，知晓并授权平台为提供服务所需收集、使用、存储上述填写的个人信息。
              </div>
            </div>\n            <button type="submit"`;
  }
);

fs.writeFileSync('src/pages/SubPages.tsx', content);
