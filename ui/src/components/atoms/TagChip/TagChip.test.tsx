import { render, screen } from "@testing-library/react";
import { TagChip } from "./TagChip";

describe("TagChip", () => {
  it("ラベルを # 付きで描画する", () => {
    render(<TagChip label="数学" />);
    expect(screen.getByText("#数学")).toBeInTheDocument();
  });

  it("未選択状態は base-light 背景を持つ", () => {
    render(<TagChip label="歴史" selected={false} />);
    expect(screen.getByText("#歴史")).toHaveClass("bg-base-light");
  });

  it("選択状態は bg-base クラスを持つ", () => {
    render(<TagChip label="英語" selected />);
    expect(screen.getByText("#英語")).toHaveClass("bg-base");
  });
});
