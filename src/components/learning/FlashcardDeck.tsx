import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGameProgress } from '@/contexts/GameProgressContext';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

interface FlashcardDeckProps {
  topic: string;
  flashcards: Flashcard[];
}

export function FlashcardDeck({ topic, flashcards }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [confidence, setConfidence] = useState<number[]>(flashcards.map(() => 0));
  const { gameProgress, completeFlashcardSet, addXp } = useGameProgress();

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;
  const averageConfidence = confidence.reduce((sum, val) => sum + val, 0) / confidence.length;
  
  // Calculate mastery based on progress and average confidence
  const mastery = Math.round((progress * 0.4) + (averageConfidence * 0.6));
  
  // Check if this set exists in game progress
  const flashcardSetId = `${topic.toLowerCase().replace(/\s+/g, '-')}`;
  const isSetCompleted = gameProgress.flashcardSets[flashcardSetId]?.isCompleted || false;

  function flipCard() {
    setShowAnswer(!showAnswer);
  }

  function handleConfidenceRating(rating: number) {
    // Update confidence for current card
    const newConfidence = [...confidence];
    newConfidence[currentIndex] = rating;
    setConfidence(newConfidence);
    
    // Add some XP based on confidence
    if (rating >= 3) {
      addXp(rating);
    }
    
    // Move to next card
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      // Complete the set if average confidence is good
      if (averageConfidence >= 3) {
        completeFlashcardSet(flashcardSetId);
      }
    }
  }

  function resetDeck() {
    setCurrentIndex(0);
    setShowAnswer(false);
    setConfidence(flashcards.map(() => 0));
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Flashcards: {topic}</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between text-sm">
            <span>Mastery</span>
            <span>{mastery}%</span>
          </div>
          <Progress value={mastery} className="h-2 bg-gray-100">
            <div 
              className="h-full transition-all bg-gradient-to-r from-yellow-500 to-green-500" 
              style={{ width: `${mastery}%` }}
            />
          </Progress>
        </div>
      </div>
      
      <Card className="w-full h-64 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300" onClick={flipCard}>
        <div className="absolute top-2 right-2 text-xs bg-gray-100 px-2 py-1 rounded-full">
          {currentIndex + 1}/{flashcards.length}
        </div>
        
        <div className="flex-1 flex items-center justify-center text-center p-4">
          {showAnswer ? (
            <p className="font-medium text-lg">{currentCard.answer}</p>
          ) : (
            <p className="text-lg">{currentCard.question}</p>
          )}
        </div>
        
        <div className="text-center text-sm text-gray-500">
          {showAnswer ? "Answer" : "Question"} (tap to flip)
        </div>
      </Card>
      
      {showAnswer && (
        <div className="mt-4">
          <p className="text-sm mb-2 text-center">How well did you know this?</p>
          <div className="flex justify-between gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-red-50 hover:bg-red-100"
              onClick={() => handleConfidenceRating(1)}
            >
              Not at all
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-yellow-50 hover:bg-yellow-100"
              onClick={() => handleConfidenceRating(3)}
            >
              Somewhat
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-green-50 hover:bg-green-100"
              onClick={() => handleConfidenceRating(5)}
            >
              Perfectly
            </Button>
          </div>
        </div>
      )}
      
      {currentIndex === flashcards.length - 1 && showAnswer && (
        <div className="mt-4 flex justify-center">
          <Button onClick={resetDeck}>
            Start Over
          </Button>
        </div>
      )}
      
      {isSetCompleted && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          You've mastered this flashcard set! +25 XP earned
        </div>
      )}
    </div>
  );
} 