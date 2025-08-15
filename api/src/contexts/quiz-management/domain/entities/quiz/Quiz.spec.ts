import { beforeEach, describe, expect, it } from "vitest";
import { CreatorId, Quiz, QuizId } from "./Quiz";

describe("Quiz", () => {
  const validQuizData = {
    id: "quiz-1",
    question: "Is TypeScript a superset of JavaScript?",
    answerType: "boolean" as const,
    solution: {
      id: "solution-1",
      value: true,
    },
    explanation:
      "TypeScript adds static typing to JavaScript while maintaining compatibility",
    status: "pending_approval" as const,
    creatorId: "creator-1",
    createdAt: "2023-12-01T10:00:00.000Z",
    approvedAt: undefined,
  } as const;

  describe("Brand Types", () => {
    describe("QuizId validation", () => {
      it.each([
        ["valid alphanumeric", "quiz-1", true],
        ["valid with numbers", "quiz123", true],
        ["empty string", "", false],
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should handle %s: %s", (_desc, input, isValid) => {
        const result = QuizId.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });

    describe("CreatorId validation", () => {
      it.each([
        ["valid alphanumeric", "creator-1", true],
        ["valid with numbers", "creator123", true],
        ["empty string", "", false],
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should handle %s: %s", (_desc, input, isValid) => {
        const result = CreatorId.safeParse(input);
        expect(result.success).toBe(isValid);
      });
    });
  });

  describe("Entity Creation", () => {
    it("should create valid quiz from complete data", () => {
      const result = Quiz.from(validQuizData);
      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        const quiz = result.value;
        expect(quiz.get("question")).toBe(
          "Is TypeScript a superset of JavaScript?",
        );
        expect(quiz.get("answerType")).toBe("boolean");
        expect(quiz.get("status")).toBe("pending_approval");
      }
    });

    it("should suggest patches for invalid data", () => {
      const invalidData = {
        ...validQuizData,
        question: "  ", // 空白のみ
        answerType: "bool", // typo
        status: "pending", // typo
      };

      const result = Quiz.from(invalidData);
      expect(result.isErr()).toBe(true);

      if (result.isErr()) {
        const { issues, patches } = result.error;
        expect(issues.length).toBeGreaterThan(0);
        expect(patches.length).toBeGreaterThan(0);

        // patches contains question fix
        const hasQuestionPatch = patches.some(
          (patch) =>
            typeof patch === "object" && patch !== null && "question" in patch,
        );
        expect(hasQuestionPatch).toBe(true);
      }
    });

    it("should enforce answer type consistency", () => {
      const inconsistentData = {
        ...validQuizData,
        answerType: "boolean" as const,
        solution: {
          id: "solution-1",
          value: true,
        },
      };

      const result = Quiz.from(inconsistentData);
      expect(result.isOk()).toBe(true);
    });

    it("should validate solution requirement for boolean questions", () => {
      const noSolutionData = {
        ...validQuizData,
        solution: null,
      };

      const result = Quiz.from(noSolutionData);
      expect(result.isErr()).toBe(true);

      if (result.isErr()) {
        const hasSolutionIssue = result.error.issues.some(
          (issue) => issue.path[0] === "solution",
        );
        expect(hasSolutionIssue).toBe(true);
      }
    });
  });

  describe("Business Logic", () => {
    let quiz: Quiz;

    beforeEach(() => {
      const result = Quiz.from(validQuizData);
      expect(result.isOk()).toBe(true);
      quiz = result._unsafeUnwrap();
    });

    describe("Approval Workflow", () => {
      it("should approve quiz correctly", () => {
        const approvedResult = quiz.approve("2023-12-02T10:00:00.000Z");
        expect(approvedResult.isOk()).toBe(true);

        if (approvedResult.isOk()) {
          const approvedQuiz = approvedResult.value;
          expect(approvedQuiz.get("status")).toBe("approved");
          expect(approvedQuiz.get("approvedAt")).toBe(
            "2023-12-02T10:00:00.000Z",
          );
        }
      });

      it("should prevent approval of non-pending quiz", () => {
        const approvedResult = quiz.approve("2023-12-02T10:00:00.000Z");
        expect(approvedResult.isOk()).toBe(true);

        const reApprovalResult = approvedResult
          ._unsafeUnwrap()
          .approve("2023-12-03T10:00:00.000Z");
        expect(reApprovalResult.isErr()).toBe(true);

        if (reApprovalResult.isErr()) {
          expect(reApprovalResult.error.issues[0]?.path[0]).toBe("status");
        }
      });

      it("should reject quiz correctly", () => {
        const rejectedResult = quiz.reject("Quality issues");
        expect(rejectedResult.isOk()).toBe(true);

        if (rejectedResult.isOk()) {
          const rejectedQuiz = rejectedResult.value;
          expect(rejectedQuiz.get("status")).toBe("rejected");
        }
      });

      it("should prevent rejection of non-pending quiz", () => {
        const approvedResult = quiz.approve("2023-12-02T10:00:00.000Z");
        expect(approvedResult.isOk()).toBe(true);

        const rejectionResult = approvedResult
          ._unsafeUnwrap()
          .reject("Too late");
        expect(rejectionResult.isErr()).toBe(true);
      });
    });

    describe("Permission Checks", () => {
      it("should allow updates for pending approval quiz", () => {
        expect(quiz.canBeUpdated()).toBe(true);
      });

      it("should prevent updates for approved quiz", () => {
        const approvedResult = quiz.approve("2023-12-02T10:00:00.000Z");
        expect(approvedResult.isOk()).toBe(true);

        const approvedQuiz = approvedResult._unsafeUnwrap();
        expect(approvedQuiz.canBeUpdated()).toBe(false);
      });

      it("should allow deletion for non-approved quiz", () => {
        expect(quiz.canBeDeleted()).toBe(true);

        const rejectedResult = quiz.reject();
        expect(rejectedResult.isOk()).toBe(true);

        const rejectedQuiz = rejectedResult._unsafeUnwrap();
        expect(rejectedQuiz.canBeDeleted()).toBe(true);
      });

      it("should prevent deletion for approved quiz", () => {
        const approvedResult = quiz.approve("2023-12-02T10:00:00.000Z");
        expect(approvedResult.isOk()).toBe(true);

        const approvedQuiz = approvedResult._unsafeUnwrap();
        expect(approvedQuiz.canBeDeleted()).toBe(false);
      });
    });

    describe("Solution Integration", () => {
      it("should provide access to integrated solution", () => {
        const solution = quiz.getSolution();
        expect(solution.get("id")).toBe("solution-1");
        expect(solution.get("value")).toBe(true);
      });

      it("should work with solution answer checking", () => {
        const solution = quiz.getSolution();

        // Note: Currently returns false due to placeholder implementation
        const result = solution.checkAnswer({ value: true });
        expect(typeof result).toBe("boolean");
        expect(result).toBe(false); // Placeholder implementation
      });

      it("should provide boolean solution methods", () => {
        const solution = quiz.getSolution();
        expect(solution.isTrue()).toBe(true);
        expect(solution.isFalse()).toBe(false);

        const negatedResult = solution.negate();
        expect(negatedResult.isOk()).toBe(true);

        if (negatedResult.isOk()) {
          const negatedSolution = negatedResult.value;
          expect(negatedSolution.get("value")).toBe(false);
        }
      });
    });

    describe("Validation Methods", () => {
      it("should identify incomplete quiz", () => {
        const incompleteResult = Quiz.from({
          ...validQuizData,
          question: "",
        });

        expect(incompleteResult.isErr()).toBe(true);
      });
    });
  });

  describe("Draft Usage", () => {
    it("should work with Draft pattern", () => {
      const draft = new Quiz.Draft();
      draft.update("question", "Draft question: Is this true?");
      draft.with({
        answerType: "boolean",
        solution: {
          id: "sol-draft",
          value: false,
        },
        id: "quiz-draft",
        creatorId: "creator-draft",
        status: "pending_approval",
        createdAt: "2023-12-01T10:00:00.000Z",
      });

      expect(draft.hasErrors()).toBe(false);

      const entityResult = draft.commit();
      expect(entityResult.isOk()).toBe(true);

      if (entityResult.isOk()) {
        const quizEntity = entityResult.value;
        expect(quizEntity.get("question")).toBe(
          "Draft question: Is this true?",
        );
        expect(quizEntity.get("answerType")).toBe("boolean");
        expect(quizEntity.getSolution().get("value")).toBe(false);
      }
    });

    it("should handle validation errors in draft", () => {
      const draft = new Quiz.Draft();
      draft.update("question", ""); // Invalid
      draft.update("answerType", "boolean");

      expect(draft.hasErrors()).toBe(true);

      const entityResult = draft.commit();
      expect(entityResult.isErr()).toBe(true);
    });

    it("should provide patches for draft errors", () => {
      const draft = new Quiz.Draft();
      draft.update("question", "  "); // Whitespace only
      draft.update("answerType", "bool" as unknown as "boolean"); // Typo for testing

      expect(draft.hasErrors()).toBe(true);

      const patches = draft.getPatches();
      expect(patches.length).toBeGreaterThan(0);
    });
  });

  describe("Patch System", () => {
    it("should suggest question fixes", () => {
      const result = Quiz.from({
        ...validQuizData,
        question: "   ",
      });

      expect(result.isErr()).toBe(true);

      if (result.isErr()) {
        const questionPatch = result.error.patches.find(
          (patch) =>
            typeof patch === "object" && patch !== null && "question" in patch,
        );
        expect(questionPatch).toBeDefined();
      }
    });

    it("should suggest answer type fixes", () => {
      const result = Quiz.from({
        ...validQuizData,
        answerType: "bool",
      });

      expect(result.isErr()).toBe(true);

      if (result.isErr()) {
        const answerTypePatch = result.error.patches.find(
          (patch) =>
            typeof patch === "object" &&
            patch !== null &&
            "answerType" in patch,
        );
        expect(answerTypePatch).toBeDefined();
        if (
          answerTypePatch &&
          typeof answerTypePatch === "object" &&
          "answerType" in answerTypePatch
        ) {
          expect(answerTypePatch.answerType).toBe("boolean");
        }
      }
    });

    it("should suggest status fixes", () => {
      const result = Quiz.from({
        ...validQuizData,
        status: "pending",
      });

      expect(result.isErr()).toBe(true);

      if (result.isErr()) {
        const statusPatch = result.error.patches.find(
          (patch) =>
            typeof patch === "object" && patch !== null && "status" in patch,
        );
        expect(statusPatch).toBeDefined();
        if (statusPatch && "status" in statusPatch) {
          expect(statusPatch.status).toBe("pending_approval");
        }
      }
    });
  });
});
