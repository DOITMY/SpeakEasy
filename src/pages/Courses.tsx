
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { CourseCard } from '../components/CourseCard';
import { useAppStore } from '../store/useAppStore';
import { Globe } from 'lucide-react';

type LanguageFilter = 'all' | 'en' | 'ja' | 'ko';
type LevelFilter = 'all' | 'beginner' | 'intermediate' | 'advanced';

const languageNames: Record<string, string> = {
  all: '全部语言',
  en: '英语',
  ja: '日语',
  ko: '韩语',
};

const levelNames: Record<string, string> = {
  all: '全部级别',
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
};

const Courses: React.FC = () => {
  const { courses, progress } = useAppStore();
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');

  const filteredCourses = courses.filter(course => {
    const languageMatch = languageFilter === 'all' || course.language === languageFilter;
    const levelMatch = levelFilter === 'all' || course.level === levelFilter;
    return languageMatch && levelMatch;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">课程中心</h1>
          <p className="text-gray-600 text-lg">探索丰富的语言学习课程，选择适合你的开始学习</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="flex items-center gap-2">
                  <Globe size={16} />
                  语言
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(languageNames) as LanguageFilter[]).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguageFilter(lang)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      languageFilter === lang
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {languageNames[lang]}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">级别</label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(levelNames) as LevelFilter[]).map(level => (
                  <button
                    key={level}
                    onClick={() => setLevelFilter(level)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      levelFilter === level
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {levelNames[level]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course}
                progress={progress[course.id] || 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">没有找到符合条件的课程</h3>
            <p className="text-gray-500">尝试调整筛选条件</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Courses;
