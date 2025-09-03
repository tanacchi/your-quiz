# Mutant 14f3dfd9 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7744
**Stable ID**: 14f3dfd9
**Location**: L425:32–L425:35

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7744
@@ -421,9 +421,9 @@
         const inputWithOptionals = {
           ...createValidQuizRow(),
           explanation: "Test explanation",
           boolean_value: 1,
-          min_correct_answers: "2",
+          min_correct_answers: "",
         };
 
         const conversionResult = Result.fromThrowable(() =>
           toQuizRow(inputWithOptionals as Record<string, unknown>),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
