import { render, screen } from "@testing-library/react";
import { AppLayout } from "./AppLayout";

describe("AppLayout", () => {
  it("AppHeader・TabBar・children を描画する", () => {
    render(
      <AppLayout>
        <p>コンテンツ</p>
      </AppLayout>,
    );
    expect(screen.getByText("QuizPocket")).toBeInTheDocument();
    expect(screen.getByText("コンテンツ")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "メインナビゲーション" }),
    ).toBeInTheDocument();
  });
});
