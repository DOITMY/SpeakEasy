
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Clock, BookOpen, Award, PlayCircle, ChevronRight } from 'lucide-react';
import { Layout } from '../components/Layout';
import { CourseCard } from '../components/CourseCard';
import { AchievementBadge } from '../components/AchievementBadge';
import { useAppStore } from '../store/useAppStore';

const Home: React.FC = () => {
  const { user, isLoggedIn, courses, achievements, progress } = useAppStore();
  const navigate = useNavigate();

  const learningModules = [
    { 
      title: '单词记忆', 
      description: '通过闪卡和练习掌握新词汇', 
      icon: BookOpen,
      path: '/learn/vocabulary',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      title: '语法练习', 
      description: '巩固语法知识，提升语言能力', 
      icon: Award,
      path: '/learn/grammar',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      title: '口语跟读', 
      description: '模仿发音，提升口语水平', 
      icon: PlayCircle,
      path: '/learn/speaking',
      color: 'from-orange-500 to-red-500'
    },
    { 
      title: '听力训练', 
      description: '磨练耳朵，提高听力理解', 
      icon: PlayCircle,
      path: '/learn/listening',
      color: 'from-green-500 to-teal-500'
    },
  ];

  const recommendedCourses = courses.slice(0, 3);
  const unlockedAchievements = achievements.filter(a => a.unlocked);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-6">
              <span className="text-white font-bold text-4xl">语</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              开启你的
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                多语学习之旅
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              沉浸式学习体验，掌握英语、日语、韩语等多种语言。分级课程、互动练习、进度追踪，帮助你高效学习。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                免费开始
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-md hover:shadow-lg transition-all hover:scale-105 border-2 border-gray-200"
              >
                已有账号
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: BookOpen, title: '分级课程', desc: '从零基础到高级，系统学习语言知识' },
              { icon: Award, title: '互动练习', desc: '单词、语法、口语、听力全方位训练' },
              { icon: Flame, title: '成就激励', desc: '通过学习获得成就，保持学习动力' },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mb-6`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 mb-10 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">你好，{user?.name}！</h1>
              <p className="text-purple-100 text-lg">今天也要继续加油学习哦</p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <Flame size={28} className="text-orange-300" />
                  <span>{user?.streakDays}</span>
                </div>
                <p className="text-purple-100 text-sm">连续天数</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 text-2xl font-bold">
                  <Clock size={28} className="text-blue-300" />
                  <span>{user?.totalMinutes}</span>
                </div>
                <p className="text-purple-100 text-sm">学习分钟</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">快速开始学习</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningModules.map((module, index) => (
              <Link
                key={index}
                to={module.path}
                className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <module.icon size={28} />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm">{module.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">推荐课程</h2>
            <Link to="/courses" className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700">
              查看全部 <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course, index) => (
              <CourseCard 
                key={course.id} 
                course={course}
                progress={progress[course.id] || 0}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">已获成就</h2>
            <Link to="/progress" className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700">
              查看全部 <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {unlockedAchievements.slice(0, 4).map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
            {unlockedAchievements.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                还没有获得任何成就，快去学习吧！
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
