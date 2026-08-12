import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppHeader } from "./AppHeader";

const meta = {
  title: "Organisms/AppHeader",
  component: AppHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "アプリ共通ヘッダー。props は持たず、ロゴ・アプリ名・マイページへのリンクを表示する。",
      },
    },
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
