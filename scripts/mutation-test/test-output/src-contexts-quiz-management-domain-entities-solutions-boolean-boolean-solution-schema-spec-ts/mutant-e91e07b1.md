# Mutant e91e07b1 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 5852
**Stable ID**: e91e07b1
**Location**: L98:13–L98:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5852
@@ -94,9 +94,9 @@
         const data = { ...validBooleanSolutionData, value };
         const result = BooleanSolutionSchema.safeParse(data);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success) {
+        if (isValid || result.success) {
           expect(result.data.value).toBe(value);
           expect(typeof result.data.value).toBe("boolean");
         }
       });
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
