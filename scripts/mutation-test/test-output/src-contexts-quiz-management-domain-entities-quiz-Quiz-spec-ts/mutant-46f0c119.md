# Mutant 46f0c119 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 1083
**Stable ID**: 46f0c119
**Location**: L233:13–L233:33

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/Quiz.spec.ts	mutated #1083
@@ -229,9 +229,9 @@
 
         const negatedResult = solution.negate();
         expect(negatedResult.isOk()).toBe(true);
 
-        if (negatedResult.isOk()) {
+        if (false) {
           const negatedSolution = negatedResult.value;
           expect(negatedSolution.get("value")).toBe(false);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
