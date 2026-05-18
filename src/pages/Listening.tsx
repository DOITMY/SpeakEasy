
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Play, Check, RotateCcw, Volume2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const listeningExercises = [
  {
    audio: "Hello, how are you?",
    options: ["你好，你好吗？", "再见", "谢谢", "对不起"],
    correct: 0,
  },
  {
    audio: "Nice to meet you!",
    options: ["再见", "很高兴见到你！", "谢谢", "你好"],
    correct: 1,
  },
  {
    audio: "Thank you very much!",
    options: ["对不起", "请", "非常感谢！", "你好"],
    correct: 2,
  },
  {
    audio: "I love learning languages.",
    options: ["我喜欢学习语言。", "我很好", "再见", "谢谢"],
    correct: 0,
  },
  {
    audio: "Have a nice day!",
    options: ["你好", "祝你度过愉快的一天！", "谢谢", "对不起"],
    correct: 1,
  },
];

const Listening: React.FC = () => {
  const { updateProgress } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentExercise = listeningExercises[currentIndex];

  const handlePlay = () => {
    // 这里可以添加音频播放功能
    console.log('Playing audio:', currentExercise.audio);
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === currentExercise.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < listeningExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      updateProgress('course-1', 10);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const progress = Math.round(((currentIndex + 1) / listeningExercises.length) * 100);
  const isFinished = currentIndex === listeningExercises.length - 1 && showResult;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">听力训练</h1>
          <p className="text-gray-600 text-lg">磨炼耳朵，提高听力理解</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">练习进度</span>
            <span className="text-sm font-semibold text-purple-600">
              {currentIndex + 1} / {listeningExercises.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {!isFinished ? (
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">听录音，选择正确的翻译</h2>
              
              <button
                onClick={handlePlay}
                className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 mb-6 mx-auto"
              >
                <Volume2 size={64} />
              </button>

              <p className="text-gray-500 mb-8">点击播放按钮听录音</p>
            </div>

            <div className="space-y-3 mb-8">
              {currentExercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    showResult
                      ? index === currentExercise.correct
                        ? 'border-green-500 bg-green-50'
                        : index === selectedAnswer
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                      : selectedAnswer === index
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option}</span>
                    {showResult && index === currentExercise.correct && (
                      <Check size={24} className="text-green-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`p-4 rounded-xl mb-6 ${
                selectedAnswer === currentExercise.correct
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-red-50 border-2 border-red-200'
              }`}>
                <p className="font-medium text-gray-700">
                  原文：<span className="text-gray-800 font-semibold">{currentExercise.audio}</span>
                </p>
              </div>
            )}

            {showResult && (
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all"
              >
                {currentIndex < listeningExercises.length - 1 ? '下一题' : '查看结果'}
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
              <Check size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">听力练习完成！</h2>
            <p className="text-gray-600 text-lg mb-6">
              你的得分：<span className="text-3xl font-bold text-purple-600">{score}</span> / {listeningExercises.length}
            </p>
            <p className="text-gray-500 mb-8">
              正确率：{Math.round((score / listeningExercises.length) * 100)}%
            </p>
            <button
              onClick={restart}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={24} />
              重新练习
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Listening;
