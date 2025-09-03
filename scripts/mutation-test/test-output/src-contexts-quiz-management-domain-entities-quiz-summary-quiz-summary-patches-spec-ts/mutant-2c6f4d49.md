# Mutant 2c6f4d49 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4662
**Stable ID**: 2c6f4d49
**Location**: L558:24–L558:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4662
@@ -554,9 +554,9 @@
             { path: ["status"], code: "invalid", message: "Invalid status" },
             {
               path: ["approvedAt"],
               code: "invalid",
-              message: "Invalid approvedAt",
+              message: "",
             },
           ];
 
           const patches = suggestQuizSummaryPatches(input, issues);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
