# Mutant 0961cf75 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4516
**Stable ID**: 0961cf75
**Location**: L416:20–L416:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4516
@@ -412,9 +412,9 @@
             code: "invalid",
             message: "Invalid solutionId",
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
