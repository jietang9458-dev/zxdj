import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { User, ClipboardList, Star, ShoppingBag, Calendar, Crown, Headset, UserPlus, Settings, Edit3, Wallet } from 'lucide-react';

import { useUser } from '../context/UserContext';

export default function Mine() {
  const navigate = useNavigate();
  const { profile } = useUser();
  
  const ServiceIcons = [
    { label: '咨询反馈', Icon: Headset, path: '/help' },
    { label: '我的钱包', Icon: Wallet, path: '/wallet' },
    { label: '我的收藏', Icon: Star, path: '/favorites' },
    { label: '我的订单', Icon: ShoppingBag, path: '/orders' },
  ];

  const RightsIcons = [
    { label: '会员中心', Icon: Crown, path: '/starclub' },
    { label: '设置', Icon: Settings, path: '/settings' },
    { label: '邀请好友', Icon: UserPlus, path: '/service/flow' },
    { label: '我的报名', Icon: ClipboardList, path: '/user/my-registrations' },
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="我的" dark />
      
      {/* Profile Header */}
      <div className="px-8 py-10 flex items-center gap-6">
        <div 
          onClick={() => navigate('/profile')}
          className="w-20 h-20 rounded-full bg-[#8EADCE] flex items-center justify-center text-white shadow-lg overflow-hidden border-4 border-white dark:border-[#2A1D0F] cursor-pointer active:scale-95 transition-all"
        >
          {profile.avatar ? (
            <img src={profile.avatar} className="w-full h-full object-cover" />
          ) : (
            <User size={48} />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div onClick={() => navigate('/profile')} className="cursor-pointer">
              <h2 className="text-[20px] font-black text-[#1A1108] dark:text-white mb-1">{profile.nickname}</h2>
              <p className="text-[12px] text-[#A69984] font-bold">会员等级：VIP会员</p>
            </div>
            <button 
              onClick={() => navigate('/profile')}
              className="bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-1.5 rounded-xl text-[12px] font-bold border border-[#D4AF37]/20 flex items-center gap-1 active:scale-95 transition-all"
            >
              <Edit3 size={12} /> 编辑资料
            </button>
          </div>
        </div>
      </div>

      {/* Section: Services */}
      <div className="mx-5 mb-6 bg-white dark:bg-[#2A1D0F] rounded-[32px] p-8 shadow-sm border border-gray-50 dark:border-white/5">
        <h3 className="text-[16px] font-black text-[#1A1108] dark:text-white mb-8">我的服务</h3>
        <div className="grid grid-cols-4 gap-4">
          {ServiceIcons.map((item, idx) => (
            <div key={idx} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-3 cursor-pointer group">
              <item.Icon className="text-[#3D3832] dark:text-[#E6D5B8] group-active:scale-90 transition-transform" size={24} />
              <span className="text-[12px] font-bold text-[#4A443E] dark:text-white/60">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Rights */}
      <div className="mx-5 mb-10 bg-white dark:bg-[#2A1D0F] rounded-[32px] p-8 shadow-sm border border-gray-50 dark:border-white/5">
        <h3 className="text-[16px] font-black text-[#1A1108] dark:text-white mb-8">我的权益</h3>
        <div className="grid grid-cols-4 gap-4">
          {RightsIcons.map((item, idx) => (
            <div key={idx} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-3 cursor-pointer group">
              <item.Icon className="text-[#3D3832] dark:text-[#E6D5B8] group-active:scale-90 transition-transform" size={24} />
              <span className="text-[12px] font-bold text-[#4A443E] dark:text-white/60">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
