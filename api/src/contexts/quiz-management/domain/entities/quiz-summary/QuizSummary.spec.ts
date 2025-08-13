import { err, ok } from "neverthrow";
import { beforeEach, describe, expect, it } from "vitest";
import { QuizId, QuizSummary, QuizSummaryDraft, TagId } from "./QuizSummary";

describe("QuizSummary", () => {
  let validQuizData: unknown;
  let validTagIds: TagId[];

  beforeEach(() => {
    validTagIds = [TagId.parse("tag-1"), TagId.parse("tag-2")];

    validQuizData = {
      id: "quiz-1",
      question: "What is TypeScript?",
      answerType: "single_choice",
      solutionId: "solution-1",
      explanation: "TypeScript is a typed superset of JavaScript",
      tagIds: validTagIds,
      status: "pending_approval",
      creatorId: "creator-1",
      createdAt: "2023-12-01T10:00:00.000Z",
      approvedAt: undefined,
    };
  });

  describe("Brand Types", () => {
    it("should create branded QuizId from valid string", () => {
      const id = "quiz-1";
      const result = QuizId.safeParse(id);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(id);
      }
    });

    it("should reject empty string for QuizId", () => {
      const invalidId = "";
      const result = QuizId.safeParse(invalidId);

      expect(result.success).toBe(false);
    });

    it("should create branded TagId from valid string", () => {
      const tagId = "tag-3";
      const result = TagId.safeParse(tagId);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(tagId);
      }
    });
  });

  describe("Schema Validation", () => {
    it("should validate valid quiz data", () => {
      const quiz = QuizSummary.from(validQuizData);

      expect(quiz.isOk()).toBe(true);
      if (quiz.isOk()) {
        expect(quiz.value.get("question")).toBe("What is TypeScript?");
        expect(quiz.value.get("answerType")).toBe("single_choice");
        expect(quiz.value.get("status")).toBe("pending_approval");
      }
    });

    it("should reject invalid answer type", () => {
      const invalidData = {
        ...(validQuizData as Record<string, unknown>),
        answerType: "invalid_type",
      };

      const result = QuizSummary.from(invalidData);
      expect(result.isErr()).toBe(true);
    });

    it("should reject empty question", () => {
      const invalidData = {
        ...(validQuizData as Record<string, unknown>),
        question: "",
      };

      const result = QuizSummary.from(invalidData);
      expect(result.isErr()).toBe(true);
    });

    it("should enforce approved quiz must have approvedAt", () => {
      const invalidData = {
        ...(validQuizData as Record<string, unknown>),
        status: "approved",
        approvedAt: undefined,
      };

      const result = QuizSummary.from(invalidData);
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(
          result.error.issues.some(
            (issue) =>
              issue.message === "Approved quiz must have approvedAt timestamp",
          ),
        ).toBe(true);
      }
    });

    it("should reject duplicate tag IDs", () => {
      const duplicateTagId = TagId.parse("tag-1");
      const invalidData = {
        ...(validQuizData as Record<string, unknown>),
        tagIds: [duplicateTagId, duplicateTagId],
      };

      const result = QuizSummary.from(invalidData);
      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(
          result.error.issues.some(
            (issue) => issue.message === "Duplicate tag IDs are not allowed",
          ),
        ).toBe(true);
      }
    });

    it("should default empty tagIds array", () => {
      const dataWithoutTags = {
        ...(validQuizData as Record<string, unknown>),
        tagIds: undefined,
      };

      const result = QuizSummary.from(dataWithoutTags);
      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        expect(result.value.get("tagIds")).toEqual([]);
      }
    });
  });

  describe("Factory Methods", () => {
    it("should create QuizSummary from valid data", () => {
      const result = QuizSummary.from(validQuizData);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const quiz = result.value;
        expect(quiz.get("question")).toBe("What is TypeScript?");
        expect(quiz.get("tagIds")).toEqual(validTagIds);
      }
    });

    it("should create QuizSummary with external tag validation", async () => {
      const validateTagIds = async (_tagIds: TagId[]) => {
        // Mock validation that always succeeds
        return Promise.resolve(ok(undefined));
      };

      const result = await QuizSummary.fromWithValidation(
        validQuizData,
        validateTagIds,
      );

      expect(result.isOk()).toBe(true);
    });

    it("should fail with external tag validation error", async () => {
      const validateTagIds = async (_tagIds: TagId[]) => {
        // Mock validation that fails
        return Promise.resolve(err(new Error("Tag not found")));
      };

      const result = await QuizSummary.fromWithValidation(
        validQuizData,
        validateTagIds,
      );

      expect(result.isErr()).toBe(true);
    });

    it("should create from draft", () => {
      const draft = new QuizSummaryDraft();
      draft.setMany(validQuizData as Record<string, unknown>);

      const result = QuizSummary.fromDraft(draft);
      expect(result.isOk()).toBe(true);
    });
  });

  describe("Immutability", () => {
    it("should be completely immutable", () => {
      const result = QuizSummary.from(validQuizData);
      expect(result.isOk()).toBe(true);
      const quiz = result._unsafeUnwrap();

      // Try to modify the quiz (should not affect original)
      const dto = quiz.toDTO();
      dto.question = "Modified question";

      expect(quiz.get("question")).toBe("What is TypeScript?");
    });

    it("should freeze the quiz instance", () => {
      const result = QuizSummary.from(validQuizData);
      expect(result.isOk()).toBe(true);
      const quiz = result._unsafeUnwrap();

      expect(Object.isFrozen(quiz)).toBe(true);
    });
  });

  describe("Generic Getter/Setter", () => {
    it("should get values with type safety", () => {
      const result = QuizSummary.from(validQuizData);
      expect(result.isOk()).toBe(true);
      const quiz = result._unsafeUnwrap();

      const question = quiz.get("question");
      const status = quiz.get("status");
      const tagIds = quiz.get("tagIds");

      expect(question).toBe("What is TypeScript?");
      expect(status).toBe("pending_approval");
      expect(tagIds).toEqual(validTagIds);
    });

    it("should set single field and return new instance", () => {
      const initialResult = QuizSummary.from(validQuizData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();

      const newQuestion = "What is JavaScript?";
      const result = quiz.set("question", newQuestion);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const updatedQuiz = result.value;
        expect(updatedQuiz.get("question")).toBe(newQuestion);
        expect(quiz.get("question")).toBe("What is TypeScript?"); // original unchanged
        expect(quiz).not.toBe(updatedQuiz); // different instances
      }
    });

    it("should update multiple fields with 'with' method", () => {
      const initialResult = QuizSummary.from(validQuizData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();

      const result = quiz.with({
        question: "Updated question",
        explanation: "Updated explanation",
      });

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const updatedQuiz = result.value;
        expect(updatedQuiz.get("question")).toBe("Updated question");
        expect(updatedQuiz.get("explanation")).toBe("Updated explanation");
      }
    });

    it("should update with mutator function", () => {
      const initialResult = QuizSummary.from(validQuizData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();

      const result = quiz.withMutator((draft) => {
        draft.question = "Mutator updated question";
        draft.explanation = "Mutator updated explanation";
      });

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const updatedQuiz = result.value;
        expect(updatedQuiz.get("question")).toBe("Mutator updated question");
        expect(updatedQuiz.get("explanation")).toBe(
          "Mutator updated explanation",
        );
      }
    });

    it("should validate when setting invalid values", () => {
      const initialResult = QuizSummary.from(validQuizData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();

      const result = quiz.set("question", ""); // empty string should fail

      expect(result.isErr()).toBe(true);
    });
  });

  describe("Fluent API", () => {
    it("should chain setter methods", () => {
      const initialResult = QuizSummary.from(validQuizData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();

      const result = quiz
        .setQuestion("New question")
        .andThen((q) => q.setExplanation("New explanation"))
        .andThen((q) => q.setAnswerType("multiple_choice"));

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const finalQuiz = result.value;
        expect(finalQuiz.get("question")).toBe("New question");
        expect(finalQuiz.get("explanation")).toBe("New explanation");
        expect(finalQuiz.get("answerType")).toBe("multiple_choice");
      }
    });
  });

  describe("Business Logic", () => {
    it("should check if quiz can be updated", () => {
      const pendingResult = QuizSummary.from(validQuizData);
      expect(pendingResult.isOk()).toBe(true);
      const pendingQuiz = pendingResult._unsafeUnwrap();
      expect(pendingQuiz.canBeUpdated()).toBe(true);

      const approvedData = {
        ...(validQuizData as Record<string, unknown>),
        status: "approved",
        approvedAt: "2023-12-01T12:00:00.000Z",
      };
      const approvedResult = QuizSummary.from(approvedData);
      expect(approvedResult.isOk()).toBe(true);
      const approvedQuiz = approvedResult._unsafeUnwrap();
      expect(approvedQuiz.canBeUpdated()).toBe(false);
    });

    it("should check if quiz can be deleted", () => {
      const pendingResult = QuizSummary.from(validQuizData);
      expect(pendingResult.isOk()).toBe(true);
      const pendingQuiz = pendingResult._unsafeUnwrap();
      expect(pendingQuiz.canBeDeleted()).toBe(true);

      const rejectedData = {
        ...(validQuizData as Record<string, unknown>),
        status: "rejected",
      };
      const rejectedResult = QuizSummary.from(rejectedData);
      expect(rejectedResult.isOk()).toBe(true);
      const rejectedQuiz = rejectedResult._unsafeUnwrap();
      expect(rejectedQuiz.canBeDeleted()).toBe(true);

      const approvedData = {
        ...(validQuizData as Record<string, unknown>),
        status: "approved",
        approvedAt: "2023-12-01T12:00:00.000Z",
      };
      const approvedResult = QuizSummary.from(approvedData);
      expect(approvedResult.isOk()).toBe(true);
      const approvedQuiz = approvedResult._unsafeUnwrap();
      expect(approvedQuiz.canBeDeleted()).toBe(false);
    });

    it("should approve pending quiz", () => {
      const initialResult = QuizSummary.from(validQuizData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();
      const approvedAt = "2023-12-01T12:00:00.000Z";

      const result = quiz.approve(approvedAt);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const approvedQuiz = result.value;
        expect(approvedQuiz.get("status")).toBe("approved");
        expect(approvedQuiz.get("approvedAt")).toBe(approvedAt);
      }
    });

    it("should not approve already approved quiz", () => {
      const approvedData = {
        ...(validQuizData as Record<string, unknown>),
        status: "approved",
        approvedAt: "2023-12-01T12:00:00.000Z",
      };
      const initialResult = QuizSummary.from(approvedData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();

      const result = quiz.approve("2023-12-02T12:00:00.000Z");

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain("approved cannot be approved");
      }
    });
  });

  describe("Tag Operations", () => {
    it("should add tag to quiz", () => {
      const initialResult = QuizSummary.from({
        ...(validQuizData as Record<string, unknown>),
        tagIds: [],
      });
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();
      const newTagId = TagId.parse("tag-3");

      const result = quiz.addTag(newTagId);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const updatedQuiz = result.value;
        expect(updatedQuiz.get("tagIds")).toContain(newTagId);
        expect(updatedQuiz.get("tagIds")).toHaveLength(1);
      }
    });

    it("should not add duplicate tag", () => {
      const initialResult = QuizSummary.from(validQuizData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();
      const existingTagId = validTagIds[0] as TagId;

      const result = quiz.addTag(existingTagId);

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain("already exists");
      }
    });

    it("should remove tag from quiz", () => {
      const initialResult = QuizSummary.from(validQuizData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();
      const tagToRemove = validTagIds[0] as TagId;

      const result = quiz.removeTag(tagToRemove);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const updatedQuiz = result.value;
        expect(updatedQuiz.get("tagIds")).not.toContain(tagToRemove);
        expect(updatedQuiz.get("tagIds")).toHaveLength(1);
      }
    });

    it("should not remove non-existing tag", () => {
      const initialResult = QuizSummary.from(validQuizData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();
      const nonExistingTagId = TagId.parse("tag-999");

      const result = quiz.removeTag(nonExistingTagId);

      expect(result.isErr()).toBe(true);
      if (result.isErr()) {
        expect(result.error.message).toContain("not found");
      }
    });

    it("should add multiple tags", () => {
      const initialResult = QuizSummary.from({
        ...(validQuizData as Record<string, unknown>),
        tagIds: [],
      });
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();
      const newTagIds = [TagId.parse("tag-3"), TagId.parse("tag-4")];

      const result = quiz.addTags(newTagIds);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const updatedQuiz = result.value;
        expect(updatedQuiz.get("tagIds")).toEqual(newTagIds);
      }
    });

    it("should not add multiple tags with duplicates", () => {
      const initialResult = QuizSummary.from(validQuizData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();
      const newTagIds = [
        validTagIds[0] as TagId, // duplicate
        TagId.parse("tag-3"),
      ];

      const result = quiz.addTags(newTagIds);

      expect(result.isErr()).toBe(true);
    });

    it("should remove multiple tags", () => {
      const initialResult = QuizSummary.from(validQuizData);
      expect(initialResult.isOk()).toBe(true);
      const quiz = initialResult._unsafeUnwrap();

      const result = quiz.removeTags(validTagIds);

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const updatedQuiz = result.value;
        expect(updatedQuiz.get("tagIds")).toEqual([]);
      }
    });
  });

  describe("Draft Class", () => {
    let draft: QuizSummaryDraft;

    beforeEach(() => {
      draft = new QuizSummaryDraft();
    });

    it("should initialize with empty state", () => {
      expect(draft.state).toEqual({});
      expect(draft.errors).toEqual({});
    });

    it("should set and get values", () => {
      draft.set("question", "Draft question");
      draft.set("answerType", "single_choice");

      expect(draft.get("question")).toBe("Draft question");
      expect(draft.get("answerType")).toBe("single_choice");
    });

    it("should set multiple values at once", () => {
      draft.setMany({
        question: "Draft question",
        answerType: "single_choice",
        explanation: "Draft explanation",
      });

      expect(draft.get("question")).toBe("Draft question");
      expect(draft.get("answerType")).toBe("single_choice");
      expect(draft.get("explanation")).toBe("Draft explanation");
    });

    it("should validate and store errors", () => {
      draft.set("question", ""); // invalid empty question

      expect(draft.hasErrors()).toBe(true);
      const questionErrors = draft.getErrors("question");
      expect(questionErrors.length).toBeGreaterThan(0);
    });

    it("should clear errors when valid", () => {
      // First set invalid data
      draft.set("question", "");
      expect(draft.hasErrors()).toBe(true);

      // Then fix the data
      draft.set("question", "Valid question");
      draft.setMany(validQuizData as Record<string, unknown>);
      expect(draft.hasErrors()).toBe(false);
    });

    it("should commit to QuizSummary when valid", () => {
      draft.setMany(validQuizData as Record<string, unknown>);

      const result = draft.commit();

      expect(result.isOk()).toBe(true);
      if (result.isOk()) {
        const quiz = result.value;
        expect(quiz.get("question")).toBe("What is TypeScript?");
      }
    });

    it("should fail to commit when invalid", () => {
      draft.set("question", ""); // invalid

      const result = draft.commit();

      expect(result.isErr()).toBe(true);
    });

    it("should manage tag IDs", () => {
      const tagId1 = TagId.parse("tag-1");
      const tagId2 = TagId.parse("tag-2");

      draft.addTagId(tagId1);
      draft.addTagId(tagId2);
      draft.addTagId(tagId1); // duplicate should not be added again

      expect(draft.get("tagIds")).toEqual([tagId1, tagId2]);

      draft.removeTagId(tagId1);
      expect(draft.get("tagIds")).toEqual([tagId2]);
    });

    it("should clear errors manually", () => {
      draft.set("question", ""); // creates error
      expect(draft.hasErrors()).toBe(true);

      draft.clearErrors();
      expect(draft.hasErrors()).toBe(false);
      expect(draft.errors).toEqual({});
    });

    it("should get specific field errors", () => {
      draft.set("question", "");

      const questionErrors = draft.getErrors("question");
      const nonExistentErrors = draft.getErrors("nonexistent");

      expect(questionErrors.length).toBeGreaterThan(0);
      expect(nonExistentErrors).toEqual([]);
    });
  });

  describe("Type Safety", () => {
    it("should enforce return type constraints", () => {
      const result = QuizSummary.from(validQuizData);
      expect(result.isOk()).toBe(true);
      const quiz = result._unsafeUnwrap();

      // These should compile with correct types
      const question: string = quiz.get("question");
      const status: "pending_approval" | "approved" | "rejected" =
        quiz.get("status");
      const tagIds: TagId[] = quiz.get("tagIds");

      expect(typeof question).toBe("string");
      expect(typeof status).toBe("string");
      expect(Array.isArray(tagIds)).toBe(true);
    });
  });

  describe("Data Transfer", () => {
    it("should convert to DTO", () => {
      const result = QuizSummary.from(validQuizData);
      expect(result.isOk()).toBe(true);
      const quiz = result._unsafeUnwrap();

      const dto = quiz.toDTO();

      expect(dto.question).toBe("What is TypeScript?");
      expect(dto.tagIds).toEqual(validTagIds);

      // Modify DTO should not affect original
      dto.question = "Modified";
      expect(quiz.get("question")).toBe("What is TypeScript?");
    });

    it("should deep clone in toDTO", () => {
      const result = QuizSummary.from(validQuizData);
      expect(result.isOk()).toBe(true);
      const quiz = result._unsafeUnwrap();

      const dto1 = quiz.toDTO();
      const dto2 = quiz.toDTO();

      expect(dto1).toEqual(dto2);
      expect(dto1).not.toBe(dto2); // different objects
      expect(dto1.tagIds).not.toBe(dto2.tagIds); // different arrays
    });
  });
});
