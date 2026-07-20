import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { User, ChevronRight, Shield, Bell, Trash2, Moon, Sun, Wallet, Star, Clock, HelpCircle, MessageSquare, Send, Film, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCMS } from '../context/CMSContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { HOT_DRAMAS, MALL_PRODUCTS } from '../constants';

import { useUser } from '../context/UserContext';

import ImageCropperModal from '../components/ImageCropperModal';

// 1. 个人资料页
export function Profile() {
  const { profile, updateProfile } = useUser();
  const [editing, setEditing] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleCropComplete = (croppedFile: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfile({ avatar: reader.result as string });
    };
    reader.readAsDataURL(croppedFile);
    setCropImageSrc(null);
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <div className="p-6">
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleImageUpload} />
        {cropImageSrc && (
          <ImageCropperModal
            imageSrc={cropImageSrc}
            onCropComplete={handleCropComplete}
            onCancel={() => setCropImageSrc(null)}
            aspectRatio={1} />
        )}
        <div className="bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5">
          {/* Avatar */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex justify-between items-center px-6 py-5 border-b border-gray-50 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors cursor-pointer"
          >
            <span className="text-[14px] font-black text-[#1A1108] dark:text-white">头像</span>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#FAF5EE] overflow-hidden border border-gray-100 dark:border-white/10">
              </div>
            </div>
          </div>

          {/* Nickname */}
          <div 
            onClick={() => setEditing('nickname')}
            className="flex justify-between items-center px-6 py-5 border-b border-gray-50 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors"
          >
            <span className="text-[14px] font-black text-[#1A1108] dark:text-white">昵称</span>
            <div className="flex items-center gap-2 flex-1 justify-end ml-4">
              {editing === 'nickname' ? (
                <input 
                  autoFocus
                  className="bg-transparent text-right text-[14px] text-[#A69984] font-bold outline-none border-b border-[#D4AF37]"
                  value={profile.nickname}
                  onChange={(e) => updateProfile({ nickname: e.target.value })}
                  onBlur={() => setEditing(null)} />
              ) : (
                <span className="text-[14px] text-[#A69984] font-bold">{profile.nickname}</span>
              )}
            </div>
          </div>

          {/* UID (Read only) */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-gray-50 dark:border-white/5 bg-gray-50/30 dark:bg-black/10 transition-colors">
            <span className="text-[14px] font-black text-[#1A1108] dark:text-white/60">UID</span>
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-[#A69984] font-bold opacity-60">{profile.uid}</span>
            </div>
          </div>

          {/* Gender */}
          <div 
            onClick={() => setEditing('gender')}
            className="flex justify-between items-center px-6 py-5 border-b border-gray-50 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors"
          >
            <span className="text-[14px] font-black text-[#1A1108] dark:text-white">性别</span>
            <div className="flex items-center gap-2">
              {editing === 'gender' ? (
                <select 
                  autoFocus
                  className="bg-transparent text-right text-[14px] text-[#A69984] font-bold outline-none"
                  value={profile.gender}
                  onChange={(e) => updateProfile({ gender: e.target.value })}
                  onBlur={() => setEditing(null)}
                >
                  <option value="男">男</option>
                  <option value="女">女</option>
                  <option value="保密">保密</option>
                </select>
              ) : (
                <span className="text-[14px] text-[#A69984] font-bold">{profile.gender}</span>
              )}
            </div>
          </div>

          {/* Bio */}
          <div 
            onClick={() => setEditing('bio')}
            className="flex justify-between items-center px-6 py-5 border-b last:border-0 border-gray-50 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors"
          >
            <span className="text-[14px] font-black text-[#1A1108] dark:text-white">个性签名</span>
            <div className="flex items-center gap-2 flex-1 justify-end ml-4">
              {editing === 'bio' ? (
                <input 
                  autoFocus
                  className="bg-transparent text-right text-[14px] text-[#A69984] font-bold outline-none border-b border-[#D4AF37] w-full"
                  value={profile.bio}
                  onChange={(e) => updateProfile({ bio: e.target.value })}
                  onBlur={() => setEditing(null)} />
              ) : (
                <span className="text-[14px] text-[#A69984] font-bold line-clamp-1">{profile.bio}</span>
              )}
            </div>
          </div>
        </div>
        <button className="w-full mt-8 h-14 bg-white dark:bg-[#2A1D0F] text-red-500 font-black rounded-2xl border border-red-50 dark:border-red-500/10 shadow-sm active:scale-95 transition-all">
          退出当前账号
        </button>
      </div>
    </div>
  );
}

// 2. 我的钱包
export function MyWallet() {
  const { addNotification } = useUser();
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full">
      <div className="p-6">
        <div className="bg-[#1A1108] rounded-[40px] p-8 text-[#E6D5B8] shadow-2xl mb-8 relative overflow-hidden">
          <p className="text-[14px] opacity-60 font-bold mb-2">当前星币余额</p>
          <div className="flex items-end gap-2 mb-8">
            <span className="text-[40px] font-black leading-none">12,850</span>
            <span className="text-[14px] font-bold mb-1">Star Coin</span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                addNotification({
                  title: '充值成功',
                  content: '您已成功充值 1000 Star Coin。',
                  type: 'system'
                });
                alert('充值成功');
              }}
              className="flex-1 h-12 bg-[#D4AF37] text-white rounded-xl font-black text-[14px]">立即充值</button>
            <button className="flex-1 h-12 bg-white/10 backdrop-blur-md text-white rounded-xl font-black text-[14px] border border-white/10">星钻兑换</button>
          </div>
        </div>

        <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-6">账单明细</h3>
        <div className="bg-white dark:bg-[#2A1D0F] rounded-[32px] p-6 shadow-sm border border-gray-50 dark:border-white/5 space-y-6">
          {[
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center pb-6 border-b border-gray-50 dark:border-white/5 last:border-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center">
                  {item.ic}
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-[#1A1108] dark:text-white">{item.t}</h4>
                  <p className="text-[11px] text-[#A69984] font-bold mt-1">{item.d}</p>
                </div>
              </div>
              <span className={`text-[15px] font-black ${item.v.startsWith('+') ? 'text-green-500' : 'text-[#1A1108] dark:text-[#E6D5B8]'}`}>{item.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. 我的收藏
export function Favorites() {
  const [tab, setTab] = useState('短剧');
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <div className="flex px-6 py-0 gap-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-[#1A1108] sticky top-24 z-20 overflow-x-auto scrollbar-hide">
        {[
        ].map(item => (
          <button 
            key={item.label}
            onClick={() => setTab(item.label)}
            className={`text-[15px] h-14 font-black transition-all relative flex items-center gap-2 ${tab === item.label ? 'text-[#8B6E4E] dark:text-[#E6D5B8]' : 'text-[#A69984] dark:text-gray-500 hover:text-[#8B6E4E]'}`}
          >
            {item.ic}
            {item.label}
            {tab === item.label && (
              <motion.div 
                layoutId="favTabActive" 
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] rounded-full" 
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
            )}
          </button>
        ))}
      </div>
      <div className="p-5 grid grid-cols-1 gap-4">
        {tab === '短剧' ? (
          HOT_DRAMAS.length > 0 ? (
            HOT_DRAMAS.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-white dark:bg-[#2A1D0F] p-4 rounded-[28px] shadow-sm border border-gray-100 dark:border-white/5 flex gap-4 active:scale-[0.98] transition-transform"
              >
                <div className="flex flex-col justify-center gap-2">
                  <h4 className="text-[15px] font-black text-[#1A1108] dark:text-white">{item.title}</h4>
                  <p className="text-[12px] text-[#A69984] font-bold">更新至 第80集</p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center text-gray-400 font-bold py-10">暂无收藏</div>
          )
        ) : tab === '商品' ? (
          MALL_PRODUCTS.map((prod, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-white dark:bg-[#2A1D0F] p-4 rounded-[28px] shadow-sm border border-gray-100 dark:border-white/5 flex gap-4 active:scale-[0.98] transition-transform"
            >
              <div className="flex flex-col justify-center gap-1">
                <h4 className="text-[14px] font-black text-[#1A1108] dark:text-white line-clamp-1">{prod.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-black text-[#8B6E4E] dark:text-[#E6D5B8]">¥ {prod.price}</span>
                  <span className="text-[10px] text-[#A69984] font-bold line-through opacity-50">¥ {Math.floor(prod.price * 1.5)}</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 flex flex-col items-center justify-center gap-4 opacity-40"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400">
            </div>
            <p className="text-[14px] font-bold text-[#A69984]">暂无收藏资讯</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-20 text-center text-[#A69984] font-bold opacity-50">暂无收藏内容</div>
  );
}



// 4. 设置页面
export function Settings() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [cacheSize, setCacheSize] = useState('128 MB');

  const handleClearCache = () => {
    if (confirm('确定要清除本地缓存吗？')) {
      localStorage.clear();
      setCacheSize('0 MB');
      alert('缓存已清除');
    }
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <div className="p-6">
        {/* Appearance Group */}
        <div className="bg-white dark:bg-[#2A1D0F] rounded-[32px] p-6 shadow-sm border border-gray-50 dark:border-white/5 mb-6">
          <h3 className="text-[13px] font-black text-[#A69984] uppercase tracking-wider mb-6">外观展示</h3>
          <div className="grid grid-cols-2 gap-4">
            <div 
              onClick={() => toggleTheme('light')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-3 ${theme === 'light' ? 'border-[#D4AF37] bg-yellow-50/50' : 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black/20'}`}
            >
              <div className="w-full aspect-[2/1] bg-white rounded-lg shadow-inner flex items-center justify-center">
              </div>
              <span className={`text-[12px] font-black ${theme === 'light' ? 'text-[#1A1108]' : 'text-gray-400'}`}>浅色模式</span>
            </div>
            <div 
              onClick={() => toggleTheme('dark')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center gap-3 ${theme === 'dark' ? 'border-[#D4AF37] bg-yellow-50/50' : 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-black/20'}`}
            >
              <div className="w-full aspect-[2/1] bg-[#1A1108] rounded-lg shadow-inner flex items-center justify-center">
              </div>
              <span className={`text-[12px] font-black ${theme === 'dark' ? 'text-white' : 'text-gray-400'}`}>深色模式</span>
            </div>
          </div>
        </div>

        {/* List Group */}
        <div className="bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5 mb-8">
          {[
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={() => {
                if (item.action) item.action();
                else if (item.path) navigate(item.path);
              }}
              className="flex justify-between items-center px-6 py-5 border-b last:border-0 border-gray-50 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 text-[#1A1108] dark:text-white">
                <span className="text-[#A69984]">{item.icon}</span>
                <span className="text-[14px] font-black">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.value && <span className="text-[12px] text-[#A69984] font-bold">{item.value}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 5. 帮助中心
export function HelpCenter() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { text: '您好，我是中星影视生态链小助手，很高兴为您服务！', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showChat) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, showChat]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInput('');

    setTimeout(async () => {
      let reply = '我正在学习，暂时还不能回答这个问题';
      const lowercaseMsg = userMsg.toLowerCase();
      let shouldSave = false;
      
      if (lowercaseMsg === '你好' || lowercaseMsg === '您好') {
        reply = '您好！有什么可以帮您？';
      } else if (lowercaseMsg.includes('合作')) {
        reply = '请将您的联系方式和想合作的项目简单告诉我，我请我们对口的负责人和您联系，感谢您的支持！';
      } else if (/^1[3-9]\d{9}$/.test(userMsg.replace(/\s/g, '')) || (lowercaseMsg.includes('项目') && userMsg.length > 5)) {
        reply = '好的，已经记录您的信息，请耐心等待！';
        shouldSave = true;
      } else {
        const keywords = ['短剧', '生态链', '星币', '充值', '基地', '文创', '产品', '海选', '报名', '中星', '助手', '拍摄', '发现', '商场', '订单'];
        if (keywords.some(k => lowercaseMsg.includes(k))) {
          if (lowercaseMsg.includes('短剧')) reply = '中星短剧平台提供海量精品短剧资源，您可以前往首页“热门剧集”观看。';
          else if (lowercaseMsg.includes('星币') || lowercaseMsg.includes('充值')) reply = '您可以前往“我的钱包”进行充值和查看星币余额。';
          else if (lowercaseMsg.includes('报名') || lowercaseMsg.includes('海选')) reply = '点击项目详情页中的“我要报名”即可提交参与申请。';
          else if (lowercaseMsg.includes('基地') || lowercaseMsg.includes('拍摄')) reply = '我们整合了多处优质影视拍摄基地，可以在“发现”板块探索基地详情。';
          else if (lowercaseMsg.includes('文创') || lowercaseMsg.includes('产品') || lowercaseMsg.includes('商场')) reply = '前往“商城”板块可以选购我们的特色产品馆。';
          else reply = '中星影视生态链致力于为用户提供一站式的数字娱乐与影视周边服务。';
        } else if (userMsg.length > 7 && (/\d{8,}/.test(userMsg) || lowercaseMsg.includes('电话') || lowercaseMsg.includes('微信'))) {
          reply = '好的，已经记录您的信息，稍后会有专人联系您！';
          shouldSave = true;
        }
      }
      
      if (shouldSave) {
        try {
          const { addFeedback } = await import('../services/cmsService');
          await addFeedback({ 
            message: userMsg, 
            phone: userMsg.replace(/\D/g,'').substring(0, 11) || '',
            date: new Date().toLocaleString()
          });
        } catch (err) {
          console.error("Failed to save feedback", err);
        }
      }
      
      setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
    }, 800);
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors relative flex flex-col overflow-hidden">
      <div className="flex-1 p-6 pb-32">
        <div 
          onClick={() => setShowChat(true)}
          className="bg-[#8B6E4E] rounded-[32px] p-6 text-white mb-8 flex justify-between items-center shadow-lg active:scale-95 transition-transform cursor-pointer"
        >
          <div>
            <h3 className="text-[18px] font-black mb-1">在线客服</h3>
            <p className="text-[12px] opacity-70 font-bold">每日 09:00 - 22:00 在线为您服务</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
          </div>
        </div>

        <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-6">常见问题</h3>
        <div className="space-y-4">
          {[
            '如何充值星币？',
            '收藏的作品在哪里查看？',
            '无法播放剧集怎么办？',
            '如何联系基地负责人？'
          ].map((q, i) => (
            <div key={i} className="bg-white dark:bg-[#2A1D0F] p-5 rounded-2xl border border-gray-50 dark:border-white/5 flex justify-between items-center">
              <span className="text-[14px] font-black text-[#4A443E] dark:text-white/80">{q}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Bot Popup */}
      <AnimatePresence>
        {showChat && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-[#FAF9F6] dark:bg-[#1A1108] rounded-t-[40px] flex flex-col h-[75vh] shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8B6E4E] flex items-center justify-center text-white">
                  </div>
                  <div>
                    <h4 className="text-[15px] font-black text-[#1A1108] dark:text-white">中星影视生态链小助手</h4>
                    <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                      当前在线
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChat(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400"
                >
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-[13px] font-medium leading-relaxed ${
                      m.sender === 'user' 
                        ? 'bg-[#1A1108] text-white rounded-tr-none' 
                        : 'bg-white dark:bg-[#2A1D0F] text-[#4A443E] dark:text-[#E6D5B8] rounded-tl-none shadow-sm shadow-[#8B6E4E]/5'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 pb-10 bg-white dark:bg-[#1A1108] border-t border-gray-100 dark:border-white/5">
                <div className="flex gap-3 items-center bg-gray-50 dark:bg-white/5 rounded-2xl p-2 pr-4 shadow-inner">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="输入您的问题..."
                    className="flex-1 h-12 bg-transparent pl-4 text-[14px] outline-none dark:text-white" />
                  <button 
                    disabled={!input.trim()}
                    onClick={handleSend}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      input.trim() 
                        ? 'bg-[#8B6E4E] text-white shadow-lg active:scale-90' 
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 6. 我的订单
export function MyOrders() {
  const [tab, setTab] = useState('全部');
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors">
      <div className="flex px-6 py-4 gap-8 bg-white dark:bg-[#1A1108] sticky top-24 z-20 border-b border-gray-50 dark:border-white/5">
        {['全部', '待付款', '待收货', '已完成'].map(t => (
          <button 
            key={t}
            onClick={() => setTab(t)}
            className={`text-[14px] font-black transition-all relative pb-2 ${tab === t ? 'text-[#8B6E4E] dark:text-[#E6D5B8]' : 'text-gray-300 dark:text-gray-600'}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-5 space-y-4">
        {MALL_PRODUCTS.slice(0, 2).map((prod, i) => (
          <div key={i} className="bg-white dark:bg-[#2A1D0F] rounded-[32px] p-6 shadow-sm border border-gray-50 dark:border-white/5">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50 dark:border-white/5">
              <span className="text-[12px] text-[#A69984] font-bold">订单号：ZX20240612{i}</span>
              <span className="text-[12px] text-[#D4AF37] font-black">已发货</span>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-[14px] font-black text-[#1A1108] dark:text-white line-clamp-1">{prod.title}</h4>
                <p className="text-[16px] font-black text-[#1A1108] dark:text-[#D4AF37] mt-1">¥ {prod.price}</p>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-50 dark:border-white/5">
              <button className="px-5 py-2 border border-gray-100 dark:border-white/10 rounded-xl text-[12px] font-bold text-[#A69984]">查看物流</button>
              <button className="px-5 py-2 bg-[#F2EDE4] dark:bg-white/5 text-[#8B6E4E] dark:text-[#D4AF37] rounded-xl text-[12px] font-black">确认收货</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 7. 我的活动/报名
export function MyActivities() {
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full">
      <div className="p-6">
        <div className="space-y-6">
          {[
            { t: '短剧《盐田往事》演员海选', d: '2024-06-15 14:00', s: '待面试', i: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400' },
            { t: '编剧沙龙：短剧出海新趋势', d: '2024-06-20 19:30', s: '报名成功', i: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400' }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5">
              <div className="h-32 relative">
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#8B6E4E] dark:text-[#D4AF37]">
                  {item.s}
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-[15px] font-black text-[#1A1108] dark:text-white mb-1">{item.t}</h4>
                <p className="text-[12px] text-[#A69984] font-bold">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 8. 账号与安全 (四级页面)
export function AccountSecurity() {
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full">
      <div className="p-6">
        <div className="bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5">
          {[
            { label: '手机号', value: '138****8888' },
            { label: '实名认证', value: '已认证' },
            { label: '修改密码', value: '' },
            { label: '注销账号', value: '', color: 'text-red-500' }
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center px-6 py-5 border-b last:border-0 border-gray-50 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors">
              <span className={`text-[14px] font-black ${item.color || 'text-[#1A1108] dark:text-white'}`}>{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-[#A69984] font-bold">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 9. 关于中星 (四级页面)
export function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full flex flex-col">
      <div className="p-8 flex flex-col items-center flex-1">
        <div className="w-24 h-24 rounded-[32px] bg-[#1A1108] flex items-center justify-center text-[#D4AF37] shadow-xl mb-6">
        </div>
        <h2 className="text-[20px] font-black text-[#1A1108] dark:text-white mb-1">中星影视生态链</h2>
        <p className="text-[14px] text-[#A69984] font-bold mb-10">Version 1.2.4</p>
        
        <div className="w-full bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5">
          {[
            { label: '功能介绍', path: '/doc/features' },
            { label: '投诉建议', path: '/help' },
            { label: '隐私协议', path: '/doc/privacy' },
            { label: '用户服务协议', path: '/doc/terms' }
          ].map((item, i) => (
            <div 
              key={i} 
              onClick={() => navigate(item.path)}
              className="flex justify-between items-center px-6 py-5 border-b last:border-0 border-gray-50 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="text-[14px] font-black text-[#1A1108] dark:text-white">{item.label}</span>
            </div>
          ))}
        </div>
        
        <p className="mt-auto pt-20 text-[11px] text-[#A69984] font-bold text-center">
        </p>
      </div>
    </div>
  );
}

export function DocumentPage() {
  const { docKey } = useParams();
  const { pages } = useCMS();
  const doc = pages.documents || {};
  const content = doc[docKey as string] || '暂无内容';
  
  const title = docKey === 'features' ? '功能介绍' : 
                docKey === 'privacy' ? '隐私协议' : 
                docKey === 'terms' ? '用户服务协议' : '文档';

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10">
      <div className="p-6">
        <div className="bg-white dark:bg-[#2A1D0F] rounded-[32px] p-6 shadow-sm border border-gray-50 dark:border-white/5 whitespace-pre-wrap text-[14px] leading-relaxed text-[#4A443E] dark:text-[#E6D5B8]">
          {content}
        </div>
      </div>
    </div>
  );
}
