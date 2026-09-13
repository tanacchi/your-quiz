import { describe, expect, it } from "vitest";
import { createValidationError } from "../errors/factories";
import {
  approvalRequestSchema,
  createQuizSchema,
  updateQuizSchema,
} from "./quiz.schema";

describe("quiz.schema", () => {
  describe("createQuizSchema", () => {
    const validInput = {
      question: "TypeScriptとは？",
      answerType: "boolean" as const,
      solution: { type: "boolean" as const, value: true },
    };

    it("answerTypeとsolution.typeが一致しない場合は失敗する", () => {
      const result = createQuizSchema.safeParse({
        ...validInput,
        answerType: "free_text",
      });
      expect(result.success).toBe(false);
    });

    it("explanation/tagsがnullishの場合はデフォルト値に正規化する", () => {
      const result = createQuizSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.explanation).toBe("");
        expect(result.data.tags).toEqual([]);
      }
    });

    describe("isDraft (ADR-0029)", () => {
      it.each([
        ["isDraft: true", { isDraft: true }, true],
        ["isDraft: false", { isDraft: false }, false],
        ["isDraftを省略", {}, false],
      ])("%s の場合、正規化後のisDraftは%s", (_desc, override, expected) => {
        const result = createQuizSchema.safeParse({
          ...validInput,
          ...override,
        });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.isDraft).toBe(expected);
        }
      });

      it("isDraftが真偽値でない場合は失敗する", () => {
        const result = createQuizSchema.safeParse({
          ...validInput,
          isDraft: "yes",
        });
        expect(result.success).toBe(false);
      });
    });
  });

  describe("updateQuizSchema", () => {
    it.each([
      ["questionのみ", { question: "更新後の問題文" }, true],
      ["explanationのみ", { explanation: "更新後の解説" }, true],
      [
        "両方",
        { question: "更新後の問題文", explanation: "更新後の解説" },
        true,
      ],
      ["どちらも無し", {}, false],
    ])("%s の場合は成功=%s", (_desc, input, expectedSuccess) => {
      const result = updateQuizSchema.safeParse(input);
      expect(result.success).toBe(expectedSuccess);
    });

    it("question/explanation以外のフィールドは拒否しない(未知キーは無視される)", () => {
      // updateQuizSchemaはstrictではないため、余分なキーはstripされる想定
      const result = updateQuizSchema.safeParse({
        question: "更新後の問題文",
        answerType: "boolean",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).not.toHaveProperty("answerType");
      }
    });

    it("questionは500文字を超えると失敗する(quiz-management.tsp/domain quiz-schema.tsと同じ上限)", () => {
      const result = updateQuizSchema.safeParse({
        question: "Q".repeat(501),
      });
      expect(result.success).toBe(false);
    });

    it("questionは500文字ちょうどなら成功する", () => {
      const result = updateQuizSchema.safeParse({
        question: "Q".repeat(500),
      });
      expect(result.success).toBe(true);
    });

    it("explanationは1000文字を超えると失敗する", () => {
      const result = updateQuizSchema.safeParse({
        explanation: "E".repeat(1001),
      });
      expect(result.success).toBe(false);
    });

    it("explanationは1000文字ちょうどなら成功する", () => {
      const result = updateQuizSchema.safeParse({
        explanation: "E".repeat(1000),
      });
      expect(result.success).toBe(true);
    });

    it("どちらも無しの場合、fieldErrorsに空文字キーが混入しない(A-7回帰)", () => {
      const result = updateQuizSchema.safeParse({});
      expect(result.success).toBe(false);
      if (!result.success) {
        const validationError = createValidationError(result.error);
        // toHaveProperty("")は空文字キーを正しく扱えないため、Object.keysで検証する
        expect(Object.keys(validationError.fieldErrors ?? {})).not.toContain(
          "",
        );
        expect(Object.keys(validationError.fieldErrors ?? {})).toContain(
          "question",
        );
      }
    });
  });

  describe("approvalRequestSchema", () => {
    it.each([
      ["decision: approved", { decision: "approved" }, true],
      ["decision: rejected", { decision: "rejected" }, true],
      ["decision: invalid", { decision: "invalid" }, false],
      ["decisionなし", {}, false],
    ])("%s の場合は成功=%s", (_desc, input, expectedSuccess) => {
      const result = approvalRequestSchema.safeParse(input);
      expect(result.success).toBe(expectedSuccess);
    });

    it("reviewerNotesとpublishImmediatelyはオプショナル", () => {
      const result = approvalRequestSchema.safeParse({
        decision: "approved",
        reviewerNotes: "良い内容です",
        publishImmediately: true,
      });
      expect(result.success).toBe(true);
    });
  });
});
