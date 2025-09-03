# Mutant cb2ada0b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3648
**Stable ID**: cb2ada0b
**Location**: L362:10–L362:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3648
@@ -358,9 +358,9 @@
 
       it.each([
         ["approved", "2023-12-01 12:00:00"],
         ["rejected", undefined],
-      ])("should reject approval for %s status", (status, approvedAt) => {
+      ])("", (status, approvedAt) => {
         const testData = {
           ...(validQuizData as Record<string, unknown>),
           status,
           ...(approvedAt && { approvedAt }),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
