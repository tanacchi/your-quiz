import { describe, expect, it } from "vitest";
import { CreatorId, DeckId, DeckSchema, QuizId } from "./deck-schema";

describe("deck-schema", () => {
  const validDeckData = {
    id: DeckId.parse("deck-1"),
    name: "JavaScript基礎",
    description: "JavaScriptの基本的な概念",
    quizIds: [QuizId.parse("quiz-1"), QuizId.parse("quiz-2")],
    creatorId: CreatorId.parse("user-1"),
    createdAt: "2023-12-01 10:00:00",
    lastModifiedAt: "2023-12-01 10:00:00",
  } as const;

  describe("Brand Types", () => {
    it.each([
      ["valid alphanumeric", "deck-1", true],
      ["empty string", "", false],
      ["null value", null, false],
    ])("DeckId should handle %s: %s", (_desc, input, isValid) => {
      const result = DeckId.safeParse(input);
      expect(result.success).toBe(isValid);
    });

    it.each([
      ["valid alphanumeric", "user-1", true],
      ["empty string", "", false],
    ])("CreatorId should handle %s: %s", (_desc, input, isValid) => {
      const result = CreatorId.safeParse(input);
      expect(result.success).toBe(isValid);
    });

    it.each([
      ["valid alphanumeric", "quiz-1", true],
      ["empty string", "", false],
    ])("QuizId should handle %s: %s", (_desc, input, isValid) => {
      const result = QuizId.safeParse(input);
      expect(result.success).toBe(isValid);
    });
  });

  describe("DeckSchema", () => {
    it("有効なデータからDeckを構築できる", () => {
      const result = DeckSchema.safeParse(validDeckData);
      expect(result.success).toBe(true);
    });

    it("descriptionは省略可能", () => {
      const { description: _description, ...rest } = validDeckData;
      const result = DeckSchema.safeParse(rest);
      expect(result.success).toBe(true);
    });

    it("nameが空文字の場合は拒否する", () => {
      const result = DeckSchema.safeParse({ ...validDeckData, name: "" });
      expect(result.success).toBe(false);
    });

    it("nameが200文字を超える場合は拒否する", () => {
      const result = DeckSchema.safeParse({
        ...validDeckData,
        name: "a".repeat(201),
      });
      expect(result.success).toBe(false);
    });

    it("descriptionが1000文字を超える場合は拒否する", () => {
      const result = DeckSchema.safeParse({
        ...validDeckData,
        description: "a".repeat(1001),
      });
      expect(result.success).toBe(false);
    });

    it("quizIdsが空配列の場合は拒否する", () => {
      const result = DeckSchema.safeParse({ ...validDeckData, quizIds: [] });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((issue) => issue.path.includes("quizIds")),
        ).toBe(true);
      }
    });

    it("quizIdsに重複がある場合は拒否する", () => {
      const result = DeckSchema.safeParse({
        ...validDeckData,
        quizIds: [QuizId.parse("quiz-1"), QuizId.parse("quiz-1")],
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((issue) =>
            issue.message.includes("Duplicate"),
          ),
        ).toBe(true);
      }
    });

    it("未知のフィールドを含む場合は拒否する（strict）", () => {
      const result = DeckSchema.safeParse({
        ...validDeckData,
        unknownField: "value",
      });
      expect(result.success).toBe(false);
    });

    it("createdAtがSQLite日時形式でない場合は拒否する", () => {
      const result = DeckSchema.safeParse({
        ...validDeckData,
        createdAt: "2023-12-01T10:00:00.000Z",
      });
      expect(result.success).toBe(false);
    });
  });
});
