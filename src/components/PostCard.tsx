
import React, { useState } from 'react';
import { Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { Post } from '../utils/mockData';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return '今天';
    if (days === 1) return '昨天';
    return `${days}天前`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={post.userAvatar} 
            alt={post.userName} 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-gray-800">{post.userName}</h4>
            <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
      
      <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${
            liked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'
          }`}
        >
          <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
          <span className="text-sm font-medium">{likeCount}</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-gray-500 hover:text-purple-500 transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-sm font-medium">{post.comments.length}</span>
        </button>
      </div>
      
      {showComments && post.comments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {post.comments.map(comment => (
            <div key={comment.id} className="mb-3 last:mb-0">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-gray-700 text-sm">{comment.userName}:</span>
                <span className="text-gray-600 text-sm">{comment.content}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
