# Mutant 37e5ee26 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 4029
**Stable ID**: 37e5ee26
**Location**: L250:20–L250:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #4029
@@ -246,9 +246,9 @@
       const error: QuizSummaryParseError = {
         kind: "parse",
         issues: [
           {
-            path: ["tagIds"],
+            path: [""],
             code: "custom",
             message: `Tags already exist: ${duplicates.join(", ")}`,
           },
         ],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
