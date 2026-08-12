import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "クイズの解答状況やオフライン可否を表すバッジ。children を省略すると variant の文字列がそのまま表示される。",
      },
    },
  },
  args: {
    variant: "未解答",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Answered: Story = {
  args: { variant: "解答済み" },
};

export const NeedsReview: Story = {
  args: { variant: "復習が必要" },
};

export const Offline: Story = {
  args: { variant: "オフライン" },
};

export const WithChildren: Story = {
  args: { variant: "解答済み", children: "正解！" },
};
