
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  currentLanguage: 'en' | 'ja' | 'ko';
  level: number;
  streakDays: number;
  totalMinutes: number;
  createdAt: Date;
}

export interface Course {
  id: string;
  language: 'en' | 'ja' | 'ko';
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  lessonsCount: number;
  duration: number;
  imageUrl: string;
}

export interface Word {
  id: string;
  text: string;
  translation: string;
  pronunciation: string;
  example: string;
  imageUrl?: string;
}

export interface GrammarExercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  unlocked: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}

export const mockUser: User = {
  id: 'user-1',
  name: '小明',
  email: 'xiaoming@example.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  currentLanguage: 'en',
  level: 2,
  streakDays: 7,
  totalMinutes: 450,
  createdAt: new Date('2024-01-15')
};

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    language: 'en',
    name: '英语入门到精通',
    level: 'beginner',
    description: '从基础词汇开始，循序渐进地学习英语，适合零基础学习者',
    lessonsCount: 50,
    duration: 30,
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop'
  },
  {
    id: 'course-2',
    language: 'en',
    name: '商务英语进阶',
    level: 'intermediate',
    description: '专注于商务场景下的英语应用，提升职场沟通能力',
    lessonsCount: 40,
    duration: 45,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop'
  },
  {
    id: 'course-3',
    language: 'ja',
    name: '日语零基础入门',
    level: 'beginner',
    description: '学习五十音、基础词汇和日常会话，开启日语学习之旅',
    lessonsCount: 45,
    duration: 25,
    imageUrl: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop'
  },
  {
    id: 'course-4',
    language: 'ja',
    name: '日本语能力考N2冲刺',
    level: 'advanced',
    description: '针对JLPT N2考试的专项训练，包含语法、听力、阅读',
    lessonsCount: 60,
    duration: 50,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop'
  },
  {
    id: 'course-5',
    language: 'ko',
    name: '韩语入门速成',
    level: 'beginner',
    description: '学习韩文字母、基础语法和常用表达，快速入门韩语',
    lessonsCount: 35,
    duration: 30,
    imageUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=400&h=300&fit=crop'
  },
  {
    id: 'course-6',
    language: 'ko',
    name: '韩剧韩语会话',
    level: 'intermediate',
    description: '通过韩剧学习地道韩语表达，提升听力和口语能力',
    lessonsCount: 40,
    duration: 35,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  }
];

export const englishWords: Word[] = [
  { id: 'w1', text: 'Hello', translation: '你好', pronunciation: '/həˈloʊ/', example: 'Hello, nice to meet you!' },
  { id: 'w2', text: 'Thank you', translation: '谢谢', pronunciation: '/θæŋk juː/', example: 'Thank you for your help.' },
  { id: 'w3', text: 'Goodbye', translation: '再见', pronunciation: '/ɡʊdˈbaɪ/', example: 'Goodbye, see you tomorrow!' },
  { id: 'w4', text: 'Please', translation: '请', pronunciation: '/pliːz/', example: 'Please sit down.' },
  { id: 'w5', text: 'Sorry', translation: '对不起', pronunciation: '/ˈsɑːri/', example: 'I\'m sorry for being late.' },
  { id: 'w6', text: 'Love', translation: '爱', pronunciation: '/lʌv/', example: 'I love learning languages.' },
  { id: 'w7', text: 'Friend', translation: '朋友', pronunciation: '/frend/', example: 'She is my best friend.' },
  { id: 'w8', text: 'Happy', translation: '快乐', pronunciation: '/ˈhæpi/', example: 'I feel very happy today.' }
];

export const japaneseWords: Word[] = [
  { id: 'jw1', text: 'こんにちは', translation: '你好', pronunciation: 'Konnichiwa', example: 'こんにちは、元気ですか？' },
  { id: 'jw2', text: 'ありがとう', translation: '谢谢', pronunciation: 'Arigatou', example: 'ありがとうございます！' },
  { id: 'jw3', text: 'さようなら', translation: '再见', pronunciation: 'Sayounara', example: 'さようなら、また明日！' },
  { id: 'jw4', text: 'すみません', translation: '对不起/打扰了', pronunciation: 'Sumimasen', example: 'すみません、遅くなりました。' },
  { id: 'jw5', text: '愛', translation: '爱', pronunciation: 'Ai', example: '言語を学ぶのが愛しています。' },
  { id: 'jw6', text: '友達', translation: '朋友', pronunciation: 'Tomodachi', example: '彼女は私の親友です。' }
];

