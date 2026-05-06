import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useCMS } from '../context/CMSContext';
import { updatePageContent, isAdmin, addDrama, updateDrama, deleteDrama, addBase, updateBase, deleteBase, addProduct, updateProduct, deleteProduct, uploadFile,
  addLiveStream, updateLiveStream, deleteLiveStream
 } from '../services/cmsService';
import { motion } from 'motion/react';
import { Save, Plus, Trash2, LogIn, Lock, Image as ImageIcon, Type, MapPin, Tag, ExternalLink, Settings, Home, Shield, Video, Users, Plane, PiggyBank, Star, Film, Map, ShoppingBag, LayoutDashboard, ChevronLeft, Upload, MessageSquare, FileText, Wifi, UserCheck, PenTool } from 'lucide-react';

const ImageUploadButton = ({ value, onChange, className, children }: { value: string, onChange: (url: string) => void, className?: string, children?: React.ReactNode }) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        alert("图片太大，请选择 50MB 以下的图片");
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
    // reset the input value so the same file can be selected again
    e.target.value = '';
  };

  return (
    <label className={`cursor-pointer ${className || ''} ${uploading ? 'opacity-50 pointer-events-none relative' : ''}`}>
      {children}
      {uploading && <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10 font-bold text-xs">...</div>}
      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
    </label>
  );
};

