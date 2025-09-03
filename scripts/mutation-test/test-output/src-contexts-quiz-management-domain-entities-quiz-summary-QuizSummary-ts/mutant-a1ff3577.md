# Mutant a1ff3577 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 4030
**Stable ID**: a1ff3577
**Location**: L251:19–L251:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #4030
@@ -247,9 +247,9 @@
         kind: "parse",
         issues: [
           {
             path: ["tagIds"],
-            code: "custom",
+            code: "",
             message: `Tags already exist: ${duplicates.join(", ")}`,
           },
         ],
         patches: [],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
