# Mutant daa70a92 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4515
**Stable ID**: daa70a92
**Location**: L416:19–L416:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4515
@@ -412,9 +412,9 @@
             code: "invalid",
             message: "Invalid solutionId",
           },
           {
-            path: ["creatorId"],
+            path: [],
             code: "invalid",
             message: "Invalid creatorId",
           },
           {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
