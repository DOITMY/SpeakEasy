
import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Check, X, Award, RotateCcw } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { grammarExercises, GrammarExercise } from '../utils/mockData';

const Grammar: React.FC = () => {
  const { updateProgress } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentExercise = grammarExercises[currentIndex];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    
    if (selectedAnswer === currentExercise.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < grammarExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // 完成练习
      updateProgress('course-1', 10);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const progress = Math.round(((currentIndex + 1) / grammarExercises.length) * 100);
  const isFinished = currentIndex === grammarExercises.length - 1 && showResult;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">语法练习</h1>
          <p className="text-gray-600 text-lg">通过选择题巩固语法知识</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">练习进度</span>
            <span className="text-sm font-semibold text-purple-600">
              {currentIndex + 1} / {grammarExercises.length}
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
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                第 {currentIndex + 1} 题
              </h2>
              <p className="text-xl text-gray-700">{currentExercise.question}</p>
            </div>

            <div className="space-y-3 mb-8">
              {currentExercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    showResult
                      ? index === currentExercise.correctAnswer
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
                    {showResult && index === currentExercise.correctAnswer && (
                      <Check size={24} className="text-green-500" />
                    )}
                    {showResult && index === selectedAnswer && index !== currentExercise.correctAnswer && (
                      <X size={24} className="text-red-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`p-4 rounded-xl mb-6 ${
                selectedAnswer === currentExercise.correctAnswer
                  ? 'bg-green-50 border-2 border-green-200'
                  : 'bg-red-50 border-2 border-red-200'
              }`}>
                <p className="font-medium text-gray-700 mb-2">解析：</p>
                <p className="text-gray-600">{currentExercise.explanation}</p>
              </div>
            )}

            <div className="flex gap-4">
              {!showResult ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswer === null}
                  className={`flex-1 py-4 rounded-2xl font-semibold text-lg transition-all ${
                    selectedAnswer === null
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  }`}
                >
                  检查答案
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transition-all"
                >
                  {currentIndex < grammarExercises.length - 1 ? '下一题' : '查看结果'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
              <Award size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">练习完成！</h2>
            <p className="text-gray-600 text-lg mb-6">
              你的得分：<span className="text-3xl font-bold text-purple-600">{score}</span> / {grammarExercises.length}
            </p>
            <p className="text-gray-500 mb-8">
              正确率：{Math.round((score / grammarExercises.length) * 100)}%
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

export default Grammar;
