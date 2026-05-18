
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { BookOpen, Volume2, Check, X, ChevronRight, RotateCcw } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { englishWords, japaneseWords, koreanWords, Word } from '../utils/mockData';

type Language = 'en' | 'ja' | 'ko';

const Vocabulary: React.FC = () => {
  const { user, updateProgress, updateUserLanguage } = useAppStore();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(user?.currentLanguage as Language || 'en');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [learnedWords, setLearnedWords] = useState<string[]>([]);

  const wordSets: Record<Language, Word[]> = {
    en: englishWords,
    ja: japaneseWords,
    ko: koreanWords,
  };

  const words = wordSets[currentLanguage];
  const currentWord = words[currentIndex];

  const languageNames: Record<Language, string> = {
    en: '英语',
    ja: '日语',
    ko: '韩语',
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    setCurrentIndex(0);
    setShowTranslation(false);
    updateUserLanguage(lang);
  };

  const handleKnow = () => {
    if (!learnedWords.includes(currentWord.id)) {
      setLearnedWords([...learnedWords, currentWord.id]);
    }
    nextWord();
  };

  const handleDontKnow = () => {
    nextWord();
  };

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTranslation(false);
    } else {
      // 完成学习
      updateProgress('course-1', 10);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setShowTranslation(false);
    setLearnedWords([]);
  };

  const progress = Math.round(((currentIndex + 1) / words.length) * 100);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">单词记忆</h1>
          <p className="text-gray-600 text-lg">通过闪卡方式高效记忆单词</p>
        </div>

        <div className="flex gap-3 mb-8">
          {(Object.keys(languageNames) as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                currentLanguage === lang
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {languageNames[lang]}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">学习进度</span>
            <span className="text-sm font-semibold text-purple-600">{currentIndex + 1} / {words.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {currentIndex < words.length ? (
          <>
            <div className="mb-8">
              <div 
                className={`relative bg-white rounded-3xl shadow-xl p-12 min-h-[400px] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 ${
                  showTranslation ? 'bg-gradient-to-br from-purple-50 to-pink-50' : ''
                }`}
                onClick={() => setShowTranslation(!showTranslation)}
              >
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-800 mb-4">
                    {currentWord.text}
                  </div>
                  <div className="text-xl text-gray-500 mb-6">
                    {currentWord.pronunciation}
                  </div>
                  
                  {showTranslation && (
                    <div className="animate-fadeIn">
                      <div className="text-3xl font-semibold text-purple-600 mb-4">
                        {currentWord.translation}
                      </div>
                      <div className="text-lg text-gray-600 bg-white rounded-xl p-4 inline-block">
                        {currentWord.example}
                      </div>
                    </div>
                  )}

                  {!showTranslation && (
                    <div className="mt-8 text-gray-400">
                      <p>点击卡片查看翻译</p>
                    </div>
                  )}
                </div>

                <button 
                  className="absolute top-6 right-6 text-gray-400 hover:text-purple-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // 这里可以添加发音功能
                  }}
                >
                  <Volume2 size={28} />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleDontKnow}
                className="flex-1 bg-red-50 text-red-600 py-4 rounded-2xl font-semibold text-lg hover:bg-red-100 transition-all flex items-center justify-center gap-2"
              >
                <X size={24} />
                还没记住
              </button>
              <button
                onClick={handleKnow}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Check size={24} />
                记住了
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
              <Check size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">恭喜完成！</h2>
            <p className="text-gray-600 text-lg mb-2">你已经学习了所有单词</p>
            <p className="text-purple-600 font-semibold mb-8">
              已掌握 {learnedWords.length} / {words.length} 个单词
            </p>
            <button
              onClick={restart}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={24} />
              再学一遍
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Vocabulary;
