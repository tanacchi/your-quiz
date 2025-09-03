# Mutant e84bcd7c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2522
**Stable ID**: e84bcd7c
**Location**: L830:17–L830:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2522
@@ -826,9 +826,9 @@
         { path: ["id"], code: "invalid", message: "Invalid id" },
         { path: ["question"], code: "invalid", message: "Invalid question" },
         {
           path: ["explanation"],
-          code: "invalid",
+          code: "",
           message: "Invalid explanation",
         },
         {
           path: ["answerType"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
