import { Lesson } from '../types/course';

export const sampleLesson: Lesson = {
  id: 'lesson-1',
  title: 'Introduction to JavaScript',
  description: 'Learn the basics of JavaScript programming through an interactive Mario-style game!',
  videoId: 'video123',
  duration: 30,
  isFree: true,
  price: 0,
  gameLevels: [
    {
      id: 'js-level-1',
      levelNumber: 1,
      question: {
        id: 'q1',
        question: 'What is the correct way to declare a variable in JavaScript?',
        options: [
          'variable x = 5;',
          'let x = 5;',
          'x = 5;',
          'const x = 5;'
        ],
        correctAnswer: 1,
        explanation: 'The "let" keyword is used to declare variables in JavaScript.'
      },
      hurdlePosition: 500,
      backgroundTheme: 'grass',
      coins: 5,
      timeLimit: 30,
      objects: [
        { type: 'block', x: 300, y: 150 },
        { type: 'block', x: 350, y: 150 },
        { type: 'coin', x: 320, y: 200 },
        { type: 'goomba', x: 420, y: 100 },
        { type: 'pipe', x: 600, y: 100 }
      ]
    },
    {
      id: 'js-level-2',
      levelNumber: 2,
      question: {
        id: 'q2',
        question: 'Which of these is NOT a JavaScript data type?',
        options: [
          'String',
          'Boolean',
          'Integer',
          'Object'
        ],
        correctAnswer: 2,
        explanation: 'JavaScript uses "Number" instead of "Integer" as a data type.'
      },
      hurdlePosition: 600,
      backgroundTheme: 'desert',
      coins: 7,
      timeLimit: 25,
      objects: [
        { type: 'block', x: 250, y: 150 },
        { type: 'coin', x: 270, y: 200 },
        { type: 'goomba', x: 500, y: 100 },
        { type: 'pipe', x: 700, y: 100 }
      ]
    },
    {
      id: 'js-level-3',
      levelNumber: 3,
      question: {
        id: 'q3',
        question: 'What does the "===" operator do in JavaScript?',
        options: [
          'Assigns a value',
          'Compares values and types',
          'Adds two numbers',
          'Checks if a value exists'
        ],
        correctAnswer: 1,
        explanation: 'The "===" operator performs strict equality comparison, checking both value and type.'
      },
      hurdlePosition: 700,
      backgroundTheme: 'castle',
      coins: 10,
      timeLimit: 20,
      objects: [
        { type: 'block', x: 400, y: 150 },
        { type: 'coin', x: 420, y: 200 },
        { type: 'goomba', x: 550, y: 100 },
        { type: 'pipe', x: 800, y: 100 }
      ]
    }
  ]
}; 