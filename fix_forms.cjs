const fs = require('fs');

let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

// Helper to inject checkbox
function addCheckbox(content, formComponent, submitButtonRegex) {
  return content.replace(submitButtonRegex, 
    `<div className="flex items-start gap-2 mt-4 px-1">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 shrink-0 accent-[#D4AF37]"
              />
              <div className="text-[12px] text-gray-500 leading-tight">
                我已阅读并同意
                <span onClick={(e) => { e.preventDefault(); navigate('/terms?type=service'); }} className="text-[#D4AF37] cursor-pointer">《用户服务协议》</span>
                及
                <span onClick={(e) => { e.preventDefault(); navigate('/terms?type=privacy'); }} className="text-[#D4AF37] cursor-pointer">《隐私政策》</span>
                ，知晓并授权平台为提供服务所需收集、使用、存储上述填写的个人信息。
              </div>
            </div>\n            $&`);
}

// 1. AuditionRegistration
content = content.replace(
  /const \[formData, setFormData\] = useState\(\{([\s\S]*?)\}\);/g,
  (match, p1) => {
    return match + `\n  const [agreed, setAgreed] = useState(false);`;
  }
);

content = content.replace(/const handleSubmit = async \(e: React\.FormEvent\) => \{\n    e\.preventDefault\(\);\n/g, 
`const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert('请先阅读并同意用户服务协议及隐私政策');
      return;
    }\n`
);

content = content.replace(
  /            <button \n              type="submit"/g,
  `<div className="flex items-start gap-2 mt-4 px-1">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 shrink-0 accent-[#D4AF37]"
              />
              <div className="text-[12px] text-gray-500 leading-tight">
                我已阅读并同意
                <span onClick={(e) => { e.preventDefault(); navigate('/terms?type=service'); }} className="text-[#D4AF37] cursor-pointer">《用户服务协议》</span>
                及
                <span onClick={(e) => { e.preventDefault(); navigate('/terms?type=privacy'); }} className="text-[#D4AF37] cursor-pointer">《隐私政策》</span>
                ，知晓并授权平台为提供服务所需收集、使用、存储上述填写的个人信息。
              </div>
            </div>
            <button 
              type="submit"`
);

// We need a route for terms
fs.writeFileSync('src/pages/SubPages.tsx', content);
