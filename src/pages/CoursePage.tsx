import React, { useState } from 'react';
import { LessonPlayer } from '../components/LessonPlayer';
import { useCourse } from '../contexts/CourseContext';
import { sampleCourse } from '../data/sampleCourse';

export const CoursePage: React.FC = () => {
  const { userProgress } = useCourse();
  const [selectedLesson, setSelectedLesson] = useState(sampleCourse.lessons[0]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{sampleCourse.title}</h1>
          <p className="text-gray-600 mb-8">{sampleCourse.description}</p>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <LessonPlayer lesson={selectedLesson} />
          </div>
        </div>

        {/* Lessons Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            <div className="space-y-2">
              {sampleCourse.lessons.map((lesson) => {
                const isCompleted = userProgress?.watchedLessons.find(
                  (w) => w.lessonId === lesson.id
                )?.completed;
                const isPurchased = userProgress?.purchasedLessons.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedLesson.id === lesson.id
                        ? 'bg-blue-100 border-blue-500'
                        : 'hover:bg-gray-100'
                    } ${
                      !lesson.isFree && !isPurchased
                        ? 'opacity-75'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{lesson.title}</h3>
                        <p className="text-sm text-gray-600">{lesson.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!lesson.isFree && !isPurchased && (
                          <span className="text-sm font-medium text-blue-600">₹49</span>
                        )}
                        {isCompleted && (
                          <span className="text-green-500">✓</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Points Display */}
          <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
            <p className="text-gray-600">
              Points earned: {userProgress?.points || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 