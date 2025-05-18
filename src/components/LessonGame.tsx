import React, { useState } from 'react';
import MarioGame from './MarioGame';
import { Lesson, GameLevel } from '../types/course';

interface LessonGameProps {
  lesson: Lesson;
  onComplete: () => void;
  onProgressUpdate: (completedLevels: number[], score: number, coins: number) => void;
}

const LessonGame: React.FC<LessonGameProps> = ({ lesson, onComplete, onProgressUpdate }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);

  const handleLevelComplete = (levelNumber: number) => {
    setCompletedLevels(prev => [...prev, levelNumber]);
    setTotalScore(prev => prev + 100); // Base score for completing a level
    setTotalCoins(prev => prev + lesson.gameLevels[levelNumber].coins);
  };

  const handleGameComplete = () => {
    onProgressUpdate(completedLevels, totalScore, totalCoins);
    onComplete();
  };

  if (!isGameStarted) {
    return (
      <div className="lesson-game-intro">
        <h2>{lesson.title} - Game Challenge</h2>
        <p>{lesson.description}</p>
        <div className="game-instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>Mario will run automatically</li>
            <li>Answer questions correctly to jump over hurdles</li>
            <li>Wrong answers will make Mario fall</li>
            <li>Collect coins and complete all levels to finish the lesson</li>
          </ul>
        </div>
        <button 
          className="start-game-button"
          onClick={() => setIsGameStarted(true)}
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="lesson-game">
      <MarioGame
        levels={lesson.gameLevels}
        onLevelComplete={handleLevelComplete}
        onGameComplete={handleGameComplete}
      />
    </div>
  );
};

export default LessonGame; 