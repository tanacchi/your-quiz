# Mutant d94027bf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BlockStatement
**Original ID**: 3380
**Stable ID**: d94027bf
**Location**: L78:44–L144:6

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3380
@@ -74,76 +74,10 @@
       expect(entity.get("answerType")).toBe("single_choice");
       expect(entity.get("status")).toBe("pending_approval");
     });
 
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
+    describe("Invalid field values", () => {});
 
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
     describe("Business rule validations", () => {
       it.each([
         [
           "approved quiz must have approvedAt",
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
