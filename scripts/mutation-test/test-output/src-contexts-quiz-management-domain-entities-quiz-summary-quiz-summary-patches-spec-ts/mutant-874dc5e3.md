# Mutant 874dc5e3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4614
**Stable ID**: 874dc5e3
**Location**: L488:59–L488:75

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4614
@@ -484,9 +484,9 @@
               path: ["answerType"],
               code: "invalid",
               message: "Invalid answerType",
             },
-            { path: ["status"], code: "invalid", message: "Invalid status" },
+            { path: ["status"], code: "invalid", message: "" },
             { path: ["tagIds"], code: "invalid", message: "Invalid tagIds" },
           ];
 
           const patches = suggestQuizSummaryPatches(input, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
