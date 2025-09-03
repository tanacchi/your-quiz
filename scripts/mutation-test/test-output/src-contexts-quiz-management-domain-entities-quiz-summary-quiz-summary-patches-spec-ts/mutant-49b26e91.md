# Mutant 49b26e91 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4511
**Stable ID**: 49b26e91
**Location**: L411:20–L411:32

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4511
@@ -407,9 +407,9 @@
             code: "invalid",
             message: "Invalid explanation",
           },
           {
-            path: ["solutionId"],
+            path: [""],
             code: "invalid",
             message: "Invalid solutionId",
           },
           {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
