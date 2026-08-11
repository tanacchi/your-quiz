import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TabBar } from "./TabBar";

const meta = {
  title: "Organisms/TabBar",
  component: TabBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "画面下部固定のボトムナビゲーション。props は持たず、作る・解く・マイページの3タブを表示する。",
      },
    },
  },
} satisfies Meta<typeof TabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
