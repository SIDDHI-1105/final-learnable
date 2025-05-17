import React, { createContext, useContext, useState, useEffect } from "react";

interface Mission {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: number;
  xpReward: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
}

interface FlashcardSet {
  id: string;
  topic: string;
  mastery: number;
  isCompleted: boolean;
}

interface GameProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  unlockedMissions: string[];
  completedMissions: string[];
  flashcardSets: Record<string, FlashcardSet>;
}

interface GameProgressContextType {
  gameProgress: GameProgress;
  completeFlashcardSet: (setId: string) => void;
  completeMission: (missionId: string, earnedXp: number) => void;
  getMissionStatus: (missionId: string) => { isUnlocked: boolean; isCompleted: boolean };
  addXp: (amount: number) => void;
  resetProgress: () => void;
}

const defaultGameProgress: GameProgress = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  unlockedMissions: [],
  completedMissions: [],
  flashcardSets: {},
};

const calculateXpToNextLevel = (level: number) => {
  // Simple formula: each level requires more XP than the previous
  return 100 * level;
};

const GameProgressContext = createContext<GameProgressContextType | undefined>(undefined);

export const GameProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameProgress, setGameProgress] = useState<GameProgress>(defaultGameProgress);

  // Load game progress from localStorage on component mount
  useEffect(() => {
    const storedProgress = localStorage.getItem("gameProgress");
    if (storedProgress) {
      setGameProgress(JSON.parse(storedProgress));
    }
  }, []);

  // Save game progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("gameProgress", JSON.stringify(gameProgress));
  }, [gameProgress]);

  const addXp = (amount: number) => {
    setGameProgress(prev => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newXpToNextLevel = prev.xpToNextLevel;

      // Check if user leveled up
      if (newXp >= prev.xpToNextLevel) {
        newLevel += 1;
        newXpToNextLevel = calculateXpToNextLevel(newLevel);
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: newXpToNextLevel
      };
    });
  };

  const completeFlashcardSet = (setId: string) => {
    setGameProgress(prev => {
      const updatedFlashcardSets = {
        ...prev.flashcardSets,
        [setId]: {
          ...prev.flashcardSets[setId],
          isCompleted: true,
          mastery: 100
        }
      };

      return {
        ...prev,
        flashcardSets: updatedFlashcardSets
      };
    });

    // Add XP for completing flashcard set
    addXp(25);
  };

  const completeMission = (missionId: string, earnedXp: number) => {
    setGameProgress(prev => {
      // Add to completed missions if not already there
      if (!prev.completedMissions.includes(missionId)) {
        return {
          ...prev,
          completedMissions: [...prev.completedMissions, missionId]
        };
      }
      return prev;
    });

    // Add XP earned from the mission
    addXp(earnedXp);
  };

  const getMissionStatus = (missionId: string) => {
    return {
      isUnlocked: gameProgress.unlockedMissions.includes(missionId),
      isCompleted: gameProgress.completedMissions.includes(missionId)
    };
  };

  const resetProgress = () => {
    setGameProgress(defaultGameProgress);
    localStorage.removeItem("gameProgress");
  };

  return (
    <GameProgressContext.Provider value={{
      gameProgress,
      completeFlashcardSet,
      completeMission,
      getMissionStatus,
      addXp,
      resetProgress
    }}>
      {children}
    </GameProgressContext.Provider>
  );
};

export const useGameProgress = (): GameProgressContextType => {
  const context = useContext(GameProgressContext);
  if (context === undefined) {
    throw new Error("useGameProgress must be used within a GameProgressProvider");
  }
  return context;
}; 