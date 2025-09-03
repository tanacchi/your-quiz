# Mutant a9c711d4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3422
**Stable ID**: a9c711d4
**Location**: L122:24–L122:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3422
@@ -118,9 +118,9 @@
           "Too small: expected string to have >=1 characters",
         ],
         [
           "invalid createdAt format",
-          { createdAt: "invalid-date" },
+          { createdAt: "" },
           "Invalid SQLite datetime format",
         ],
         [
           "invalid approvedAt format",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
