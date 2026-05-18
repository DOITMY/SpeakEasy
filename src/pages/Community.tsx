
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { PostCard } from '../components/PostCard';
import { useAppStore } from '../store/useAppStore';
import { Users, Send, Plus } from 'lucide-react';

const Community: React.FC = () => {
  const { posts, addPost, user } = useAppStore();
  const [newPost, setNewPost] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);

  const handleSubmitPost = () => {
    if (!newPost.trim() || !user) return;

    const post = {
      id: `post-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: newPost,
      likes: 0,
      comments: [],
      createdAt: new Date(),
    };

    addPost(post);
    setNewPost('');
    setShowPostForm(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">社区交流</h1>
          <p className="text-gray-600 text-lg">与其他学习者分享你的学习心得</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          {!showPostForm ? (
            <button
              onClick={() => setShowPostForm(true)}
              className="w-full flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-purple-400 hover:text-purple-600 transition-all"
            >
              <Plus size={24} />
              <span className="font-medium">分享你的学习心得...</span>
            </button>
          ) : (
            <div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="分享你的学习心得..."
                className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-purple-500 focus:ring-0 transition-all"
                rows={4}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowPostForm(false);
                    setNewPost('');
                  }}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleSubmitPost}
                  disabled={!newPost.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send size={18} />
                  发布
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Community;
