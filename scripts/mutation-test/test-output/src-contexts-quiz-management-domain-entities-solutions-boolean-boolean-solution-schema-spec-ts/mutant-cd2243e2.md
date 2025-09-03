# Mutant cd2243e2 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6007
**Stable ID**: cd2243e2
**Location**: L257:13–L257:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6007
@@ -253,9 +253,9 @@
       complexSolutions.forEach((solution) => {
         const result = BooleanSolutionSchema.safeParse(solution);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           expect(result.data.id).toBe(solution.id);
           expect(result.data.value).toBe(solution.value);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
