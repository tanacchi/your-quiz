import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormField } from "./FormField";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ラベルと入力要素をまとめるフォームフィールド。children には id が htmlFor と一致する入力要素を渡す。",
      },
    },
  },
  args: {
    label: "クイズタイトル",
    htmlFor: "quiz-title",
    children: (
      // biome-ignore lint/correctness/useUniqueElementIds: story ごとに1インスタンスのみ描画されるため固定IDで問題ない
      <input
        id="quiz-title"
        type="text"
        className="border border-gray-300 rounded px-2 py-1"
      />
    ),
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Optional: Story = {
  args: { optional: true },
};

export const WithTextarea: Story = {
  args: {
    label: "説明",
    htmlFor: "quiz-description",
    children: (
      // biome-ignore lint/correctness/useUniqueElementIds: story ごとに1インスタンスのみ描画されるため固定IDで問題ない
      <textarea
        id="quiz-description"
        rows={3}
        className="border border-gray-300 rounded px-2 py-1"
      />
    ),
  },
};
