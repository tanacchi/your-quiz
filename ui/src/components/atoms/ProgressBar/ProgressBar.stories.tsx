import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "クイズの進捗を表すプログレスバー。total が 0 の場合はゼロ除算を避けて 0% を表示する。",
      },
    },
  },
  args: {
    current: 3,
    total: 10,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NotStarted: Story = {
  args: { current: 0, total: 10 },
};

export const Completed: Story = {
  args: { current: 10, total: 10 },
};

export const ZeroTotal: Story = {
  args: { current: 0, total: 0 },
  parameters: {
    docs: {
      description: {
        story: "total が 0 のときにゼロ除算にならないことを確認するケース。",
      },
    },
  },
};
