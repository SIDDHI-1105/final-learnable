import React, { useState, useEffect, useRef } from 'react';
import { GameLevel, GameState } from '../types/course';

interface MarioGameProps {
  levels: GameLevel[];
  onLevelComplete: (levelNumber: number) => void;
  onGameComplete: () => void;
}

const MarioGame: React.FC<MarioGameProps> = ({ levels, onLevelComplete, onGameComplete }) => {
  const [gameState, setGameState] = useState<GameState>({
    isRunning: false,
    isPaused: false,
    isGameOver: false,
    currentLevel: null,
    playerPosition: 0,
    playerState: 'idle',
    collectedCoins: 0,
    remainingTime: 0,
  });

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLevelIndex < levels.length) {
      setGameState(prev => ({
        ...prev,
        currentLevel: levels[currentLevelIndex],
        remainingTime: levels[currentLevelIndex].timeLimit,
        playerPosition: 0,
        playerState: 'running',
        isRunning: true,
      }));
    } else {
      onGameComplete();
    }
  }, [currentLevelIndex, levels]);

  const handleAnswer = (answerIndex: number) => {
    if (!gameState.currentLevel) return;
    const isCorrect = answerIndex === gameState.currentLevel.question.correctAnswer;
    if (isCorrect) {
      setGameState(prev => ({ ...prev, playerState: 'jumping' }));
      setTimeout(() => {
        onLevelComplete(currentLevelIndex);
        setCurrentLevelIndex(prev => prev + 1);
      }, 1000);
    } else {
      setGameState(prev => ({ ...prev, playerState: 'falling', isGameOver: true }));
    }
  };

  const retryLevel = () => {
    setGameState(prev => ({
      ...prev,
      isGameOver: false,
      playerPosition: 0,
      playerState: 'running',
      isRunning: true,
    }));
  };

  // Helper: Render ground tiles
  const renderGround = () => {
    const tiles = [];
    for (let i = 0; i < 25; i++) {
      tiles.push(
        <img
          key={i}
          src="/assets/mario/ground.png"
          alt="ground"
          className="ground-tile"
          style={{ left: i * 32, bottom: 0, position: 'absolute', width: 32, height: 32, zIndex: 2 }}
        />
      );
    }
    return tiles;
  };

  // Helper: Render dynamic level objects
  const renderLevelObjects = () => {
    if (!gameState.currentLevel) return null;
    return gameState.currentLevel.objects.map((obj, idx) => {
      if (obj.type === 'block') {
        return <img key={idx} src="/assets/mario/block.png" alt="block" className="block" style={{ left: obj.x, bottom: obj.y, position: 'absolute' }} />;
      }
      if (obj.type === 'coin') {
        return <img key={idx} src="/assets/mario/coin.gif" alt="coin" className="coin" style={{ left: obj.x, bottom: obj.y, position: 'absolute' }} />;
      }
      if (obj.type === 'goomba') {
        return <img key={idx} src="/assets/mario/goomba.png" alt="goomba" className="enemy" style={{ left: obj.x, bottom: obj.y, position: 'absolute' }} />;
      }
      if (obj.type === 'pipe') {
        return <img key={idx} src="/assets/mario/pipe.png" alt="pipe" className="pipe" style={{ left: obj.x, bottom: obj.y, position: 'absolute' }} />;
      }
      return null;
    });
  };

  // Mario sprite selection
  const marioSprite =
    gameState.playerState === 'jumping'
      ? '/assets/mario/mario-jumping.png'
      : gameState.playerState === 'falling'
      ? '/assets/mario/mario-falling.png'
      : '/assets/mario/mario-running.gif';

  return (
    <div className="mario-game" ref={gameRef} style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Background */}
      <img src="/assets/mario/background.png" alt="background" className="background-img" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }} />
      {/* Ground */}
      {renderGround()}
      {/* Level objects */}
      {renderLevelObjects()}
      {/* Mario */}
      <img
        src={marioSprite}
        alt="Mario"
        className={`mario-sprite ${gameState.playerState}`}
        style={{ left: gameState.playerPosition + 100, bottom: 100, position: 'absolute', width: 48, height: 48, zIndex: 5 }}
      />
      {/* Question popup */}
      {gameState.currentLevel && gameState.playerPosition >= gameState.currentLevel.hurdlePosition - 100 && (
        <div className="question-popup">
          <h3>{gameState.currentLevel.question.question}</h3>
          <div className="options">
            {gameState.currentLevel.question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={gameState.playerState !== 'running'}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Game over screen */}
      {gameState.isGameOver && (
        <div className="game-over">
          <h2>Oops! Wrong Answer</h2>
          <button onClick={retryLevel}>Try Again</button>
        </div>
      )}
      {/* Level info */}
      <div className="level-info">
        <div>Level: {currentLevelIndex + 1}</div>
        <div>Time: {gameState.remainingTime}s</div>
        <div>Coins: {gameState.collectedCoins}</div>
      </div>
    </div>
  );
};

export default MarioGame; 