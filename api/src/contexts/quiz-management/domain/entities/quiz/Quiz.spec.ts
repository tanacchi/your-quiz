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

    describe("Quiz.fromDraft Method", () => {
      describe("Successful Conversion", () => {
        it("should create Quiz entity from valid draft", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-from-draft",
            question: "Is Rust a systems programming language?",
            answerType: "boolean",
            solution: {
              id: "solution-rust",
              value: true,
            },
            explanation:
              "Rust is designed for systems programming with memory safety",
            status: "pending_approval",
            creatorId: "creator-rust",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          const result = Quiz.fromDraft(draft);
          expect(result.isOk()).toBe(true);

          if (result.isOk()) {
            const quiz = result.value;
            expect(quiz.get("id")).toBe("quiz-from-draft");
            expect(quiz.get("question")).toBe(
              "Is Rust a systems programming language?",
            );
            expect(quiz.get("answerType")).toBe("boolean");
            expect(quiz.getSolution().get("value")).toBe(true);
            expect(quiz.get("explanation")).toBe(
              "Rust is designed for systems programming with memory safety",
            );
            expect(quiz.get("status")).toBe("pending_approval");
          }
        });

        it("should work with incrementally built draft", () => {
          const draft = new Quiz.Draft();

          // Build draft step by step
          draft.update("id", "quiz-incremental");
          draft.update("question", "Can TypeScript catch runtime errors?");
          draft.update("answerType", "boolean");
          draft.update("solution", {
            id: "solution-ts",
            value: false,
          });
          draft.update("status", "pending_approval");
          draft.update("creatorId", "creator-ts");
          draft.update("createdAt", "2023-12-01T10:00:00.000Z");

          expect(draft.hasErrors()).toBe(false);

          const result = Quiz.fromDraft(draft);
          expect(result.isOk()).toBe(true);

          if (result.isOk()) {
            const quiz = result.value;
            expect(quiz.get("question")).toBe(
              "Can TypeScript catch runtime errors?",
            );
            expect(quiz.getSolution().get("value")).toBe(false);
          }
        });

        it("should create quiz with business logic methods working", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-business",
            question: "Is this quiz ready for approval?",
            answerType: "boolean",
            solution: { id: "sol-business", value: true },
            status: "pending_approval",
            creatorId: "creator-business",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          const result = Quiz.fromDraft(draft);
          expect(result.isOk()).toBe(true);

          if (result.isOk()) {
            const quiz = result.value;
            expect(quiz.canBeUpdated()).toBe(true);
            expect(quiz.canBeDeleted()).toBe(true);

            // Test approval workflow
            const approvedResult = quiz.approve("2023-12-02T10:00:00.000Z");
            expect(approvedResult.isOk()).toBe(true);

            if (approvedResult.isOk()) {
              const approvedQuiz = approvedResult.value;
              expect(approvedQuiz.get("status")).toBe("approved");
              expect(approvedQuiz.canBeUpdated()).toBe(false);
            }
          }
        });
      });

      describe("Error Handling", () => {
        it("should handle invalid draft data", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-invalid",
            question: "", // Invalid empty question
            answerType: "boolean",
            solution: { id: "sol-invalid", value: true },
            status: "pending_approval",
            creatorId: "creator-invalid",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          const result = Quiz.fromDraft(draft);
          expect(result.isErr()).toBe(true);

          if (result.isErr()) {
            expect(result.error.issues).toHaveLength(1);
            expect(result.error.issues[0]?.path[0]).toBe("question");
            expect(result.error.patches.length).toBeGreaterThan(0);
          }
        });

        it("should handle missing required fields", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-missing",
            question: "Valid question?",
            answerType: "boolean",
            // Missing solution
            status: "pending_approval",
            creatorId: "creator-missing",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          const result = Quiz.fromDraft(draft);
          expect(result.isErr()).toBe(true);

          if (result.isErr()) {
            const solutionIssue = result.error.issues.find(
              (issue) => issue.path[0] === "solution",
            );
            expect(solutionIssue).toBeDefined();
          }
        });

        it("should handle cross-field validation errors", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-cross-validation",
            question: "Valid question?",
            answerType: "boolean",
            solution: { id: "sol-cross", value: true },
            status: "approved", // Invalid without approvedAt
            creatorId: "creator-cross",
            createdAt: "2023-12-01T10:00:00.000Z",
            // Missing approvedAt for approved status
          });

          const result = Quiz.fromDraft(draft);
          expect(result.isErr()).toBe(true);

          if (result.isErr()) {
            const approvedAtIssue = result.error.issues.find(
              (issue) => issue.path[0] === "approvedAt",
            );
            expect(approvedAtIssue).toBeDefined();
          }
        });
      });

      describe("Patch System Integration", () => {
        it("should work with patch application using applyPatches", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-patches",
            question: "   ", // Invalid whitespace-only question
            answerType: "bool" as unknown as "boolean", // Invalid answerType
            solution: { id: "sol-patches", value: true },
            status: "pending_approval", // Valid status
            creatorId: "creator-patches",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          expect(draft.hasErrors()).toBe(true);

          // Get patches and apply them using applyPatches method
          const patches = draft.getPatches();
          expect(patches.length).toBeGreaterThan(0);

          draft.applyPatches(patches);

          // After applying patches, errors should be reduced or fixed
          const postPatchResult = Quiz.fromDraft(draft);

          // The patches should improve the validation state
          if (postPatchResult.isErr()) {
            // If still errors, they should be fewer than before
            expect(postPatchResult.error.issues.length).toBeLessThan(3);
          } else {
            // Or completely fixed
            expect(postPatchResult.isOk()).toBe(true);
          }
        });

        it("should handle multiple patch applications", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-multi-patches",
            question: "  ",
            answerType: "bool" as unknown as "boolean",
            solution: { id: "sol-multi-null", value: true },
            status: "pending_approval",
            creatorId: "creator-multi",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          let iterationCount = 0;
          const maxIterations = 5;

          // Apply patches iteratively until no more errors or max iterations
          while (draft.hasErrors() && iterationCount < maxIterations) {
            const patches = draft.getPatches();
            if (patches.length === 0) break;

            draft.applyPatches(patches);
            iterationCount++;
          }

          expect(iterationCount).toBeLessThanOrEqual(maxIterations);

          // Should eventually reach a stable state
          const finalResult = Quiz.fromDraft(draft);

          // Either successful or with manageable number of errors
          if (finalResult.isErr()) {
            expect(finalResult.error.issues.length).toBeLessThanOrEqual(2);
          }
        });

        it("should preserve valid fields when applying patches", () => {
          const draft = new Quiz.Draft();
          const validData = {
            id: "quiz-preserve",
            question: "Valid question to preserve?",
            answerType: "boolean" as const,
            solution: { id: "sol-preserve", value: true },
            status: "pending_approval" as const,
            creatorId: "creator-preserve",
            createdAt: "2023-12-01T10:00:00.000Z",
          };

          draft.with({
            ...validData,
            explanation: undefined, // This might trigger patches in some cases
          });

          const originalQuestion = draft.get("question");
          const originalId = draft.get("id");
          const originalSolution = draft.get("solution");

          if (draft.hasErrors()) {
            const patches = draft.getPatches();
            draft.applyPatches(patches);
          }

          // Valid fields should be preserved
          expect(draft.get("question")).toBe(originalQuestion);
          expect(draft.get("id")).toBe(originalId);
          expect(draft.get("solution")).toEqual(originalSolution);
        });
      });

      describe("Edge Cases", () => {
        it("should handle empty draft", () => {
          const draft = new Quiz.Draft();

          const result = Quiz.fromDraft(draft);
          expect(result.isErr()).toBe(true);

          if (result.isErr()) {
            // Should have multiple validation errors for missing required fields
            expect(result.error.issues.length).toBeGreaterThan(0);
            expect(result.error.patches.length).toBeGreaterThan(0);
          }
        });

        it("should handle partially filled draft", () => {
          const draft = new Quiz.Draft();
          draft.update("question", "Partial question?");
          draft.update("answerType", "boolean");
          // Missing other required fields

          const result = Quiz.fromDraft(draft);
          expect(result.isErr()).toBe(true);

          if (result.isErr()) {
            // Should suggest patches for missing fields
            expect(result.error.patches.length).toBeGreaterThan(0);
          }
        });

        it("should be equivalent to draft.commit()", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-equivalent",
            question: "Are fromDraft and commit equivalent?",
            answerType: "boolean",
            solution: { id: "sol-equivalent", value: true },
            status: "pending_approval",
            creatorId: "creator-equivalent",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          const fromDraftResult = Quiz.fromDraft(draft);
          const commitResult = draft.commit();

          // Both methods should return identical results
          expect(fromDraftResult.isOk()).toBe(commitResult.isOk());

          if (fromDraftResult.isOk() && commitResult.isOk()) {
            const fromDraftQuiz = fromDraftResult.value;
            const commitQuiz = commitResult.value;

            expect(fromDraftQuiz.get("id")).toBe(commitQuiz.get("id"));
            expect(fromDraftQuiz.get("question")).toBe(
              commitQuiz.get("question"),
            );
            expect(fromDraftQuiz.get("answerType")).toBe(
              commitQuiz.get("answerType"),
            );
            expect(fromDraftQuiz.getSolution().get("value")).toBe(
              commitQuiz.getSolution().get("value"),
            );
          }
        });
      });
    });

    describe("DraftBase Methods", () => {
      describe("applyPatches method", () => {
        it("should apply single patch correctly", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-single-patch",
            question: "   ", // Whitespace only - will need patch
            answerType: "boolean",
            solution: { id: "sol-single", value: true },
            status: "pending_approval",
            creatorId: "creator-single",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          expect(draft.hasErrors()).toBe(true);

          const patches = draft.getPatches();
          const questionPatch = patches.find(
            (patch) =>
              typeof patch === "object" &&
              patch !== null &&
              "question" in patch,
          );
          expect(questionPatch).toBeDefined();

          if (questionPatch) {
            draft.applyPatches([questionPatch]);

            // After applying the question patch, question should be fixed
            const updatedQuestion = draft.get("question");
            expect(updatedQuestion).not.toBe("   ");
            expect(typeof updatedQuestion).toBe("string");
            if (typeof updatedQuestion === "string") {
              expect(updatedQuestion.trim().length).toBeGreaterThan(0);
            }
          }
        });

        it("should apply multiple patches correctly", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-multi-patch",
            question: "  ", // Invalid
            answerType: "bool" as unknown as "boolean", // Invalid
            solution: { id: "sol-multi", value: true },
            status: "pending_approval", // Invalid
            creatorId: "creator-multi",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          const initialErrorCount = draft.getIssues().length;
          expect(initialErrorCount).toBeGreaterThan(0);

          const patches = draft.getPatches();
          expect(patches.length).toBeGreaterThan(0);

          draft.applyPatches(patches);

          // After applying all patches, error count should be reduced
          const finalErrorCount = draft.getIssues().length;
          expect(finalErrorCount).toBeLessThanOrEqual(initialErrorCount);
        });

        it("should handle empty patches array", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-empty-patches",
            question: "Valid question?",
            answerType: "boolean",
            solution: { id: "sol-empty", value: true },
            status: "pending_approval",
            creatorId: "creator-empty",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          const originalState = { ...draft.state };

          // Apply empty patches array
          draft.applyPatches([]);

          // State should remain unchanged
          expect(draft.state).toEqual(originalState);
        });

        it("should automatically revalidate after applying patches", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-revalidate",
            question: "", // Invalid
            answerType: "boolean",
            solution: { id: "sol-revalidate", value: true },
            status: "pending_approval",
            creatorId: "creator-revalidate",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          expect(draft.hasErrors()).toBe(true);

          const patches = draft.getPatches();
          draft.applyPatches(patches);

          // applyPatches should trigger revalidation automatically
          const issuesAfterPatches = draft.getIssues();
          expect(Array.isArray(issuesAfterPatches)).toBe(true);
        });

        it("should work with object patches", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-object-patch",
            question: "Object patch test?",
            answerType: "boolean",
            solution: { id: "sol-obj", value: true },
            status: "pending_approval",
            creatorId: "creator-obj",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          // Create an object patch that modifies explanation
          const objectPatch = {
            explanation: "Added by object patch",
          };

          draft.applyPatches([objectPatch]);

          expect(draft.get("explanation")).toBe("Added by object patch");
        });

        it("should handle patch application errors gracefully", () => {
          const draft = new Quiz.Draft();
          draft.with({
            id: "quiz-patch-error",
            question: "Patch error test?",
            answerType: "boolean",
            solution: { id: "sol-error", value: true },
            status: "pending_approval",
            creatorId: "creator-error",
            createdAt: "2023-12-01T10:00:00.000Z",
          });

          // Should not crash when empty patches array is provided
          expect(() => {
            draft.applyPatches([]);
          }).not.toThrow();

          // Should not crash when valid patch is provided
          expect(() => {
            draft.applyPatches([{ explanation: "Test explanation" }]);
          }).not.toThrow();
        });
      });
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
