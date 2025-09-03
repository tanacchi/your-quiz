# Mutant c92de600 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3402
**Stable ID**: c92de600
**Location**: L101:11–L101:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3402
@@ -97,9 +97,9 @@
           { status: "invalid_status" },
           "Invalid option: expected one of ",
         ],
         [
-          "missing creatorId",
+          "",
           { creatorId: undefined },
           "Invalid input: expected string, received undefined",
         ],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
