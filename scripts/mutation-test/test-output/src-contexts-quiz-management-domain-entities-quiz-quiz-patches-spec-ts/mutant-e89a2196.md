# Mutant e89a2196 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2523
**Stable ID**: e89a2196
**Location**: L831:20–L831:41

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2523
@@ -827,9 +827,9 @@
         { path: ["question"], code: "invalid", message: "Invalid question" },
         {
           path: ["explanation"],
           code: "invalid",
-          message: "Invalid explanation",
+          message: "",
         },
         {
           path: ["answerType"],
           code: "invalid",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
