# Mutant d8dffe4d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3582
**Stable ID**: d8dffe4d
**Location**: L307:15–L311:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3582
@@ -303,13 +303,9 @@
   });
 
   describe("Business Logic", () => {
     describe("canBeUpdated status checks", () => {
-      it.each([
-        ["pending_approval", true],
-        ["approved", false],
-        ["rejected", false],
-      ])("should return %s for status %s", (status, expectedCanUpdate) => {
+      it.each([])("should return %s for status %s", (status, expectedCanUpdate) => {
         const testData = {
           ...(validQuizData as Record<string, unknown>),
           status,
           ...(status === "approved" && {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
