# Mutant b327291a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4474
**Stable ID**: b327291a
**Location**: L377:22–L377:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4474
@@ -373,9 +373,9 @@
           { path: ["question"], code: "invalid", message: "Invalid question" },
           {
             path: ["answerType"],
             code: "invalid",
-            message: "Invalid answerType",
+            message: "",
           },
         ];
 
         const result = suggestQuizSummaryPatches(input, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
