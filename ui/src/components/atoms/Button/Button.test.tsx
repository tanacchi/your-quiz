import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("ラベルを描画する", () => {
    render(<Button>送信</Button>);
    expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument();
  });

  it("primary バリアントはオレンジ背景クラスを持つ", () => {
    render(<Button variant="primary">送信</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-base");
  });

  it("secondary バリアントはボーダークラスを持つ", () => {
    render(<Button variant="secondary">キャンセル</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-base");
  });

  it("disabled 状態が反映される", () => {
    render(<Button disabled>送信</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("fullWidth が true のとき w-full クラスを持つ", () => {
    render(<Button fullWidth>送信</Button>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });
});
