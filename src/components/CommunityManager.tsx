import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function CommunityManager() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/community_posts');
      const data = await res.json();
      setPosts(data.sort((a: any, b: any) => b.d_raw - a.d_raw));
    } catch (e) {
      console.error(e);
    }
  };

  const handleApprove = async (id: string, approved: boolean) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    
    await fetch(`/api/community_posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, approved })
    });
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除该帖子吗？')) return;
    await fetch(`/api/community_posts/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-black text-gray-900">社区帖子审核</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 font-bold text-gray-600 text-sm">发布人</th>
              <th className="py-3 px-4 font-bold text-gray-600 text-sm">内容</th>
              <th className="py-3 px-4 font-bold text-gray-600 text-sm">图片</th>
              <th className="py-3 px-4 font-bold text-gray-600 text-sm">时间</th>
              <th className="py-3 px-4 font-bold text-gray-600 text-sm">状态</th>
              <th className="py-3 px-4 font-bold text-gray-600 text-sm text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 flex items-center gap-2">
                  <img src={p.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50'} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-sm font-bold">{p.u}</span>
                </td>
                <td className="py-3 px-4 text-sm max-w-xs truncate" title={p.t}>{p.t}</td>
                <td className="py-3 px-4">
                  {p.img && <img src={p.img} className="h-10 w-10 object-cover rounded" />}
                </td>
                <td className="py-3 px-4 text-xs text-gray-500">{new Date(p.d).toLocaleString()}</td>
                <td className="py-3 px-4">
                  {p.approved ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">已通过</span>
                  ) : (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-bold">待审核</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    {!p.approved && (
                      <button onClick={() => handleApprove(p.id, true)} className="text-green-600 hover:bg-green-50 p-1.5 rounded">
                        <CheckCircle size={18} />
                      </button>
                    )}
                    {p.approved && (
                      <button onClick={() => handleApprove(p.id, false)} className="text-yellow-600 hover:bg-yellow-50 p-1.5 rounded">
                        <XCircle size={18} />
                      </button>
                    )}
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <div className="text-center py-10 text-gray-500">暂无帖子</div>
        )}
      </div>
    </div>
  );
}
