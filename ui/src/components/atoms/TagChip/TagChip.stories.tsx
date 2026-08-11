import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TagChip } from "./TagChip";

const meta = {
  title: "Atoms/TagChip",
  component: TagChip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "クイズのタグを表す小さなチップ。selected で強調表示を切り替える。",
      },
    },
  },
  args: {
    label: "数学",
  },
} satisfies Meta<typeof TagChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};
