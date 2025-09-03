# Mutant d4a9685d Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5931
**Stable ID**: d4a9685d
**Location**: L186:13–L186:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5931
@@ -182,9 +182,9 @@
           validBooleanSolutionData,
         );
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (true) {
           expect(typeof result.data.value).toBe("boolean");
           expect(
             result.data.value === true || result.data.value === false,
           ).toBe(true);
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
