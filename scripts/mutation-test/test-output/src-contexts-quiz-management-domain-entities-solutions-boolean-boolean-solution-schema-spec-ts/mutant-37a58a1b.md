# Mutant 37a58a1b Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: LogicalOperator
**Original ID**: 5957
**Stable ID**: 37a58a1b
**Location**: L204:13–L204:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5957
@@ -200,9 +200,9 @@
 
         expect(trueResult.success).toBe(true);
         expect(falseResult.success).toBe(true);
 
-        if (trueResult.success && falseResult.success) {
+        if (trueResult.success || falseResult.success) {
           expect(trueResult.data.value).toBe(true);
           expect(falseResult.data.value).toBe(false);
           expect(typeof trueResult.data.value).toBe("boolean");
           expect(typeof falseResult.data.value).toBe("boolean");
```

## Hint

論理演算子が置換されています（&&/|| ⇄ ||/&&）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
