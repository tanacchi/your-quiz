import { render, screen } from "@testing-library/react";
import { BackLink } from "./BackLink";

describe("BackLink", () => {
  it("ラベルを描画する", () => {
    render(<BackLink href="/" label="ホーム" />);
    expect(screen.getByRole("link")).toHaveTextContent("ホーム");
  });

  it("href を持つ", () => {
    render(<BackLink href="/mypage" label="マイページ" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/mypage");
  });
});
