# Mutant 5ad5ccc1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 4510
**Stable ID**: 5ad5ccc1
**Location**: L411:19–L411:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4510
@@ -407,9 +407,9 @@
             code: "invalid",
             message: "Invalid explanation",
           },
           {
-            path: ["solutionId"],
+            path: [],
             code: "invalid",
             message: "Invalid solutionId",
           },
           {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
