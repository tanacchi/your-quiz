import { describe, it, expect, beforeEach } from "vitest";
import { Quiz } from "./Quiz";
import type { components } from "../../../../shared/types";

// TDDアプローチ：Quiz エンティティの単体テスト
describe("Quiz Domain Entity", () => {
  // テストデータ定数
  const VALID_QUIZ_DATA = {
    id: "quiz-123",
    question: "TypeScriptとは何ですか？",
    answerType: "single_choice" as components["schemas"]["AnswerType"],
    solutionId: "solution-456",
    explanation: "TypeScriptはJavaScriptのスーパーセットです",
    status: "pending_approval" as components["schemas"]["QuizStatus"],
    creatorId: "user-789",
    createdAt: "2025-08-09T07:00:00.000Z",
    approvedAt: undefined,
  };

  describe("Constructor - コンストラクタ", () => {
    describe("正常系: Valid quiz creation", () => {
      it("should create quiz with all required properties", () => {
        // Arrange & Act
        const quiz = new Quiz(
          VALID_QUIZ_DATA.id,
          VALID_QUIZ_DATA.question,
          VALID_QUIZ_DATA.answerType,
          VALID_QUIZ_DATA.solutionId,
          VALID_QUIZ_DATA.explanation,
          VALID_QUIZ_DATA.status,
          VALID_QUIZ_DATA.creatorId,
          VALID_QUIZ_DATA.createdAt
        );

        // Assert
        expect(quiz.id).toBe(VALID_QUIZ_DATA.id);
        expect(quiz.question).toBe(VALID_QUIZ_DATA.question);
        expect(quiz.answerType).toBe(VALID_QUIZ_DATA.answerType);
        expect(quiz.solutionId).toBe(VALID_QUIZ_DATA.solutionId);
        expect(quiz.explanation).toBe(VALID_QUIZ_DATA.explanation);
        expect(quiz.status).toBe(VALID_QUIZ_DATA.status);
        expect(quiz.creatorId).toBe(VALID_QUIZ_DATA.creatorId);
        expect(quiz.createdAt).toBe(VALID_QUIZ_DATA.createdAt);
        expect(quiz.approvedAt).toBeUndefined();
      });

      it("should create quiz with minimum required properties (optional fields undefined)", () => {
        // Arrange & Act
        const quiz = new Quiz(
          VALID_QUIZ_DATA.id,
          VALID_QUIZ_DATA.question,
          VALID_QUIZ_DATA.answerType,
          VALID_QUIZ_DATA.solutionId
        );

        // Assert
        expect(quiz.id).toBe(VALID_QUIZ_DATA.id);
        expect(quiz.question).toBe(VALID_QUIZ_DATA.question);
        expect(quiz.answerType).toBe(VALID_QUIZ_DATA.answerType);
        expect(quiz.solutionId).toBe(VALID_QUIZ_DATA.solutionId);
        expect(quiz.explanation).toBeUndefined();
        expect(quiz.status).toBe("pending_approval"); // デフォルト値
        expect(quiz.creatorId).toBe("mock-user-id"); // デフォルト値
        expect(quiz.createdAt).toBeDefined();
        expect(quiz.approvedAt).toBeUndefined();
      });
    });

    describe("境界値テスト: Boundary value testing", () => {
      // パラメータ化テスト：異なるanswerType値での境界値テスト
      it.each([
        ["boolean", "boolean" as components["schemas"]["AnswerType"]],
        ["free_text", "free_text" as components["schemas"]["AnswerType"]],
        ["single_choice", "single_choice" as components["schemas"]["AnswerType"]],
        ["multiple_choice", "multiple_choice" as components["schemas"]["AnswerType"]],
      ])("should accept valid answer type: %s", (_description, answerType) => {
        // Arrange & Act
        const quiz = new Quiz(
          "test-id",
          "Test question?",
          answerType,
          "test-solution"
        );

        // Assert
        expect(quiz.answerType).toBe(answerType);
      });

      // パラメータ化テスト：異なるstatus値での境界値テスト
      it.each([
        ["pending_approval", "pending_approval" as components["schemas"]["QuizStatus"]],
        ["approved", "approved" as components["schemas"]["QuizStatus"]],
        ["rejected", "rejected" as components["schemas"]["QuizStatus"]],
      ])("should accept valid status: %s", (_description, status) => {
        // Arrange & Act
        const quiz = new Quiz(
          "test-id",
          "Test question?",
          "boolean",
          "test-solution",
          undefined,
          status
        );

        // Assert
        expect(quiz.status).toBe(status);
      });
    });
  });

  describe("Business Methods - ビジネスメソッド", () => {
    let quiz: Quiz;

    beforeEach(() => {
      quiz = new Quiz(
        VALID_QUIZ_DATA.id,
        VALID_QUIZ_DATA.question,
        VALID_QUIZ_DATA.answerType,
        VALID_QUIZ_DATA.solutionId,
        VALID_QUIZ_DATA.explanation,
        VALID_QUIZ_DATA.status,
        VALID_QUIZ_DATA.creatorId,
        VALID_QUIZ_DATA.createdAt
      );
    });

    describe("canBeUpdated() - 更新可能性判定", () => {
      // パラメータ化テスト：status別の更新可能性テスト
      it.each([
        ["pending_approval", true, "承認待ち状態では更新可能"],
        ["approved", false, "承認済み状態では更新不可"],
        ["rejected", false, "却下済み状態では更新不可"],
      ])("should return %s when status is %s (%s)", (status, expected, _description) => {
        // Arrange
        const quizWithStatus = new Quiz(
          "test-id",
          "Test question?",
          "boolean",
          "test-solution",
          undefined,
          status as components["schemas"]["QuizStatus"]
        );

        // Act
        const result = quizWithStatus.canBeUpdated();

        // Assert
        expect(result).toBe(expected);
      });
    });

    describe("canBeDeleted() - 削除可能性判定", () => {
      // パラメータ化テスト：status別の削除可能性テスト
      it.each([
        ["pending_approval", true, "承認待ち状態では削除可能"],
        ["approved", false, "承認済み状態では削除不可"],
        ["rejected", true, "却下済み状態では削除可能"],
      ])("should return %s when status is %s (%s)", (status, expected, _description) => {
        // Arrange
        const quizWithStatus = new Quiz(
          "test-id",
          "Test question?",
          "boolean",
          "test-solution",
          undefined,
          status as components["schemas"]["QuizStatus"]
        );

        // Act
        const result = quizWithStatus.canBeDeleted();

        // Assert
        expect(result).toBe(expected);
      });
    });

    describe("approve() - 承認処理", () => {
      it("should approve quiz when status is pending_approval", () => {
        // Arrange
        const approvalTime = "2025-08-09T08:00:00.000Z";

        // Act
        const result = quiz.approve(approvalTime);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.status).toBe("approved");
          expect(result.value.approvedAt).toBe(approvalTime);
        }
      });

      // パラメータ化テスト：承認不可能な状態のテスト
      it.each([
        ["approved", "already approved"],
        ["rejected", "already rejected"],
      ])("should fail to approve quiz when status is %s", (status, _reason) => {
        // Arrange
        const quizWithStatus = new Quiz(
          "test-id",
          "Test question?",
          "boolean",
          "test-solution",
          undefined,
          status as components["schemas"]["QuizStatus"]
        );

        // Act
        const result = quizWithStatus.approve("2025-08-09T08:00:00.000Z");

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.message).toContain("cannot be approved");
        }
      });
    });
  });

  describe("Type Safety - 型安全性", () => {
    it("should maintain type safety for all properties", () => {
      // Arrange & Act
      const quiz = new Quiz(
        VALID_QUIZ_DATA.id,
        VALID_QUIZ_DATA.question,
        VALID_QUIZ_DATA.answerType,
        VALID_QUIZ_DATA.solutionId,
        VALID_QUIZ_DATA.explanation,
        VALID_QUIZ_DATA.status,
        VALID_QUIZ_DATA.creatorId,
        VALID_QUIZ_DATA.createdAt
      );

      // Assert - TypeScript型チェックが実行時まで保持されることを確認
      expect(typeof quiz.id).toBe("string");
      expect(typeof quiz.question).toBe("string");
      expect(typeof quiz.answerType).toBe("string");
      expect(typeof quiz.solutionId).toBe("string");
      expect(typeof quiz.creatorId).toBe("string");
      expect(typeof quiz.createdAt).toBe("string");
    });
  });
});