# Mutant 62a55f8e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3423
**Stable ID**: 62a55f8e
**Location**: L123:11–L123:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3423
@@ -119,9 +119,9 @@
         ],
         [
           "invalid createdAt format",
           { createdAt: "invalid-date" },
-          "Invalid SQLite datetime format",
+          "",
         ],
         [
           "invalid approvedAt format",
           { approvedAt: "invalid-date" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
