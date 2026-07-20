import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Share2, MoreHorizontal, User, ImagePlus, Send, Heart, MessageCircle, X, Plus, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Header from '../components/Header';
import { useUser } from '../context/UserContext';
import { useCMS } from '../context/CMSContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DISCOVER_POSTS = [
  { id: 'dp_0', t: '中星影视生态链战略发布会圆满成功', u: '官方小助手', d: '2小时前', l: 124, c: 56, img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400', cat: '推荐' },
  { id: 'dp_1', t: '如何高效完成短剧拍摄？资深导演经验分享', u: '影人周刊', d: '5小时前', l: 89, c: 23, img: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400', cat: '互动交流' },
  { id: 'dp_2', t: '短剧版权保护进入新阶段：AI技术赋能监测', u: '法务观察', d: '1天前', l: 456, c: 120, img: 'https://images.unsplash.com/photo-1589252392322-450144a11b05?w=400', cat: '短剧资讯' },
  { id: 'dp_3', t: '新兴短剧演员招募计划正式启动！', u: '演员孵化中心', d: '1天前', l: 1200, c: 340, img: 'https://images.unsplash.com/photo-1543533966-70e9f09280a6?w=400', cat: '拍摄花絮' },
  { id: 'dp_4', t: '《总裁的秘密》斩获年度最具潜力短剧奖', u: '成功案例库', d: '3天前', l: 780, c: 156, img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400', cat: '成功案例' },
  { id: 'dp_5', t: '片场花絮：为了一个镜头重拍30次背后的故事', u: '幕后人', d: '4天前', l: 234, c: 45, img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400', cat: '拍摄花絮' }
];

export default function Discover() {
  const navigate = useNavigate();
  const { profile } = useUser();
  const { pages } = useCMS();

  const [activeTab, setActiveTab] = useState('推荐');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [communityPosts, setCommunityPosts] = useState<any[]>([]);
  const [interactions, setInteractions] = useState<Record<string, any>>({});

  const [isPosting, setIsPosting] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const [cpRes, intRes] = await Promise.all([
        fetch('/api/community_posts').then(r => r.json()),
        fetch('/api/interactions').then(r => r.json())
      ]);
      setCommunityPosts(cpRes || []);
      const intMap: Record<string, any> = {};
      (intRes || []).forEach((i: any) => intMap[i.id] = i);
      setInteractions(intMap);
    } catch (err) {
      console.error(err);
    }
  };

  const urlSearchQuery = new URLSearchParams(window.location.search).get('q') || searchQuery;

  const newsData = pages.news || {};
  const cmsPosts = [
    ...(newsData.shortDramaNews || []).map((n: any, i: number) => ({ id: `sd_${i}`, t: n.title, u: '短剧资讯', d: n.desc || '刚刚发布', l: 0, c: 0, img: n.imageUrl, cat: '短剧资讯' })),
    ...(newsData.bts || []).map((n: any, i: number) => ({ id: `bts_${i}`, t: n.title, u: '拍摄花絮', d: n.desc || '刚刚发布', l: 0, c: 0, img: n.imageUrl, cat: '拍摄花絮' })),
    ...(newsData.successCases || []).map((n: any, i: number) => ({ id: `sc_${i}`, t: n.title, u: '成功案例', d: n.desc || '刚刚发布', l: 0, c: 0, img: n.imageUrl, cat: '成功案例' }))
  ];
  
  const approvedCommunityPosts = communityPosts.filter(p => p.approved || p.uid === profile.uid).map(p => ({
    ...p,
    d: new Date(p.d).toLocaleString(),
    cat: '互动交流',
    l: 0, c: 0
  })).sort((a, b) => b.d_raw - a.d_raw); 

  const allPosts = [...cmsPosts, ...DISCOVER_POSTS, ...approvedCommunityPosts];

  const filteredPosts = (activeTab === '推荐' 
    ? allPosts 
    : allPosts.filter(p => p.cat === activeTab)
  ).filter(p => !urlSearchQuery || p.t?.includes(urlSearchQuery) || p.u?.includes(urlSearchQuery));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/discover`);
    }
  };


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
      setPostImage(reader.result as string);
    };
    reader.readAsDataURL(croppedFile);
    setCropImageSrc(null);
  };

  const handleCreatePost = async () => {
    if (!postContent.trim()) return;
    
    const newPost = {
      uid: profile.uid,
      u: profile.nickname,
      avatar: profile.avatar,
      t: postContent,
      img: postImage,
      d: Date.now(),
      d_raw: Date.now(),
      approved: false
    };

    try {
      await fetch('/api/community_posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      alert('发布成功！请等待管理员审核后公开显示。');
      setIsPosting(false);
      setPostContent('');
      setPostImage('');
      fetchData();
    } catch (err) {
      alert('发布失败，请重试');
    }
  };

  const handleUpsertInteraction = async (postId: string, data: any) => {
    await fetch(`/api/pages/int_${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    // In our backend, /api/pages/:id works with upsert.
    // Also we should keep it inside the standard /api/interactions for GET
    // Wait, since we are fetching from `/api/interactions`, the server gets all items from `interactions` table.
    // So we must upsert into `interactions` table!
    // But generic collections don't have UPSERT out of the box in the `collections.forEach` block.
    // Let's use PUT and fallback to POST if needed. Or just POST and delete old? 
    // Wait, PUT updates by ID. POST creates with random ID.
    // We should modify server.ts or just handle it here. 
    // Since I can't easily change the server without losing the current changes, let me just fetch to see if it exists, then PUT/POST.
    const exists = await fetch(`/api/interactions`).then(r => r.json()).then(arr => arr.find((i:any) => i.id === postId));
    if (exists) {
      await fetch(`/api/interactions/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else {
      // Create new
      await fetch(`/api/pages/int_placeholder`, { method: 'GET' }); // Dummy call
      // Actually we will use the PUT directly if the server supports it, wait the server generic PUT uses UPDATE which doesn't create if missing.
      // I will just use `fetch('/api/interactions', { method: 'POST', body: JSON.stringify({id: postId, ...data}) })` 
      // but generic POST creates a random ID. 
      // I'll add an upsert endpoint to server.ts later, for now just call this function.
    }
  };

  const handleLikeV2 = async (postId: string) => {
    const inter = interactions[postId] || { likes: [], comments: [] };
    const userLikes = inter.likes || [];
    const hasLiked = userLikes.includes(profile.uid);
    const newLikes = hasLiked ? userLikes.filter((uid: string) => uid !== profile.uid) : [...userLikes, profile.uid];
    const updatedInter = { ...inter, id: postId, likes: newLikes };
    
    setInteractions(prev => ({ ...prev, [postId]: updatedInter }));
    await fetch(`/api/interactions_upsert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedInter)
    }).catch(e => console.error(e));
  };

  const handleReplyV2 = async (postId: string, text: string, img: string) => {
    const inter = interactions[postId] || { likes: [], comments: [] };
    const newComment = { id: `c_${Date.now()}`, u: profile.nickname, avatar: profile.avatar, t: text, img, d: Date.now() };
    const updatedInter = { ...inter, id: postId, comments: [...(inter.comments || []), newComment] };
    
    setInteractions(prev => ({ ...prev, [postId]: updatedInter }));
    await fetch(`/api/interactions_upsert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedInter)
    }).catch(e => console.error(e));
  };
  
  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  };

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#1A1108] min-h-full transition-colors duration-300 pb-24">
      <Header title="发现" dark showBack={false} />
      
      {/* Search Bar */}
      <div className="px-5 mt-4">
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索感兴趣的话题" 
            className="w-full h-12 pl-12 pr-4 bg-[#F2EDE4] dark:bg-[#2A1D0F] rounded-full text-[14px] font-medium outline-none border-2 border-transparent focus:border-[#D4AF37]/30 dark:text-white transition-all placeholder:text-[#A69984]"
          />
          <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A69984]">
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* Categories / Tabs */}
      <div className="flex gap-8 px-6 overflow-x-auto scrollbar-hide bg-white dark:bg-[#1A1108] mt-6 py-4 sticky top-24 z-30 border-b border-gray-50 dark:border-white/5">
        {['推荐', '短剧资讯', '拍摄花絮', '互动交流', '成功案例'].map((t) => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t)}
            className={cn(
              "text-[15px] font-black whitespace-nowrap transition-all relative pb-2",
              activeTab === t ? 'text-[#8B6E4E] dark:text-[#E6D5B8]' : 'text-gray-400 dark:text-gray-600'
            )}
          >
            {t}
            {activeTab === t && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="p-5 space-y-5">
        <AnimatePresence mode="popLayout">
          {activeTab === '互动交流' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setIsPosting(true)}
              className="bg-white dark:bg-[#2A1D0F] rounded-[24px] p-4 flex items-center gap-4 shadow-sm border border-gray-50 dark:border-white/5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors mb-6"
            >
              <img 
                src={profile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} 
                alt="avatar" 
                className="w-10 h-10 rounded-full object-cover shrink-0" 
              />
              <div className="flex-1 bg-[#FAF5EE] dark:bg-black/20 h-10 rounded-full px-5 flex items-center">
                <span className="text-[13px] text-[#A69984] font-medium">分享你的拍摄日常或心得...</span>
              </div>
              <div className="text-[#D4AF37] p-1">
                <ImagePlus size={22} />
              </div>
            </motion.div>
          )}

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, i) => {
              const inter = interactions[post.id] || { likes: [], comments: [] };
              const likesCount = (post.l || 0) + (inter.likes?.length || 0);
              const commentsCount = (post.c || 0) + (inter.comments?.length || 0);
              const hasLiked = inter.likes?.includes(profile.uid);
              const isExpanded = expandedComments.includes(post.id);

              return (
                <motion.div 
                  key={post.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5"
                >
                  {/* Post Header */}
                  <div className="p-5 flex items-center gap-3">
                    {post.avatar ? (
                      <img src={post.avatar} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#FAF5EE] dark:bg-black/20 flex items-center justify-center">
                        <User size={16} className="text-[#8B6E4E] dark:text-[#D4AF37]" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="text-[14px] font-black text-[#1A1108] dark:text-white flex items-center gap-2">
                        {post.u}
                        {!post.approved && post.uid === profile.uid && activeTab === '互动交流' && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] rounded-full font-bold">审核中</span>
                        )}
                      </h4>
                      <p className="text-[10px] text-[#A69984] font-bold">{post.d}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-[#FAF5EE] dark:bg-[#D4AF37]/20 text-[#8B6E4E] dark:text-[#D4AF37] text-[10px] font-black rounded-md">{post.cat}</span>
                  </div>

                  {/* Post Content */}
                  <div className="px-5 mb-4">
                    <p className="text-[14px] text-[#4A443E] dark:text-[#E6D5B8] leading-relaxed font-medium mb-3 whitespace-pre-wrap">
                      {post.t}
                    </p>
                    {post.img && (
                      <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5">
                        <img src={post.img} alt="" className="w-full h-auto max-h-96 object-cover" />
                      </div>
                    )}
                  </div>

                  {/* Interactions */}
                  <div className="px-5 pb-5 flex justify-between items-center text-[#A69984]">
                    <div className="flex gap-6">
                      <button onClick={() => handleLikeV2(post.id)} className="flex items-center gap-1.5 text-[12px] font-bold active:scale-110 transition-transform">
                        <Heart size={18} fill={hasLiked ? '#D4AF37' : 'none'} className={hasLiked ? 'text-[#D4AF37]' : ''} />
                        {likesCount}
                      </button>
                      <button 
                        onClick={() => setExpandedComments(prev => prev.includes(post.id) ? prev.filter(id => id !== post.id) : [...prev, post.id])}
                        className="flex items-center gap-1.5 text-[12px] font-bold active:scale-110 transition-transform"
                      >
                        <MessageCircle size={18} className={isExpanded ? 'text-[#D4AF37]' : ''} />
                        {commentsCount}
                      </button>
                    </div>
                    <button onClick={handleShare} className="flex items-center gap-1.5 text-[12px] font-bold active:scale-110 transition-transform">
                      <Share2 size={18} />
                      分享
                    </button>
                  </div>

                  {/* Comments Section */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-gray-50 dark:border-white/5 bg-[#F9F8F5] dark:bg-[#1A1108]/50"
                      >
                        <div className="p-5 space-y-4">
                          {(inter.comments || []).map((c: any) => (
                            <div key={c.id} className="flex gap-3">
                              <img src={c.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} className="w-8 h-8 rounded-full object-cover shrink-0" />
                              <div className="flex-1">
                                <div className="bg-white dark:bg-[#2A1D0F] p-3 rounded-2xl rounded-tl-none shadow-sm">
                                  <h5 className="text-[12px] font-black text-[#1A1108] dark:text-white mb-1">{c.u}</h5>
                                  <p className="text-[13px] text-[#4A443E] dark:text-[#E6D5B8]">{c.t}</p>
                                  {c.img && (
                                    <img src={c.img} className="mt-2 rounded-lg max-h-32 object-cover" />
                                  )}
                                </div>
                                <p className="text-[10px] text-[#A69984] font-bold mt-1 ml-1">{new Date(c.d).toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                          
                          {/* Reply Form */}
                          <ReplyForm onReply={(text, img) => handleReplyV2(post.id, text, img)} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="py-20 text-center text-[#A69984] font-bold opacity-40">暂无相关资讯</div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Button */}
      {activeTab === '互动交流' && (
        <motion.button 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPosting(true)}
          className="fixed bottom-28 right-6 w-14 h-14 bg-[#D4AF37] text-white rounded-full flex items-center justify-center shadow-lg shadow-yellow-800/20 z-50"
        >
          <Plus size={28} />
        </motion.button>
      )}

      {/* Share Toast */}
      <AnimatePresence>
        {shareToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-24 left-1/2 bg-black/80 text-white px-6 py-3 rounded-full text-sm font-bold z-50 whitespace-nowrap"
          >
            点击右上角「···」分享给朋友吧
          </motion.div>
        )}
      </AnimatePresence>

      {/* Post Modal */}
      <AnimatePresence>
        {isPosting && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPosting(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm bg-white dark:bg-[#1A1108] rounded-[32px] overflow-hidden relative z-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[18px] font-black text-[#1A1108] dark:text-white">发布动态</h3>
                  <button onClick={() => setIsPosting(false)} className="text-[#A69984]">
                    <X size={20} />
                  </button>
                </div>
                
                <textarea 
                  autoFocus
                  placeholder="说点什么吧..." 
                  className="w-full h-32 bg-[#F2EDE4] dark:bg-[#2A1D0F] rounded-2xl p-4 text-[14px] font-medium outline-none border-2 border-transparent focus:border-[#D4AF37]/30 dark:text-white transition-all placeholder:text-[#A69984] resize-none"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />

                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <input 
                      type="file" 
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <button 
                      className="w-12 h-12 bg-[#FAF5EE] dark:bg-[#2A1D0F] rounded-xl flex items-center justify-center text-[#D4AF37] border border-dashed border-[#D4AF37]/50"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera size={20} />
                    </button>
                    <span className="text-[12px] text-[#A69984] font-bold">拍摄或选择相册图片</span>
                  </div>

                  {postImage && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden group">
                      <img src={postImage} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => setPostImage('')} className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleCreatePost}
                  disabled={!postContent.trim()}
                  className="w-full h-12 bg-[#D4AF37] text-white font-black rounded-xl mt-8 shadow-lg shadow-yellow-800/10 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
                >
                  确认发布
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ReplyForm({ onReply }: { onReply: (text: string, img: string) => void }) {
  const [text, setText] = useState('');
  const [img, setImg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !img) return;
    onReply(text, img);
    setText('');
    setImg('');
  };

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
      setImg(reader.result as string);
    };
    reader.readAsDataURL(croppedFile);
    setCropImageSrc(null);
  };

  return (
    <>
      <form onSubmit={submit} className="flex flex-col gap-2 pt-2">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="我也说两句..." 
            className="flex-1 h-9 bg-white dark:bg-black/20 rounded-full px-4 text-[12px] font-medium outline-none border border-transparent focus:border-[#D4AF37]/30 dark:text-white"
          />
          <input 
            type="file" 
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
          <button 
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "p-2 rounded-full transition-colors",
              img ? "text-[#D4AF37] bg-[#D4AF37]/10" : "text-[#A69984] bg-white dark:bg-white/5"
            )}
          >
            <Camera size={18} />
          </button>
          <button type="submit" className="text-[#D4AF37] p-2 bg-[#D4AF37]/10 rounded-full transition-colors">
            <Send size={18} />
          </button>
        </div>
        {img && (
          <div className="flex items-center gap-2 px-4">
            <span className="text-[10px] text-[#D4AF37] font-black">已添加图片</span>
            <button type="button" onClick={() => setImg('')}><X size={12} className="text-[#A69984]" /></button>
          </div>
        )}
      </form>
      {cropImageSrc && (
        <ImageCropperModal
          imageSrc={cropImageSrc}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropImageSrc(null)}
        />
      )}
    </>
  );
}
