import { Course } from '../types/course';

export const sampleCourse: Course = {
  id: 'course-1',
  title: 'Web Development Fundamentals',
  description: 'Learn the basics of web development with HTML, CSS, and JavaScript.',
  lessons: [
    {
      id: 'lesson-1',
      title: 'Introduction to HTML',
      description: 'Learn the basics of HTML and create your first webpage.',
      videoId: 'UB1O30fR-EE', // Sample video ID
      duration: 600, // 10 minutes in seconds
      isFree: true,
      price: 49,
    },
    {
      id: 'lesson-2',
      title: 'HTML Elements and Tags',
      description: 'Understanding HTML elements and how to use them effectively.',
      videoId: 'PlxWf493en4', // Sample video ID
      duration: 900, // 15 minutes in seconds
      isFree: true,
      price: 49,
    },
    {
      id: 'lesson-3',
      title: 'CSS Basics',
      description: 'Introduction to CSS and styling your web pages.',
      videoId: '1PnVor36_40', // Sample video ID
      duration: 1200, // 20 minutes in seconds
      isFree: false,
      price: 49,
    },
    {
      id: 'lesson-4',
      title: 'JavaScript Fundamentals',
      description: 'Learn the basics of JavaScript programming.',
      videoId: 'W6NZfCO5SIk', // Sample video ID
      duration: 1500, // 25 minutes in seconds
      isFree: false,
      price: 49,
    },
  ],
}; 