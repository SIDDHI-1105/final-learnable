import { GameLevel } from '../types/course';

export const gameLevels: GameLevel[] = [
  {
    id: 'level-1',
    levelNumber: 1,
    question: {
      id: 'q1',
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correctAnswer: 1,
      explanation: 'Paris is the capital city of France.'
    },
    hurdlePosition: 500,
    backgroundTheme: 'grass',
    coins: 5,
    timeLimit: 30
  },
  {
    id: 'level-2',
    levelNumber: 2,
    question: {
      id: 'q2',
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 1,
      explanation: 'Mars is called the Red Planet due to its reddish appearance.'
    },
    hurdlePosition: 600,
    backgroundTheme: 'desert',
    coins: 7,
    timeLimit: 25
  },
  {
    id: 'level-3',
    levelNumber: 3,
    question: {
      id: 'q3',
      question: 'What is the chemical symbol for gold?',
      options: ['Ag', 'Fe', 'Au', 'Cu'],
      correctAnswer: 2,
      explanation: 'Au is the chemical symbol for gold, from the Latin word "aurum".'
    },
    hurdlePosition: 700,
    backgroundTheme: 'castle',
    coins: 10,
    timeLimit: 20
  },
  // Add more levels as needed...
]; 