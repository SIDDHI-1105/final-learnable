import { Flashcard } from "@/components/learning/FlashcardDeck";

// Sample flashcard data for frontend development
const frontendFlashcards: Record<string, Flashcard[]> = {
  "html-basics": [
    {
      id: "html-1",
      question: "What does HTML stand for?",
      answer: "HyperText Markup Language",
      topic: "HTML Basics"
    },
    {
      id: "html-2",
      question: "What tag is used to create a hyperlink?",
      answer: "<a> tag with href attribute",
      topic: "HTML Basics"
    },
    {
      id: "html-3",
      question: "What is the purpose of the <head> element?",
      answer: "Contains metadata about the document not displayed on the page",
      topic: "HTML Basics"
    },
    {
      id: "html-4",
      question: "What is semantic HTML?",
      answer: "HTML that uses tags that clearly describe their meaning (e.g., <article>, <nav>, <header>)",
      topic: "HTML Basics"
    },
    {
      id: "html-5",
      question: "What is the difference between <div> and <span>?",
      answer: "<div> is a block-level element, while <span> is an inline element",
      topic: "HTML Basics"
    }
  ],
  "css-fundamentals": [
    {
      id: "css-1",
      question: "What does CSS stand for?",
      answer: "Cascading Style Sheets",
      topic: "CSS Fundamentals"
    },
    {
      id: "css-2",
      question: "What is the box model in CSS?",
      answer: "A layout concept that treats elements as boxes with content, padding, border, and margin",
      topic: "CSS Fundamentals"
    },
    {
      id: "css-3",
      question: "What is the difference between margin and padding?",
      answer: "Margin is space outside the element's border, padding is space inside the border",
      topic: "CSS Fundamentals"
    },
    {
      id: "css-4",
      question: "What are the three ways to add CSS to HTML?",
      answer: "Inline styles, internal stylesheet (<style> tag), and external stylesheet (link to .css file)",
      topic: "CSS Fundamentals"
    },
    {
      id: "css-5",
      question: "What does the 'C' in CSS represent and why is it important?",
      answer: "Cascading - it determines how styles are applied and which styles take precedence",
      topic: "CSS Fundamentals"
    }
  ],
  "javascript-core": [
    {
      id: "js-1",
      question: "What is the difference between let, const, and var?",
      answer: "var is function-scoped, let and const are block-scoped. const cannot be reassigned.",
      topic: "JavaScript Core"
    },
    {
      id: "js-2",
      question: "What is a closure in JavaScript?",
      answer: "A function that remembers its outer variables and can access them",
      topic: "JavaScript Core"
    },
    {
      id: "js-3",
      question: "What is the event loop?",
      answer: "A mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded",
      topic: "JavaScript Core"
    },
    {
      id: "js-4", 
      question: "What is the difference between == and ===?",
      answer: "== compares with type coercion, === compares without type coercion (strict equality)",
      topic: "JavaScript Core"
    },
    {
      id: "js-5",
      question: "What are promises used for?",
      answer: "To handle asynchronous operations with cleaner syntax than callbacks",
      topic: "JavaScript Core"
    }
  ],
  "react-fundamentals": [
    {
      id: "react-1",
      question: "What is JSX?",
      answer: "A syntax extension for JavaScript that looks similar to HTML and makes it easier to write React components",
      topic: "React Fundamentals"
    },
    {
      id: "react-2",
      question: "What is a component in React?",
      answer: "A reusable piece of UI that can contain its own logic and presentation",
      topic: "React Fundamentals"
    },
    {
      id: "react-3",
      question: "What are props in React?",
      answer: "Properties passed to components to configure their behavior or appearance",
      topic: "React Fundamentals"
    },
    {
      id: "react-4",
      question: "What is state in React?",
      answer: "Internal data storage for components that can change over time",
      topic: "React Fundamentals"
    },
    {
      id: "react-5",
      question: "What is the virtual DOM?",
      answer: "A lightweight copy of the real DOM that React uses to optimize rendering performance",
      topic: "React Fundamentals"
    }
  ],
  "typescript-basics": [
    {
      id: "ts-1",
      question: "What is TypeScript?",
      answer: "A strongly typed superset of JavaScript that compiles to plain JavaScript",
      topic: "TypeScript Basics"
    },
    {
      id: "ts-2",
      question: "What are the basic types in TypeScript?",
      answer: "string, number, boolean, array, tuple, enum, any, void, null, undefined, never, object",
      topic: "TypeScript Basics"
    },
    {
      id: "ts-3",
      question: "What is an interface in TypeScript?",
      answer: "A way to define the shape of an object or a contract within your code",
      topic: "TypeScript Basics"
    },
    {
      id: "ts-4",
      question: "What is type inference in TypeScript?",
      answer: "TypeScript's ability to automatically determine types without explicit annotations",
      topic: "TypeScript Basics"
    },
    {
      id: "ts-5",
      question: "What are generics in TypeScript?",
      answer: "A way to create reusable components that work with a variety of types rather than a single one",
      topic: "TypeScript Basics"
    }
  ],
  "design-fundamentals": [
    {
      id: "design-1",
      question: "What is color theory?",
      answer: "The study of how colors interact and how they impact user perception and behavior",
      topic: "Design Fundamentals"
    },
    {
      id: "design-2",
      question: "What is the rule of thirds?",
      answer: "A composition guideline that divides an image into nine equal parts to create balance and interest",
      topic: "Design Fundamentals"
    },
    {
      id: "design-3",
      question: "What is typography?",
      answer: "The art and technique of arranging type to make written language legible, readable, and appealing",
      topic: "Design Fundamentals"
    },
    {
      id: "design-4",
      question: "What is white space in design?",
      answer: "The empty space between elements in a design that helps create hierarchy and improve readability",
      topic: "Design Fundamentals"
    },
    {
      id: "design-5",
      question: "What is a color palette?",
      answer: "A selected set of colors used consistently across a design to create harmony and coherence",
      topic: "Design Fundamentals"
    }
  ],
  "user-research": [
    {
      id: "ux-1",
      question: "What is a user persona?",
      answer: "A fictional representation of your ideal user based on research data and observations",
      topic: "User Research"
    },
    {
      id: "ux-2",
      question: "What is a user journey map?",
      answer: "A visual representation of the process a user goes through to accomplish a goal with your product",
      topic: "User Research"
    },
    {
      id: "ux-3",
      question: "What is a usability test?",
      answer: "A method to evaluate a product by testing it with representative users to identify issues",
      topic: "User Research"
    },
    {
      id: "ux-4",
      question: "What is A/B testing?",
      answer: "Comparing two versions of a webpage or app to determine which one performs better",
      topic: "User Research"
    },
    {
      id: "ux-5",
      question: "What is information architecture?",
      answer: "The structural design of shared information environments to help users find what they need",
      topic: "User Research"
    }
  ],
  "backend-development": [
    {
      id: "backend-1",
      question: "What is a RESTful API?",
      answer: "An API that follows the principles of Representational State Transfer (REST) architectural style",
      topic: "Backend Development"
    },
    {
      id: "backend-2",
      question: "What is middleware in web development?",
      answer: "Software that acts as a bridge between an operating system or database and applications",
      topic: "Backend Development"
    },
    {
      id: "backend-3",
      question: "What is serverless computing?",
      answer: "A cloud computing execution model where the cloud provider runs the server and dynamically manages resource allocation",
      topic: "Backend Development"
    },
    {
      id: "backend-4",
      question: "What is database normalization?",
      answer: "The process of structuring a database to reduce data redundancy and improve data integrity",
      topic: "Backend Development"
    },
    {
      id: "backend-5",
      question: "What is the difference between SQL and NoSQL databases?",
      answer: "SQL databases are relational and use structured query language, while NoSQL databases are non-relational and more flexible with schema",
      topic: "Backend Development"
    }
  ]
};

