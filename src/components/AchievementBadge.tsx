
import React from 'react';
import { Star, Flame, BookOpen, CheckCircle, MessageCircle, Award, Lock } from 'lucide-react';
import { Achievement } from '../utils/mockData';

interface AchievementBadgeProps {
  achievement: Achievement;
}

const iconMap: Record<string, React.ReactNode> = {
  'star': <Star size={28} />,
  'flame': <Flame size={28} />,
  'book-open': <BookOpen size={28} />,
  'check-circle': <CheckCircle size={28} />,
  'message-circle': <MessageCircle size={28} />,
  'award': <Award size={28} />
};

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement }) => {
  return (
    <div className={`p-4 rounded-2xl transition-all duration-300 ${
      achievement.unlocked 
        ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:scale-105' 
        : 'bg-gray-100 border-2 border-gray-200 opacity-60'
    }`}>
      <div className={`flex flex-col items-center text-center ${
        achievement.unlocked ? 'text-purple-600' : 'text-gray-400'
      }`}>
        <div className={`mb-3 p-3 rounded-full ${
          achievement.unlocked 
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg' 
            : 'bg-gray-300 text-gray-500'
        }`}>
          {achievement.unlocked ? (
            iconMap[achievement.icon] || <Star size={28} />
          ) : (
            <Lock size={28} />
          )}
        </div>
        <h4 className="font-bold text-base mb-1">{achievement.name}</h4>
        <p className="text-sm opacity-80">{achievement.description}</p>
      </div>
    </div>
  );
};
