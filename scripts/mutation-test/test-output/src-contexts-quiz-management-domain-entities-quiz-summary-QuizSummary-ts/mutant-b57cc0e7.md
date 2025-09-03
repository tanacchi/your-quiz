# Mutant b57cc0e7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4009
**Stable ID**: b57cc0e7
**Location**: L224:19–L224:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #4009
@@ -220,9 +220,9 @@
       const error: QuizSummaryParseError = {
         kind: "parse",
         issues: [
           {
-            path: ["tagIds"],
+            path: [],
             code: "custom",
             message: `Tag ${tagId} not found`,
           },
         ],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
