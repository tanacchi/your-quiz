import { render, screen } from "@testing-library/react";
import { StatItem } from "./StatItem";

describe("StatItem", () => {
  it("ラベルと値を描画する", () => {
    render(<StatItem label="正答率" value="72%" />);
    expect(screen.getByText("正答率")).toBeInTheDocument();
    expect(screen.getByText("72%")).toBeInTheDocument();
  });

  it("数値を描画する", () => {
    render(<StatItem label="解答数" value={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
