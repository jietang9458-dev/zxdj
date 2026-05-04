import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCMS } from '../context/CMSContext';
import { updatePageContent, isAdmin, addDrama, updateDrama, deleteDrama, addBase, updateBase, deleteBase, addProduct, updateProduct, deleteProduct } from '../services/cmsService';
import { motion } from 'motion/react';
import { Save, Plus, Trash2, LogIn, Lock, Image as ImageIcon, Type, MapPin, Tag, ExternalLink } from 'lucide-react';

export default function Admin() {
  const { pages, dramas, bases, products, refresh } = useCMS();
  const [activeTab, setActiveTab] = useState<'home' | 'dramas' | 'bases' | 'products' | 'settings' | 'copyright' | 'production' | 'actors' | 'tourism' | 'invest' | 'starclub'>('home');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [homeBanners, setHomeBanners] = useState(pages.home?.banners || []);
  const [homeCategories, setHomeCategories] = useState(pages.home?.categories || []);
  const [appLogo, setAppLogo] = useState(pages.settings?.logo || '');
  const [appName, setAppName] = useState(pages.settings?.name || '中星短剧');
  const [appSlogan, setAppSlogan] = useState(pages.settings?.slogan || '联动你我 · 链接未来');

  // Business Pages States
  const [copyrightData, setCopyrightData] = useState(pages.copyright || { banner: '', title: '', subtitle: '', news: [] });
  const [productionData, setProductionData] = useState(pages.production || { banner: '', title: '', subtitle: '', projects: [] });
  const [actorsData, setActorsData] = useState(pages.actors || { banners: [], title: '', subtitle: '' });
  const [tourismData, setTourismData] = useState(pages.tourism || { banner: '', title: '', subtitle: '', groups: [] });
  const [investData, setInvestData] = useState(pages.invest || { banner: '', title: '', subtitle: '' });
  const [starclubData, setStarclubData] = useState(pages.starclub || { banner: '', title: '', subtitle: '' });

  useEffect(() => {
    async function checkAuth() {
      const adminStatus = await isAdmin();
      setIsAuthorized(adminStatus);
      setCheckingAuth(false);
    }
    checkAuth();
  }, []);

  const handleLogin = () => {
    const pwd = prompt("请输入管理员密码 (admin123):");
    if (pwd === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      setIsAuthorized(true);
    } else {
      alert("密码错误");
    }
  };

  const handleSaveHome = async () => {
    setLoading(true);
    try {
      await updatePageContent('home', { banners: homeBanners, categories: homeCategories });
      await refresh();
      alert("首页配置保存成功！");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await updatePageContent('settings', { 
        logo: appLogo, 
        name: appName,
        slogan: appSlogan
      });
      await refresh();
      alert("全局设置保存成功！");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePage = async (pageKey: string, data: any) => {
    setLoading(true);
    try {
      await updatePageContent(pageKey, data);
      await refresh();
      alert("页面内容保存成功！");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDrama = async () => {
    const title = prompt("输入短剧名称:");
    if (!title) return;
    const imageUrl = prompt("输入封面图URL:");
    if (!imageUrl) return;
    setLoading(true);
    await addDrama({ title, imageUrl });
    await refresh();
    setLoading(false);
  };

  const handleDeleteDrama = async (id: string) => {
    if (!confirm("确定删除吗？")) return;
    setLoading(true);
    await deleteDrama(id);
    await refresh();
    setLoading(false);
  };

  const handleCreateBase = async () => {
    const title = prompt("输入基地名称:");
    if (!title) return;
    const location = prompt("输入地点 (例如: 深圳 · 盐田):");
    const region = prompt("输入大区 (华南/华中/西南/华东/华北):", "华南");
    const imageUrl = prompt("输入图片URL:");
    const tagsInput = prompt("输入标签 (逗号分隔):", "海景基地,现代都市");
    const tags = tagsInput?.split(',').map(t => t.trim()) || [];
    setLoading(true);
    await addBase({ title, location, region, imageUrl, tags });
    await refresh();
    setLoading(false);
  };

  const handleDeleteBase = async (id: string) => {
    if (!confirm("确定删除吗？")) return;
    setLoading(true);
    await deleteBase(id);
    await refresh();
    setLoading(false);
  };

  const handleCreateProduct = async () => {
    const title = prompt("输入产品名称:");
    if (!title) return;
    const priceStr = prompt("输入价格 (数字):");
    const price = parseInt(priceStr || '0');
    const imageUrl = prompt("输入图片URL:");
    setLoading(true);
    await addProduct({ title, price, imageUrl });
    await refresh();
    setLoading(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("确定删除吗？")) return;
    setLoading(true);
    await deleteProduct(id);
    await refresh();
    setLoading(false);
  };

  if (checkingAuth) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <Lock className="text-orange-600" size={32} />
        </div>
        <h1 className="text-[24px] font-black text-[#1A1108] mb-2">后台管理</h1>
        <p className="text-[#A69984] text-center mb-4">请登录管理员账号以管理应用内容</p>
        <p className="text-[11px] text-red-500 bg-red-50 p-3 rounded-lg mb-8 max-w-xs text-center border border-red-100">
          请输入管理员密码进行操作 (admin123)。
        </p>
        <button 
          onClick={handleLogin}
          className="flex items-center gap-2 bg-[#1A1108] text-white px-8 py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
        >
          <LogIn size={20} />
          系统登录
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-20">
      <Header title="后台管理系统" dark />
      
      {/* Tabs */}
      <div className="flex gap-4 px-5 mt-6 overflow-x-auto pb-4 scrollbar-hide">
        {['settings', 'home', 'copyright', 'production', 'actors', 'tourism', 'invest', 'starclub', 'dramas', 'bases', 'products'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2 rounded-full text-[14px] font-bold whitespace-nowrap transition-all shadow-sm ${
              activeTab === tab ? 'bg-[#1A1108] text-white' : 'bg-white text-[#A69984] border border-gray-100'
            }`}
          >
            {tab === 'home' ? '首页轮播' : 
             tab === 'dramas' ? '短剧管理' : 
             tab === 'bases' ? '基地管理' : 
             tab === 'products' ? '商城管理' : 
             tab === 'copyright' ? '版权中心' :
             tab === 'production' ? '制作中心' :
             tab === 'actors' ? '演员中心' :
             tab === 'tourism' ? '文旅中心' :
             tab === 'invest' ? '招商合作' :
             tab === 'starclub' ? '明星俱乐部' :
             '全局设置'}
          </button>
        ))}
      </div>

      <div className="px-5 mt-4">
        {activeTab === 'settings' && (
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-black text-[#1A1108]">全局品牌设置</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#A69984] ml-2">应用名称</label>
                <input 
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#A69984] ml-2">应用标语 (Slogan)</label>
                <input 
                  value={appSlogan}
                  onChange={(e) => setAppSlogan(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                  placeholder="例如: 联动你我 · 链接未来"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#A69984] ml-2">Logo 图片 URL</label>
                <div className="flex gap-3">
                  <input 
                    value={appLogo}
                    onChange={(e) => setAppLogo(e.target.value)}
                    className="flex-1 px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 transition-all border border-gray-50"
                  />
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
                    {appLogo ? <img src={appLogo} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="text-gray-300" />}
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSaveSettings}
              disabled={loading}
              className="w-full bg-[#1A1108] text-white py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {loading ? '正在保存...' : '保存全局设置'}
            </button>
          </div>
        )}

        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-black text-[#1A1108]">轮播图设置</h3>
                  <p className="text-[11px] text-[#A69984]">最多建议设置5张</p>
                </div>
                <button 
                  onClick={() => setHomeBanners([...homeBanners, { title: '', sub: '', img: '' }])}
                  className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner"
                >
                  <Plus size={22} />
                </button>
              </div>
              
              <div className="space-y-4">
                {homeBanners.map((banner: any, i: number) => (
                  <div key={i} className="p-5 border border-gray-100 rounded-3xl space-y-4 relative bg-gray-50/30">
                    <button 
                      onClick={() => {
                        const newBanners = [...homeBanners];
                        newBanners.splice(i, 1);
                        setHomeBanners(newBanners);
                      }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center shadow-md border border-red-100"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                        <Type size={18} className="text-gray-400" />
                      </div>
                      <input 
                        placeholder="标题"
                        value={banner.title}
                        onChange={(e) => {
                          const newBanners = [...homeBanners];
                          newBanners[i].title = e.target.value;
                          setHomeBanners(newBanners);
                        }}
                        className="flex-1 px-4 py-2 bg-white rounded-xl text-[13px] outline-none border border-transparent focus:border-blue-500 shadow-sm"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                        <Tag size={18} className="text-gray-400" />
                      </div>
                      <input 
                        placeholder="子标题"
                        value={banner.sub}
                        onChange={(e) => {
                          const newBanners = [...homeBanners];
                          newBanners[i].sub = e.target.value;
                          setHomeBanners(newBanners);
                        }}
                        className="flex-1 px-4 py-2 bg-white rounded-xl text-[13px] outline-none border border-transparent focus:border-blue-500 shadow-sm"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                        <ImageIcon size={18} className="text-gray-400" />
                      </div>
                      <input 
                        placeholder="图片URL"
                        value={banner.img}
                        onChange={(e) => {
                          const newBanners = [...homeBanners];
                          newBanners[i].img = e.target.value;
                          setHomeBanners(newBanners);
                        }}
                        className="flex-1 px-4 py-2 bg-white rounded-xl text-[13px] outline-none border border-transparent focus:border-blue-500 shadow-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleSaveHome}
                disabled={loading}
                className="w-full mt-8 bg-[#D4AF37] text-white py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Save size={20} />
                {loading ? '正在保存...' : '立即保存配置'}
              </button>
            </div>

            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-black text-[#1A1108]">金刚区分类</h3>
                  <p className="text-[11px] text-[#A69984]">首页中间的6个快捷入口</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {(() => {
                  const defaultCats = [
                    { id: 'copyright', label: '版权销售', path: '/copyright' },
                    { id: 'production', label: '拍摄制作', path: '/production' },
                    { id: 'actors', label: '演员孵化', path: '/actors' },
                    { id: 'filming', label: '影视基地', path: '/base' },
                    { id: 'tourism', label: '文化旅游', path: '/tourism' },
                    { id: 'live', label: '直播拍戏', path: '/live' },
                  ];
                  
                  // Ensure homeCategories always has 6 items
                  const displayCats = defaultCats.map((def, idx) => {
                    const existing = homeCategories.find((c: any) => c.id === def.id) || homeCategories[idx];
                    return existing ? { ...def, ...existing } : def;
                  });

                  return displayCats.map((cat: any, i: number) => (
                    <div key={cat.id || i} className="p-4 border border-gray-100 rounded-3xl space-y-3 bg-gray-50/20">
                      <input 
                        placeholder="分类名称"
                        value={cat.label || ''}
                        onChange={(e) => {
                          const newCats = [...displayCats];
                          newCats[i].label = e.target.value;
                          setHomeCategories(newCats);
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl text-[12px] border border-transparent focus:border-blue-500"
                      />
                      <input 
                        placeholder="跳转路径"
                        value={cat.path || ''}
                        onChange={(e) => {
                          const newCats = [...displayCats];
                          newCats[i].path = e.target.value;
                          setHomeCategories(newCats);
                        }}
                        className="w-full px-3 py-2 bg-white rounded-xl text-[12px] border border-transparent focus:border-blue-500"
                      />
                    </div>
                  ));
                })()}
              </div>

              <button 
                onClick={handleSaveHome}
                disabled={loading}
                className="w-full mt-6 bg-[#1A1108]/5 text-[#1A1108] py-4 rounded-2xl font-black flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                保存分类设置
              </button>
            </div>
          </div>
        )}

        {['copyright', 'production', 'actors', 'tourism', 'invest', 'starclub'].includes(activeTab) && (
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <h3 className="font-black text-[#1A1108] mb-4 capitalize">
                {activeTab === 'copyright' ? '版权营销中心' : 
                 activeTab === 'production' ? '制作发行中心' : 
                 activeTab === 'actors' ? '演员孵化中心' : 
                 activeTab === 'tourism' ? '文旅体验中心' : 
                 activeTab === 'invest' ? '招商合作页' : 
                 '明星俱乐部'} 配置
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#A69984] ml-2">主 Banner 图片 URL</label>
                  <input 
                    value={
                      activeTab === 'copyright' ? copyrightData.banner :
                      activeTab === 'production' ? productionData.banner :
                      activeTab === 'tourism' ? tourismData.banner :
                      activeTab === 'invest' ? investData.banner :
                      activeTab === 'starclub' ? starclubData.banner :
                      ''
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      if (activeTab === 'copyright') setCopyrightData({...copyrightData, banner: val});
                      if (activeTab === 'production') setProductionData({...productionData, banner: val});
                      if (activeTab === 'tourism') setTourismData({...tourismData, banner: val});
                      if (activeTab === 'invest') setInvestData({...investData, banner: val});
                      if (activeTab === 'starclub') setStarclubData({...starclubData, banner: val});
                    }}
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 border border-gray-50"
                  />
                  {activeTab === 'actors' && (
                    <div className="space-y-3">
                      <p className="text-[11px] font-bold text-[#A69984]">多轮播图 (分行输入 URL)</p>
                      <textarea 
                        value={actorsData.banners?.join('\n')}
                        onChange={(e) => setActorsData({...actorsData, banners: e.target.value.split('\n').filter(Boolean)})}
                        className="w-full px-5 py-4 bg-gray-50 rounded-2xl min-h-[100px] outline-none border border-gray-50"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#A69984] ml-2">页面主标题</label>
                    <input 
                      value={
                        activeTab === 'copyright' ? copyrightData.title :
                        activeTab === 'production' ? productionData.title :
                        activeTab === 'actors' ? actorsData.title :
                        activeTab === 'tourism' ? tourismData.title :
                        activeTab === 'invest' ? investData.title :
                        starclubData.title
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        if (activeTab === 'copyright') setCopyrightData({...copyrightData, title: val});
                        if (activeTab === 'production') setProductionData({...productionData, title: val});
                        if (activeTab === 'actors') setActorsData({...actorsData, title: val});
                        if (activeTab === 'tourism') setTourismData({...tourismData, title: val});
                        if (activeTab === 'invest') setInvestData({...investData, title: val});
                        if (activeTab === 'starclub') setStarclubData({...starclubData, title: val});
                      }}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#A69984] ml-2">副标题 / 描述</label>
                    <input 
                      value={
                        activeTab === 'copyright' ? copyrightData.subtitle :
                        activeTab === 'production' ? productionData.subtitle :
                        activeTab === 'actors' ? actorsData.subtitle :
                        activeTab === 'tourism' ? tourismData.subtitle :
                        activeTab === 'invest' ? investData.subtitle :
                        starclubData.subtitle
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        if (activeTab === 'copyright') setCopyrightData({...copyrightData, subtitle: val});
                        if (activeTab === 'production') setProductionData({...productionData, subtitle: val});
                        if (activeTab === 'actors') setActorsData({...actorsData, subtitle: val});
                        if (activeTab === 'tourism') setTourismData({...tourismData, subtitle: val});
                        if (activeTab === 'invest') setInvestData({...investData, subtitle: val});
                        if (activeTab === 'starclub') setStarclubData({...starclubData, subtitle: val});
                      }}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <label className="text-[11px] font-bold text-[#A69984] ml-2 font-mono">高级配置 (JSON格式 - 用于列表项等)</label>
                  <textarea 
                    value={
                      activeTab === 'copyright' ? JSON.stringify(copyrightData.config || {}, null, 2) :
                      activeTab === 'production' ? JSON.stringify(productionData.config || {}, null, 2) :
                      activeTab === 'actors' ? JSON.stringify(actorsData.config || {}, null, 2) :
                      activeTab === 'invest' ? JSON.stringify(investData.config || {}, null, 2) :
                      activeTab === 'starclub' ? JSON.stringify(starclubData.config || {}, null, 2) :
                      JSON.stringify(tourismData.config || {}, null, 2)
                    }
                    onChange={(e) => {
                      try {
                        const parsed = JSON.parse(e.target.value);
                        if (activeTab === 'copyright') setCopyrightData({...copyrightData, config: parsed});
                        if (activeTab === 'production') setProductionData({...productionData, config: parsed});
                        if (activeTab === 'actors') setActorsData({...actorsData, config: parsed});
                        if (activeTab === 'invest') setInvestData({...investData, config: parsed});
                        if (activeTab === 'starclub') setStarclubData({...starclubData, config: parsed});
                        if (activeTab === 'tourism') setTourismData({...tourismData, config: parsed});
                      } catch (err) {
                        // Keep typing, don't crash
                      }
                    }}
                    placeholder='例如: {"items": [{"title": "新项目", "desc": "详情"}]}'
                    className="w-full px-5 py-4 bg-gray-50 rounded-2xl min-h-[120px] outline-none border border-gray-50 font-mono text-xs"
                  />
                  <p className="text-[10px] text-gray-400 ml-2">提示：复杂列表数据可通过此 JSON 字段灵活管理</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  const data = activeTab === 'copyright' ? copyrightData :
                               activeTab === 'production' ? productionData :
                               activeTab === 'actors' ? actorsData :
                               activeTab === 'tourism' ? tourismData :
                               activeTab === 'invest' ? investData :
                               starclubData;
                  handleSavePage(activeTab, data);
                }}
                disabled={loading}
                className="w-full mt-8 bg-[#1A1108] text-white py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2"
              >
                <Save size={20} />
                保存页面配置
              </button>
            </div>
          </div>
        )}

        {activeTab === 'dramas' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-black text-[#1A1108]">短剧列表 ({dramas.length})</h3>
              <button onClick={handleCreateDrama} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-2">
                <Plus size={16} /> 添加短剧
              </button>
            </div>
            {dramas.map((drama) => (
              <div key={drama.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
                <div className="w-20 h-28 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  <img src={drama.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-black text-[15px]">{drama.title}</h4>
                    <p className="text-[11px] text-[#A69984] mt-1 line-clamp-2">ID: {drama.id}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => {
                        const title = prompt("修改标题:", drama.title) || drama.title;
                        const imageUrl = prompt("修改图片URL:", drama.imageUrl) || drama.imageUrl;
                        updateDrama(drama.id, { title, imageUrl }).then(refresh);
                      }}
                      className="text-blue-500 text-[12px] font-bold"
                    >
                      编辑
                    </button>
                    <button onClick={() => handleDeleteDrama(drama.id)} className="text-red-500 text-[12px] font-bold">删除</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'bases' && (
          <div className="space-y-4 pb-10">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-black text-[#1A1108]">基地列表 ({bases.length})</h3>
              <button onClick={handleCreateBase} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-2">
                <Plus size={16} /> 添加基地
              </button>
            </div>
            {bases.map((base) => (
              <div key={base.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                  <img src={base.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-black text-[15px]">{base.title}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-[#A69984] mt-1">
                      <MapPin size={10} /> {base.location}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => {
                        const title = prompt("修改标题:", base.title) || base.title;
                        const location = prompt("修改地点:", base.location) || base.location;
                        const region = prompt("修改大区:", base.region || '华南') || base.region;
                        const imageUrl = prompt("修改图片URL:", base.imageUrl) || base.imageUrl;
                        const tagsInput = prompt("修改标签 (逗号分隔):", base.tags?.join(',')) || base.tags?.join(',');
                        const tags = tagsInput?.split(',').map(t => t.trim()) || base.tags;
                        updateBase(base.id, { title, location, region, imageUrl, tags }).then(refresh);
                      }}
                      className="text-blue-500 text-[12px] font-bold"
                    >
                      编辑内容
                    </button>
                    <button onClick={() => handleDeleteBase(base.id)} className="text-red-500 text-[12px] font-bold">删除</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-4 pb-10">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-black text-[#1A1108]">商城管理 ({products.length})</h3>
              <button onClick={handleCreateProduct} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-2">
                <Plus size={16} /> 添加商品
              </button>
            </div>
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                  <img src={product.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-black text-[15px]">{product.title}</h4>
                    <p className="text-[13px] text-orange-600 font-bold mt-1">¥{product.price}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => {
                        const title = prompt("修改名称:", product.title) || product.title;
                        const price = parseInt(prompt("修改价格:", product.price.toString()) || product.price.toString());
                        const imageUrl = prompt("修改图片URL:", product.imageUrl) || product.imageUrl;
                        updateProduct(product.id, { title, price, imageUrl }).then(refresh);
                      }}
                      className="text-blue-500 text-[12px] font-bold"
                    >
                      编辑
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 text-[12px] font-bold">删除</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

