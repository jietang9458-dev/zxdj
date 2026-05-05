import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Share2, MoreHorizontal, User, ImagePlus, Send, Heart, MessageCircle, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Header from '../components/Header';
import { useUser } from '../context/UserContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock initial data if not in localStorage
const INITIAL_COMMUNITY_POSTS = [
  { 
    id: 'post_0', 
    u: '官方小助手', 
    avatar: 'https://images.unsplash.com/photo-1543533966-70e9f09280a6?w=100',
    t: '欢迎来到中星互动交流区！在这里你可以分享拍摄日常、寻找合作伙伴。', 
    img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400', 
    d: Date.now() - 3600000,
    likes: 12,
    comments: [
      { id: 'c_0', u: '短剧迷', t: '支持！环境很好', img: '', d: Date.now() - 1800000, likes: 2 }
    ]
  }
];

const DISCOVER_POSTS = [
  { id: 0, t: '中星短剧生态链战略发布会圆满成功', u: '官方小助手', d: '2小时前', l: 124, c: 56, img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400', cat: '推荐' },
  { id: 1, t: '如何高效完成短剧拍摄？资深导演经验分享', u: '影人周刊', d: '5小时前', l: 89, c: 23, img: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=400', cat: '互动交流' },
  { id: 2, t: '短剧版权保护进入新阶段：AI技术赋能监测', u: '法务观察', d: '1天前', l: 456, c: 120, img: 'https://images.unsplash.com/photo-1589252392322-450144a11b05?w=400', cat: '短剧资讯' },
  { id: 3, t: '新兴短剧演员招募计划正式启动！', u: '演员孵化中心', d: '1天前', l: 1200, c: 340, img: 'https://images.unsplash.com/photo-1543533966-70e9f09280a6?w=400', cat: '拍摄花絮' },
  { id: 4, t: '《总裁的秘密》斩获年度最具潜力短剧奖', u: '成功案例库', d: '3天前', l: 780, c: 156, img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400', cat: '成功案例' },
  { id: 5, t: '片场花絮：为了一个镜头重拍30次背后的故事', u: '幕后人', d: '4天前', l: 234, c: 45, img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400', cat: '拍摄花絮' }
];

export default function Discover() {
  const navigate = useNavigate();
  const { profile } = useUser();
  const [activeTab, setActiveTab] = useState('推荐');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Community State
  const [communityPosts, setCommunityPosts] = useState(() => {
    const saved = localStorage.getItem('community_posts');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_POSTS;
  });
  const [isPosting, setIsPosting] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState('');
  
  // Daily limits state
  const [lastPostDate, setLastPostDate] = useState(() => localStorage.getItem('last_post_date') || '');
  const [lastCmtImgDate, setLastCmtImgDate] = useState(() => localStorage.getItem('last_cmt_img_date') || '');

  useEffect(() => {
    localStorage.setItem('community_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  const urlSearchQuery = new URLSearchParams(window.location.search).get('q') || searchQuery;

  const filteredPosts = (activeTab === '推荐' 
    ? DISCOVER_POSTS 
    : DISCOVER_POSTS.filter(p => p.cat === activeTab)
  ).filter(p => !urlSearchQuery || p.title?.includes(urlSearchQuery) || p.desc?.includes(urlSearchQuery) || p.user.includes(urlSearchQuery));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/discover?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/discover`);
    }
  };

  const checkIsSameDay = (dateStr: string) => {
    if (!dateStr) return false;
    const today = new Date().toDateString();
    return dateStr === today;
  };

  const handleCreatePost = () => {
    const today = new Date().toDateString();
    if (checkIsSameDay(lastPostDate)) {
      alert('每天只能发布一条帖子哦，明天再来吧！');
      return;
    }
    if (!postContent.trim()) return;

    const newPost = {
      id: `post_${Date.now()}`,
      u: profile.nickname,
      avatar: profile.avatar,
      t: postContent,
      img: postImage,
      d: Date.now(),
      likes: 0,
      comments: []
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setLastPostDate(today);
    localStorage.setItem('last_post_date', today);
    setIsPosting(false);
    setPostContent('');
    setPostImage('');
  };

  const handleLike = (postId: string, commentId?: string) => {
    setCommunityPosts(communityPosts.map((p: any) => {
      if (!commentId && p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      if (commentId && p.id === postId) {
        return {
          ...p,
          comments: p.comments.map((c: any) => 
            c.id === commentId ? { ...c, likes: c.likes + 1 } : c
          )
        };
      }
      return p;
    }));
  };

  const handleReply = (postId: string, text: string, img: string) => {
    const today = new Date().toDateString();
    if (img && checkIsSameDay(lastCmtImgDate)) {
      alert('每天只能回复一张图片哦，文字不限！');
      return;
    }

    const newComment = {
      id: `c_${Date.now()}`,
      u: profile.nickname,
      t: text,
      img: img,
      d: Date.now(),
      likes: 0
    };

    setCommunityPosts(communityPosts.map((p: any) => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));

    if (img) {
      setLastCmtImgDate(today);
      localStorage.setItem('last_cmt_img_date', today);
    }
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
          {activeTab === '互动交流' ? (
            <div className="space-y-6">
              {/* Top Posting Entry Area */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setIsPosting(true)}
                className="bg-white dark:bg-[#2A1D0F] rounded-[24px] p-4 flex items-center gap-4 shadow-sm border border-gray-50 dark:border-white/5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
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

              {/* Interactive Exchange Posts */}
              {communityPosts.map((post: any) => (
                <div key={post.id} className="bg-white dark:bg-[#2A1D0F] rounded-[24px] p-5 shadow-sm border border-gray-50 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={post.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="text-[14px] font-black text-[#1A1108] dark:text-white">{post.u}</h4>
                      <p className="text-[10px] text-[#A69984] font-bold">{new Date(post.d).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-[14px] text-[#4A443E] dark:text-[#E6D5B8] mb-4 leading-relaxed font-medium">
                    {post.t}
                  </p>
                  {post.img && (
                    <div className="rounded-2xl overflow-hidden mb-4 border border-gray-100 dark:border-white/5">
                      <img src={post.img} alt="" className="w-full h-auto object-cover max-h-80" />
                    </div>
                  )}
                  <div className="flex items-center gap-6 text-[#A69984]">
                    <button onClick={() => handleLike(post.id)} className="flex items-center gap-1.5 text-[12px] font-bold active:scale-110 transition-transform">
                      <Heart size={18} fill={post.likes > 0 ? '#D4AF37' : 'none'} className={post.likes > 0 ? 'text-[#D4AF37]' : ''} />
                      {post.likes}
                    </button>
                    <div className="flex items-center gap-1.5 text-[12px] font-bold">
                      <MessageCircle size={18} />
                      {post.comments.length}
                    </div>
                  </div>

                  {/* Comments */}
                  {post.comments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-50 dark:border-white/5 space-y-4">
                      {post.comments.map((c: any) => (
                        <div key={c.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#FAF5EE] dark:bg-black/20 flex items-center justify-center shrink-0">
                            <User size={14} className="text-[#8B6E4E] dark:text-[#D4AF37]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <span className="text-[12px] font-black dark:text-white">{c.u}</span>
                              <button onClick={() => handleLike(post.id, c.id)} className="flex items-center gap-1 text-[10px] font-bold">
                                <Heart size={12} fill={c.likes > 0 ? '#D4AF37' : 'none'} className={c.likes > 0 ? 'text-[#D4AF37]' : ''} />
                                {c.likes}
                              </button>
                            </div>
                            <p className="text-[13px] text-[#4A443E] dark:text-[#A69984] mt-0.5">{c.t}</p>
                            {c.img && (
                              <img src={c.img} alt="" className="mt-2 rounded-lg max-h-32 object-cover" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick Reply Form */}
                  <ReplyForm onReply={(text, img) => handleReply(post.id, text, img)} />
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((n, i) => (
              <motion.div 
                key={n.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/post/${n.id}`)}
                className="bg-white dark:bg-[#2A1D0F] rounded-[32px] overflow-hidden shadow-sm border border-gray-50 dark:border-white/5 cursor-pointer active:scale-[0.98] transition-all"
              >
                <div className="h-44 w-full overflow-hidden">
                  <img src={n.img} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[#FAF5EE] dark:bg-[#D4AF37]/20 text-[#8B6E4E] dark:text-[#D4AF37] text-[10px] font-black rounded-md">{n.cat}</span>
                  </div>
                  <h3 className="text-[16px] font-black text-[#1A1108] dark:text-white mb-3 leading-snug">{n.t}</h3>
                  <div className="flex justify-between items-center text-[12px] text-[#A69984] font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#FAF5EE] dark:bg-black/20 flex items-center justify-center">
                        <User size={12} className="text-[#8B6E4E] dark:text-[#D4AF37]" />
                      </div>
                      <span>{n.u} · {n.d}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Share2 size={14} /> {n.l}</span>
                      <span className="flex items-center gap-1"><MoreHorizontal size={14} /> {n.c}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
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
                    <button 
                      className="w-12 h-12 bg-[#FAF5EE] dark:bg-[#2A1D0F] rounded-xl flex items-center justify-center text-[#D4AF37] border border-dashed border-[#D4AF37]/50"
                      onClick={() => {
                        const url = prompt('请输入图片链接 (测试演示用):');
                        if (url) setPostImage(url);
                      }}
                    >
                      <ImagePlus size={20} />
                    </button>
                    <span className="text-[12px] text-[#A69984] font-bold">发帖只允许图片和文字</span>
                  </div>
                  {postImage && (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden group">
                      <img src={postImage} alt="" className="w-full h-full object-cover" />
                      <button onClick={() => setPostImage('')} className="absolute inset-0 bg-black/40 items-center justify-center hidden group-hover:flex text-white">
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onReply(text, img);
    setText('');
    setImg('');
  };

  return (
    <form onSubmit={submit} className="mt-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="我也说两句..." 
          className="flex-1 h-9 bg-[#FAF5EE] dark:bg-black/20 rounded-full px-4 text-[12px] font-medium outline-none border border-transparent focus:border-[#D4AF37]/30 dark:text-white"
        />
        <button 
          type="button"
          onClick={() => {
            const url = prompt('请输入回帖图片链接:');
            if (url) setImg(url);
          }}
          className={cn(
            "p-2 rounded-full transition-colors",
            img ? "text-[#D4AF37] bg-[#D4AF37]/10" : "text-[#A69984] hover:bg-gray-100 dark:hover:bg-white/5"
          )}
        >
          <ImagePlus size={18} />
        </button>
        <button type="submit" className="text-[#D4AF37] p-2 hover:bg-[#D4AF37]/10 rounded-full transition-colors">
          <Send size={18} />
        </button>
      </div>
      {img && (
        <div className="flex items-center gap-2 px-4">
          <span className="text-[10px] text-[#D4AF37] font-black">已图待发</span>
          <button type="button" onClick={() => setImg('')}><X size={12} className="text-[#A69984]" /></button>
        </div>
      )}
    </form>
  );
}

