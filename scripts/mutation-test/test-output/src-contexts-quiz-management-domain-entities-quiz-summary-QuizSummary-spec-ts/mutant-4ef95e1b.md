# Mutant 4ef95e1b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 3364
**Stable ID**: 4ef95e1b
**Location**: L60:13–L60:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3364
@@ -56,9 +56,9 @@
       ])("should handle %s: %s", (_desc, input, isValid) => {
         const result = TagId.safeParse(input);
 
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
