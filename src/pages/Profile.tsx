
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useAppStore } from '../store/useAppStore';
import { User, Mail, Globe, Settings, LogOut, Edit2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, updateUserLanguage, logout } = useAppStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [language, setLanguage] = useState(user?.currentLanguage || 'en');

  const languageNames: Record<string, string> = {
    en: '英语',
    ja: '日语',
    ko: '韩语',
  };

  const handleSave = () => {
    updateUserLanguage(language as any);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">请先登录</h2>
          <button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            去登录
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">个人中心</h1>
          <p className="text-gray-600 text-lg">管理你的账户和学习偏好</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h2>
              <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
                <Mail size={18} />
                {user.email}
              </p>
              <p className="text-purple-600 font-semibold mt-2">等级 Lv.{user.level}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Settings size={24} />
                学习设置
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-purple-600 hover:text-purple-700 flex items-center gap-2 font-medium"
                >
                  <Edit2 size={18} />
                  编辑
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="text-green-600 hover:text-green-700 flex items-center gap-2 font-medium"
                >
                  <Save size={18} />
                  保存
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  当前学习语言
                </label>
                {isEditing ? (
                  <div className="flex gap-3">
                    {(['en', 'ja', 'ko'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                          language === lang
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Globe size={24} className="text-purple-600" />
                    <span className="text-lg text-gray-800">{languageNames[user.currentLanguage]}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User size={24} />
              账户信息
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-500 text-sm mb-1">加入时间</p>
                <p className="text-gray-800 font-medium">
                  {user.createdAt.toLocaleDateString('zh-CN')}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-500 text-sm mb-1">学习总时长</p>
                <p className="text-gray-800 font-medium">{user.totalMinutes} 分钟</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-500 text-sm mb-1">连续学习</p>
                <p className="text-gray-800 font-medium">{user.streakDays} 天</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-500 text-sm mb-1">当前等级</p>
                <p className="text-gray-800 font-medium">Lv.{user.level}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <button
              onClick={handleLogout}
              className="w-full bg-red-50 text-red-600 hover:bg-red-100 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={20} />
              退出登录
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
