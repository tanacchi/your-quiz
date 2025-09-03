# Mutant 871b858f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3607
**Stable ID**: 871b858f
**Location**: L327:15–L331:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3607
@@ -323,13 +323,9 @@
       });
     });
 
     describe("canBeDeleted status checks", () => {
-      it.each([
-        ["pending_approval", true],
-        ["approved", false],
-        ["rejected", true],
-      ])("should return %s for status %s", (status, expectedCanDelete) => {
+      it.each([])("should return %s for status %s", (status, expectedCanDelete) => {
         const testData = {
           ...(validQuizData as Record<string, unknown>),
           status,
           ...(status === "approved" && {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
