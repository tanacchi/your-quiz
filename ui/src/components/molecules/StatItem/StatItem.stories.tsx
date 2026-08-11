import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatItem } from "./StatItem";

const meta = {
  title: "Molecules/StatItem",
  component: StatItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "マイページ等で使う統計値の表示。value は数値・文字列のどちらも受け付ける。",
      },
    },
  },
  args: {
    label: "正答率",
    value: 82,
  },
} satisfies Meta<typeof StatItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const StringValue: Story = {
  args: { label: "ランク", value: "ゴールド" },
};
