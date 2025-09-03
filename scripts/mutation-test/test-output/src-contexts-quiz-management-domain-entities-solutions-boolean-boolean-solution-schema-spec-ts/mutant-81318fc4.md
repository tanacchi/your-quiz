# Mutant 81318fc4 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6024
**Stable ID**: 81318fc4
**Location**: L285:13–L285:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6024
@@ -281,9 +281,9 @@
       for (let i = 0; i < 5; i++) {
         const result = BooleanSolutionSchema.safeParse(currentData);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           currentData = result.data;
           expect(currentData.id).toBe(validBooleanSolutionData.id);
           expect(currentData.value).toBe(validBooleanSolutionData.value);
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
