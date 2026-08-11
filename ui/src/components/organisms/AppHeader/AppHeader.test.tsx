import { render, screen } from "@testing-library/react";
import { AppHeader } from "./AppHeader";

describe("AppHeader", () => {
  it("アプリ名を描画する", () => {
    render(<AppHeader />);
    expect(screen.getByText("QuizPocket")).toBeInTheDocument();
  });

  it("マイページへのリンクを持つ", () => {
    render(<AppHeader />);
    expect(screen.getByRole("link", { name: "マイページ" })).toHaveAttribute(
      "href",
      "/mypage",
    );
  });
});
