import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import Header from '../components/Header';
import { CheckCircle2, ShieldCheck, TrendingUp, Search, FileText, Download, Briefcase, Users, Coins, Info, User, Phone, Calendar, Star, Link, LayoutList, Video, BookOpen, MessageSquare, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HOT_DRAMAS } from '../constants';

// --- 版权营销中心子页面 ---

export function CopyrightPurchase() {
  const navigate = useNavigate();
  const purchaseRecommendations = [
    { 
      title: 'AI制作短剧', 
      imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4628c6bb5?q=80&w=400&h=600&fit=crop', 
      desc: '每部短剧共50份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (A)0021 001~050' 
    },
    { 
      title: '精品短剧', 
      imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&h=600&fit=crop', 
      desc: '每部短剧共100份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (B)0101 001~100' 
    },
    { 
      title: '明星短剧', 
      imageUrl: 'https://images.unsplash.com/photo-1544208453-ca422f28b7e2?q=80&w=400&h=600&fit=crop', 
      desc: '每部短剧共200份版权，每份版权统一售价10000元，版权编号示例：ZXDJ (C)0201 001~200，注：明星演员的定义、标准和人选由中星短剧生态链确定，版权购买方不存有异议。' 
    },
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="购买版权" dark />
      <div className="p-6">
        <div className="bg-white dark:bg-[#2A1D0F] rounded-[32px] p-6 shadow-sm border border-gray-50 dark:border-white/5 mb-8">
          <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-4">热门可购版权</h3>
          <div className="space-y-4">
            {purchaseRecommendations.map((drama, i) => (
              <div key={i} className="flex gap-4 p-3 bg-gray-50 dark:bg-black/20 rounded-2xl items-center">
                <div className="w-16 h-24 rounded-xl overflow-hidden shadow-sm flex-shrink-0 relative">
                  <img src={drama.imageUrl} className="w-full h-full object-cover" alt="" />
                  <div className="absolute top-1 right-1 bg-black/60 rounded-md p-1 backdrop-blur-sm">
                    <ShieldCheck size={12} className="text-[#D4AF37]" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1 px-1.5 bg-[#8B6E4E]/10 rounded text-[9px] font-black text-[#8B6E4E] uppercase">Premium</span>
                    <h4 className="font-black text-[14px] text-[#1A1108] dark:text-[#E6D5B8]">{drama.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#A69984] mt-1 leading-relaxed line-clamp-2">{drama.desc}</p>
                </div>
                <button 
                  onClick={() => navigate('/copyright/purchase-instructions')}
                  className="bg-[#8B6E4E] text-white px-4 py-1.5 rounded-lg text-[11px] font-bold active:scale-95 transition-transform flex items-center gap-1"
                >
                  <MessageSquare size={12} /> 咨询
                </button>
              </div>
            ))}
          </div>
        </div>
        <div 
          onClick={() => navigate('/copyright/rights')}
          className="bg-orange-50 dark:bg-orange-900/20 p-8 rounded-[32px] border border-orange-100 dark:border-orange-500/20 flex flex-col items-center text-center cursor-pointer active:scale-[0.98] transition-transform mb-6"
        >
          <TrendingUp className="text-orange-500 mb-4" size={40} />
          <h4 className="font-black text-[18px] text-[#1A1108] dark:text-white">购买版权的权益</h4>
          <p className="text-[13px] text-orange-400 mt-2 font-bold">解锁十大专属核心权益 · 共享短剧掘金红利</p>
        </div>

        <div 
          onClick={() => navigate('/copyright/full-purchase-instructions')}
          className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-[32px] border border-blue-100 dark:border-blue-500/20 flex flex-col items-center text-center cursor-pointer active:scale-[0.98] transition-transform"
        >
          <ShieldCheck className="text-blue-500 mb-4" size={40} />
          <h4 className="font-black text-[18px] text-[#1A1108] dark:text-white">全版权购买</h4>
          <p className="text-[13px] text-blue-400 mt-2 font-bold">独家持有保护 · 永久知识产权所有</p>
        </div>
      </div>
    </div>
  );
}

export function PurchaseInstructions() {
  const steps = [
    { t: '购买须知', d: '购买版权是自己真实意愿的表达，共享收益，共担风险。版权购买需线下签订版权购买合同和版权授权协议，版权销售款不委托任何企业和个人代收，按照正式签订的合同里明确的收款方付款。签订合同时需要明确介绍人的姓名和电话。' },
    { t: '选择版权', d: '在热销中短剧版权里，购买短剧版权号。版权库里的仅供参考，在截止该部短剧的版权销售开始筹备时，官方平台会即时公布版权号所对应的短剧内容，任何购买版权者不持有异议。' },
    { t: '签署合约', d: '线下签署正式的版权购买合同和版权授权协议。' },
    { t: '票房收益', d: '所购买的短剧版权的短剧上线后，根据播放平台的结算收益按照版权购买合同约定支付票房收益。' }
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="购买须知及办法" dark />
      <div className="p-6">
        <div className="bg-[#1A1108] dark:bg-[#2A1D0F] p-8 rounded-[32px] mb-8 text-center">
          <Info className="text-[#D4AF37] mx-auto mb-4" size={40} />
          <h2 className="text-[20px] font-black text-white mb-2">标准化版权购买流程</h2>
          <p className="text-[#A69984] text-[13px]">合规、透明、专业的一站式版权转让服务</p>
        </div>

        <div className="space-y-6">
          {steps.map((s, i) => (
            <div key={i} className="bg-white dark:bg-[#2A1D0F] p-6 rounded-[24px] shadow-sm border border-gray-50 dark:border-white/5 relative overflow-hidden">
              <div className="absolute -left-2 -top-2 w-12 h-12 bg-[#FAF5EE] dark:bg-black/20 rounded-full flex items-center justify-center -rotate-12">
                <span className="text-[20px] font-black text-[#D4AF37] opacity-20">{i + 1}</span>
              </div>
              <h4 className="text-[16px] font-black text-[#1A1108] dark:text-white mb-2 relative z-10">{s.t}</h4>
              <p className="text-[13px] text-[#4A443E] dark:text-[#A69984] leading-relaxed font-medium relative z-10">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-500/20">
          <h5 className="text-[14px] font-black text-orange-800 dark:text-orange-400 mb-2">特别提醒</h5>
          <p className="text-[12px] text-orange-700 dark:text-orange-300 leading-relaxed font-bold">
            所有版权交易均与中星短剧生态链官方产生。如遇私下交易请及时反馈和投诉，私下交易产生的所有风险，平台概不负责，同时平台保留追究法律责任的权利。
          </p>
        </div>
      </div>
    </div>
  );
}

export function FullCopyrightInstructions() {
  const navigate = useNavigate();
  const benefits = [
    { t: '永久所有权', d: '获得该作品除署名权外所有的著作财产权利。' },
    { t: '全球独占', d: '在约定期限和全球范围内具有排他性的权利。' },
    { t: '二次创作权', d: '允许对作品进行改编、续写、剪辑等二次开发。' },
    { t: '商业衍生', d: '包含周边开发、形象授权、广告植入等商业化权利。' }
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="全版权购买须知及办法" dark />
      <div className="p-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[32px] mb-8 text-center text-white shadow-lg">
          <ShieldCheck className="mx-auto mb-4" size={48} />
          <h2 className="text-[22px] font-black mb-2">全版权终极权益</h2>
          <p className="text-blue-100/80 text-[14px]">深度掌控内容资产，开启无限商业可能</p>
        </div>

        <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-6 px-2">四大核心权益</h3>
        <div className="grid grid-cols-1 gap-4 mb-10">
          {benefits.map((b, i) => (
            <div key={i} className="bg-white dark:bg-[#2A1D0F] p-6 rounded-[24px] shadow-sm border border-gray-50 dark:border-white/5 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="text-blue-500" size={20} />
              </div>
              <div>
                <h4 className="text-[15px] font-black text-[#1A1108] dark:text-white mb-1">{b.t}</h4>
                <p className="text-[13px] text-[#A69984] leading-relaxed font-bold">{b.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-[#2A1D0F] p-8 rounded-[32px] border border-gray-100 dark:border-white/5">
          <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-4">购买流程细节</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <Search className="text-blue-500" size={18} />
              </div>
              <p className="text-[13px] text-[#4A443E] dark:text-[#A69984] font-medium pt-1">在版权库里选择或者预约全版权专家定制短剧。</p>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <FileText className="text-blue-500" size={18} />
              </div>
              <p className="text-[13px] text-[#4A443E] dark:text-[#A69984] font-medium pt-1">线下签署短剧定制合同，按合同支付款项。</p>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <Download className="text-blue-500" size={18} />
              </div>
              <p className="text-[13px] text-[#4A443E] dark:text-[#A69984] font-medium pt-1">需要发行的签订发行协议。不需要发行的，交付花絮、成片和工程文件。</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/help')}
          className="w-full mt-10 h-14 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-800/10 active:scale-95 transition-all text-[15px]"
        >
          极速预约全版权专家
        </button>
      </div>
    </div>
  );
}

export function CopyrightRights() {
  const rights = [
    "成为中星短剧生态链的联合制片人，销售推广中星短剧生态链的版权和其他业务，享受销售的佣金和平台公司奖励。",
    "颁发电子版“中星短剧生态链的联合制片人”牌匾，牌匾内有个人的照片和名字。",
    "每份版权按照票房版权方收益的（A: AI短剧2%，B：精品短剧1%，C：明星短剧0.5%）比例，长期享受版权收益，每月支付一次。",
    "销售佣金每份版权2000元。",
    "完成销售三份版权后公司奖励4000元。",
    "三份版权中其中两份版权完成三份版权的销售，平台公司再奖励2000元。",
    "完成3组同类型版权销售后，公司随机奖励一份同类型版权（价值10000元），与购买版权享受同等的权利。",
    "可以参加明星俱乐部活动，与明星互动。",
    "可以参与公司的发布会、开机仪式、片场探班等。",
    "可以参演公司的短剧（AI短剧除外）。"
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="购买版权的十大权益" dark />
      <div className="p-6">
        <div className="bg-[#1A1108] dark:bg-[#2A1D0F] p-8 rounded-[32px] mb-8 text-center text-white">
          <TrendingUp className="text-[#D4AF37] mx-auto mb-4" size={40} />
          <h2 className="text-[20px] font-black mb-2">联合制片人十大权益</h2>
          <p className="text-[#A69984] text-[13px]">加入中星短剧生态链，开启财富增长新引擎</p>
        </div>

        <div className="space-y-4">
          {rights.map((r, i) => (
            <div key={i} className="bg-white dark:bg-[#2A1D0F] p-5 rounded-[24px] shadow-sm border border-gray-50 dark:border-white/5 flex gap-4 items-start group">
              <div className="w-8 h-8 rounded-full bg-[#1A1108] dark:bg-[#E6D5B8] flex items-center justify-center shrink-0 mt-0.5 shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-[12px] font-black text-white dark:text-[#1A1108]">{i + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-[#1A1108] dark:text-[#E6D5B8] leading-relaxed font-black">{r}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SalesModel() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="销售模式" dark />
      <div className="p-8">
        <div className="space-y-8">
          {[
            { t: '区域子公司管理模式', d: '针对中星短剧地方影视文化服务中心、代理公司进行全方位的业务赋能与区域管理支持。', i: <Briefcase className="text-orange-500"/> },
            { t: '分销代理模式', d: '成为地方（中星短剧XX影视文化服务中心）代理销售 or 平台、团队代理，享受高额销售返佣和平台分红。', i: <Users className="text-blue-500"/> },
            { t: '销售模式', d: '凡是购买一份短剧版权者，获得电子版”中星短剧生态链联合制片人“牌匾，牌匾里有本人的照片和名字。就可以直接销售中星短剧生态链的短剧版权，首次直接销售3份版权就全额回本（每销售一份，佣金2000元；完成销售3份，平台公司奖励4000元；销售的3份版权中，其中2份各自再销售3份，平台公司再奖励2000元。）。完成以上9份版权销售。即为完成一组销售，可收益12000元。完成一组销售后，开启另一组销售，完成3组销售后，平台公司随机奖励一份版权，与购买的版权享受同等权益。', i: <TrendingUp className="text-green-500"/> }
          ].map((m, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#2A1D0F] shadow-sm animate-shadow-pulse flex items-center justify-center flex-shrink-0">
                {React.cloneElement(m.i as React.ReactElement, { size: 28 })}
              </div>
              <div>
                <h4 className="text-[17px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2">{m.t}</h4>
                <p className="text-[13px] text-[#A69984] font-medium leading-relaxed">{m.d}</p>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => navigate('/help')}
          className="w-full mt-12 h-14 bg-[#1A1108] text-[#E6D5B8] font-black rounded-2xl shadow-xl active:scale-95 transition-all text-[15px] tracking-widest"
        >
          下载详细合作手册
        </button>
      </div>
    </div>
  );
}

export function CopyrightLibrary() {
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="版权库" dark />
      <div className="p-6">
        <div className="relative mb-6">
          <input type="text" placeholder="搜索版权作品/作者" className="w-full h-12 pl-12 pr-4 bg-white dark:bg-[#2A1D0F] rounded-2xl text-[14px] outline-none shadow-sm font-medium dark:text-white" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
        </div>
        <div className="flex gap-4 mb-6 overflow-x-auto scrollbar-hide">
          {['全部', '现代都市', '古装玄幻', '悬疑惊悚', '年代励志'].map((t, i) => (
            <span key={i} className={`whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-black ${i===0 ? 'bg-[#1A1108] dark:bg-[#E6D5B8] text-white dark:text-[#1A1108]' : 'bg-white dark:bg-[#2A1D0F] text-gray-400'}`}>{t}</span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-10">
          {HOT_DRAMAS.concat(HOT_DRAMAS).map((drama, i) => (
            <div key={i} className="bg-white dark:bg-[#2A1D0F] rounded-[28px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5 flex flex-col group cursor-pointer">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img src={drama.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-white font-black border border-white/30 flex items-center gap-1">
                  <Clock size={10} /> 待售
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] line-clamp-1">{drama.title}</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#A69984] mt-1.5">
                  <LayoutList size={12} className="text-[#D4AF37]" />
                  <span>作品集数：80集</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CopyrightPublicity() {
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="版权公示" dark />
      <div className="p-6">
        <div className="bg-white dark:bg-[#2A1D0F] rounded-[32px] p-8 shadow-sm border border-gray-50 dark:border-white/5">
          <h3 className="text-[17px] font-black text-[#1A1108] dark:text-white mb-8 flex items-center gap-3">
            <ShieldCheck className="text-green-500" /> 版权确权信息公示
          </h3>
          <div className="space-y-6">
            {[
              { 
                t: '《逆袭星途》（暂定名，名称修改不影响法律效力）', 
                content: '主要故事内容（示例）：一个现代白领失业后，受生活压力无意间穿越到山海经的世界里，与各种怪兽搏斗，征服了7个怪兽，怪兽化身为女人和他生活在一起的故事。', 
                id: '对应短剧版权编号（示例）：ZXDJ (B) 01020001~ZXDJ (B) 01020100。',
                date: '2024-05-12',
                ic: <LayoutList className="text-[#D4AF37]" size={18} />,
                img: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=200&h=200&fit=crop'
              },
              { 
                t: '《我的室友是大佬》版权公示', 
                content: '主要故事内容（示例）：合租生活引发的爆笑故事，平凡少女与神秘大佬的同居日常。', 
                id: '对应短剧版权编号（示例）：ZXDJ (A) 0023 001~050。',
                date: '2024-05-20',
                ic: <LayoutList className="text-blue-400" size={18} />,
                img: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=200&h=200&fit=crop'
              }
            ].map((m, i) => (
              <div key={i} className="flex gap-4 pb-6 border-b border-gray-50 dark:border-white/5 last:border-0 last:pb-0">
                <div className="w-16 h-20 rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-100">
                  <img src={m.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-[14px] font-black text-[#1A1108] dark:text-white leading-snug pr-4">{m.t}</h4>
                    <p className="text-[11px] text-[#A69984] font-bold shrink-0">{m.date}</p>
                  </div>
                  <p className="text-[12px] text-[#4A443E] dark:text-[#A69984] font-medium leading-relaxed mb-2 line-clamp-2">{m.content}</p>
                  <p className="text-[12px] text-[#D4AF37] font-black">{m.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 通用的服务/流程类二级页面 ---

export function ServiceFlow() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300">
      <Header title="流程服务" dark />
      <div className="p-8">
        <div className="relative">
          {/* Vertical Dash Line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-dashed border-l border-dashed border-gray-200" />
          
          {[
            { t: '需求沟通', d: '专属客服 1 对 1 深入沟通具体需求', i: <Users />, path: '/help' },
            { t: '方案策划', d: '专家团队制定个性化业务实施路径', i: <FileText /> },
            { t: '签订合同', d: '确立法律保障，明确双方权益与义务', i: <Briefcase /> },
            { t: '项目落地', d: '高效执行，全过程关键节点实时反馈', i: <CheckCircle2 /> }
          ].map((s, i) => (
            <div 
              key={i} 
              onClick={() => s.path && navigate(s.path)}
              className={cn(
                "flex gap-8 mb-12 last:mb-0 relative z-10",
                s.path && "cursor-pointer active:scale-95 transition-transform"
              )}
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#D4AF37] border border-gray-50 dark:border-white/10 dark:bg-[#2A1D0F]">
                {React.cloneElement(s.i as React.ReactElement, { size: 22 })}
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-[16px] font-black text-[#1A1108] dark:text-white mb-2">{s.t}</h4>
                <p className="text-[13px] text-[#A69984] font-bold leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LearningArt() {
  const trainingInfo = [
    {
      title: '演员培训开班信息',
      batches: [
        { name: '精品演员进阶班（第12期）', time: '2024-06-15 开课', duration: '30天脱产培训' },
        { name: '明星短剧雏鹰计划（夏季班）', time: '2024-07-01 开课', duration: '15天封闭式集训' }
      ],
      icon: <Users className="text-orange-500" />
    },
    {
      title: '摄像培训开班信息',
      batches: [
        { name: '短剧摄影构图与灯光班', time: '2024-06-20 开课', duration: '10天专项提升课' },
        { name: '独立摄像导演班（大师课）', time: '2024-07-10 开课', duration: '20天实操外景课' }
      ],
      icon: <Video className="text-blue-500" />
    },
    {
      title: 'AI短剧制作培训开班信息',
      batches: [
        { name: 'AI工具链流制作实战班', time: '2024-06-25 开课', duration: '7天极速通关营' },
        { name: 'AI数字人与场景建模进阶班', time: '2024-07-15 开课', duration: '12天核心技术课' }
      ],
      icon: <Star className="text-purple-500" />
    }
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="我要学艺 - 开班信息" dark />
      <div className="p-6">
        <div className="bg-gradient-to-br from-[#1A1108] to-[#4A443E] p-8 rounded-[32px] mb-8 text-center text-white">
          <BookOpen className="text-[#D4AF37] mx-auto mb-4" size={40} />
          <h2 className="text-[20px] font-black mb-2">专业技能培训体系</h2>
          <p className="text-[#A69984] text-[13px]">从中星开始，完成从爱好者到专业人士的蜕变</p>
        </div>

        <div className="space-y-6">
          {trainingInfo.map((info, i) => (
            <div key={i} className="bg-white dark:bg-[#2A1D0F] rounded-[32px] p-6 shadow-sm border border-gray-50 dark:border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-black/20 flex items-center justify-center">
                  {React.cloneElement(info.icon as React.ReactElement, { size: 20 })}
                </div>
                <h3 className="text-[17px] font-black text-[#1A1108] dark:text-[#E6D5B8]">{info.title}</h3>
              </div>
              
              <div className="space-y-4">
                {info.batches.map((batch, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 dark:bg-black/10 rounded-2xl border border-dashed border-gray-200 dark:border-white/5">
                    <h4 className="text-[14px] font-bold text-[#1A1108] dark:text-white mb-2">{batch.name}</h4>
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="text-[#8B6E4E] font-medium">{batch.time}</span>
                      <span className="text-[#A69984]">{batch.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-500/20">
          <p className="text-[12px] text-orange-700 dark:text-orange-300 text-center font-bold">
            温馨提示：所有课程均包含线下实操演练，名额有限，报满即止。
          </p>
        </div>
      </div>
    </div>
  );
}

export function AuditionRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: '男',
    age: '',
    contact: '',
    characteristics: '',
    projectName: '',
    worksName: '',
    worksLink: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) {
      alert('请填写姓名和联系方式');
      return;
    }

    const { addCourseRegistration } = await import('../services/cmsService');
    const newRegistration = {
      ...formData,
      status: '审核中',
      date: new Date().toLocaleDateString(),
      phone: formData.contact
    };

    try {
      await addCourseRegistration({ ...newRegistration, category: '海选' });
    } catch(err) {
      console.error(err);
    }

    const registrations = JSON.parse(localStorage.getItem('my_registrations') || '[]');
    registrations.unshift({...newRegistration, id: Date.now().toString()});
    localStorage.setItem('my_registrations', JSON.stringify(registrations));
    
    alert('提交成功！已保存到“我的报名”中。');
    navigate('/user/my-registrations');
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="海选报名表" dark />
      <div className="p-6">
        <div className="bg-white dark:bg-[#2A1D0F] rounded-[32px] p-8 shadow-sm border border-gray-50 dark:border-white/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">姓名</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white"
                  placeholder="请输入您的真实姓名"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">性别</label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full h-12 px-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white appearance-none"
                >
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">年龄</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white"
                    placeholder="您的年龄"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">联系方式</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="tel" 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white"
                  placeholder="手机号或微信号"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">您的特点/专长</label>
              <div className="relative">
                <Star className="absolute left-4 top-4 text-gray-400" size={18} />
                <textarea 
                  value={formData.characteristics}
                  onChange={(e) => setFormData({...formData, characteristics: e.target.value})}
                  className="w-full h-24 pl-12 pr-4 pt-3 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white resize-none"
                  placeholder="例如：擅长舞蹈、武术、反串演戏等"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">海选项目名称</label>
              <div className="relative">
                <LayoutList className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={formData.projectName}
                  onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white"
                  placeholder="如：中星明日之星海选"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">已有作品名称</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={formData.worksName}
                  onChange={(e) => setFormData({...formData, worksName: e.target.value})}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white"
                  placeholder="如有多个请用逗号隔开"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">作品播放平台或链接</label>
              <div className="relative">
                <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={formData.worksLink}
                  onChange={(e) => setFormData({...formData, worksLink: e.target.value})}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white"
                  placeholder="作品发布平台或具体URL"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full h-14 bg-[#1A1108] dark:bg-[#E6D5B8] text-white dark:text-[#1A1108] font-black rounded-2xl shadow-xl active:scale-95 transition-all text-[16px] mt-4"
            >
              提交报名信息
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function GeneralRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: '男',
    age: '',
    phone: '',
    address: '',
    projectName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.projectName) {
      alert('请填写姓名、电话和项目名称');
      return;
    }

    const { addCourseRegistration } = await import('../services/cmsService');

    const newRegistration = {
      ...formData,
      status: '已提交',
      date: new Date().toLocaleDateString(),
      contact: formData.phone // Mapping phone to contact for list view
    };
    
    try {
      await addCourseRegistration({ ...newRegistration, category: '海选/活动' });
    } catch(err) {
      console.error(err);
    }

    const registrations = JSON.parse(localStorage.getItem('my_registrations') || '[]');
    registrations.unshift({...newRegistration, id: Date.now().toString()});
    localStorage.setItem('my_registrations', JSON.stringify(registrations));
    
    alert('提交成功！我们将尽快与您联系。');
    navigate(-1);
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="报名表" dark />
      <div className="p-6">
        <div className="bg-white dark:bg-[#2A1D0F] rounded-[32px] p-8 shadow-sm border border-gray-50 dark:border-white/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">姓名</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white"
                  placeholder="请输入您的姓名"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">性别</label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full h-12 px-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white appearance-none"
                >
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">年龄</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white"
                    placeholder="您的年龄"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">电话</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white"
                  placeholder="请输入您的电话"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">地址</label>
              <div className="relative">
                <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white"
                  placeholder="请输入您的地址"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2 px-1">报名项目名称</label>
              <div className="relative">
                <LayoutList className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={formData.projectName}
                  onChange={(e) => setFormData({...formData, projectName: e.target.value})}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 dark:bg-black/20 rounded-2xl text-[14px] outline-none dark:text-white"
                  placeholder="请输入您要报名的项目名称"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full h-14 bg-[#1A1108] dark:bg-[#E6D5B8] text-white dark:text-[#1A1108] font-black rounded-2xl shadow-xl active:scale-95 transition-all text-[16px] mt-4"
            >
              提交
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function MyRegistrations() {
  const [registrations, setRegistrations] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('my_registrations') || '[]');
    setRegistrations(data);
  }, []);

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="我的报名" dark />
      <div className="p-6">
        {registrations.length === 0 ? (
          <div className="bg-white dark:bg-[#2A1D0F] rounded-[32px] p-20 flex flex-col items-center justify-center text-center opacity-50">
            <LayoutList size={64} className="text-gray-200 mb-6" />
            <p className="text-[14px] text-gray-400 font-bold">暂无报名记录</p>
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map((reg: any) => (
              <div key={reg.id} className="bg-white dark:bg-[#2A1D0F] p-6 rounded-[24px] shadow-sm border border-gray-50 dark:border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-[16px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-1">{reg.projectName || '未命名海选项目'}</h4>
                    <p className="text-[12px] text-[#A69984] font-bold">提交时间：{reg.date}</p>
                  </div>
                  <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-500 rounded-full text-[10px] font-black">
                    {reg.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                  <div>
                    <p className="text-[10px] text-[#A69984] font-bold uppercase mb-0.5">姓名</p>
                    <p className="text-[13px] text-[#1A1108] dark:text-white font-black">{reg.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#A69984] font-bold uppercase mb-0.5">联系方式</p>
                    <p className="text-[13px] text-[#1A1108] dark:text-white font-black">{reg.contact}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-[#A69984] font-bold uppercase mb-0.5">作品名称</p>
                    <p className="text-[13px] text-[#1A1108] dark:text-white font-black">{reg.worksName || '无'}</p>
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

export function AuditionProjectList() {
  const navigate = useNavigate();
  const auditionProjects = [
    {
      id: '1',
      title: '逆袭之星途璀璨',
      imageUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=400&h=600&fit=crop',
      desc: '一部讲述草根少女通过努力一步步攀登演艺巅峰的励志短剧。正在热招女主角及主要配角。',
      requirement: '形象气质佳，演技自然，有舞蹈基础者优先。',
      date: '海选截止：2024-07-30'
    },
    {
      id: '2',
      title: '总裁的替身娇妻',
      imageUrl: 'https://images.unsplash.com/photo-1544208453-ca422f28b7e2?q=80&w=400&h=600&fit=crop',
      desc: '都市情感爽剧，错位人生的爱恨纠葛。寻找气质高冷的男主与灵动可爱的女主。',
      requirement: '男演员需身高180cm以上，女演员需甜美系。',
      date: '海选截止：2024-08-15'
    },
    {
      id: '3',
      title: '重生之我在娱乐圈',
      imageUrl: 'https://images.unsplash.com/photo-1496337583146-856e6115ddba?q=80&w=400&h=600&fit=crop',
      desc: '重生爽文改编，带你深度揭秘演艺圈规则。诚邀各具特色的演员加盟。',
      requirement: '表演爆发力强，能驾驭性格反差巨大的角色。',
      date: '海选截止：2024-07-20'
    }
  ];

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full pb-10 transition-colors duration-300">
      <Header title="海选项目列表" dark />
      <div className="p-6">
        <div className="space-y-6">
          {auditionProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => navigate(`/drama/${project.id}`)}
              className="bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5 flex flex-col active:scale-[0.98] transition-transform"
            >
              <div className="flex gap-4 p-5">
                <div className="w-24 h-36 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                  <img src={project.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="text-[16px] font-black text-[#1A1108] dark:text-[#E6D5B8] mb-2">{project.title}</h4>
                    <p className="text-[12px] text-[#A69984] font-medium line-clamp-2 leading-relaxed">{project.desc}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#D4AF37] font-black uppercase mb-1">招募要求</p>
                    <p className="text-[11px] text-[#4A443E] dark:text-[#A69984] font-bold line-clamp-1">{project.requirement}</p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-3 bg-gray-50 dark:bg-black/10 border-t border-gray-50 dark:border-white/5 flex justify-between items-center">
                <span className="text-[11px] text-[#A69984] font-black">{project.date}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/audition/registration');
                  }}
                  className="bg-[#1A1108] dark:bg-[#E6D5B8] text-white dark:text-[#1A1108] px-4 py-1.5 rounded-xl text-[11px] font-black"
                >
                  立即报名
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
