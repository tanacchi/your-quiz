# Mutant 44c4aced Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 3321
**Stable ID**: 44c4aced
**Location**: L38:13–L38:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3321
@@ -34,9 +34,9 @@
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = QuizId.safeParse(input);
 
         expect(result.success).toBe(isValid);
-        if (isValid && result.success) {
+        if (false) {
           expect(result.data).toBeDefined();
           expect(result.data).toBe(input);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
