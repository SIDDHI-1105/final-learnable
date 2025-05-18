export interface GameObject {
  type: 'block' | 'coin' | 'goomba' | 'pipe';
  x: number; // horizontal position (pixels)
  y: number; // vertical position (pixels from ground)
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoId: string;
  duration: number;
  isFree: boolean;
  price: number;
  gameLevels: GameLevel[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface UserProgress {
  userId: string;
  watchedLessons: {
    lessonId: string;
    watchTime: number;
    completed: boolean;
  }[];
  purchasedLessons: string[];
  points: number;
  gameProgress: {
    lessonId: string;
    completedLevels: number[];
    score: number;
    coins: number;
  }[];
}

// New interfaces for gamification
export interface GameQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct answer
  explanation: string;
}

export interface GameLevel {
  id: string;
  levelNumber: number;
  question: GameQuestion;
  hurdlePosition: number; // Position where the hurdle appears
  backgroundTheme: string; // Theme for the level (e.g., "grass", "desert", "castle")
  coins: number; // Number of coins to collect
  timeLimit: number; // Time limit in seconds
  objects: GameObject[]; // New: dynamic objects for Mario features
}

export interface GameProgress {
  userId: string;
  currentLevel: number;
  completedLevels: number[];
  score: number;
  lives: number;
  coins: number;
  lastAttempt: {
    levelId: string;
    timestamp: Date;
    success: boolean;
  } | null;
}

export interface GameState {
  isRunning: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  currentLevel: GameLevel | null;
  playerPosition: number;
  playerState: 'running' | 'jumping' | 'falling' | 'idle';
  collectedCoins: number;
  remainingTime: number;
} 