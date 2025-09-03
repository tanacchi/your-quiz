# Mutant e460b1d7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2214
**Stable ID**: e460b1d7
**Location**: L515:22–L515:43

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2214
@@ -511,9 +511,9 @@
           { path: ["question"], code: "invalid", message: "Invalid question" },
           {
             path: ["explanation"],
             code: "invalid",
-            message: "Invalid explanation",
+            message: "",
           },
           {
             path: ["creatorId"],
             code: "invalid",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
