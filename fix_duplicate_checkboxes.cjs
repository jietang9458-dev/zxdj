const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const doubleCheckboxRegex = /<div className="flex items-start gap-2 mt-4 px-1">\s*<input\s*type="checkbox"\s*checked=\{agreed\}\s*onChange=\{\(e\) => setAgreed\(e.target.checked\)\}\s*className="mt-1 shrink-0 accent-\[#D4AF37\]"\s*\/>\s*<div className="text-\[12px\] text-gray-500 leading-tight">\s*我已阅读并同意\s*<span onClick=\{\(e\) => \{ e\.preventDefault\(\); navigate\('\/doc\/terms'\); \}\} className="text-\[#D4AF37\] cursor-pointer">《用户服务协议》<\/span>\s*及\s*<span onClick=\{\(e\) => \{ e\.preventDefault\(\); navigate\('\/doc\/privacy'\); \}\} className="text-\[#D4AF37\] cursor-pointer">《隐私政策》<\/span>\s*，知晓并授权平台为提供服务所需收集、使用、存储上述填写的个人信息。\s*<\/div>\s*<\/div>\s*<div className="flex items-start gap-2 mt-4 px-1 mb-4">\s*<input\s*type="checkbox"\s*checked=\{agreed\}\s*onChange=\{\(e\) => setAgreed\(e.target.checked\)\}\s*className="mt-1 shrink-0 accent-\[#D4AF37\]"\s*\/>\s*<div className="text-\[12px\] text-gray-500 leading-tight">\s*我已阅读并同意\s*<span onClick=\{\(e\) => \{ e\.preventDefault\(\); navigate\('\/doc\/terms'\); \}\} className="text-\[#D4AF37\] cursor-pointer">《用户服务协议》<\/span>\s*及\s*<span onClick=\{\(e\) => \{ e\.preventDefault\(\); navigate\('\/doc\/privacy'\); \}\} className="text-\[#D4AF37\] cursor-pointer">《隐私政策》<\/span>\s*，知晓并授权平台为提供服务所需收集、使用、存储上述填写的个人信息。\s*<\/div>\s*<\/div>/g;

content = content.replace(doubleCheckboxRegex, `<div className="flex items-start gap-2 mt-4 px-1 mb-4">
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
            </div>`);

fs.writeFileSync('src/pages/SubPages.tsx', content);
