// data/flashcards.ts
export interface Flashcard {
    id: number;
    term: string;
    description: string;
    type: 'text' | 'image';
  }
  
  export const defaultFlashcards: Flashcard[] = [
    {
      id: 1,
      term: "React",
      description: "A JavaScript library for building user interfaces",
      type: "text"
    },
    {
      id: 2,
      term: "/api/placeholder/300/200",
      description: "This is a sample image card - you can replace with real images",
      type: "image"
    },
    {
      id: 3,
      term: "JavaScript",
      description: "A programming language that enables interactive web pages",
      type: "text"
    },
    {
      id: 4,
      term: "HTML",
      description: "HyperText Markup Language - the standard markup language for web pages",
      type: "text"
    }
  ];