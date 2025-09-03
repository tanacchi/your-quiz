# Mutant ffdaf140 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4512
**Stable ID**: ffdaf140
**Location**: L412:19–L412:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4512
@@ -408,9 +408,9 @@
             message: "Invalid explanation",
           },
           {
             path: ["solutionId"],
-            code: "invalid",
+            code: "",
             message: "Invalid solutionId",
           },
           {
             path: ["creatorId"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
