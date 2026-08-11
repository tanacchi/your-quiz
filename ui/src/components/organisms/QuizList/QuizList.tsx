import { QuizCard } from "@/components/molecules/QuizCard";
import type { Quiz } from "@/types/quiz";

interface QuizListProps {
  readonly quizzes: ReadonlyArray<Quiz>;
}

export function QuizList({ quizzes }: QuizListProps) {
  if (quizzes.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500 py-8">
        クイズが見つかりませんでした
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} href={`/quiz/${quiz.id}`} />
      ))}
    </div>
  );
}
