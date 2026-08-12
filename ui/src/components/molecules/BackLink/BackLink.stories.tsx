import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BackLink } from "./BackLink";

const meta = {
  title: "Molecules/BackLink",
  component: BackLink,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "前の画面へ戻るためのテキストリンク。矢印記号はコンポーネント側で付与される。",
      },
    },
  },
  args: {
    href: "/quiz",
    label: "クイズ一覧に戻る",
  },
} satisfies Meta<typeof BackLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
