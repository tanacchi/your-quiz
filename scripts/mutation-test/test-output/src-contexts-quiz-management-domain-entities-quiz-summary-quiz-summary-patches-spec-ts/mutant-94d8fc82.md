# Mutant 94d8fc82 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4619
**Stable ID**: 94d8fc82
**Location**: L489:59–L489:75

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4619
@@ -485,9 +485,9 @@
               code: "invalid",
               message: "Invalid answerType",
             },
             { path: ["status"], code: "invalid", message: "Invalid status" },
-            { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
+            { path: ["tagIds"], code: "invalid", message: "" },
           ];
 
           const patches = suggestQuizSummaryPatches(input, issues);
           const patched: QuizSummaryInput =
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
