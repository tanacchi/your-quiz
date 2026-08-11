import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Quiz } from "@/types/quiz";
import { QuizCard } from "./QuizCard";

const meta = {
  title: "Molecules/QuizCard",
  component: QuizCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "クイズ一覧に表示するカード。status によって枠線・背景が変化し、tags・解説有無・オフライン可否を表示する。",
      },
    },
  },
} satisfies Meta<typeof QuizCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseQuiz: Quiz = {
  id: "1",
  question: "五角形の内角の和は何度？",
  answerType: "boolean",
  status: "未解答",
  tags: ["数学", "図形"],
  hasExplanation: true,
};

export const Default: Story = {
  args: { quiz: baseQuiz, href: "/quiz/1" },
};

export const Answered: Story = {
  args: {
    quiz: { ...baseQuiz, status: "解答済み" },
    href: "/quiz/1",
  },
};

export const NeedsReview: Story = {
  args: {
    quiz: { ...baseQuiz, status: "復習が必要" },
    href: "/quiz/1",
  },
};

export const NoExplanation: Story = {
  args: {
    quiz: { ...baseQuiz, hasExplanation: false },
    href: "/quiz/1",
  },
};

export const OfflineAvailable: Story = {
  args: {
    quiz: { ...baseQuiz, isOfflineAvailable: true },
    href: "/quiz/1",
  },
};

export const LongQuestion: Story = {
  args: {
    quiz: {
      ...baseQuiz,
      question:
        "次のうち、正しい記述をすべて選びなさい。三角形の内角の和は180度であり、四角形の内角の和は360度である。五角形以降は (n-2) × 180度で計算できる。",
    },
    href: "/quiz/1",
  },
  parameters: {
    docs: {
      description: {
        story:
          "問題文が3行を超える場合に line-clamp-3 で省略されることを確認する。",
      },
    },
  },
};
