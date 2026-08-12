import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Quiz } from "@/types/quiz";
import { QuizList } from "./QuizList";

const meta = {
  title: "Organisms/QuizList",
  component: QuizList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "QuizCard を縦に並べる一覧。quizzes が空のときは案内文を表示する。",
      },
    },
  },
} satisfies Meta<typeof QuizList>;

export default meta;
type Story = StoryObj<typeof meta>;

const makeQuiz = (
  id: string,
  question: string,
  status: Quiz["status"] = "未解答",
): Quiz => ({
  id,
  question,
  answerType: "boolean",
  status,
  tags: [],
  hasExplanation: false,
});

export const Default: Story = {
  args: {
    quizzes: [makeQuiz("1", "問題A"), makeQuiz("2", "問題B")],
  },
};

export const MixedStatuses: Story = {
  args: {
    quizzes: [
      makeQuiz("1", "未解答の問題", "未解答"),
      makeQuiz("2", "解答済みの問題", "解答済み"),
      makeQuiz("3", "復習が必要な問題", "復習が必要"),
    ],
  },
};

export const Empty: Story = {
  args: { quizzes: [] },
};
