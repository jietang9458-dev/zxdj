const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// add visitBookings to CMS context usage
content = content.replace(`feedbacks, courseRegistrations, users, refresh } = useCMS();`, `feedbacks, courseRegistrations, visitBookings, users, refresh } = useCMS();`);

// Add to tabs
const tabsTarget = `{ id: 'courseRegistrations', label: '报名信息', icon: FileText },`;
const tabsReplacement = `{ id: 'courseRegistrations', label: '报名信息', icon: FileText },\n    { id: 'visitBookings', label: '预约信息', icon: FileText },`;
content = content.replace(tabsTarget, tabsReplacement);

// Add the tab content
const activeTabTarget = `{activeTab === 'users' && (`;
const activeTabReplacement = `{activeTab === 'visitBookings' && (
          <div className="space-y-4 pb-10">
            <h3 className="font-black text-[#1A1108] px-2">预约记录 ({visitBookings.length})</h3>
            <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-[13px] text-gray-500">
                  <tr>
                    <th className="py-4 px-6 font-medium">基地</th>
                    <th className="py-4 px-6 font-medium">姓名</th>
                    <th className="py-4 px-6 font-medium">电话</th>
                    <th className="py-4 px-6 font-medium">预约日期</th>
                    <th className="py-4 px-6 font-medium">人数</th>
                    <th className="py-4 px-6 font-medium">目的</th>
                    <th className="py-4 px-6 font-medium">提交时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {visitBookings.map((b: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#1A1108]">{b.baseName}</td>
                    <td className="py-4 px-6 text-[#1A1108]">{b.name}</td>
                    <td className="py-4 px-6 text-[#1A1108]">{b.phone}</td>
                    <td className="py-4 px-6 text-[#1A1108]">{b.visitDate}</td>
                    <td className="py-4 px-6 text-[#1A1108]">{b.teamSize || '-'}</td>
                    <td className="py-4 px-6 text-[#1A1108]">{b.purpose || '-'}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-400">{b.date}</td>
                  </tr>
                ))}
                {visitBookings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-gray-400 text-[13px]">暂无预约记录</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (`;

content = content.replace(activeTabTarget, activeTabReplacement);

fs.writeFileSync('src/pages/Admin.tsx', content);
