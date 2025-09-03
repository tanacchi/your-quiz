# Mutant 1339e79c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 4011
**Stable ID**: 1339e79c
**Location**: L225:19–L225:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #4011
@@ -221,9 +221,9 @@
         kind: "parse",
         issues: [
           {
             path: ["tagIds"],
-            code: "custom",
+            code: "",
             message: `Tag ${tagId} not found`,
           },
         ],
         patches: [],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
