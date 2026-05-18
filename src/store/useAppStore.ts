
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Course, Achievement, Post, mockUser, mockCourses, achievements, mockPosts } from '../utils/mockData';

interface AppState {
  user: User | null;
  courses: Course[];
  currentCourse: Course | null;
  progress: Record<string, number>;
  achievements: Achievement[];
  posts: Post[];
  isLoggedIn: boolean;
  
  setUser: (user: User | null) => void;
  setCourses: (courses: Course[]) => void;
  setCurrentCourse: (course: Course | null) => void;
  updateProgress: (courseId: string, percent: number) => void;
  unlockAchievement: (achievementId: string) => void;
  addPost: (post: Post) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
  updateUserLanguage: (language: 'en' | 'ja' | 'ko') => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      courses: mockCourses,
      currentCourse: null,
      progress: {},
      achievements: achievements,
      posts: mockPosts,
      isLoggedIn: false,
      
      setUser: (user) => set({ user }),
      setCourses: (courses) => set({ courses }),
      setCurrentCourse: (course) => set({ currentCourse: course }),
      updateProgress: (courseId, percent) => set((state) => ({
        progress: { ...state.progress, [courseId]: Math.min(100, (state.progress[courseId] || 0) + percent) }
      })),
      unlockAchievement: (achievementId) => set((state) => ({
        achievements: state.achievements.map(a => 
          a.id === achievementId ? { ...a, unlocked: true } : a
        )
      })),
      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts]
      })),
      login: (email, password) => {
        if (email && password) {
          set({ user: mockUser, isLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isLoggedIn: false }),
      register: (name, email, password) => {
        if (name && email && password) {
          const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
            currentLanguage: 'en',
            level: 1,
            streakDays: 0,
            totalMinutes: 0,
            createdAt: new Date()
          };
          set({ user: newUser, isLoggedIn: true });
          return true;
        }
        return false;
      },
      updateUserLanguage: (language) => set((state) => ({
        user: state.user ? { ...state.user, currentLanguage: language } : null
      }))
    }),
    {
      name: 'language-learning-storage'
    }
  )
);
