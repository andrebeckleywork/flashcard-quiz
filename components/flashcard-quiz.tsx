// components/flashcard-quiz.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shuffle } from 'lucide-react';
import { Flashcard, defaultFlashcards } from '@/data/flashcards';

export const FlashcardQuiz = () => {
  const [cards, setCards] = useState<Flashcard[]>(defaultFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(0);

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  useEffect(() => {
    setProgress(((currentIndex + 1) / cards.length) * 100);
  }, [currentIndex, cards.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
      if (e.key === ' ') setIsFlipped(!isFlipped);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, isFlipped]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">
          Card {currentIndex + 1} of {cards.length}
        </div>
        <Button
          onClick={shuffleCards}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Shuffle className="w-4 h-4" />
          Shuffle
        </Button>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Card 
        className="min-h-[300px] cursor-pointer mb-4"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <CardContent className="p-6 flex items-center justify-center min-h-[300px]">
          <div className={`transform transition-all duration-300 ${isFlipped ? 'scale-0' : 'scale-100'}`}>
            {cards[currentIndex].type === 'image' ? (
              <img
                src={cards[currentIndex].term}
                alt="Flashcard"
                className="max-h-[250px] object-contain"
              />
            ) : (
              <h2 className="text-2xl font-bold text-center">{cards[currentIndex].term}</h2>
            )}
          </div>
          <div className={`absolute transform transition-all duration-300 ${isFlipped ? 'scale-100' : 'scale-0'}`}>
            <p className="text-lg text-center">{cards[currentIndex].description}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="w-1/2"
        >
          Previous
        </Button>
        <Button
          onClick={nextCard}
          disabled={currentIndex === cards.length - 1}
          className="w-1/2"
        >
          Next
        </Button>
      </div>
    </div>
  );
};