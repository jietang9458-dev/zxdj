const fs = require('fs');
let content = fs.readFileSync('src/pages/SubPages.tsx', 'utf-8');

const visitBookingComponent = `
export function VisitBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { bases } = useCMS();
  const currentBases = bases && bases.length > 0 ? bases : [{ id: '1', title: '中国盐田山海都市片场' }];
  const base = currentBases.find((b: any) => b.id === id) || currentBases[0];
  const { addNotification } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    visitDate: '',
    teamSize: '',
    purpose: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.visitDate) {
      alert('请填写必填项');
      return;
    }

    try {
      const { addVisitBooking } = await import('../services/cmsService');
      const newBooking = {
        ...formData,
        baseId: id,
        baseName: base.title,
        status: '待审核',
        date: new Date().toLocaleDateString()
      };
      
      await addVisitBooking(newBooking);
      addNotification({
        id: Date.now().toString(),
        title: '预约成功',
        message: '您的参观预约已提交，工作人员将尽快与您联系。',
        time: '刚刚',
        read: false,
        type: 'system'
      });
      alert('预约提交成功！');
      navigate(-1);
    } catch (e: any) {
      alert("提交失败: " + e.message);
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-screen pb-10 transition-colors duration-300">
      <Header title="预约参观报名表" dark />
      <div className="p-5 space-y-6">
        <div className="bg-white dark:bg-[#2A1D0F] p-6 rounded-[28px] shadow-sm border border-gray-50 dark:border-white/5">
          <div className="mb-6 pb-6 border-b border-gray-100 dark:border-white/5">
            <h2 className="text-[18px] font-black text-[#1A1108] dark:text-white mb-2">预约基地</h2>
            <p className="text-[14px] text-[#A69984]">{base.title}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-bold text-[#1A1108] dark:text-white mb-2">姓名 <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="请输入您的姓名"
                className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 rounded-2xl outline-none focus:ring-2 ring-[#D4AF37]/30 text-[14px] dark:text-white border border-transparent dark:border-white/5"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1A1108] dark:text-white mb-2">联系电话 <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="请输入联系电话"
                className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 rounded-2xl outline-none focus:ring-2 ring-[#D4AF37]/30 text-[14px] dark:text-white border border-transparent dark:border-white/5"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#1A1108] dark:text-white mb-2">期望参观日期 <span className="text-red-500">*</span></label>
              <input 
                type="date" 
                value={formData.visitDate}
                onChange={e => setFormData({...formData, visitDate: e.target.value})}
                className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 rounded-2xl outline-none focus:ring-2 ring-[#D4AF37]/30 text-[14px] dark:text-white border border-transparent dark:border-white/5"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-[#1A1108] dark:text-white mb-2">参观人数</label>
                <input 
                  type="number" 
                  value={formData.teamSize}
                  onChange={e => setFormData({...formData, teamSize: e.target.value})}
                  placeholder="如: 3"
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 rounded-2xl outline-none focus:ring-2 ring-[#D4AF37]/30 text-[14px] dark:text-white border border-transparent dark:border-white/5"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#1A1108] dark:text-white mb-2">参观目的</label>
                <select 
                  value={formData.purpose}
                  onChange={e => setFormData({...formData, purpose: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50 dark:bg-black/20 rounded-2xl outline-none focus:ring-2 ring-[#D4AF37]/30 text-[14px] dark:text-white border border-transparent dark:border-white/5 appearance-none"
                >
                  <option value="">请选择</option>
                  <option value="拍摄取景">拍摄取景</option>
                  <option value="场地租赁">场地租赁</option>
                  <option value="合作洽谈">合作洽谈</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>
            <button 
              type="submit"
              className="w-full mt-6 h-14 bg-[#1A1108] dark:bg-[#D4AF37] text-white dark:text-[#1A1108] font-black rounded-2xl shadow-xl active:scale-95 transition-all text-[16px]"
            >
              提交预约
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
`;

content = content + "\n" + visitBookingComponent;
fs.writeFileSync('src/pages/SubPages.tsx', content);
