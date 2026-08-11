import { render, screen } from "@testing-library/react";
import { TabBar } from "./TabBar";

describe("TabBar", () => {
  it("3つのナビリンクを描画する", () => {
    render(<TabBar />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("解くリンクが / を指す", () => {
    render(<TabBar />);
    expect(screen.getByText("解く").closest("a")).toHaveAttribute("href", "/");
  });

  it("作るリンクが /create を指す", () => {
    render(<TabBar />);
    expect(screen.getByText("作る").closest("a")).toHaveAttribute(
      "href",
      "/create",
    );
  });

  it("マイページリンクが /mypage を指す", () => {
    render(<TabBar />);
    expect(screen.getByText("マイページ").closest("a")).toHaveAttribute(
      "href",
      "/mypage",
    );
  });
});
