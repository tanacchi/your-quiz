# Mutant bd877023 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3592
**Stable ID**: bd877023
**Location**: L311:10–L311:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3592
@@ -307,9 +307,9 @@
       it.each([
         ["pending_approval", true],
         ["approved", false],
         ["rejected", false],
-      ])("should return %s for status %s", (status, expectedCanUpdate) => {
+      ])("", (status, expectedCanUpdate) => {
         const testData = {
           ...(validQuizData as Record<string, unknown>),
           status,
           ...(status === "approved" && {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
