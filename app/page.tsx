// app/page.tsx
import { FlashcardQuiz } from '@/components/flashcard-quiz';

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Flashcard Quiz</h1>
      <FlashcardQuiz />
    </main>
  );
}