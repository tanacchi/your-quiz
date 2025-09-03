# Mutant 037719ab Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5728
**Stable ID**: 037719ab
**Location**: L22:13–L22:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5728
@@ -18,9 +18,9 @@
           validBooleanSolutionData,
         );
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           const data = result.data as BooleanSolutionData;
           expect(data.id).toBe(validBooleanSolutionData.id);
           expect(data.value).toBe(true);
         }
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
