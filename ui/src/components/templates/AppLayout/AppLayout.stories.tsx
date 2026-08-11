import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppLayout } from "./AppLayout";

const meta = {
  title: "Templates/AppLayout",
  component: AppLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "AppHeader・TabBar・フッターを含むアプリ全体のシェル。ui/src/app/layout.tsx から実際に利用されているテンプレート。",
      },
    },
  },
  args: {
    children: (
      <div style={{ padding: "1rem" }}>ページコンテンツがここに入ります</div>
    ),
  },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
