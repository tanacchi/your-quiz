# Mutant 8943deca Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 2525
**Stable ID**: 8943deca
**Location**: L834:17–L834:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #2525
@@ -830,9 +830,9 @@
           code: "invalid",
           message: "Invalid explanation",
         },
         {
-          path: ["answerType"],
+          path: [],
           code: "invalid",
           message: "Invalid answerType",
         },
         { path: ["solution"], code: "invalid", message: "Invalid solution" },
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
