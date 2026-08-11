describe("テスト環境の疎通確認", () => {
  it("vitest が正常に動作する", () => {
    expect(1 + 1).toBe(2);
  });

  it("jsdom 環境が有効", () => {
    const div = document.createElement("div");
    div.textContent = "QuizPocket";
    expect(div.textContent).toBe("QuizPocket");
  });
});
