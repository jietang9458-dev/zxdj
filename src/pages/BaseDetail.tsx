import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { BASES } from '../constants';
import { MapPin, Heart, Camera, Coffee, Home, Car, Users } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

const FacilityIcons: { [key: string]: any } = {
  '摄影棚': Camera,
  '化妆间': Users,
  '住宿': Home,
  '餐饮': Coffee,
  '停车场': Car,
};

export default function BaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bases } = useCMS();
  
  const currentBases = bases && bases.length > 0 ? bases : BASES;
  const base = currentBases.find((b: any) => b.id === id) || currentBases[0];
  const tagsStr = base.tagsStr || '';
  const tags = tagsStr ? tagsStr.split(',').map((t: string) => t.trim()).filter(Boolean) : ['海景基地', '高级配套'];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="基地详情" transparent showBack dark />
      
      {/* Top Image */}
      <div className="h-[300px] w-full relative -mt-24">
        <img src={base.imageUrl} alt={base.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Main Info Card */}
      <div className="mx-5 -mt-10 bg-white dark:bg-[#2A1D0F] rounded-[40px] p-8 shadow-xl relative z-10 border border-transparent dark:border-white/5 transition-colors">
        <h1 className="text-[22px] font-black text-[#1A1108] dark:text-white mb-4">{base.title}</h1>
        
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <div className="flex items-center gap-1.5 text-[#A69984] text-[13px] font-bold">
            <MapPin size={16} className="text-[#D4AF37]" />
            {base.location}
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1.5 bg-[#FAF9F6] dark:bg-black/20 text-[#A69984] text-[11px] font-bold rounded-xl border border-gray-100 dark:border-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Section: Intro */}
        <div className="mb-10">
          <h2 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-4">基地介绍</h2>
          {base.introImage && (
            <div className="w-full rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-50 dark:border-white/5">
              <img src={base.introImage} className="w-full object-cover" alt="" />
            </div>
          )}
          <p className="text-[14px] text-[#4A443E] dark:text-white/60 leading-relaxed opacity-80 whitespace-pre-wrap">
             {base.introText || '短剧生态链旗下的重要示范基地，拥有得天独厚的自然环境和先进的拍摄设施。基地包含多个专业影棚，能够满足不同题材的短剧拍摄需求。同时，基地配套设施完善，包括演员公寓、专业化妆间等。'}
          </p>
        </div>

        {/* Section: Facilities */}
        <div className="mb-6">
          <h2 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-6">基地设施</h2>
          {base.facilities ? (
            <div className="p-5 bg-gray-50 dark:bg-black/20 rounded-3xl text-[13px] text-[#4A443E] dark:text-[#A69984] leading-relaxed whitespace-pre-wrap">
              {base.facilities}
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4">
              {['摄影棚', '化妆间', '住宿', '餐饮', '停车场'].map((fac) => {
                const Icon = FacilityIcons[fac] || Home;
                return (
                  <div key={fac} className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#F2EDE4] dark:bg-black/40 flex items-center justify-center text-[#D4AF37] shadow-sm">
                      <Icon size={22} strokeWidth={2.5} />
                    </div>
                    <span className="text-[11px] font-bold text-[#4A443E] dark:text-white/40">{fac}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons - Now part of the page content */}
      <div className="mx-5 flex gap-4 mt-8 pb-8">
        <button className="flex-shrink-0 w-16 h-14 rounded-2xl border-2 border-[#D4AF37]/20 bg-white dark:bg-[#2A1D0F] flex items-center justify-center text-[#D4AF37] shadow-sm active:scale-95 transition-all">
          <Heart size={24} />
        </button>
        <button className="flex-1 h-14 bg-[#8B6E4E] text-white font-black rounded-2xl shadow-xl shadow-[#8B6E4E]/30 active:scale-95 transition-all tracking-widest text-[16px]">
          预约参观
        </button>
      </div>
    </div>
  );
}
