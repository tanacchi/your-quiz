# Mutant 613afc9f Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1082
**Stable ID**: 613afc9f
**Location**: L233:13–L233:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1082
@@ -229,9 +229,9 @@
 
         const negatedResult = solution.negate();
         expect(negatedResult.isOk()).toBe(true);
 
-        if (negatedResult.isOk()) {
+        if (true) {
           const negatedSolution = negatedResult.value;
           expect(negatedSolution.get("value")).toBe(false);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
