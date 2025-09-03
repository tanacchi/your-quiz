# Mutant 1a7e2751 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4028
**Stable ID**: 1a7e2751
**Location**: L250:19–L250:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #4028
@@ -246,9 +246,9 @@
       const error: QuizSummaryParseError = {
         kind: "parse",
         issues: [
           {
-            path: ["tagIds"],
+            path: [],
             code: "custom",
             message: `Tags already exist: ${duplicates.join(", ")}`,
           },
         ],
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
