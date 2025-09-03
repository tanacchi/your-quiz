# Mutant ee0f4979 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
**Mutator**: StringLiteral
**Original ID**: 4032
**Stable ID**: ee0f4979
**Location**: L252:61–L252:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.ts	mutated #4032
@@ -248,9 +248,9 @@
         issues: [
           {
             path: ["tagIds"],
             code: "custom",
-            message: `Tags already exist: ${duplicates.join(", ")}`,
+            message: `Tags already exist: ${duplicates.join("")}`,
           },
         ],
         patches: [],
       };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
