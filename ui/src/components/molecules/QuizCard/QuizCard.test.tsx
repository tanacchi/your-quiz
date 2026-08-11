import { render, screen } from "@testing-library/react";
import type { Quiz } from "@/types/quiz";
import { QuizCard } from "./QuizCard";

const baseQuiz: Quiz = {
  id: "1",
  question: "五角形の内角の和は何度？",
  answerType: "boolean",
  status: "未解答",
  tags: ["数学", "図形"],
  hasExplanation: true,
};

describe("QuizCard", () => {
  it("問題文を描画する", () => {
    render(<QuizCard quiz={baseQuiz} href="/quiz/1" />);
    expect(screen.getByText("五角形の内角の和は何度？")).toBeInTheDocument();
  });

  it("タグを描画する", () => {
    render(<QuizCard quiz={baseQuiz} href="/quiz/1" />);
    expect(screen.getByText("#数学")).toBeInTheDocument();
    expect(screen.getByText("#図形")).toBeInTheDocument();
  });

  it("ステータスバッジを描画する", () => {
    render(<QuizCard quiz={baseQuiz} href="/quiz/1" />);
    expect(screen.getByText("未解答")).toBeInTheDocument();
  });

  it("オフライン利用可の場合オフラインバッジを表示する", () => {
    const quiz = { ...baseQuiz, isOfflineAvailable: true };
    render(<QuizCard quiz={quiz} href="/quiz/1" />);
    expect(screen.getByText("オフライン")).toBeInTheDocument();
  });

  it("オフライン利用不可の場合オフラインバッジを表示しない", () => {
    render(<QuizCard quiz={baseQuiz} href="/quiz/1" />);
    expect(screen.queryByText("オフライン")).not.toBeInTheDocument();
  });

  it("指定 href にリンクする", () => {
    render(<QuizCard quiz={baseQuiz} href="/quiz/abc" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/quiz/abc");
  });
});
