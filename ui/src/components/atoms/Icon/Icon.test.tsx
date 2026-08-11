import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("title が SVG に描画される", () => {
    render(<Icon name="create" title="作るアイコン" />);
    expect(screen.getByTitle("作るアイコン")).toBeInTheDocument();
  });

  it("各アイコン名でエラーなく描画される", () => {
    const icons = [
      "create",
      "play",
      "user",
      "x-mark",
      "filter",
      "chevron-down",
      "explanation",
      "wifi-off",
      "offline-status",
    ] as const;
    for (const name of icons) {
      const { unmount } = render(
        <Icon name={name} title={`${name}アイコン`} />,
      );
      expect(screen.getByTitle(`${name}アイコン`)).toBeInTheDocument();
      unmount();
    }
  });
});
