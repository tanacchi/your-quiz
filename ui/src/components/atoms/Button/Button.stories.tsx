import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "アプリ全体で使用する基本ボタン。variant と size の組み合わせで表現する。",
      },
    },
  },
  args: {
    children: "クイズを開始",
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: "padded" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
