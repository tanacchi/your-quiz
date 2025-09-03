# Mutant ecdfed4c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 2526
**Stable ID**: ecdfed4c
**Location**: L834:18–L834:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2526
@@ -830,9 +830,9 @@
           code: "invalid",
           message: "Invalid explanation",
         },
         {
-          path: ["answerType"],
+          path: [""],
           code: "invalid",
           message: "Invalid answerType",
         },
         { path: ["solution"], code: "invalid", message: "Invalid solution" },
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
