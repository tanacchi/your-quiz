# Mutant 48c3668e Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5956
**Stable ID**: 48c3668e
**Location**: L204:13–L204:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5956
@@ -200,9 +200,9 @@
 
         expect(trueResult.success).toBe(true);
         expect(falseResult.success).toBe(true);
 
-        if (trueResult.success && falseResult.success) {
+        if (false) {
           expect(trueResult.data.value).toBe(true);
           expect(falseResult.data.value).toBe(false);
           expect(typeof trueResult.data.value).toBe("boolean");
           expect(typeof falseResult.data.value).toBe("boolean");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
