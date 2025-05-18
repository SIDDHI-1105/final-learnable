import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Lesson, UserProgress } from '../types/course';

interface CourseContextType {
  currentCourse: Course | null;
  userProgress: UserProgress | null;
  updateWatchTime: (lessonId: string, watchTime: number) => void;
  purchaseLesson: (lessonId: string) => void;
  isLessonPurchased: (lessonId: string) => boolean;
  isLessonCompleted: (lessonId: string) => boolean;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    } else {
      // Initialize new user progress
      setUserProgress({
        userId: 'user-1', // In a real app, this would come from authentication
        watchedLessons: [],
        purchasedLessons: [],
        points: 0,
      });
    }
  }, []);

  const updateWatchTime = (lessonId: string, watchTime: number) => {
    if (!userProgress) return;

    const lesson = currentCourse?.lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    const watchedLesson = userProgress.watchedLessons.find(w => w.lessonId === lessonId);
    const isCompleted = watchTime >= lesson.duration * 0.9; // 90% completion

    const updatedProgress = {
      ...userProgress,
      watchedLessons: watchedLesson
        ? userProgress.watchedLessons.map(w =>
            w.lessonId === lessonId
              ? { ...w, watchTime, completed: isCompleted }
              : w
          )
        : [...userProgress.watchedLessons, { lessonId, watchTime, completed: isCompleted }],
      points: isCompleted && !watchedLesson?.completed
        ? userProgress.points + 10
        : userProgress.points,
    };

    setUserProgress(updatedProgress);
    localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
  };

  const purchaseLesson = (lessonId: string) => {
    if (!userProgress) return;

    const updatedProgress = {
      ...userProgress,
      purchasedLessons: [...userProgress.purchasedLessons, lessonId],
    };

    setUserProgress(updatedProgress);
    localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
  };

  const isLessonPurchased = (lessonId: string) => {
    if (!userProgress) return false;
    return userProgress.purchasedLessons.includes(lessonId);
  };

  const isLessonCompleted = (lessonId: string) => {
    if (!userProgress) return false;
    const watchedLesson = userProgress.watchedLessons.find(w => w.lessonId === lessonId);
    return watchedLesson?.completed || false;
  };

  return (
    <CourseContext.Provider
      value={{
        currentCourse,
        userProgress,
        updateWatchTime,
        purchaseLesson,
        isLessonPurchased,
        isLessonCompleted,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}; 