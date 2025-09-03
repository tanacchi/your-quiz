# Mutant 3769f8c3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4538
**Stable ID**: 3769f8c3
**Location**: L430:22–L430:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4538
@@ -426,9 +426,9 @@
           { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
           {
             path: ["approvedAt"],
             code: "invalid",
-            message: "Invalid approvedAt",
+            message: "",
           },
         ];
 
         const result = suggestQuizSummaryPatches(input, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
