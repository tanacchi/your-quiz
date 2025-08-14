import { beforeEach, describe, expect, it } from "vitest";
import { QuizId, QuizSummary, TagId } from "./QuizSummary";

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
      expect(result.data).toBeDefined();
      expect(result.data).toBe(id);
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
      expect(result.data).toBeDefined();
      expect(result.data).toBe(tagId);
    });
  });

  describe("Schema Validation", () => {
    it("should validate valid quiz data", () => {
      const quiz = QuizSummary.from(validQuizData);

      const entity = quiz._unsafeUnwrap({ withStackTrace: true });
      expect(entity.get("question")).toBe("What is TypeScript?");
      expect(entity.get("answerType")).toBe("single_choice");
      expect(entity.get("status")).toBe("pending_approval");
    });

    it("should reject invalid answer type", () => {
      const invalidData = {
        ...(validQuizData as Record<string, unknown>),
        answerType: "invalid_type",
      };

      const result = QuizSummary.from(invalidData);
      const error = result._unsafeUnwrapErr({ withStackTrace: true });
      expect(error).toBeDefined();
    });

    it("should reject empty question", () => {
      const invalidData = {
        ...(validQuizData as Record<string, unknown>),
        question: "",
      };

      const result = QuizSummary.from(invalidData);
      const error = result._unsafeUnwrapErr({ withStackTrace: true });
      expect(error).toBeDefined();
    });

    it("should enforce approved quiz must have approvedAt", () => {
      const invalidData = {
        ...(validQuizData as Record<string, unknown>),
        status: "approved",
        approvedAt: undefined,
      };

      const result = QuizSummary.from(invalidData);
      const error = result._unsafeUnwrapErr({ withStackTrace: true });
      expect(
        error.issues.some(
          (issue) =>
            issue.message === "Approved quiz must have approvedAt timestamp",
        ),
      ).toBe(true);
    });

    it("should reject duplicate tag IDs", () => {
      const duplicateTagId = TagId.parse("tag-1");
      const invalidData = {
        ...(validQuizData as Record<string, unknown>),
        tagIds: [duplicateTagId, duplicateTagId],
      };

      const result = QuizSummary.from(invalidData);
      const error = result._unsafeUnwrapErr({ withStackTrace: true });
      expect(
        error.issues.some(
          (issue) => issue.message === "Duplicate tag IDs are not allowed",
        ),
      ).toBe(true);
    });

    it("should default empty tagIds array", () => {
      const dataWithoutTags = {
        ...(validQuizData as Record<string, unknown>),
        tagIds: undefined,
      };

      const result = QuizSummary.from(dataWithoutTags);
      const entity = result._unsafeUnwrap({ withStackTrace: true });
      expect(entity.get("tagIds")).toEqual([]);
    });
  });

  describe("Factory Methods", () => {
    it("should create QuizSummary from valid data", () => {
      const result = QuizSummary.from(validQuizData);

      const quiz = result._unsafeUnwrap({ withStackTrace: true });
      expect(quiz.get("question")).toBe("What is TypeScript?");
      expect(quiz.get("tagIds")).toEqual(validTagIds);
    });

    it("should create from draft", () => {
      const draft = new QuizSummary.Draft();
      draft.with(validQuizData as Record<string, unknown>);

      const result = QuizSummary.fromDraft(draft);
      const entity = result._unsafeUnwrap({ withStackTrace: true });
      expect(entity).toBeDefined();
    });
  });

  describe("Immutability", () => {
    it("should be completely immutable", () => {
      const result = QuizSummary.from(validQuizData);
      const quiz = result._unsafeUnwrap({ withStackTrace: true });

      // Try to modify the quiz (should not affect original)
      const dto = quiz.toData();
      dto.question = "Modified question";

      expect(quiz.get("question")).toBe("What is TypeScript?");
    });

    it("should freeze the quiz instance", () => {
      const result = QuizSummary.from(validQuizData);
      const quiz = result._unsafeUnwrap({ withStackTrace: true });

      expect(Object.isFrozen(quiz)).toBe(true);
    });
  });

  describe("Generic Getter/Setter", () => {
    it("should get values with type safety", () => {
      const result = QuizSummary.from(validQuizData);
      const quiz = result._unsafeUnwrap({ withStackTrace: true });

      const question = quiz.get("question");
      const status = quiz.get("status");
      const tagIds = quiz.get("tagIds");

      expect(question).toBe("What is TypeScript?");
      expect(status).toBe("pending_approval");
      expect(tagIds).toEqual(validTagIds);
    });

    it("should set single field and return new instance", () => {
      const initialResult = QuizSummary.from(validQuizData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });

      const newQuestion = "What is JavaScript?";
      const result = quiz.update("question", newQuestion);

      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
      expect(updatedQuiz.get("question")).toBe(newQuestion);
      expect(quiz.get("question")).toBe("What is TypeScript?"); // original unchanged
      expect(quiz).not.toBe(updatedQuiz); // different instances
    });

    it("should update multiple fields with 'with' method", () => {
      const initialResult = QuizSummary.from(validQuizData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });

      const result = quiz.with({
        question: "Updated question",
        explanation: "Updated explanation",
      });

      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
      expect(updatedQuiz.get("question")).toBe("Updated question");
      expect(updatedQuiz.get("explanation")).toBe("Updated explanation");
    });

    it("should update with mutator function", () => {
      const initialResult = QuizSummary.from(validQuizData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });

      const result = quiz.withMutator((draft) => {
        draft.question = "Mutator updated question";
        draft.explanation = "Mutator updated explanation";
      });

      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
      expect(updatedQuiz.get("question")).toBe("Mutator updated question");
      expect(updatedQuiz.get("explanation")).toBe(
        "Mutator updated explanation",
      );
    });

    it("should validate when setting invalid values", () => {
      const initialResult = QuizSummary.from(validQuizData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });

      const result = quiz.update("question", ""); // empty string should fail

      const error = result._unsafeUnwrapErr({ withStackTrace: true });
      expect(error).toBeDefined();
    });
  });

  describe("Fluent API", () => {
    it("should chain setter methods", () => {
      const initialResult = QuizSummary.from(validQuizData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });

      const result = quiz
        .update("question", "New question")
        .andThen((q) => q.update("explanation", "New explanation"))
        .andThen((q) => q.update("answerType", "multiple_choice"));

      const finalQuiz = result._unsafeUnwrap({ withStackTrace: true });
      expect(finalQuiz.get("question")).toBe("New question");
      expect(finalQuiz.get("explanation")).toBe("New explanation");
      expect(finalQuiz.get("answerType")).toBe("multiple_choice");
    });
  });

  describe("Business Logic", () => {
    it("should check if quiz can be updated", () => {
      const pendingResult = QuizSummary.from(validQuizData);
      const pendingQuiz = pendingResult._unsafeUnwrap({ withStackTrace: true });
      expect(pendingQuiz.canBeUpdated()).toBe(true);

      const approvedData = {
        ...(validQuizData as Record<string, unknown>),
        status: "approved",
        approvedAt: "2023-12-01T12:00:00.000Z",
      };
      const approvedResult = QuizSummary.from(approvedData);
      const approvedQuiz = approvedResult._unsafeUnwrap({
        withStackTrace: true,
      });
      expect(approvedQuiz.canBeUpdated()).toBe(false);
    });

    it("should check if quiz can be deleted", () => {
      const pendingResult = QuizSummary.from(validQuizData);
      const pendingQuiz = pendingResult._unsafeUnwrap({ withStackTrace: true });
      expect(pendingQuiz.canBeDeleted()).toBe(true);

      const rejectedData = {
        ...(validQuizData as Record<string, unknown>),
        status: "rejected",
      };
      const rejectedResult = QuizSummary.from(rejectedData);
      const rejectedQuiz = rejectedResult._unsafeUnwrap({
        withStackTrace: true,
      });
      expect(rejectedQuiz.canBeDeleted()).toBe(true);

      const approvedData = {
        ...(validQuizData as Record<string, unknown>),
        status: "approved",
        approvedAt: "2023-12-01T12:00:00.000Z",
      };
      const approvedResult = QuizSummary.from(approvedData);
      const approvedQuiz = approvedResult._unsafeUnwrap({
        withStackTrace: true,
      });
      expect(approvedQuiz.canBeDeleted()).toBe(false);
    });

    it("should approve pending quiz", () => {
      const initialResult = QuizSummary.from(validQuizData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
      const approvedAt = "2023-12-01T12:00:00.000Z";

      const result = quiz.approve(approvedAt);

      const approvedQuiz = result._unsafeUnwrap({ withStackTrace: true });
      expect(approvedQuiz.get("status")).toBe("approved");
      expect(approvedQuiz.get("approvedAt")).toBe(approvedAt);
    });

    it("should not approve already approved quiz", () => {
      const approvedData = {
        ...(validQuizData as Record<string, unknown>),
        status: "approved",
        approvedAt: "2023-12-01T12:00:00.000Z",
      };
      const initialResult = QuizSummary.from(approvedData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });

      const result = quiz.approve("2023-12-02T12:00:00.000Z");

      const error = result._unsafeUnwrapErr({ withStackTrace: true });
      expect(
        error.issues.some((issue) =>
          issue.message.includes("approved cannot be approved"),
        ),
      ).toBe(true);
    });
  });

  describe("Tag Operations", () => {
    it("should add tag to quiz", () => {
      const initialResult = QuizSummary.from({
        ...(validQuizData as Record<string, unknown>),
        tagIds: [],
      });
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
      const newTagId = TagId.parse("tag-3");

      const result = quiz.addTag(newTagId);

      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
      expect(updatedQuiz.get("tagIds")).toContain(newTagId);
      expect(updatedQuiz.get("tagIds")).toHaveLength(1);
    });

    it("should not add duplicate tag", () => {
      const initialResult = QuizSummary.from(validQuizData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
      const existingTagId = validTagIds[0] as TagId;

      const result = quiz.addTag(existingTagId);

      const error = result._unsafeUnwrapErr({ withStackTrace: true });
      expect(
        error.issues.some((issue) => issue.message.includes("already exists")),
      ).toBe(true);
    });

    it("should remove tag from quiz", () => {
      const initialResult = QuizSummary.from(validQuizData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
      const tagToRemove = validTagIds[0] as TagId;

      const result = quiz.removeTag(tagToRemove);

      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
      expect(updatedQuiz.get("tagIds")).not.toContain(tagToRemove);
      expect(updatedQuiz.get("tagIds")).toHaveLength(1);
    });

    it("should not remove non-existing tag", () => {
      const initialResult = QuizSummary.from(validQuizData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
      const nonExistingTagId = TagId.parse("tag-999");

      const result = quiz.removeTag(nonExistingTagId);

      const error = result._unsafeUnwrapErr({ withStackTrace: true });
      expect(
        error.issues.some((issue) => issue.message.includes("not found")),
      ).toBe(true);
    });

    it("should add multiple tags", () => {
      const initialResult = QuizSummary.from({
        ...(validQuizData as Record<string, unknown>),
        tagIds: [],
      });
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
      const newTagIds = [TagId.parse("tag-3"), TagId.parse("tag-4")];

      const result = quiz.addTags(newTagIds);

      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
      expect(updatedQuiz.get("tagIds")).toEqual(newTagIds);
    });

    it("should not add multiple tags with duplicates", () => {
      const initialResult = QuizSummary.from(validQuizData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
      const newTagIds = [
        validTagIds[0] as TagId, // duplicate
        TagId.parse("tag-3"),
      ];

      const result = quiz.addTags(newTagIds);

      const error = result._unsafeUnwrapErr({ withStackTrace: true });
      expect(error).toBeDefined();
    });

    it("should remove multiple tags", () => {
      const initialResult = QuizSummary.from(validQuizData);
      const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });

      const result = quiz.removeTags(validTagIds);

      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
      expect(updatedQuiz.get("tagIds")).toEqual([]);
    });
  });

  describe("Draft Class", () => {
    let draft: InstanceType<typeof QuizSummary.Draft>;

    beforeEach(() => {
      draft = new QuizSummary.Draft();
    });

    it("should initialize with empty state", () => {
      expect(draft.state).toEqual({});
    });

    it("should set and get values", () => {
      draft.update("question", "Draft question");
      draft.update("answerType", "single_choice");

      expect(draft.get("question")).toBe("Draft question");
      expect(draft.get("answerType")).toBe("single_choice");
    });

    it("should set multiple values at once", () => {
      draft.with({
        question: "Draft question",
        answerType: "single_choice",
        explanation: "Draft explanation",
      });

      expect(draft.get("question")).toBe("Draft question");
      expect(draft.get("answerType")).toBe("single_choice");
      expect(draft.get("explanation")).toBe("Draft explanation");
    });

    it("should validate and store errors", () => {
      draft.update("question", ""); // invalid empty question

      expect(draft.hasErrors()).toBe(true);
      const questionErrors = draft.getErrors("question");
      expect(questionErrors.length).toBeGreaterThan(0);
    });

    it("should clear errors when valid", () => {
      // First set invalid data
      draft.update("question", "");
      expect(draft.hasErrors()).toBe(true);

      // Then fix the data
      draft.update("question", "Valid question");
      draft.with(validQuizData as Record<string, unknown>);
      expect(draft.hasErrors()).toBe(false);
    });

    it("should commit to QuizSummary when valid", () => {
      draft.with(validQuizData as Record<string, unknown>);

      const result = draft.commit();

      const quiz = result._unsafeUnwrap({ withStackTrace: true });
      expect(quiz.get("question")).toBe("What is TypeScript?");
    });

    it("should fail to commit when invalid", () => {
      draft.update("question", ""); // invalid

      const result = draft.commit();

      const error = result._unsafeUnwrapErr({ withStackTrace: true });
      expect(error).toBeDefined();
    });

    it("should clear errors manually", () => {
      draft.update("question", ""); // creates error
      expect(draft.hasErrors()).toBe(true);

      draft.clearErrors();
      expect(draft.hasErrors()).toBe(false);
    });

    it("should get specific field errors", () => {
      draft.update("question", "");

      const questionErrors = draft.getErrors("question");
      const nonExistentErrors = draft.getErrors("nonexistent");

      expect(questionErrors.length).toBeGreaterThan(0);
      expect(nonExistentErrors).toEqual([]);
    });
  });

  describe("Type Safety", () => {
    it("should enforce return type constraints", () => {
      const result = QuizSummary.from(validQuizData);
      const quiz = result._unsafeUnwrap({ withStackTrace: true });

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
    it("should convert to Data", () => {
      const result = QuizSummary.from(validQuizData);
      const quiz = result._unsafeUnwrap({ withStackTrace: true });

      const dto = quiz.toData();

      expect(dto.question).toBe("What is TypeScript?");
      expect(dto.tagIds).toEqual(validTagIds);

      // Modify Data should not affect original
      dto.question = "Modified";
      expect(quiz.get("question")).toBe("What is TypeScript?");
    });

    it("should deep clone in toData", () => {
      const result = QuizSummary.from(validQuizData);
      const quiz = result._unsafeUnwrap({ withStackTrace: true });

      const dto1 = quiz.toData();
      const dto2 = quiz.toData();

      expect(dto1).toEqual(dto2);
      expect(dto1).not.toBe(dto2); // different objects
      expect(dto1.tagIds).not.toBe(dto2.tagIds); // different arrays
    });
  });
});
