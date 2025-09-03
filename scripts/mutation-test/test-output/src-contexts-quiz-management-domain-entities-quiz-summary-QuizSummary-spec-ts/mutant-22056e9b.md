# Mutant 22056e9b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3381
**Stable ID**: 22056e9b
**Location**: L79:15–L130:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3381
@@ -75,60 +75,9 @@
       expect(entity.get("status")).toBe("pending_approval");
     });
 
     describe("Invalid field values", () => {
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
+      it.each([])("should reject %s", (_desc, invalidFields, expectedErrorMessage) => {
         const invalidData = {
           ...(validQuizData as Record<string, unknown>),
           ...invalidFields,
         };
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
