# Mutant b786b498 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3420
**Stable ID**: b786b498
**Location**: L121:11–L121:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3420
@@ -117,9 +117,9 @@
           { solutionId: "" },
           "Too small: expected string to have >=1 characters",
         ],
         [
-          "invalid createdAt format",
+          "",
           { createdAt: "invalid-date" },
           "Invalid SQLite datetime format",
         ],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
