import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon, type IconName } from "./Icon";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "アプリ内で使用するインライン SVG アイコン集。stroke は color prop で制御する（fill は使わない）。",
      },
    },
  },
  args: {
    name: "play",
    title: "解くアイコン",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sized: Story = {
  args: { size: 48 },
};

export const Colored: Story = {
  args: { color: "#f5835c" },
};

const ALL_ICON_NAMES = [
  "create",
  "play",
  "user",
  "x-mark",
  "filter",
  "chevron-down",
  "explanation",
  "wifi-off",
  "offline-status",
] satisfies ReadonlyArray<IconName>;

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      {ALL_ICON_NAMES.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <Icon name={name} title={name} />
          <span style={{ fontSize: "10px", color: "#666" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
