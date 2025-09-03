# Mutant ceb75c7c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2217
**Stable ID**: ceb75c7c
**Location**: L518:20–L518:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2217
@@ -514,9 +514,9 @@
             code: "invalid",
             message: "Invalid explanation",
           },
           {
-            path: ["creatorId"],
+            path: [""],
             code: "invalid",
             message: "Invalid creatorId",
           },
           {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
