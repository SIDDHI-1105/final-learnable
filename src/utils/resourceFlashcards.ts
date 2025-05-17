import { Flashcard } from "@/components/learning/FlashcardDeck";
import { generateFlashcards } from "./flashcardGenerator";

/**
 * Generate flashcards based on roadmap resources
 */
export function generateFlashcardsFromResources(
  milestoneTitle: string, 
  resources: Array<{ title: string, type: string, url: string }>
): { topic: string, cards: Flashcard[] } {
  // First try to match based on milestone title
  const baseFlashcards = generateFlashcards(milestoneTitle);
  const generatedCards: Flashcard[] = [];
  
  // Generate specific flashcards based on resource titles
  resources.forEach((resource, index) => {
    // Create a unique ID for this resource-based flashcard
    const id = `resource-${Date.now()}-${index}`;
    
    // Different types of questions based on resource type
    if (resource.type === 'article') {
      generatedCards.push({
        id: `${id}-1`,
        question: `What are the key concepts covered in "${resource.title}"?`,
        answer: `Review the article "${resource.title}" to understand its key concepts. After reading, try summarizing the main points in your own words.`,
        topic: milestoneTitle
      });
      
      generatedCards.push({
        id: `${id}-2`,
        question: `How would you apply the concepts from "${resource.title}" in a real project?`,
        answer: `Think about practical applications of the concepts from "${resource.title}". Consider creating a small project that demonstrates these principles.`,
        topic: milestoneTitle
      });
    } 
    else if (resource.type === 'video') {
      generatedCards.push({
        id: `${id}-1`,
        question: `Summarize the main points covered in the "${resource.title}" video`,
        answer: `Watch the "${resource.title}" video and take notes on key concepts. Try explaining these concepts to someone else to reinforce your understanding.`,
        topic: milestoneTitle
      });
      
      generatedCards.push({
        id: `${id}-2`,
        question: `What practical examples were demonstrated in "${resource.title}"?`,
        answer: `Identify the examples shown in "${resource.title}" and try to recreate them on your own to build practical skills.`,
        topic: milestoneTitle
      });
    }
    else if (resource.type === 'documentation') {
      generatedCards.push({
        id: `${id}-1`,
        question: `What are the core features described in "${resource.title}"?`,
        answer: `Study "${resource.title}" documentation and identify the main features. Practice implementing these features in your own code.`,
        topic: milestoneTitle
      });
      
      generatedCards.push({
        id: `${id}-2`,
        question: `How would you use "${resource.title}" in your development workflow?`,
        answer: `Consider how "${resource.title}" fits into your development process. Think about when and how you would use these tools or techniques.`,
        topic: milestoneTitle
      });
    }
  });
  
  // Combine resource-specific cards with general topic cards
  const combinedCards = [...generatedCards];
  
  // Add some of the general cards if we don't have enough resource-specific ones
  if (combinedCards.length < 5 && baseFlashcards) {
    // Add general flashcards to reach at least 5 cards
    const remainingCount = 5 - combinedCards.length;
    combinedCards.push(...baseFlashcards.cards.slice(0, remainingCount));
  }
  
  return {
    topic: milestoneTitle,
    cards: combinedCards
  };
} 