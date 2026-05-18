
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Mic, Play, Check, RotateCcw, Volume2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const speakingPhrases = [
  { text: "Hello, how are you?", translation: "你好，你好吗？" },
  { text: "Nice to meet you!", translation: "很高兴见到你！" },
  { text: "Thank you very much!", translation: "非常感谢！" },
  { text: "I love learning languages.", translation: "我喜欢学习语言。" },
  { text: "Have a nice day!", translation: "祝你度过愉快的一天！" },
];

const Speaking: React.FC = () => {
  const { updateProgress } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [score, setScore] = useState(0);

  const currentPhrase = speakingPhrases[currentIndex];

  const handleRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
      const randomScore = 70 + Math.floor(Math.random() * 30);
      setScore(randomScore);
    }, 2000);
  };

  const handleNext = () => {
    if (currentIndex < speakingPhrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasRecorded(false);
      setScore(0);
    } else {
      updateProgress('course-1', 10);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setHasRecorded(false);
    setScore(0);
  };

  const progress = Math.round(((currentIndex + 1) / speakingPhrases.length) * 100);
  const isFinished = currentIndex === speakingPhrases.length - 1 && hasRecorded;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">口语跟读</h1>
          <p className="text-gray-600 text-lg">模仿发音，提升口语水平</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">练习进度</span>
            <span className="text-sm font-semibold text-purple-600">
              {currentIndex + 1} / {speakingPhrases.length}
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6">跟读这句话</h2>
              
              <div className="text-4xl font-bold text-gray-800 mb-4">
                {currentPhrase.text}
              </div>
              <p className="text-xl text-gray-500 mb-8">{currentPhrase.translation}</p>

              <button
                className="mb-8 text-purple-600 hover:text-purple-700 flex items-center gap-2 mx-auto"
              >
                <Volume2 size={24} />
                <span className="font-medium">听标准发音</span>
              </button>

              <div className="mb-8">
                {isRecording ? (
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white mb-4 animate-pulse">
                      <Mic size={64} />
                    </div>
                    <p className="text-red-500 font-medium">正在录音...</p>
                  </div>
                ) : hasRecorded ? (
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white mb-4">
                      <Check size={64} />
                    </div>
                    <div className="text-5xl font-bold text-purple-600 mb-2">{score}分</div>
                    <p className="text-gray-600">发音不错！</p>
                  </div>
                ) : (
                  <button
                    onClick={handleRecord}
                    className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <Mic size={64} />
                  </button>
                )}
              </div>

              {!hasRecorded && !isRecording && (
                <p className="text-gray-500">点击麦克风开始录音</p>
              )}
            </div>

            {hasRecorded && (
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all"
              >
                {currentIndex < speakingPhrases.length - 1 ? '下一句' : '完成练习'}
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
              <Check size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">口语练习完成！</h2>
            <p className="text-gray-600 text-lg mb-8">
              你已经完成了所有口语跟读练习
            </p>
            <button
              onClick={restart}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
            >
              <RotateCcw size={24} />
              再来一遍
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Speaking;
