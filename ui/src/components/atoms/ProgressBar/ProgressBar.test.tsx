import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("進捗テキストを描画する", () => {
    render(<ProgressBar current={2} total={5} />);
    expect(screen.getByText("2/5問完了")).toBeInTheDocument();
  });

  it("progressbar ロールを持つ", () => {
    render(<ProgressBar current={1} total={10} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("aria-valuenow と aria-valuemax が正しい", () => {
    render(<ProgressBar current={3} total={10} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "3");
    expect(bar).toHaveAttribute("aria-valuemax", "10");
  });
});
