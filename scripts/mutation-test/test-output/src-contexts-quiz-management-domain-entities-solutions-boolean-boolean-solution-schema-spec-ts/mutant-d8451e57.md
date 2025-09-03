# Mutant d8451e57 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5955
**Stable ID**: d8451e57
**Location**: L204:13–L204:54

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5955
@@ -200,9 +200,9 @@
 
         expect(trueResult.success).toBe(true);
         expect(falseResult.success).toBe(true);
 
-        if (trueResult.success && falseResult.success) {
+        if (true) {
           expect(trueResult.data.value).toBe(true);
           expect(falseResult.data.value).toBe(false);
           expect(typeof trueResult.data.value).toBe("boolean");
           expect(typeof falseResult.data.value).toBe("boolean");
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
