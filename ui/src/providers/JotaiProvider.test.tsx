import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { atom, useAtom } from "jotai";
import { JotaiProvider } from "./JotaiProvider";

const counterAtom = atom(0);

function Counter() {
  const [count, setCount] = useAtom(counterAtom);
  return (
    <button type="button" onClick={() => setCount((current) => current + 1)}>
      count: {count}
    </button>
  );
}

describe("JotaiProvider", () => {
  it("配下のコンポーネントで atom の読み書きができる", async () => {
    const user = userEvent.setup();
    render(
      <JotaiProvider>
        <Counter />
      </JotaiProvider>,
    );

    expect(screen.getByRole("button")).toHaveTextContent("count: 0");
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent("count: 1");
  });

  it("Provider インスタンスごとに独立したストアを持つ", async () => {
    const user = userEvent.setup();
    render(
      <>
        <JotaiProvider>
          <Counter />
        </JotaiProvider>
        <JotaiProvider>
          <Counter />
        </JotaiProvider>
      </>,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.map((button) => button.textContent)).toEqual([
      "count: 0",
      "count: 0",
    ]);

    const firstButton = buttons[0];
    if (firstButton == null) {
      throw new Error("最初のボタンが見つかりませんでした");
    }
    await user.click(firstButton);

    expect(
      screen.getAllByRole("button").map((button) => button.textContent),
    ).toEqual(["count: 1", "count: 0"]);
  });
});
