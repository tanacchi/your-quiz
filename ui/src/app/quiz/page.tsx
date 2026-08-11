import { QuizList } from "@/components/organisms/QuizList";
import { TagFilter } from "@/components/organisms/TagFilter";
import { MobilePageTemplate } from "@/components/templates/MobilePageTemplate";
import type { Quiz } from "@/types/quiz";

const MOCK_TAGS = ["数学", "歴史", "英語", "理科", "雑学"] as const;

const MOCK_QUIZZES: ReadonlyArray<Quiz> = [
  {
    id: "1",
    question:
      "図形の内角の和について、以下の問いに答えなさい。五角形の内角の和は何度ですか？",
    answerType: "single_choice",
    status: "未解答",
    tags: ["数学", "図形"],
    hasExplanation: true,
  },
  {
    id: "2",
    question: "鎌倉幕府が成立した年を答えなさい。",
    answerType: "single_choice",
    status: "解答済み",
    tags: ["歴史"],
    hasExplanation: false,
  },
  {
    id: "3",
    question: "水の三態変化について説明しなさい。",
    answerType: "free_text",
    status: "復習が必要",
    tags: ["理科"],
    hasExplanation: true,
  },
  {
    id: "4",
    question: "This is a pen. の意味を日本語で答えなさい。",
    answerType: "free_text",
    status: "未解答",
    tags: ["英語"],
    hasExplanation: true,
    isOfflineAvailable: true,
  },
] as const;

export default function QuizListPage() {
  return (
    <MobilePageTemplate>
      <section className="mb-4">
        <TagFilter tags={[...MOCK_TAGS]} />
      </section>
      <QuizList quizzes={MOCK_QUIZZES} />
    </MobilePageTemplate>
  );
}
