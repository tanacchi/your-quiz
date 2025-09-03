# Mutant dde0ab60 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2218
**Stable ID**: dde0ab60
**Location**: L519:19–L519:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2218
@@ -515,9 +515,9 @@
             message: "Invalid explanation",
           },
           {
             path: ["creatorId"],
-            code: "invalid",
+            code: "",
             message: "Invalid creatorId",
           },
           {
             path: ["answerType"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
