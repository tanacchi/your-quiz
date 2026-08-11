import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MobilePageTemplate } from "./MobilePageTemplate";

const meta = {
  title: "Templates/MobilePageTemplate",
  component: MobilePageTemplate,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "モバイル画面の共通コンテナ。title を渡すと見出しを表示し、省略すると見出しなしで children のみを表示する。",
      },
    },
  },
  args: {
    children: <p>ページ本文がここに入ります</p>,
  },
} satisfies Meta<typeof MobilePageTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "クイズ一覧" },
};

// title を明示的に undefined にはせず、そもそも渡さないことで
// exactOptionalPropertyTypes の制約下でも見出し非表示ケースを表現する。
export const WithoutTitle: Story = {};
