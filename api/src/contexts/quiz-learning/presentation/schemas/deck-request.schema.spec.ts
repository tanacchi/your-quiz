import { describe, expect, it } from "vitest";
import {
  createDeckFromSearchSchema,
  createDeckFromWrongAnswersSchema,
  createDeckSchema,
  updateDeckSchema,
} from "./deck-request.schema";

describe("deck-request.schema", () => {
  describe("createDeckSchema", () => {
    it("必須フィールドのみで検証を通過する", () => {
      const result = createDeckSchema.safeParse({
        quizIds: ["quiz-1"],
        source: "manual_selection",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.maxQuizzes).toBe(100);
        expect(result.data.shuffleOrder).toBe(false);
      }
    });

    it("quizIdsが空配列の場合は拒否する", () => {
      const result = createDeckSchema.safeParse({
        quizIds: [],
        source: "manual_selection",
      });

      expect(result.success).toBe(false);
    });

    it("不正なsourceを拒否する", () => {
      const result = createDeckSchema.safeParse({
        quizIds: ["quiz-1"],
        source: "invalid_source",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("createDeckFromSearchSchema", () => {
    it("searchQueryのみで検証を通過する", () => {
      const result = createDeckFromSearchSchema.safeParse({
        searchQuery: "JavaScript",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.maxQuizzes).toBe(50);
      }
    });

    it("filtersを含めて検証を通過する", () => {
      const result = createDeckFromSearchSchema.safeParse({
        searchQuery: "JavaScript",
        filters: { tags: ["js"], difficulty: "beginner" },
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.filters?.status).toBe("approved");
      }
    });

    it("searchQueryが無い場合は拒否する", () => {
      const result = createDeckFromSearchSchema.safeParse({});

      expect(result.success).toBe(false);
    });
  });

  describe("createDeckFromWrongAnswersSchema", () => {
    it("空オブジェクトでもデフォルト値で検証を通過する", () => {
      const result = createDeckFromWrongAnswersSchema.safeParse({});

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.maxQuizzes).toBe(50);
        expect(result.data.sinceDays).toBe(30);
      }
    });
  });

  describe("updateDeckSchema", () => {
    it("空オブジェクトでも検証を通過する（全フィールドoptional）", () => {
      const result = updateDeckSchema.safeParse({});

      expect(result.success).toBe(true);
    });

    it("quizIdsが空配列の場合は拒否する", () => {
      const result = updateDeckSchema.safeParse({ quizIds: [] });

      expect(result.success).toBe(false);
    });
  });
});
