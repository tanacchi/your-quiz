import { beforeEach, describe, expect, it } from "vitest";
import { QuizId, QuizSummary, TagId } from "./QuizSummary";

describe("QuizSummary", () => {
  const validTagIds = [TagId.parse("tag-1"), TagId.parse("tag-2")] as const;

  const validQuizData = {
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
  } as const;

  beforeEach(() => {});

  describe("Brand Types", () => {
    describe("QuizId validation", () => {
      it.each([
        ["valid alphanumeric", "quiz-1", true],
        ["valid with numbers", "quiz123", true],
        ["valid with underscore", "quiz_test", true],
        ["valid with dash", "quiz-test", true],
        ["valid single char", "q", true],
        ["empty string", "", false],
        ["only spaces", "   ", true], // min(1) では空でなければ有効
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should handle %s: %s", (_desc, input, isValid) => {
        const result = QuizId.safeParse(input);

        expect(result.success).toBe(isValid);
        if (isValid && result.success) {
          expect(result.data).toBeDefined();
          expect(result.data).toBe(input);
        }
      });
    });

    describe("TagId validation", () => {
      it.each([
        ["valid alphanumeric", "tag-1", true],
        ["valid with numbers", "tag123", true],
        ["valid with underscore", "tag_test", true],
        ["valid with dash", "tag-test", true],
        ["valid single char", "t", true],
        ["empty string", "", false],
        ["only spaces", "   ", true], // min(1) では空でなければ有効
        ["null value", null, false],
        ["undefined value", undefined, false],
      ])("should handle %s: %s", (_desc, input, isValid) => {
        const result = TagId.safeParse(input);

        expect(result.success).toBe(isValid);
        if (isValid && result.success) {
          expect(result.data).toBeDefined();
          expect(result.data).toBe(input);
        }
      });
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

    describe("Invalid field values", () => {
      it.each([
        [
          "invalid answer type",
          { answerType: "invalid_type" },
          "Invalid enum value",
        ],
        ["empty question", { question: "" }, "String must contain at least"],
        ["missing question", { question: undefined }, "Required"],
        ["invalid status", { status: "invalid_status" }, "Invalid enum value"],
        ["missing creatorId", { creatorId: undefined }, "Required"],
        ["empty creatorId", { creatorId: "" }, "String must contain at least"],
        ["missing solutionId", { solutionId: undefined }, "Required"],
        [
          "empty solutionId",
          { solutionId: "" },
          "String must contain at least",
        ],
        [
          "invalid createdAt format",
          { createdAt: "invalid-date" },
          "Invalid ISO8601 datetime",
        ],
        [
          "invalid approvedAt format",
          { approvedAt: "invalid-date" },
          "Invalid ISO8601 datetime",
        ],
      ])("should reject %s", (_desc, invalidFields, expectedErrorMessage) => {
        const invalidData = {
          ...(validQuizData as Record<string, unknown>),
          ...invalidFields,
        };

        const result = QuizSummary.from(invalidData);
        const error = result._unsafeUnwrapErr({ withStackTrace: true });
        expect(
          error.issues.some((issue) =>
            issue.message.includes(expectedErrorMessage),
          ),
        ).toBe(true);
      });
    });

    describe("Business rule validations", () => {
      it.each([
        [
          "approved quiz must have approvedAt",
          { status: "approved", approvedAt: undefined },
          "Approved quiz must have approvedAt timestamp",
        ],
        [
          "duplicate tag IDs",
          { tagIds: [TagId.parse("tag-1"), TagId.parse("tag-1")] },
          "Duplicate tag IDs are not allowed",
        ],
      ])("should enforce %s", (_desc, invalidFields, expectedErrorMessage) => {
        const invalidData = {
          ...(validQuizData as Record<string, unknown>),
          ...invalidFields,
        };

        const result = QuizSummary.from(invalidData);
        const error = result._unsafeUnwrapErr({ withStackTrace: true });
        expect(
          error.issues.some((issue) => issue.message === expectedErrorMessage),
        ).toBe(true);
      });
    });

    describe("Default value handling", () => {
      it.each([
        ["undefined tagIds", { tagIds: undefined }, []],
        ["null tagIds", { tagIds: null }, []],
        ["missing tagIds", {}, []],
      ])(
        "should handle %s and default to empty array",
        (_desc, modification, expectedTagIds) => {
          const testData = {
            ...(validQuizData as Record<string, unknown>),
            ...modification,
          };
          const result = QuizSummary.from(testData);
          const entity = result._unsafeUnwrap({ withStackTrace: true });
          expect(entity.get("tagIds")).toEqual(expectedTagIds);
        },
      );
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
    describe("canBeUpdated status checks", () => {
      it.each([
        ["pending_approval", true],
        ["approved", false],
        ["rejected", false],
      ])("should return %s for status %s", (status, expectedCanUpdate) => {
        const testData = {
          ...(validQuizData as Record<string, unknown>),
          status,
          ...(status === "approved" && {
            approvedAt: "2023-12-01T12:00:00.000Z",
          }),
        };

        const result = QuizSummary.from(testData);
        const quiz = result._unsafeUnwrap({ withStackTrace: true });
        expect(quiz.canBeUpdated()).toBe(expectedCanUpdate);
      });
    });

    describe("canBeDeleted status checks", () => {
      it.each([
        ["pending_approval", true],
        ["approved", false],
        ["rejected", true],
      ])("should return %s for status %s", (status, expectedCanDelete) => {
        const testData = {
          ...(validQuizData as Record<string, unknown>),
          status,
          ...(status === "approved" && {
            approvedAt: "2023-12-01T12:00:00.000Z",
          }),
        };

        const result = QuizSummary.from(testData);
        const quiz = result._unsafeUnwrap({ withStackTrace: true });
        expect(quiz.canBeDeleted()).toBe(expectedCanDelete);
      });
    });

    describe("approve method state transitions", () => {
      it("should approve pending quiz successfully", () => {
        const initialResult = QuizSummary.from(validQuizData);
        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
        const approvedAt = "2023-12-01T12:00:00.000Z";

        const result = quiz.approve(approvedAt);

        const approvedQuiz = result._unsafeUnwrap({ withStackTrace: true });
        expect(approvedQuiz.get("status")).toBe("approved");
        expect(approvedQuiz.get("approvedAt")).toBe(approvedAt);
      });

      it.each([
        ["approved", "2023-12-01T12:00:00.000Z"],
        ["rejected", undefined],
      ])("should reject approval for %s status", (status, approvedAt) => {
        const testData = {
          ...(validQuizData as Record<string, unknown>),
          status,
          ...(approvedAt && { approvedAt }),
        };
        const initialResult = QuizSummary.from(testData);
        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });

        const result = quiz.approve("2023-12-02T12:00:00.000Z");

        const error = result._unsafeUnwrapErr({ withStackTrace: true });
        expect(
          error.issues.some((issue) =>
            issue.message.includes(`${status} cannot be approved`),
          ),
        ).toBe(true);
      });
    });
  });

  describe("Tag Operations", () => {
    describe("Single tag operations", () => {
      describe("addTag success scenarios", () => {
        it.each([
          ["empty tag list", []],
          ["existing tags", [TagId.parse("tag-other")]],
        ])("should add tag to quiz with %s", (_desc, initialTagIds) => {
          const initialResult = QuizSummary.from({
            ...(validQuizData as Record<string, unknown>),
            tagIds: initialTagIds,
          });
          const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
          const newTagId = TagId.parse("tag-new");

          const result = quiz.addTag(newTagId);

          const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
          expect(updatedQuiz.get("tagIds")).toContain(newTagId);
          expect(updatedQuiz.get("tagIds")).toHaveLength(
            initialTagIds.length + 1,
          );
        });
      });

      it("should not add duplicate tag", () => {
        const initialResult = QuizSummary.from(validQuizData);
        const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
        const existingTagId = validTagIds[0] as TagId;

        const result = quiz.addTag(existingTagId);

        const error = result._unsafeUnwrapErr({ withStackTrace: true });
        expect(
          error.issues.some((issue) =>
            issue.message.includes("already exists"),
          ),
        ).toBe(true);
      });

      describe("removeTag scenarios", () => {
        it.each([
          ["first tag", 0, 1],
          ["second tag", 1, 1],
        ])(
          "should remove %s from quiz",
          (_desc, tagIndex, expectedRemainingCount) => {
            const initialResult = QuizSummary.from(validQuizData);
            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
            const tagToRemove = validTagIds[tagIndex] as TagId;

            const result = quiz.removeTag(tagToRemove);

            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
            expect(updatedQuiz.get("tagIds")).not.toContain(tagToRemove);
            expect(updatedQuiz.get("tagIds")).toHaveLength(
              expectedRemainingCount,
            );
          },
        );

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
      });
    });

    describe("Multiple tag operations", () => {
      describe("addTags success scenarios", () => {
        it.each([
          ["empty list", [], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
          ["existing tags", [TagId.parse("tag-other")], [TagId.parse("tag-3")]],
        ])(
          "should add multiple tags to quiz with %s",
          (_desc, initialTagIds, newTagIds) => {
            const initialResult = QuizSummary.from({
              ...(validQuizData as Record<string, unknown>),
              tagIds: initialTagIds,
            });
            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });

            const result = quiz.addTags(newTagIds);

            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
            const finalTagIds = updatedQuiz.get("tagIds");
            expect(finalTagIds).toEqual([...initialTagIds, ...newTagIds]);
          },
        );
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
        expect(
          error.issues.some((issue) => issue.message.includes("already exist")),
        ).toBe(true);
      });

      describe("removeTags scenarios", () => {
        it.each([
          ["all tags", validTagIds, []],
          [
            "partial tags",
            [TagId.parse(validTagIds[0])],
            [TagId.parse(validTagIds[1])],
          ],
          ["non-existing tags", [TagId.parse("tag-999")], validTagIds],
        ])(
          "should remove %s from quiz",
          (_desc, tagsToRemove, expectedRemaining) => {
            const initialResult = QuizSummary.from(validQuizData);
            const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });

            const result = quiz.removeTags(tagsToRemove as TagId[]);

            const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
            expect(updatedQuiz.get("tagIds")).toEqual(expectedRemaining);
          },
        );
      });
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

    describe("Field operations", () => {
      it.each([
        ["question", "Draft question"],
        ["answerType", "single_choice"],
        ["explanation", "Draft explanation"],
        ["creatorId", "draft-creator"],
        ["solutionId", "draft-solution"],
      ])("should set and get %s field", (field, value) => {
        draft.update(field as keyof typeof validQuizData, value);
        expect(draft.get(field as keyof typeof validQuizData)).toBe(value);
      });
    });

    it("should set multiple values at once", () => {
      const updates = {
        question: "Draft question",
        answerType: "single_choice",
        explanation: "Draft explanation",
      } as const;

      draft.with(updates);

      expect(draft.get("question")).toBe("Draft question");
      expect(draft.get("answerType")).toBe("single_choice");
      expect(draft.get("explanation")).toBe("Draft explanation");
    });

    describe("Validation error handling", () => {
      it.each([
        ["empty question", { question: "" }, "question"],
        ["invalid answerType", { answerType: "invalid" }, "answerType"],
        ["empty creatorId", { creatorId: "" }, "creatorId"],
        ["empty solutionId", { solutionId: "" }, "solutionId"],
        ["invalid createdAt", { createdAt: "invalid-date" }, "createdAt"],
      ])(
        "should validate and store errors for %s",
        (_desc, invalidData, errorField) => {
          Object.entries(invalidData).forEach(([key, value]) => {
            draft.update(key as keyof typeof validQuizData, value);
          });

          expect(draft.hasErrors()).toBe(true);
          const fieldErrors = draft.getErrors(errorField);
          expect(fieldErrors.length).toBeGreaterThan(0);
        },
      );

      it("should clear errors when data becomes valid", () => {
        // First set invalid data
        draft.update("question", "");
        expect(draft.hasErrors()).toBe(true);

        // Then fix the data
        draft.update("question", "Valid question");
        draft.with(validQuizData as Record<string, unknown>);
        expect(draft.hasErrors()).toBe(false);
      });
    });

    describe("Commit operations", () => {
      it("should commit to QuizSummary when valid", () => {
        draft.with(validQuizData as Record<string, unknown>);

        const result = draft.commit();

        const quiz = result._unsafeUnwrap({ withStackTrace: true });
        expect(quiz.get("question")).toBe("What is TypeScript?");
      });

      it.each([
        ["empty question", { question: "" }],
        ["invalid answerType", { answerType: "invalid" }],
        ["missing creatorId", { creatorId: undefined }],
        ["missing solutionId", { solutionId: undefined }],
      ])("should fail to commit with %s", (_desc, invalidData) => {
        draft.with({
          ...(validQuizData as Record<string, unknown>),
          ...invalidData,
        } as Parameters<typeof draft.with>[0]);

        const result = draft.commit();

        const error = result._unsafeUnwrapErr({ withStackTrace: true });
        expect(error).toBeDefined();
        expect(error.issues.length).toBeGreaterThan(0);
      });
    });

    describe("Error management", () => {
      it("should clear errors manually", () => {
        draft.update("question", ""); // creates error
        expect(draft.hasErrors()).toBe(true);

        draft.clearErrors();
        expect(draft.hasErrors()).toBe(false);
      });

      it.each([
        ["existing field", "question", ""],
        ["non-existent field", "nonexistent", ""],
      ])("should get errors for %s", (_desc, field, invalidValue) => {
        if (field === "question") {
          draft.update("question", invalidValue);
        }

        const fieldErrors = draft.getErrors(field);

        if (field === "question") {
          expect(fieldErrors.length).toBeGreaterThan(0);
        } else {
          expect(fieldErrors).toEqual([]);
        }
      });
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
