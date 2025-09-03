# Mutant 1c229ea5 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2326
**Stable ID**: 1c229ea5
**Location**: L606:24–L606:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2326
@@ -602,9 +602,9 @@
             { path: ["id"], code: "invalid", message: "Invalid id" },
             {
               path: ["question"],
               code: "invalid",
-              message: "Invalid question",
+              message: "",
             },
             {
               path: ["answerType"],
               code: "invalid",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
