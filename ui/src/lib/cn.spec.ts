import { cn } from "./cn";

describe("cn", () => {
  describe("複数のクラス名を渡した場合", () => {
    it("スペース区切りで結合する", () => {
      expect(cn("a", "b", "c")).toBe("a b c");
    });
  });

  describe("falsy な値を含む場合", () => {
    it.each([
      ["undefined", undefined],
      ["null", null],
      ["false", false as const],
    ])("%s を除外する", (_label, value) => {
      expect(cn("a", value, "b")).toBe("a b");
    });
  });

  describe("引数が無い場合", () => {
    it("空文字を返す", () => {
      expect(cn()).toBe("");
    });
  });
});