// Map topic keywords to flashcard sets
const topicToFlashcardMap: Record<string, string> = {
  "frontend": "html-basics",
  "web": "html-basics",
  "html": "html-basics",
  "css": "css-fundamentals",
  "javascript": "javascript-core",
  "js": "javascript-core",
  "react": "react-fundamentals",
  "typescript": "typescript-basics",
  "ts": "typescript-basics",
  "design": "design-fundamentals",
  "ui": "design-fundamentals",
  "ux": "user-research",
  "research": "user-research",
  "backend": "backend-development",
  "server": "backend-development",
  "api": "backend-development",
  "node": "backend-development"
};

/**
 * Generate flashcards based on a topic or keyword
 */
export function generateFlashcards(topic: string): { topic: string, cards: Flashcard[] } | null {
  // Normalize the topic
  const normalizedTopic = topic.toLowerCase().trim();
  
  // Try to find a direct match
  for (const [key, cards] of Object.entries(frontendFlashcards)) {
    if (normalizedTopic.includes(key.toLowerCase().replace('-', ' '))) {
      return { 
        topic: cards[0].topic,
        cards 
      };
    }
  }
  
  // Try to match using the mapping
  for (const [keyword, flashcardKey] of Object.entries(topicToFlashcardMap)) {
    if (normalizedTopic.includes(keyword)) {
      const cards = frontendFlashcards[flashcardKey];
      if (cards) {
        return { 
          topic: cards[0].topic,
          cards 
        };
      }
    }
  }
  
  // Default to HTML basics if no match found
  return {
    topic: "HTML Basics",
    cards: frontendFlashcards["html-basics"]
  };
}

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

/**
 * Get all available flashcard topics
 */
export function getAvailableFlashcardTopics(): string[] {
  return Object.values(frontendFlashcards).map(cards => cards[0].topic);
} 