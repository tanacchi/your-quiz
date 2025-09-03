# Mutant 23b9a0a4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3368
**Stable ID**: 23b9a0a4
**Location**: L68:39–L190:4

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3368
@@ -64,132 +64,10 @@
       });
     });
   });
 
-  describe("Schema Validation", () => {
-    it("should validate valid quiz data", () => {
-      const quiz = QuizSummary.from(validQuizData);
+  describe("Schema Validation", () => {});
 
-      const entity = quiz._unsafeUnwrap({ withStackTrace: true });
-      expect(entity.get("question")).toBe("What is TypeScript?");
-      expect(entity.get("answerType")).toBe("single_choice");
-      expect(entity.get("status")).toBe("pending_approval");
-    });
-
-    describe("Invalid field values", () => {
-      it.each([
-        [
-          "invalid answer type",
-          { answerType: "invalid_type" },
-          "Invalid option: expected one of ",
-        ],
-        [
-          "empty question",
-          { question: "" },
-          "Too small: expected string to have >=1 characters",
-        ],
-        [
-          "missing question",
-          { question: undefined },
-          "Invalid input: expected string, received undefined",
-        ],
-        [
-          "invalid status",
-          { status: "invalid_status" },
-          "Invalid option: expected one of ",
-        ],
-        [
-          "missing creatorId",
-          { creatorId: undefined },
-          "Invalid input: expected string, received undefined",
-        ],
-        [
-          "empty creatorId",
-          { creatorId: "" },
-          "Too small: expected string to have >=1 characters",
-        ],
-        [
-          "missing solutionId",
-          { solutionId: undefined },
-          "Invalid input: expected string, received undefined",
-        ],
-        [
-          "empty solutionId",
-          { solutionId: "" },
-          "Too small: expected string to have >=1 characters",
-        ],
-        [
-          "invalid createdAt format",
-          { createdAt: "invalid-date" },
-          "Invalid SQLite datetime format",
-        ],
-        [
-          "invalid approvedAt format",
-          { approvedAt: "invalid-date" },
-          "Invalid SQLite datetime format",
-        ],
-      ])("should reject %s", (_desc, invalidFields, expectedErrorMessage) => {
-        const invalidData = {
-          ...(validQuizData as Record<string, unknown>),
-          ...invalidFields,
-        };
-
-        const result = QuizSummary.from(invalidData);
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
-        expect(error.issues).toContainEqual(
-          expect.objectContaining({
-            message: expect.stringContaining(expectedErrorMessage),
-          }),
-        );
-      });
-    });
-
-    describe("Business rule validations", () => {
-      it.each([
-        [
-          "approved quiz must have approvedAt",
-          { status: "approved", approvedAt: undefined },
-          "Approved quiz must have approvedAt timestamp",
-        ],
-        [
-          "duplicate tag IDs",
-          { tagIds: [TagId.parse("tag-1"), TagId.parse("tag-1")] },
-          "Duplicate tag IDs are not allowed",
-        ],
-      ])("should enforce %s", (_desc, invalidFields, expectedErrorMessage) => {
-        const invalidData = {
-          ...(validQuizData as Record<string, unknown>),
-          ...invalidFields,
-        };
-
-        const result = QuizSummary.from(invalidData);
-        const error = result._unsafeUnwrapErr({ withStackTrace: true });
-        expect(
-          error.issues.some((issue) => issue.message === expectedErrorMessage),
-        ).toBe(true);
-      });
-    });
-
-    describe("Default value handling", () => {
-      it.each([
-        ["undefined tagIds", { tagIds: undefined }, []],
-        ["null tagIds", { tagIds: null }, []],
-        ["missing tagIds", {}, validQuizData.tagIds],
-      ])(
-        "should handle %s and default to empty array",
-        (_desc, modification, expectedTagIds) => {
-          const testData = {
-            ...(validQuizData as Record<string, unknown>),
-            ...modification,
-          };
-          const result = QuizSummary.from(testData);
-          const entity = result._unsafeUnwrap({ withStackTrace: true });
-          expect(entity.get("tagIds")).toEqual(expectedTagIds);
-        },
-      );
-    });
-  });
-
   describe("Factory Methods", () => {
     it("should create QuizSummary from valid data", () => {
       const result = QuizSummary.from(validQuizData);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
