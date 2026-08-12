import type { z } from "zod";
import { toDbError } from "./errors";

function makeIssues(): ReadonlyArray<z.core.$ZodIssue> {
  return [
    {
      code: "invalid_type",
      expected: "string",
      path: [],
      message: "型が不正です",
    },
  ];
}

describe("toDbError", () => {
  describe("QuotaExceededError の場合", () => {
    it("QuotaExceeded に分類する", () => {
      const cause = new DOMException("容量超過", "QuotaExceededError");
      expect(toDbError(cause)).toEqual({ type: "QuotaExceeded", cause });
    });
  });

  describe("QuotaExceededError 以外の DOMException の場合", () => {
    it("TransactionFailed に分類する", () => {
      const cause = new DOMException("不明なエラー", "UnknownError");
      expect(toDbError(cause)).toEqual({ type: "TransactionFailed", cause });
    });
  });

  describe.each([
    ["Error インスタンス", new Error("失敗")],
    ["文字列", "失敗"],
    ["undefined", undefined],
  ])("DOMException でない値（%s）の場合", (_label, cause) => {
    it("TransactionFailed に分類する", () => {
      expect(toDbError(cause)).toEqual({ type: "TransactionFailed", cause });
    });
  });
});

describe("DbError", () => {
  describe("ValidationFailed", () => {
    it("issues を保持できる", () => {
      const issues = makeIssues();
      const error: import("./errors").DbError = {
        type: "ValidationFailed",
        issues,
      };
      expect(error.issues).toBe(issues);
    });
  });
});
