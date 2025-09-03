# Mutant b38a8308 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2213
**Stable ID**: b38a8308
**Location**: L514:19–L514:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2213
@@ -510,9 +510,9 @@
           { path: ["id"], code: "invalid", message: "Invalid id" },
           { path: ["question"], code: "invalid", message: "Invalid question" },
           {
             path: ["explanation"],
-            code: "invalid",
+            code: "",
             message: "Invalid explanation",
           },
           {
             path: ["creatorId"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
