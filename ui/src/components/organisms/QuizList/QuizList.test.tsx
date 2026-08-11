import { render, screen } from "@testing-library/react";
import type { Quiz } from "@/types/quiz";
import { QuizList } from "./QuizList";

const makeQuiz = (id: string, question: string): Quiz => ({
  id,
  question,
  answerType: "boolean",
  status: "未解答",
  tags: [],
  hasExplanation: false,
});

describe("QuizList", () => {
  it("複数のクイズカードを描画する", () => {
    const quizzes = [makeQuiz("1", "問題A"), makeQuiz("2", "問題B")];
    render(<QuizList quizzes={quizzes} />);
    expect(screen.getByText("問題A")).toBeInTheDocument();
    expect(screen.getByText("問題B")).toBeInTheDocument();
  });

  it("空のとき「見つかりませんでした」を表示する", () => {
    render(<QuizList quizzes={[]} />);
    expect(
      screen.getByText("クイズが見つかりませんでした"),
    ).toBeInTheDocument();
  });
});
