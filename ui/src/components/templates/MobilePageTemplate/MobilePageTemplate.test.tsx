import { render, screen } from "@testing-library/react";
import { MobilePageTemplate } from "./MobilePageTemplate";

describe("MobilePageTemplate", () => {
  it("title と children を描画する", () => {
    render(
      <MobilePageTemplate title="テストページ">
        <p>内容</p>
      </MobilePageTemplate>,
    );
    expect(
      screen.getByRole("heading", { name: "テストページ" }),
    ).toBeInTheDocument();
    expect(screen.getByText("内容")).toBeInTheDocument();
  });

  it("title が未指定のときは見出しを描画しない", () => {
    render(
      <MobilePageTemplate>
        <p>内容のみ</p>
      </MobilePageTemplate>,
    );
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("内容のみ")).toBeInTheDocument();
  });
});
