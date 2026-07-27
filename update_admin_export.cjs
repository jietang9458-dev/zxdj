const fs = require('fs');
let content = fs.readFileSync('src/pages/Admin.tsx', 'utf-8');

// Add import if not present
if (!content.includes("import * as XLSX")) {
    content = "import * as XLSX from 'xlsx';\n" + content;
}

// Add export function
const exportCode = `
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    const normalizedRegistrations = courseRegistrations.map((r: any) => {
      let cat = r.category || '其他';
      if (cat === '海选') cat = '海选报名表';
      if (cat === '文旅') cat = '旅游报名表';
      if (cat === '培训') cat = '培训报名表';
      if (cat === '海选/活动') cat = '参演报名表';
      return { ...r, normalizedCat: cat };
    });

    const createSheetForCategory = (catName: string, items: any[]) => {
      if (items.length === 0) return;
      const wsData = items.map((item: any) => ({
        类别: item.normalizedCat,
        姓名: item.name,
        性别: item.gender || '-',
        年龄: item.age || '-',
        联系方式: item.phone || item.contact || '-',
        项目名称: item.projectName || item.courseName || '-',
        特点专长: item.characteristics || '-',
        作品名称: item.worksName || '-',
        作品链接: item.worksLink || '-',
        提交时间: item.date || '-'
      }));
      const ws = XLSX.utils.json_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, catName.substring(0, 31));
    };

    ['海选报名表', '培训报名表', '旅游报名表', '参演报名表'].forEach(cat => {
      const items = normalizedRegistrations.filter((r: any) => r.normalizedCat === cat);
      createSheetForCategory(cat, items);
    });
    
    if (visitBookings && visitBookings.length > 0) {
      const wsVisit = XLSX.utils.json_to_sheet(visitBookings.map((item: any) => ({
        联系人: item.name,
        联系电话: item.phone,
        预约人数: item.headcount,
        预约日期: item.date,
        预约基地: item.baseName,
        需求说明: item.notes,
        状态: item.status
      })));
      XLSX.utils.book_append_sheet(wb, wsVisit, "预约参观报名表");
    }

    const otherItems = normalizedRegistrations.filter((r: any) => !['海选报名表', '培训报名表', '旅游报名表', '参演报名表'].includes(r.normalizedCat));
    if (otherItems.length > 0) {
      createSheetForCategory('其他', otherItems);
    }
    
    XLSX.writeFile(wb, "报名信息汇总.xlsx");
  };

  const tabs = [
`;
content = content.replace("  const tabs = [", exportCode);

const uiCode = `            <div className="flex justify-between items-center px-2">
              <h3 className="font-black text-[#1A1108]">报名信息列表</h3>
              <button 
                onClick={exportToExcel}
                className="bg-[#D4AF37] hover:bg-[#B8972D] text-white px-4 py-2 rounded-xl text-[13px] font-bold shadow-md transition-all flex items-center gap-2"
              >
                <FileText size={16} />
                导出所有报名信息 (Excel)
              </button>
            </div>`;
content = content.replace(
  `<div className="flex justify-between items-center px-2">
              <h3 className="font-black text-[#1A1108]">报名信息列表</h3>
            </div>`,
  uiCode
);

const listMapTarget = `{['海选', '文旅', '培训', '其他'].map(category => {
              const items = courseRegistrations.filter(r => (r.category || '其他') === category);`;
const listMapReplacement = `{['海选报名表', '培训报名表', '旅游报名表', '参演报名表', '其他'].map(category => {
              const items = courseRegistrations.map((r: any) => {
                let cat = r.category || '其他';
                if (cat === '海选') cat = '海选报名表';
                if (cat === '文旅') cat = '旅游报名表';
                if (cat === '培训') cat = '培训报名表';
                if (cat === '海选/活动') cat = '参演报名表';
                return { ...r, normalizedCat: cat };
              }).filter((r: any) => {
                if (category === '其他') {
                   return !['海选报名表', '培训报名表', '旅游报名表', '参演报名表'].includes(r.normalizedCat);
                }
                return r.normalizedCat === category;
              });`;
content = content.replace(listMapTarget, listMapReplacement);

fs.writeFileSync('src/pages/Admin.tsx', content);
