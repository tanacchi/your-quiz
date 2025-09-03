# Mutant dc56a7e6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2336
**Stable ID**: dc56a7e6
**Location**: L613:59–L613:75

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2336
@@ -609,9 +609,9 @@
               path: ["answerType"],
               code: "invalid",
               message: "Invalid answerType",
             },
-            { path: ["status"], code: "invalid", message: "Invalid status" },
+            { path: ["status"], code: "invalid", message: "" },
             {
               path: ["solution"],
               code: "invalid",
               message: "Invalid solution",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
