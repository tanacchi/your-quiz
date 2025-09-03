# Mutant ba682a6b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3400
**Stable ID**: ba682a6b
**Location**: L98:11–L98:45

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3400
@@ -94,9 +94,9 @@
         ],
         [
           "invalid status",
           { status: "invalid_status" },
-          "Invalid option: expected one of ",
+          "",
         ],
         [
           "missing creatorId",
           { creatorId: undefined },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
