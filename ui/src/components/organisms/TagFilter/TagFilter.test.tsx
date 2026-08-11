import { render, screen } from "@testing-library/react";
import { TagFilter } from "./TagFilter";

describe("TagFilter", () => {
  it("タグ一覧を描画する", () => {
    render(<TagFilter tags={["数学", "歴史", "英語"]} />);
    expect(screen.getByText("#数学")).toBeInTheDocument();
    expect(screen.getByText("#歴史")).toBeInTheDocument();
    expect(screen.getByText("#英語")).toBeInTheDocument();
  });

  it("選択中タグに bg-base クラスが付く", () => {
    render(<TagFilter tags={["数学", "歴史"]} selected="数学" />);
    expect(screen.getByText("#数学")).toHaveClass("bg-base");
    expect(screen.getByText("#歴史")).not.toHaveClass("bg-base");
  });
});
