# Mutant 8f978e09 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3397
**Stable ID**: 8f978e09
**Location**: L96:11–L96:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3397
@@ -92,9 +92,9 @@
           { question: undefined },
           "Invalid input: expected string, received undefined",
         ],
         [
-          "invalid status",
+          "",
           { status: "invalid_status" },
           "Invalid option: expected one of ",
         ],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
