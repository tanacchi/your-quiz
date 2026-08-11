import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TagFilter } from "./TagFilter";

const meta = {
  title: "Organisms/TagFilter",
  component: TagFilter,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "タグの横スクロールフィルター。selected に一致するタグのみ選択状態で表示する（選択操作はコンポーネントの外側で行う）。",
      },
    },
  },
  args: {
    tags: ["数学", "図形", "歴史", "地理"],
  },
} satisfies Meta<typeof TagFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSelected: Story = {
  args: { selected: "図形" },
};

export const ManyTags: Story = {
  args: {
    tags: [
      "数学",
      "図形",
      "歴史",
      "地理",
      "理科",
      "化学",
      "物理",
      "生物",
      "英語",
      "国語",
      "一般常識",
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "タグ数が多い場合に横スクロール（overflow-x-auto）することを確認する。",
      },
    },
  },
};
