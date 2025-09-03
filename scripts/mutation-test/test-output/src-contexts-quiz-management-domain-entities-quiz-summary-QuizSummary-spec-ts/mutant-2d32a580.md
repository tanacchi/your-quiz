# Mutant 2d32a580 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3399
**Stable ID**: 2d32a580
**Location**: L97:21–L97:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3399
@@ -93,9 +93,9 @@
           "Invalid input: expected string, received undefined",
         ],
         [
           "invalid status",
-          { status: "invalid_status" },
+          { status: "" },
           "Invalid option: expected one of ",
         ],
         [
           "missing creatorId",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
