# Mutant d42814da Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3395
**Stable ID**: d42814da
**Location**: L93:11–L93:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3395
@@ -89,9 +89,9 @@
         ],
         [
           "missing question",
           { question: undefined },
-          "Invalid input: expected string, received undefined",
+          "",
         ],
         [
           "invalid status",
           { status: "invalid_status" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
