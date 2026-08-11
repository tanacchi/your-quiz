import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("未解答バリアントを描画する", () => {
    render(<Badge variant="未解答" />);
    expect(screen.getByText("未解答")).toBeInTheDocument();
  });

  it("解答済みバリアントを描画する", () => {
    render(<Badge variant="解答済み" />);
    expect(screen.getByText("解答済み")).toBeInTheDocument();
  });

  it("復習が必要バリアントは wrong カラークラスを持つ", () => {
    render(<Badge variant="復習が必要" />);
    expect(screen.getByText("復習が必要")).toHaveClass("text-wrong");
  });

  it("children を指定すると label が上書きされる", () => {
    render(<Badge variant="未解答">カスタムラベル</Badge>);
    expect(screen.getByText("カスタムラベル")).toBeInTheDocument();
  });
});
