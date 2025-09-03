# Mutant da9d9471 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 3988
**Stable ID**: da9d9471
**Location**: L198:20–L198:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #3988
@@ -194,9 +194,9 @@
       const error: QuizSummaryParseError = {
         kind: "parse",
         issues: [
           {
-            path: ["tagIds"],
+            path: [""],
             code: "custom",
             message: `Tag ${tagId} already exists`,
           },
         ],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
