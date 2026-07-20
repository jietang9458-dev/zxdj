const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// 1. Update useState activeTab type
content = content.replace(
  /useState<'home' \| 'dramas' \|([^>]+)>('home');/,
  "useState<'home' | 'dramas' |$1 | 'documents' | 'community'>('home');"
);

// 2. Add documentsData state
if (!content.includes('const [documentsData')) {
  content = content.replace(
    /const \[newsData, setNewsData\] = useState\(pages\.news[^\)]+\);/,
    "const [newsData, setNewsData] = useState(pages.news || { shortDramaNews: [], bts: [], successCases: [] });\n  const [documentsData, setDocumentsData] = useState(pages.documents || { features: '', privacy: '', terms: '' });"
  );
}

// 3. Add Save logic for documents
if (!content.includes("if (activeTab === 'documents') {")) {
  content = content.replace(
    /if \(activeTab === 'news'\) \{\s*await updatePageContent\('news', newsData\);\s*\}/,
    "if (activeTab === 'news') {\n      await updatePageContent('news', newsData);\n    }\n    if (activeTab === 'documents') {\n      await updatePageContent('documents', documentsData);\n    }"
  );
}

// 4. Add UI for documents tab
const documentsTabUI = `
        {activeTab === 'documents' && (
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-8 space-y-6">
            <h3 className="font-black text-[#1A1108] text-[18px] mb-6">文档管理 (功能介绍/隐私/用户协议)</h3>
            
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-500">功能介绍</label>
              <textarea 
                value={documentsData.features || ''} 
                onChange={(e) => setDocumentsData({...documentsData, features: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-[14px] outline-none focus:border-[#D4AF37] min-h-[150px]"
                placeholder="填写功能介绍..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-500">隐私协议</label>
              <textarea 
                value={documentsData.privacy || ''} 
                onChange={(e) => setDocumentsData({...documentsData, privacy: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-[14px] outline-none focus:border-[#D4AF37] min-h-[150px]"
                placeholder="填写隐私协议..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-500">用户服务协议</label>
              <textarea 
                value={documentsData.terms || ''} 
                onChange={(e) => setDocumentsData({...documentsData, terms: e.target.value})} 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-[14px] outline-none focus:border-[#D4AF37] min-h-[150px]"
                placeholder="填写用户服务协议..."
              />
            </div>

            <button onClick={handleSavePageContent} className="w-full py-4 bg-[#1A1108] text-white rounded-2xl font-black text-[15px] active:scale-[0.98] transition-transform">
              保存文档
            </button>
          </div>
        )}
`;

if (!content.includes("activeTab === 'documents' &&")) {
  content = content.replace(
    /\{activeTab === 'community' && \(\s*<CommunityManager \/>\s*\)\}/,
    "{activeTab === 'community' && (<CommunityManager />)}\n" + documentsTabUI
  );
}

fs.writeFileSync('src/pages/Admin.tsx', content);
console.log('Admin.tsx updated');
