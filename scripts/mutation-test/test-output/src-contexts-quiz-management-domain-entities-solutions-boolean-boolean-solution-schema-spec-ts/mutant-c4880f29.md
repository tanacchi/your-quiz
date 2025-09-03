# Mutant c4880f29 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 6013
**Stable ID**: c4880f29
**Location**: L272:11–L272:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #6013
@@ -268,9 +268,9 @@
 
       const result = BooleanSolutionSchema.safeParse(parsedData);
       expect(result.success).toBe(true);
 
-      if (result.success) {
+      if (false) {
         expect(result.data).toEqual(originalData);
       }
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