export const koreanWords: Word[] = [
  { id: 'kw1', text: '안녕하세요', translation: '你好', pronunciation: 'Annyeonghaseyo', example: '안녕하세요, 반갑습니다!' },
  { id: 'kw2', text: '감사합니다', translation: '谢谢', pronunciation: 'Gamsahamnida', example: '도와주셔서 감사합니다!' },
  { id: 'kw3', text: '안녕히 가세요', translation: '再见', pronunciation: 'Annyeonghi gaseyo', example: '안녕히 가세요, 내일 뵙겠습니다!' },
  { id: 'kw4', text: '죄송합니다', translation: '对不起', pronunciation: 'Joesonghamnida', example: '늦어서 죄송합니다.' },
  { id: 'kw5', text: '사랑', translation: '爱', pronunciation: 'Sarang', example: '언어 배우는 걸 사랑해요.' },
  { id: 'kw6', text: '친구', translation: '朋友', pronunciation: 'Chingu', example: '그녀는 제 가장 친한 친구예요.' }
];

export const grammarExercises: GrammarExercise[] = [
  {
    id: 'g1',
    question: 'I ___ a student.',
    options: ['is', 'am', 'are', 'be'],
    correctAnswer: 1,
    explanation: '主语是 I 时，be 动词用 am。'
  },
  {
    id: 'g2',
    question: 'She ___ to school every day.',
    options: ['go', 'goes', 'going', 'went'],
    correctAnswer: 1,
    explanation: '主语是第三人称单数 she，一般现在时动词加 s。'
  },
  {
    id: 'g3',
    question: 'They ___ football yesterday.',
    options: ['play', 'plays', 'played', 'playing'],
    correctAnswer: 2,
    explanation: 'yesterday 表示过去时间，动词用过去式。'
  },
  {
    id: 'g4',
    question: '___ you like coffee?',
    options: ['Do', 'Does', 'Are', 'Is'],
    correctAnswer: 0,
    explanation: '第二人称 you 的一般疑问句用助动词 do。'
  },
  {
    id: 'g5',
    question: 'This is ___ book.',
    options: ['mine', 'my', 'I', 'me'],
    correctAnswer: 1,
    explanation: '形容词性物主代词 my 修饰名词 book。'
  }
];

export const achievements: Achievement[] = [
  { id: 'a1', name: '初学者', description: '完成第一次学习', icon: 'star', requirement: '完成第一次学习', unlocked: true },
  { id: 'a2', name: '坚持一周', description: '连续学习7天', icon: 'flame', requirement: '连续学习7天', unlocked: true },
  { id: 'a3', name: '词汇达人', description: '掌握100个单词', icon: 'book-open', requirement: '掌握100个单词', unlocked: false },
  { id: 'a4', name: '语法大师', description: '完成50个语法练习', icon: 'check-circle', requirement: '完成50个语法练习', unlocked: false },
  { id: 'a5', name: '社交达人', description: '在社区发布10条动态', icon: 'message-circle', requirement: '在社区发布10条动态', unlocked: false },
  { id: 'a6', name: '学习狂人', description: '累计学习1000分钟', icon: 'award', requirement: '累计学习1000分钟', unlocked: false }
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    userId: 'user-2',
    userName: '学习小能手',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    content: '今天学习了英语的过去式，感觉进步很大！继续加油！💪',
    likes: 24,
    comments: [
      { id: 'c1', userId: 'user-3', userName: '语言爱好者', content: '太棒了！一起加油！', createdAt: new Date('2024-05-15') }
    ],
    createdAt: new Date('2024-05-15')
  },
  {
    id: 'p2',
    userId: 'user-4',
    userName: '日语控',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    content: '刚刚通过了N3考试！感谢这个平台的帮助！🎉 分享一下我的学习方法：每天坚持30分钟，周末复习。',
    likes: 56,
    comments: [
      { id: 'c2', userId: 'user-5', userName: '韩语小白', content: '恭喜恭喜！太厉害了！', createdAt: new Date('2024-05-14') },
      { id: 'c3', userId: 'user-6', userName: '学习者', content: '求经验分享！', createdAt: new Date('2024-05-14') }
    ],
    createdAt: new Date('2024-05-14')
  },
  {
    id: 'p3',
    userId: 'user-7',
    userName: '多语言达人',
    userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop',
    content: '同时学习英语、日语和韩语，虽然有点挑战，但是很充实！大家有什么多语言学习的技巧吗？',
    likes: 38,
    comments: [],
    createdAt: new Date('2024-05-13')
  }
];

export const weeklyData = [
  { day: '周一', minutes: 45, words: 12 },
  { day: '周二', minutes: 30, words: 8 },
  { day: '周三', minutes: 60, words: 15 },
  { day: '周四', minutes: 40, words: 10 },
  { day: '周五', minutes: 50, words: 13 },
  { day: '周六', minutes: 90, words: 20 },
  { day: '周日', minutes: 75, words: 18 }
];
