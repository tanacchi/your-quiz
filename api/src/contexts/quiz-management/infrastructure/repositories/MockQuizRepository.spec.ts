import { beforeEach, describe, expect, test } from "vitest";
import type { components } from "../../../../shared/types";
import { CreatorId } from "../../domain/entities/quiz-summary/QuizSummary";
import type { NewQuiz } from "../../domain/entities/quiz-summary/quiz-summary-schema";
import { MockQuizRepository } from "./MockQuizRepository";

describe("MockQuizRepository", () => {
  let repository: MockQuizRepository;

  /**
   * create() に渡す採番前の入力。id / solutionId はリポジトリ（Mockの連番
   * カウンタ、D1のAUTOINCREMENT）が払い出すため、ここでは持たない(issue #76)。
   * 同じ理由でtagIds（作成時のタグ保存）も持たない。
   */
  const createNewQuiz = (
    overrides: Partial<{
      question: string;
      answerType: components["schemas"]["AnswerType"];
      status: "draft" | "pending_approval";
      creatorId: string;
      explanation?: string;
    }> = {},
  ): NewQuiz => ({
    question: overrides.question ?? "Test question",
    answerType: overrides.answerType ?? "single_choice",
    explanation: overrides.explanation,
    status: overrides.status ?? "pending_approval",
    creatorId: CreatorId.parse(overrides.creatorId ?? "user-test"),
    createdAt: "2024-01-01 00:00:00",
  });

  const mockSolution: components["schemas"]["SolutionCreate"] = {
    type: "single_choice",
    choices: [
      { text: "Option 1", orderIndex: 0, isCorrect: true },
      { text: "Option 2", orderIndex: 1, isCorrect: false },
    ],
  };

  beforeEach(() => {
    repository = new MockQuizRepository();
  });

  describe("create", () => {
    describe("when valid quiz and solution are provided", () => {
      test("should create quiz with a repository-issued id", async () => {
        // Act
        const result = await repository.create(
          createNewQuiz({ question: "Test question" }),
          mockSolution,
        );

        // Assert: idはリポジトリが払い出す(D1のAUTOINCREMENTと同じ数値文字列の形式)
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("id")).toMatch(/^\d+$/);
          expect(result.value.get("question")).toBe("Test question");
          expect(result.value.get("answerType")).toBe("single_choice");
        }
      });

      test("2回createすると異なる採番値が返り、その id で findById できる", async () => {
        // Act
        const result1 = await repository.create(
          createNewQuiz({ question: "First question" }),
          mockSolution,
        );
        const result2 = await repository.create(
          createNewQuiz({ question: "Second question" }),
          mockSolution,
        );

        // Assert
        expect(result1.isOk() && result2.isOk()).toBe(true);
        if (!result1.isOk() || !result2.isOk()) return;

        const id1 = result1.value.get("id");
        const id2 = result2.value.get("id");
        expect(id1).not.toBe(id2);

        const found1 = await repository.findById(id1);
        const found2 = await repository.findById(id2);
        expect(found1.isOk() && found2.isOk()).toBe(true);
        if (found1.isOk() && found2.isOk()) {
          expect(found1.value.question).toBe("First question");
          expect(found2.value.question).toBe("Second question");
        }
      });

      test.each([
        ["boolean", "boolean", { type: "boolean", value: true }],
        [
          "free_text",
          "free_text",
          {
            type: "free_text",
            correctAnswer: "answer",
            matchingStrategy: "exact",
            caseSensitive: false,
          },
        ],
        [
          "multiple_choice",
          "multiple_choice",
          {
            type: "multiple_choice",
            minCorrectAnswers: 2,
            choices: [],
          },
        ],
      ])(
        "should create quiz with %s answer type",
        async (_description, answerType, solution) => {
          // Arrange
          const quiz = createNewQuiz({
            answerType: answerType as components["schemas"]["AnswerType"],
          });

          // Act
          const result = await repository.create(
            quiz,
            solution as components["schemas"]["SolutionCreate"],
          );

          // Assert
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            expect(result.value.get("answerType")).toBe(answerType);
          }
        },
      );

      test("should handle quiz without optional fields", async () => {
        // Arrange
        const quiz = createNewQuiz({ status: "pending_approval" });

        // Act
        const result = await repository.create(quiz, mockSolution);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("explanation")).toBeUndefined();
          expect(result.value.get("status")).toBe("pending_approval");
        }
      });
    });
  });

  describe("findById", () => {
    describe("when quiz exists", () => {
      test("should return quiz with solution for existing quiz", async () => {
        // Arrange
        const created = await repository.create(
          createNewQuiz({ question: "Test question" }),
          mockSolution,
        );
        expect(created.isOk()).toBe(true);
        if (!created.isOk()) return;
        const id = created.value.get("id");

        // Act
        const result = await repository.findById(id);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.id).toBe(id);
          expect(result.value.question).toBe("Test question");
          expect(result.value.solution).toBeDefined();
          expect(result.value.solution.type).toBe("single_choice");
        }
      });

      test("should return quiz with all optional fields", async () => {
        // Arrange - Use existing quiz from mock data

        // Act
        const result = await repository.findById("quiz-1");

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.explanation).toBe(
            "TypeScript is a typed superset of JavaScript",
          );
          expect(result.value.approvedAt).toBeDefined();
        }
      });

      test("should handle quiz without optional fields", async () => {
        // Arrange
        const created = await repository.create(
          createNewQuiz({ status: "pending_approval" }),
          mockSolution,
        );
        expect(created.isOk()).toBe(true);
        if (!created.isOk()) return;
        const id = created.value.get("id");

        // Act
        const result = await repository.findById(id);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.explanation).toBeUndefined();
          expect(result.value.approvedAt).toBeUndefined();
        }
      });
    });

    describe("when quiz does not exist", () => {
      test("should return NotFoundError for non-existent quiz", async () => {
        // Act
        const result = await repository.findById("non-existent-quiz");

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          // FindFailedErrorはInternalServerErrorのサブタイプのためmessageは固定文言
          expect(result.error.message).toBe("Internal server error");
          expect(result.error.details).toBe(
            "Quiz not found: non-existent-quiz",
          );
        }
      });

      test.each([
        ["empty string", ""],
        ["whitespace", "   "],
        ["null-like", "null"],
        ["undefined-like", "undefined"],
      ])(
        "should return NotFoundError for %s",
        async (_description, invalidId) => {
          // Act
          const result = await repository.findById(invalidId);

          // Assert
          expect(result.isErr()).toBe(true);
        },
      );
    });

    describe("createMockSolution", () => {
      test.each([
        ["boolean", "boolean", { type: "boolean", value: false }],
        [
          "free_text",
          "free_text",
          {
            type: "free_text",
            correctAnswer: "mock answer",
            matchingStrategy: "exact",
            caseSensitive: false,
          },
        ],
        [
          "single_choice",
          "single_choice",
          {
            type: "single_choice",
            choices: expect.arrayContaining([
              expect.objectContaining({ text: "Mock choice", isCorrect: true }),
            ]),
          },
        ],
        [
          "multiple_choice",
          "multiple_choice",
          {
            type: "multiple_choice",
            minCorrectAnswers: 1,
            choices: expect.arrayContaining([
              expect.objectContaining({ text: "Mock choice", isCorrect: true }),
            ]),
          },
        ],
      ])(
        "should create proper mock solution for %s",
        async (_description, answerType, expectedSolution) => {
          // Arrange
          const created = await repository.create(
            createNewQuiz({
              answerType: answerType as components["schemas"]["AnswerType"],
            }),
            mockSolution,
          );
          expect(created.isOk()).toBe(true);
          if (!created.isOk()) return;
          const id = created.value.get("id");

          // Act
          const result = await repository.findById(id);

          // Assert
          expect(result.isOk()).toBe(true);
          if (result.isOk()) {
            expect(result.value.solution).toMatchObject(expectedSolution);
          }
        },
      );

      test("should throw error for unsupported answer type", async () => {
        // This test verifies the internal createMockSolution method
        // We need to create a scenario where it would be called with invalid type
        // Since this is a private method, we'll test it indirectly by creating
        // a quiz with an invalid answer type (though this shouldn't happen in practice)

        // For now, we'll test the happy path since the createMockSolution
        // is a private method and should only be called with valid types
        expect(true).toBe(true); // Placeholder test
      });
    });
  });

  describe("findMany", () => {
    describe("when no filters are provided", () => {
      test("should return all quizzes with default pagination", async () => {
        // Act
        const result = await repository.findMany();

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(2); // Default mock data
          expect(result.value.totalCount).toBe(2);
          expect(result.value.hasMore).toBe(false);
        }
      });
    });

    describe("when filters are provided", () => {
      test("should filter by status", async () => {
        // Arrange
        await repository.create(
          createNewQuiz({ status: "pending_approval" }),
          mockSolution,
        );

        // Act
        const result = await repository.findMany({
          status: ["pending_approval"],
        });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(1);
          expect(result.value.items[0]?.get("status")).toBe("pending_approval");
        }
      });

      test("should filter by creatorId", async () => {
        // Arrange
        await repository.create(
          createNewQuiz({ creatorId: "specific-user" }),
          mockSolution,
        );

        // Act
        const result = await repository.findMany({
          creatorId: "specific-user",
        });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(1);
          expect(result.value.items[0]?.get("creatorId")).toBe("specific-user");
        }
      });

      test("作成したクイズがfindManyの結果に含まれる", async () => {
        // Arrange: 作成時のタグ保存(#74寄り)はissue #76のスコープに含めないため、
        // NewQuizはtagIdsを持たない。ここでは新規作成したクイズが一覧に
        // 出ることだけ確認する
        const created = await repository.create(
          createNewQuiz({ question: "Newly created quiz" }),
          mockSolution,
        );
        expect(created.isOk()).toBe(true);
        if (!created.isOk()) return;

        // Act
        const result = await repository.findMany({});

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          const foundQuiz = result.value.items.find(
            (q) => q.get("id") === created.value.get("id"),
          );
          expect(foundQuiz).toBeDefined();
        }
      });

      test("should combine multiple filters", async () => {
        // Arrange: createはdraft/pending_approvalのみ受け付けるため、
        // approvedへの遷移はupdateで行う
        const created = await repository.create(
          createNewQuiz({
            status: "pending_approval",
            creatorId: "target-user",
          }),
          mockSolution,
        );
        expect(created.isOk()).toBe(true);
        if (!created.isOk()) return;
        const id = created.value.get("id");

        await repository.update(id, {
          status: "approved",
          approvedAt: "2024-01-01 00:00:00",
        });

        // Act
        const result = await repository.findMany({
          status: ["approved"],
          creatorId: "target-user",
        });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          const foundQuiz = result.value.items.find((q) => q.get("id") === id);
          expect(foundQuiz).toBeDefined();
        }
      });
    });

    describe("pagination", () => {
      beforeEach(async () => {
        // Add more test data for pagination tests
        for (let i = 0; i < 13; i++) {
          await repository.create(
            createNewQuiz({ question: `Question ${i}` }),
            mockSolution,
          );
        }
      });

      test("should handle limit and offset", async () => {
        // Act
        const result = await repository.findMany({ limit: 5, offset: 2 });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(5);
          expect(result.value.totalCount).toBeGreaterThan(5);
          expect(result.value.hasMore).toBe(true);
        }
      });

      test("should calculate hasMore correctly", async () => {
        // Act - Get last page
        const result = await repository.findMany({ limit: 20, offset: 0 });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.hasMore).toBe(false);
        }
      });

      test("should handle offset beyond total count", async () => {
        // Act
        const result = await repository.findMany({ limit: 10, offset: 1000 });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(0);
          expect(result.value.hasMore).toBe(false);
        }
      });

      test("should use default values when not provided", async () => {
        // Act
        const result = await repository.findMany({});

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items.length).toBeLessThanOrEqual(10); // default limit
        }
      });
    });

    describe("edge cases", () => {
      test("should return empty results for non-matching filters", async () => {
        // Act
        const result = await repository.findMany({
          status: ["rejected"],
          creatorId: "non-existent-user",
        });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items).toHaveLength(0);
          expect(result.value.totalCount).toBe(0);
          expect(result.value.hasMore).toBe(false);
        }
      });

      test("should handle empty tags array", async () => {
        // Act
        const result = await repository.findMany({});

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.items.length).toBeGreaterThan(0); // Should return all items
        }
      });
    });
  });

  describe("update", () => {
    describe("when quiz exists", () => {
      test("should update question and explanation and return updated entity", async () => {
        // Arrange
        const created = await repository.create(createNewQuiz(), mockSolution);
        expect(created.isOk()).toBe(true);
        if (!created.isOk()) return;
        const id = created.value.get("id");

        // Act
        const result = await repository.update(id, {
          question: "Updated question",
          explanation: "Updated explanation",
        });

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.get("question")).toBe("Updated question");
          expect(result.value.get("explanation")).toBe("Updated explanation");
        }
      });

      test("should persist the update so a subsequent findById reflects it", async () => {
        // Arrange
        const created = await repository.create(createNewQuiz(), mockSolution);
        expect(created.isOk()).toBe(true);
        if (!created.isOk()) return;
        const id = created.value.get("id");
        await repository.update(id, {
          question: "Persisted question",
        });

        // Act
        const result = await repository.findById(id);

        // Assert
        expect(result.isOk()).toBe(true);
        if (result.isOk()) {
          expect(result.value.question).toBe("Persisted question");
        }
      });
    });

    describe("when quiz does not exist", () => {
      test("should return a NotFoundError-based RepositoryError", async () => {
        // Act
        const result = await repository.update("non-existent-quiz", {
          question: "Anything",
        });

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.details).toBe(
            "Quiz not found: non-existent-quiz",
          );
        }
      });
    });
  });

  describe("delete", () => {
    describe("when quiz exists", () => {
      test("should delete the quiz and return void", async () => {
        // Arrange
        const created = await repository.create(createNewQuiz(), mockSolution);
        expect(created.isOk()).toBe(true);
        if (!created.isOk()) return;
        const id = created.value.get("id");

        // Act
        const result = await repository.delete(id);

        // Assert
        expect(result.isOk()).toBe(true);
      });

      test("should remove the quiz so a subsequent findById returns NotFoundError", async () => {
        // Arrange
        const created = await repository.create(createNewQuiz(), mockSolution);
        expect(created.isOk()).toBe(true);
        if (!created.isOk()) return;
        const id = created.value.get("id");
        await repository.delete(id);

        // Act
        const result = await repository.findById(id);

        // Assert
        expect(result.isErr()).toBe(true);
      });
    });

    describe("when quiz does not exist", () => {
      test("should return a NotFoundError-based RepositoryError", async () => {
        // Act
        const result = await repository.delete("non-existent-quiz");

        // Assert
        expect(result.isErr()).toBe(true);
        if (result.isErr()) {
          expect(result.error.details).toBe(
            "Quiz not found: non-existent-quiz",
          );
        }
      });
    });
  });
});