const FormDialog = ({ isOpen, onClose, title, fields, initialData, onSubmit }: any) => {
  const [data, setData] = React.useState<any>(initialData || {});
  
  React.useEffect(() => {
    setData(initialData || {});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-bold mb-6 text-[#1A1108]">{title}</h3>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
          {fields.map((field: any) => (
            <div key={field.key} className="space-y-2">
              <label className="text-[13px] font-bold text-gray-500">{field.label}</label>
              {field.type === 'image' ? (
                <div className="flex gap-3">
                  <ImageUploadButton 
                    value={data[field.key] || ''}
                    onChange={(val) => setData({...data, [field.key]: val})}
                    className="w-full"
                  >
                    <div className="w-full flex items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-100 cursor-pointer min-h-[140px]">
                      {data[field.key] ? (
                        <img src={data[field.key]} className="max-h-32 rounded-lg object-contain" alt="" />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <Upload size={24} />
                          <span className="text-[12px] font-bold">点击从电脑上传图片</span>
                        </div>
                      )}
                    </div>
                  </ImageUploadButton>
                </div>
              ) : field.type === 'textarea' ? (
                <textarea 
                  value={data[field.key] || ''}
                  onChange={(e) => setData({...data, [field.key]: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 min-h-[100px]"
                />
              ) : field.type === 'number' ? (
                <input 
                  type="number"
                  value={data[field.key] || ''}
                  onChange={(e) => setData({...data, [field.key]: parseInt(e.target.value) || 0})}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200"
                />
              ) : (
                <input 
                  type="text"
                  value={data[field.key] || ''}
                  onChange={(e) => setData({...data, [field.key]: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-end mt-8">
          <button onClick={onClose} className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors">取消</button>
          <button 
            onClick={async () => { 
              try {
                await onSubmit(data); 
                onClose(); 
              } catch(e) {
                console.error(e);
              }
            }} 
            className="px-6 py-3 bg-[#1A1108] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            确认保存
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminListEditor = ({ title, items = [], onChange, schema, setDialogState }: any) => {
  return (
    <div className="space-y-4 pt-6 border-t border-gray-100">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-[#1A1108]">{title}</h4>
        <button 
          onClick={() => setDialogState({
            isOpen: true,
            config: {
              title: `添加 - ${title}`,
              fields: schema,
              initialData: {},
              onSubmit: async (data: any) => {
                onChange([data, ...items]);
              }
            }
          })} 
          className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-blue-100"
        >
          <Plus size={14} /> 添加
        </button>
      </div>
      {items.length === 0 ? <p className="text-[12px] text-gray-400">暂无内容</p> : (
        <div className="space-y-2">
          {items.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              {item.imageUrl || item.image || item.banner ? (
                <img src={item.imageUrl || item.image || item.banner} className="w-12 h-12 object-cover rounded-lg" alt="" />
              ) : null}
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-[13px] text-[#1A1108] truncate">{item.title || item.name || '未命名'}</h5>
                <p className="text-[11px] text-gray-500 truncate">{item.desc || item.subtitle || item.content || item.date || ''}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setDialogState({
                    isOpen: true,
                    config: {
                      title: `编辑 - ${title}`,
                      fields: schema,
                      initialData: item,
                      onSubmit: async (data: any) => {
                        const newItems = [...items];
                        newItems[i] = data;
                        onChange(newItems);
                      }
                    }
                  })}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <PenTool size={14} />
                </button>
                <button 
                  onClick={() => onChange(items.filter((_: any, idx: number) => idx !== i))}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Admin() {
  const { pages, dramas, bases, products, liveStreams, feedbacks, courseRegistrations, users, refresh } = useCMS();
  const [activeTab, setActiveTab] = useState<'home' | 'dramas' | 'bases' | 'products' | 'liveStreams' | 'feedbacks' | 'courseRegistrations' | 'users' | 'settings' | 'copyright' | 'production' | 'actors' | 'tourism' | 'invest' | 'starclub' | 'news'>('home');
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
  const [mallData, setMallData] = useState(pages.mall || { pavilions: [] });
  const [productionData, setProductionData] = useState(pages.production || { banner: '', title: '', subtitle: '', projects: [] });
  const [actorsData, setActorsData] = useState(pages.actors || { banner: '', banners: [], title: '', subtitle: '' });
  const [tourismData, setTourismData] = useState(pages.tourism || { banner: '', title: '', subtitle: '', groups: [] });
  const [investData, setInvestData] = useState(pages.invest || { banner: '', title: '', subtitle: '' });
  const [starclubData, setStarclubData] = useState(pages.starclub || { banner: '', title: '', subtitle: '' });
  const [newsData, setNewsData] = useState(pages.news || { shortDramaNews: [], bts: [], successCases: [] });
  
  const [dialogState, setDialogState] = useState<{isOpen: boolean; config?: any}>({ isOpen: false, config: null });

  useEffect(() => {
    async function checkAuth() {
      const adminStatus = await isAdmin();
      setIsAuthorized(adminStatus);
      setCheckingAuth(false);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    setHomeBanners(pages.home?.banners || []);
    setHomeCategories(pages.home?.categories || []);
    setAppLogo(pages.settings?.logo || '');
    setAppName(pages.settings?.name || '中星短剧');
    setAppSlogan(pages.settings?.slogan || '联动你我 · 链接未来');
    setCopyrightData(pages.copyright || { banner: '', title: '', subtitle: '', news: [] });
    setProductionData(pages.production || { banner: '', title: '', subtitle: '', projects: [] });
    setActorsData(pages.actors || { banner: '', banners: [], title: '', subtitle: '' });
    setTourismData(pages.tourism || { banner: '', title: '', subtitle: '', groups: [] });
    setInvestData(pages.invest || { banner: '', title: '', subtitle: '' });
    setStarclubData(pages.starclub || { banner: '', title: '', subtitle: '' });
    setNewsData(pages.news || { shortDramaNews: [], bts: [], successCases: [] });
    setMallData(pages.mall || { pavilions: [] });
  }, [pages]);

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
    } catch (e: any) {
      alert("保存失败: " + e.message);
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
      alert("全局设置保存成功！");
      refresh();
    } catch (e: any) {
      alert("保存失败: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePage = async (pageKey: string, data: any) => {
    setLoading(true);
    try {
      await updatePageContent(pageKey, data);
      alert("页面内容保存成功！");
      refresh();
    } catch (e: any) {
      alert("保存失败: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const openDramaDialog = (initialData: any = null) => {
    setDialogState({
      isOpen: true,
      config: {
        title: initialData ? '编辑短剧' : '添加短剧',
        initialData: initialData || {},
        fields: [
          { key: 'imageUrl', label: '封面图', type: 'image' },
          { key: 'title', label: '短剧名称', type: 'text' }
        ],
        onSubmit: async (data: any) => {
          if (!data.title || !data.imageUrl) return alert("请填写完整信息");
          setLoading(true);
          try {
            if (initialData) {
              await updateDrama(initialData.id, data);
            } else {
              await addDrama(data);
            }
            await refresh();
          } catch (e: any) {
            alert("保存失败: " + e.message);
          } finally {
            setLoading(false);
          }
        }
      }
    });
  };

  const openLiveStreamDialog = (initialData: any = null) => {
    setDialogState({
      isOpen: true,
      config: {
        title: initialData ? '编辑直播预告' : '添加直播预告',
        initialData: initialData || {},
        fields: [
          { key: 'imageUrl', label: '封面图', type: 'image' },
          { key: 'title', label: '标题', type: 'text' }
        ],
        onSubmit: async (data: any) => {
          if (!data.title || !data.imageUrl) return alert("请填写完整信息");
          setLoading(true);
          try {
            if (initialData) {
              await updateLiveStream(initialData.id, data);
            } else {
              await addLiveStream(data);
            }
            await refresh();
          } catch (e: any) {
            alert("保存失败: " + e.message);
          } finally {
            setLoading(false);
          }
        }
      }
    });
  };

  const openBaseDialog = (initialData: any = null) => {
    setDialogState({
      isOpen: true,
      config: {
        title: initialData ? '编辑基地' : '添加基地',
        initialData: initialData || { region: '华南' },
        fields: [
          { key: 'imageUrl', label: '基地图片', type: 'image' },
          { key: 'title', label: '基地名称', type: 'text' },
          { key: 'location', label: '地点描述', type: 'text' },
          { key: 'region', label: '大区 (如 华南)', type: 'text' },
          { key: 'tagsStr', label: '标签 (逗号分隔)', type: 'text' },
          { key: 'introImage', label: '基地介绍图片', type: 'image' },
          { key: 'introText', label: '基地介绍文字', type: 'textarea' },
          { key: 'facilities', label: '基地设施', type: 'textarea' }
        ],
        onSubmit: async (data: any) => {
          if (!data.title || !data.imageUrl) return alert("请填写完整信息");
          setLoading(true);
          try {
            const formattedData = {
              ...data,
              tags: data.tagsStr ? data.tagsStr.split(',').map((t:string) => t.trim()) : data.tags || []
            };
            delete formattedData.tagsStr;
            
            if (initialData) {
              await updateBase(initialData.id, formattedData);
            } else {
              await addBase(formattedData);
            }
            await refresh();
          } catch(e:any) {
            alert("保存失败: " + e.message);
          } finally {
            setLoading(false);
          }
        }
      }
    });
  };

  const openProductDialog = (initialData: any = null) => {
    setDialogState({
      isOpen: true,
      config: {
        title: initialData ? '编辑商品' : '添加商品',
        initialData: initialData || {},
        fields: [
          { key: 'imageUrl', label: '商品图', type: 'image' },
          { key: 'title', label: '商品名称', type: 'text' },
          { key: 'desc', label: '商品介绍', type: 'textarea' },
          { key: 'originalPrice', label: '原价', type: 'number' },
          { key: 'memberPrice', label: '会员价', type: 'number' },
          { key: 'pavilion', label: '所属产品馆 (如 深圳特色产品馆)', type: 'text' },
          { key: 'category', label: '所属类别 (如 文创产品)', type: 'text' }
        ],
        onSubmit: async (data: any) => {
          if (!data.title || !data.imageUrl) return alert("请填写完整信息");
          setLoading(true);
          try {
            if (initialData) {
              await updateProduct(initialData.id, data);
            } else {
              await addProduct(data);
            }
            await refresh();
          } catch(e:any) {
            alert("保存失败: " + e.message);
          } finally {
            setLoading(false);
          }
        }
      }
    });
  };

  const handleDeleteDrama = async (id: string) => {
    if (!confirm("确定删除吗？")) return;
    setLoading(true);
    try {
      await deleteDrama(id);
      await refresh();
    } catch(e:any) {
      alert("删除失败: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLiveStream = async (id: string) => {
    if (!confirm("确定删除吗？")) return;
    setLoading(true);
    try {
      await deleteLiveStream(id);
      await refresh();
    } catch(e:any) {
      alert("删除失败: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBase = async (id: string) => {
    if (!confirm("确定删除吗？")) return;
    setLoading(true);
    try {
      await deleteBase(id);
      await refresh();
    } catch(e:any) {
      alert("删除失败: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("确定删除吗？")) return;
    setLoading(true);
    try {
      await deleteProduct(id);
      await refresh();
    } catch(e:any) {
      alert("删除失败: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100 w-full max-w-md flex flex-col items-center">
          <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="text-[#D4AF37]" size={32} />
          </div>
          <h1 className="text-2xl font-black text-[#1A1108] mb-2">中星后台登录</h1>
          <p className="text-[#A69984] text-center mb-6">请登录系统以管理应用内容</p>
          <div className="w-full bg-orange-50/50 p-4 rounded-2xl mb-8 border border-orange-100/50 text-center">
            <p className="text-xs text-orange-600 font-medium">请输入管理员密码进行操作 (admin123)</p>
          </div>
          <button 
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2 bg-[#1A1108] hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl"
          >
            <LogIn size={20} />
            系统登录
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'settings', label: '全局设置', icon: Settings },
    { id: 'home', label: '首页配置', icon: Home },
    { id: 'copyright', label: '版权中心', icon: Shield },
    { id: 'production', label: '制作中心', icon: Video },
    { id: 'actors', label: '演员中心', icon: Users },
    { id: 'tourism', label: '文旅中心', icon: Plane },
    { id: 'invest', label: '招商合作', icon: PiggyBank },
    { id: 'starclub', label: '明星俱乐部', icon: Star },
    { id: 'news', label: '资讯中心', icon: FileText },
    { id: 'dramas', label: '短剧管理', icon: Film },
    { id: 'liveStreams', label: '直播及预告', icon: Wifi },
    { id: 'bases', label: '基地管理', icon: Map },
    { id: 'products', label: '商城管理', icon: ShoppingBag },
    { id: 'users', label: '用户列表', icon: UserCheck },
    { id: 'courseRegistrations', label: '报名信息', icon: FileText },
    { id: 'feedbacks', label: '咨询反馈', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
           <LayoutDashboard className="text-[#D4AF37] mr-3" size={24} />
           <span className="text-[18px] font-black text-[#1A1108]">中星后台管理</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                activeTab === tab.id 
                  ? 'bg-[#1A1108] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
               <tab.icon className={`mr-3 ${activeTab === tab.id ? 'text-[#D4AF37]' : 'text-gray-400'}`} size={20} />
               {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 flex justify-center">
            <Link to="/" className="text-sm font-bold text-gray-500 hover:text-[#D4AF37] flex items-center gap-2">
               <ChevronLeft size={16} /> 返回前端前台
            </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen p-8 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#1A1108]">{tabs.find(t=>t.id===activeTab)?.label}</h2>
          </div>

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
                  <ImageUploadButton 
                    value={appLogo}
                    onChange={setAppLogo}
                    className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    {appLogo ? <img src={appLogo} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="text-gray-300" />}
                  </ImageUploadButton>
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
                      <ImageUploadButton 
                        value={banner.img}
                        onChange={(val) => {
                          const newBanners = [...homeBanners];
                          newBanners[i].img = val;
                          setHomeBanners(newBanners);
                        }}
                        className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm border border-gray-100 hover:bg-gray-100 transition-colors"
                      >
                        <ImageIcon size={18} className="text-gray-400" />
                      </ImageUploadButton>
                      <input 
                        placeholder="图片URL 或 点击左侧图标上传"
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

        {['copyright', 'production', 'actors', 'tourism', 'invest', 'starclub', 'news'].includes(activeTab) && (
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <h3 className="font-black text-[#1A1108] mb-4 capitalize">
                {activeTab === 'copyright' ? '版权营销中心' : 
                 activeTab === 'production' ? '制作发行中心' : 
                 activeTab === 'actors' ? '演员孵化中心' : 
                 activeTab === 'tourism' ? '文旅体验中心' : 
                 activeTab === 'invest' ? '招商合作页' : 
                 activeTab === 'news' ? '资讯中心' :
                 '明星俱乐部'} 配置
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#A69984] ml-2">主 Banner 图片</label>
                  <div className="flex gap-3">
                    <ImageUploadButton 
                      value={activeTab === 'copyright' ? copyrightData.banner :
                             activeTab === 'production' ? productionData.banner :
                             activeTab === 'actors' ? actorsData.banner :
                             activeTab === 'tourism' ? tourismData.banner :
                             activeTab === 'invest' ? investData.banner :
                             activeTab === 'news' ? (newsData as any).banner :
                             activeTab === 'starclub' ? (starclubData as any).banner : ''}
                      onChange={(val) => {
                        if (activeTab === 'copyright') setCopyrightData({...copyrightData, banner: val});
                        if (activeTab === 'production') setProductionData({...productionData, banner: val});
                        if (activeTab === 'actors') setActorsData({...actorsData, banner: val});
                        if (activeTab === 'tourism') setTourismData({...tourismData, banner: val});
                        if (activeTab === 'invest') setInvestData({...investData, banner: val});
                        if (activeTab === 'starclub') setStarclubData({...(starclubData as any), banner: val});
                        if (activeTab === 'news') setNewsData({...(newsData as any), banner: val});
                      }}
                      className="w-14 h-14 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0"
                    >
                      {(() => {
                        const val = activeTab === 'copyright' ? copyrightData.banner :
                                    activeTab === 'production' ? productionData.banner :
                                    activeTab === 'actors' ? actorsData.banner :
                                    activeTab === 'tourism' ? tourismData.banner :
                                    activeTab === 'invest' ? investData.banner :
                                    activeTab === 'news' ? (newsData as any).banner :
                                    activeTab === 'starclub' ? (starclubData as any).banner : '';
                        return val ? <img src={val} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="text-gray-300" />;
                      })()}
                    </ImageUploadButton>
                    <input 
                      placeholder="图片 URL 或 点击左侧上传"
                      value={
                        activeTab === 'copyright' ? copyrightData.banner :
                        activeTab === 'production' ? productionData.banner :
                        activeTab === 'actors' ? actorsData.banner :
                        activeTab === 'tourism' ? tourismData.banner :
                        activeTab === 'invest' ? investData.banner :
                        activeTab === 'news' ? (newsData as any).banner :
                        activeTab === 'starclub' ? (starclubData as any).banner :
                        ''
                      }
                      onChange={(e) => {
                        const val = e.target.value;
                        if (activeTab === 'copyright') setCopyrightData({...copyrightData, banner: val});
                        if (activeTab === 'production') setProductionData({...productionData, banner: val});
                        if (activeTab === 'actors') setActorsData({...actorsData, banner: val});
                        if (activeTab === 'tourism') setTourismData({...tourismData, banner: val});
                        if (activeTab === 'invest') setInvestData({...investData, banner: val});
                        if (activeTab === 'starclub') setStarclubData({...(starclubData as any), banner: val});
                        if (activeTab === 'news') setNewsData({...(newsData as any), banner: val});
                      }}
                      className="flex-1 px-5 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 ring-orange-200 border border-gray-50"
                    />
                  </div>
                  {activeTab === 'actors' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-[11px] font-bold text-[#A69984]">多轮播图 (分行输入 URL)</p>
                        <ImageUploadButton 
                          value={''}
                          onChange={(val) => {
                            setActorsData({...actorsData, banners: [...(actorsData.banners || []), val]});
                          }}
                          className="text-blue-600 bg-blue-50 px-3 py-1 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1"
                        >
                          <Upload size={14} /> 添加图片
                        </ImageUploadButton>
                      </div>
                      <textarea 
                        value={actorsData.banners?.join('\n')}
                        onChange={(e) => setActorsData({...actorsData, banners: e.target.value.split('\n').filter(Boolean)})}
                        className="w-full px-5 py-4 bg-gray-50 rounded-2xl min-h-[100px] outline-none border border-gray-50 text-[10px]"
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
                        activeTab === 'news' ? (newsData as any).title :
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
                        if (activeTab === 'news') setNewsData({...(newsData as any), title: val});
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
                        activeTab === 'news' ? (newsData as any).subtitle :
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
                        if (activeTab === 'news') setNewsData({...(newsData as any), subtitle: val});
                      }}
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none border border-gray-50"
                    />
                  </div>
                </div>

                {activeTab === 'copyright' && (
                  <div className="space-y-4 mt-6 border-t border-gray-100 pt-6">
                    <h4 className="font-bold text-[#1A1108]">短剧版权销售动态</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-[#A69984] ml-2">已售罄版号</label>
                        <textarea
                          placeholder="例如已售罄的短剧版本编号，每行一条"
                          value={copyrightData.salesDynamics?.soldOut || ''}
                          onChange={(e) => setCopyrightData({...copyrightData, salesDynamics: {...(copyrightData.salesDynamics || {}), soldOut: e.target.value}})}
                          className="w-full h-24 px-5 py-3 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37]/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-[#A69984] ml-2">热销中版号</label>
                        <textarea
                          placeholder="例如热销中的短剧版权编号，每行一条"
                          value={copyrightData.salesDynamics?.hotSelling || ''}
                          onChange={(e) => setCopyrightData({...copyrightData, salesDynamics: {...(copyrightData.salesDynamics || {}), hotSelling: e.target.value}})}
                          className="w-full h-24 px-5 py-3 bg-gray-50 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37]/50"
                        />
                      </div>
                    </div>

                    <h4 className="font-bold text-[#1A1108] mt-6">热门可购版权</h4>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-[#A69984] ml-2 font-mono">
                        编辑此 JSON 数组进行管理热门可购版权（支持4个板块或以上）
                      </label>
                      <textarea
                        value={JSON.stringify(copyrightData.hotCopyrights || [
                          { title: 'AI制作短剧', imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?q=80&w=400&h=600&fit=crop', desc: '每部短剧共50份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (A)0021 001~050' },
                          { title: '精品短剧', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&h=600&fit=crop', desc: '每部短剧共100份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (B)0101 001~100' },
                          { title: '明星短剧', imageUrl: 'https://images.unsplash.com/photo-1544208453-ca422f28b7e2?q=80&w=400&h=600&fit=crop', desc: '每部短剧共200份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (C)0201 001~200，注：明星演员的定义、标准和人选由中星短剧生态链确定，版权购买方不存有异议。' },
                          { title: '互动影游', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&h=600&fit=crop', desc: '请联系中星短剧生态链客服咨询详情。' }
                        ], null, 2)}
                        onChange={(e) => {
                          try {
                            setCopyrightData({...copyrightData, hotCopyrights: JSON.parse(e.target.value)});
                          } catch (e) {}
                        }}
                        className="w-full px-5 py-4 bg-gray-50 rounded-2xl min-h-[200px] outline-none border border-gray-50 font-mono text-xs"
                      />
                    </div>

                    <AdminListEditor 
                      title="版权库内容管理"
                      items={copyrightData.libraryItems || []}
                      onChange={(items: any) => setCopyrightData({...copyrightData, libraryItems: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '图片 (必填)', type: 'image' },
                        { key: 'title', label: '片名 (必填)', type: 'text' },
                        { key: 'desc', label: '相关文字内容', type: 'text' }
                      ]}
                    />
                    <AdminListEditor 
                      title="版权确权信息公告"
                      items={copyrightData.announcements || []}
                      onChange={(items: any) => setCopyrightData({...copyrightData, announcements: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'title', label: '公告标题 (必填)', type: 'text' },
                        { key: 'content', label: '相关文字内容', type: 'text' },
                        { key: 'date', label: '发布日期', type: 'text' }
                      ]}
                    />
                  </div>
                )}

                {activeTab === 'production' && (
                  <AdminListEditor 
                    title="正在筹备项目"
                    items={productionData.projectsInPrep || []}
                    onChange={(items: any) => setProductionData({...productionData, projectsInPrep: items})}
                    setDialogState={setDialogState}
                    schema={[
                      { key: 'imageUrl', label: '项目海报 (必填)', type: 'image' },
                      { key: 'title', label: '片名 (必填)', type: 'text' },
                      { key: 'desc', label: '项目介绍', type: 'textarea' },
                      { key: 'team', label: '主创团队', type: 'text' }
                    ]}
                  />
                )}

                {activeTab === 'actors' && (
                  <>
                    <AdminListEditor 
                      title="正在海选"
                      items={actorsData.auditions || []}
                      onChange={(items: any) => setActorsData({...actorsData, auditions: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '活动封面 (可选)', type: 'image' },
                        { key: 'title', label: '项目名称 (必填)', type: 'text' },
                        { key: 'desc', label: '相关文字内容', type: 'text' }
                      ]}
                    />
                    <AdminListEditor 
                      title="我要学艺-开班信息"
                      items={actorsData.classes || []}
                      onChange={(items: any) => setActorsData({...actorsData, classes: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '课程封面 (可选)', type: 'image' },
                        { key: 'title', label: '班级名称 (必填)', type: 'text' },
                        { key: 'desc', label: '相关文字内容', type: 'text' },
                        { key: 'date', label: '开班时间', type: 'text' }
                      ]}
                    />
                  </>
                )}

                {activeTab === 'tourism' && (
                  <>
                    <AdminListEditor 
                      title="轮播图配置"
                      items={tourismData.banners || []}
                      onChange={(items: any) => setTourismData({...tourismData, banners: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '图片 (必填)', type: 'image' },
                        { key: 'title', label: '主标题', type: 'text' },
                        { key: 'subtitle', label: '副标题/描述', type: 'text' }
                      ]}
                    />
                    <AdminListEditor 
                      title="影视旅游组团信息"
                      items={tourismData.groups || []}
                      onChange={(items: any) => setTourismData({...tourismData, groups: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '图片 (必填)', type: 'image' },
                        { key: 'title', label: '名称 (必填)', type: 'text' },
                        { key: 'startTime', label: '开机时间', type: 'text' },
                        { key: 'route', label: '旅游线路', type: 'text' },
                        { key: 'itinerary', label: '行程安排', type: 'textarea' }
                      ]}
                    />
                  </>
                )}

                {activeTab === 'news' && (
                  <>
                    <AdminListEditor 
                      title="短剧资讯"
                      items={(newsData as any).shortDramaNews || []}
                      onChange={(items: any) => setNewsData({...(newsData as any), shortDramaNews: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '图片 (必填)', type: 'image' },
                        { key: 'title', label: '资讯标题 (必填)', type: 'text' },
                        { key: 'desc', label: '文字内容', type: 'text' }
                      ]}
                    />
                    <AdminListEditor 
                      title="拍摄花絮"
                      items={(newsData as any).bts || []}
                      onChange={(items: any) => setNewsData({...(newsData as any), bts: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '图片 (必填)', type: 'image' },
                        { key: 'title', label: '标题 (必填)', type: 'text' },
                        { key: 'desc', label: '文字内容', type: 'text' }
                      ]}
                    />
                    <AdminListEditor 
                      title="成功案例"
                      items={(newsData as any).successCases || []}
                      onChange={(items: any) => setNewsData({...(newsData as any), successCases: items})}
                      setDialogState={setDialogState}
                      schema={[
                        { key: 'imageUrl', label: '图片 (必填)', type: 'image' },
                        { key: 'title', label: '案例标题 (必填)', type: 'text' },
                        { key: 'desc', label: '文字内容', type: 'text' }
                      ]}
                    />
                  </>
                )}

                {activeTab === 'starclub' && (
                  <AdminListEditor 
                    title="近期活动"
                    items={(starclubData as any).events || []}
                    onChange={(items: any) => setStarclubData({...(starclubData as any), events: items})}
                    setDialogState={setDialogState}
                    schema={[
                      { key: 'imageUrl', label: '图片 (必填)', type: 'image' },
                      { key: 'title', label: '活动名称 (必填)', type: 'text' },
                      { key: 'desc', label: '简要介绍', type: 'textarea' },
                      { key: 'time', label: '时间', type: 'text' },
                      { key: 'location', label: '地点', type: 'text' }
                    ]}
                  />
                )}

                <div className="space-y-2 mt-4">
                  <label className="text-[11px] font-bold text-[#A69984] ml-2 font-mono">高级配置 (JSON格式 - 用于列表项等)</label>
                  <textarea 
                    value={
                      activeTab === 'copyright' ? JSON.stringify(copyrightData.config || {}, null, 2) :
                      activeTab === 'production' ? JSON.stringify(productionData.config || {}, null, 2) :
                      activeTab === 'actors' ? JSON.stringify(actorsData.config || {}, null, 2) :
                      activeTab === 'invest' ? JSON.stringify(investData.config || {}, null, 2) :
                      activeTab === 'news' ? JSON.stringify((newsData as any).config || {}, null, 2) :
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
                        if (activeTab === 'news') setNewsData({...(newsData as any), config: parsed});
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
                               activeTab === 'news' ? newsData :
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
              <button onClick={() => openDramaDialog()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-2 transition-colors">
                <Plus size={16} /> 添加短剧
              </button>
            </div>
            <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-[13px] text-gray-500">
                  <tr>
                    <th className="py-4 px-6 font-medium w-32">封面</th>
                    <th className="py-4 px-6 font-medium">短剧名称</th>
                    <th className="py-4 px-6 font-medium text-gray-400">ID</th>
                    <th className="py-4 px-6 text-right font-medium">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {dramas.map((drama) => (
                  <tr key={drama.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-14 h-20 rounded-lg overflow-hidden bg-gray-50">
                        <img src={drama.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-[#1A1108]">{drama.title}</td>
                    <td className="py-4 px-6 text-[12px] font-mono text-gray-400 max-w-[200px] truncate">{drama.id}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <button 
                          onClick={() => openDramaDialog(drama)}
                          className="text-blue-600 hover:text-blue-800 text-[13px] font-bold transition-colors"
                        >
                          编辑
                        </button>
                        <button 
                          onClick={() => handleDeleteDrama(drama.id)} 
                          className="text-red-500 hover:text-red-700 text-[13px] font-bold transition-colors"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'liveStreams' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-black text-[#1A1108]">直播及预告列表 ({liveStreams.length})</h3>
              <button onClick={() => openLiveStreamDialog()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-2 transition-colors">
                <Plus size={16} /> 添加预告
              </button>
            </div>
            <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-[13px] text-gray-500">
                  <tr>
                    <th className="py-4 px-6 font-medium w-32">封面</th>
                    <th className="py-4 px-6 font-medium">标题</th>
                    <th className="py-4 px-6 font-medium text-gray-400">ID</th>
                    <th className="py-4 px-6 text-right font-medium">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {liveStreams.map((stream) => (
                  <tr key={stream.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <img src={stream.imageUrl} alt="" className="w-16 h-20 object-cover rounded-xl shadow-sm" />
                    </td>
                    <td className="py-4 px-6 font-bold text-[#1A1108]">{stream.title}</td>
                    <td className="py-4 px-6 text-[12px] font-mono text-gray-400 max-w-[200px] truncate">{stream.id}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <button 
                          onClick={() => openLiveStreamDialog(stream)}
                          className="text-blue-600 hover:text-blue-800 text-[13px] font-bold transition-colors"
                        >
                          编辑
                        </button>
                        <button 
                          onClick={() => handleDeleteLiveStream(stream.id)}
                          className="text-red-500 hover:text-red-700 text-[13px] font-bold transition-colors"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'bases' && (
          <div className="space-y-4 pb-10">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-black text-[#1A1108]">基地列表 ({bases.length})</h3>
              <button onClick={() => openBaseDialog()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-2 transition-colors">
                <Plus size={16} /> 添加基地
              </button>
            </div>
            <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-[13px] text-gray-500">
                  <tr>
                    <th className="py-4 px-6 font-medium w-36">图片</th>
                    <th className="py-4 px-6 font-medium">基地名称</th>
                    <th className="py-4 px-6 font-medium">地点</th>
                    <th className="py-4 px-6 font-medium">大区</th>
                    <th className="py-4 px-6 font-medium">热门推荐</th>
                    <th className="py-4 px-6 text-right font-medium">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {bases.map((base) => (
                  <tr key={base.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-50">
                        <img src={base.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-[#1A1108]">{base.title}</td>
                    <td className="py-4 px-6 text-[13px] text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-gray-400" />
                        {base.location}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[13px] text-gray-600">{base.region || '华南'}</td>
                    <td className="py-4 px-6">
                      <select
                        value={base.isHot || '否'}
                        onChange={async (e) => {
                          const newIsHot = e.target.value;
                          await updateBase(base.id, { ...base, isHot: newIsHot });
                          refresh();
                        }}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                      >
                        <option value="否">否</option>
                        <option value="是">是</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <button 
                          onClick={() => openBaseDialog({...base, tagsStr: base.tags?.join(',')})}
                          className="text-blue-600 hover:text-blue-800 text-[13px] font-bold transition-colors"
                        >
                          编辑
                        </button>
                        <button 
                          onClick={() => handleDeleteBase(base.id)} 
                          className="text-red-500 hover:text-red-700 text-[13px] font-bold transition-colors"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6 pb-10">
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-[#1A1108]">特色产品馆配置</h3>
                <button 
                  onClick={() => handleSavePage('mall', mallData)} 
                  className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-xl text-[13px] font-bold transition-colors shadow-lg shadow-black/20"
                >
                  保存场馆配置
                </button>
              </div>
              <AdminListEditor 
                title="特色产品馆列表"
                items={mallData.pavilions || []}
                onChange={(items: any) => setMallData({...mallData, pavilions: items})}
                setDialogState={setDialogState}
                schema={[
                  { key: 'imageUrl', label: '图片 (必填)', type: 'image' },
                  { key: 'title', label: '产品馆名称 (必填)', type: 'text' }
                ]}
              />
            </div>

            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 mt-6">
              <div className="flex justify-between items-center px-2 mb-4">
                <h3 className="font-black text-[#1A1108]">商城商品管理 ({products.length})</h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => {
                    refresh();
                    alert('商品数据已同步至小程序');
                  }} className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-xl text-[13px] font-bold transition-colors shadow-lg shadow-black/20">
                    保存并同步商品
                  </button>
                  <button onClick={() => openProductDialog()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-2 transition-colors">
                    <Plus size={16} /> 添加商品
                  </button>
                </div>
              </div>
              <div className="rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
                <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-[13px] text-gray-500">
                  <tr>
                    <th className="py-4 px-6 font-medium w-32">商品图</th>
                    <th className="py-4 px-6 font-medium">商品名称</th>
                    <th className="py-4 px-6 font-medium">价格</th>
                    <th className="py-4 px-6 text-right font-medium">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 mt-1">
                        <img src={product.imageUrl} className="w-full h-full object-cover" alt="" />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-[#1A1108]">{product.title}</td>
                    <td className="py-4 px-6 text-[#1A1108]">
                      {product.originalPrice && <div className="text-[12px] text-gray-500 line-through">原价: ¥ {product.originalPrice}</div>}
                      <div className="font-bold text-orange-600">会员价: ¥ {product.memberPrice || product.price}</div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <button 
                          onClick={() => openProductDialog(product)}
                          className="text-blue-600 hover:text-blue-800 text-[13px] font-bold transition-colors"
                        >
                          编辑
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(product.id)} 
                          className="text-red-500 hover:text-red-700 text-[13px] font-bold transition-colors"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4 pb-10">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-black text-[#1A1108]">用户列表 ({users.length})</h3>
            </div>
            <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-[13px] text-gray-500">
                  <tr>
                    <th className="py-4 px-6 font-medium">用户ID</th>
                    <th className="py-4 px-6 font-medium">昵称</th>
                    <th className="py-4 px-6 font-medium">注册时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {users.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-gray-400">{item.id}</td>
                    <td className="py-4 px-6 font-bold text-[#1A1108]">{item.nickname || 'Unknown'}</td>
                    <td className="py-4 px-6 text-gray-500">{item.createdAt || '-'}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-400">暂无用户数据</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'courseRegistrations' && (
          <div className="space-y-4 pb-10">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-black text-[#1A1108]">报名信息列表</h3>
            </div>
            {['海选', '文旅', '培训', '其他'].map(category => {
              const items = courseRegistrations.filter(r => (r.category || '其他') === category);
              if (items.length === 0) return null;
              return (
                <div key={category} className="mb-8">
                  <h4 className="font-bold text-[#D4AF37] mb-3 px-2 flex items-center gap-2">- {category}类别</h4>
                  <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50/50 border-b border-gray-100 text-[13px] text-gray-500">
                        <tr>
                          <th className="py-4 px-6 font-medium">姓名</th>
                          <th className="py-4 px-6 font-medium">电话</th>
                          <th className="py-4 px-6 font-medium">报名项目/科目</th>
                          <th className="py-4 px-6 font-medium">提交时间</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                      {items.map((item, idx) => (
                        <tr key={item.id || idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-6 font-bold text-[#1A1108]">{item.name}</td>
                          <td className="py-4 px-6 text-gray-600">{item.phone}</td>
                          <td className="py-4 px-6 text-gray-600">{item.projectName || item.courseName || '-'}</td>
                          <td className="py-4 px-6 text-gray-500">{item.date || '-'}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
            {courseRegistrations.length === 0 && (
              <div className="py-8 text-center text-gray-400">暂无报名数据</div>
            )}
          </div>
        )}

        {activeTab === 'feedbacks' && (
          <div className="space-y-4 pb-10">
            <div className="flex justify-between items-center px-2">
              <h3 className="font-black text-[#1A1108]">咨询反馈 (小助手收集)</h3>
            </div>
            <div className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-[13px] text-gray-500">
                  <tr>
                    <th className="py-4 px-6 font-medium">日期</th>
                    <th className="py-4 px-6 font-medium">提取手机号</th>
                    <th className="py-4 px-6 font-medium w-1/2">原始反馈内容</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                {feedbacks.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-gray-500 whitespace-nowrap">{item.date || '-'}</td>
                    <td className="py-4 px-6 font-bold text-blue-600 whitespace-nowrap">{item.phone || '-'}</td>
                    <td className="py-4 px-6 text-gray-700">{item.message}</td>
                  </tr>
                ))}
                {feedbacks.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-400">暂无反馈数据</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>
        {dialogState.isOpen && dialogState.config && (
          <FormDialog 
            isOpen={dialogState.isOpen} 
            onClose={() => setDialogState({ isOpen: false })} 
            {...dialogState.config}
          />
        )}
      </main>
    </div>
  );
}

