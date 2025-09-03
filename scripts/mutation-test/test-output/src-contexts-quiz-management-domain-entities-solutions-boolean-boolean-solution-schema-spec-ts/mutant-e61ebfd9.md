# Mutant e61ebfd9 Report

**File**: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5935
**Stable ID**: e61ebfd9
**Location**: L189:13–L189:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/solutions/boolean/boolean-solution-schema.spec.ts	mutated #5935
@@ -185,9 +185,9 @@
 
         if (result.success) {
           expect(typeof result.data.value).toBe("boolean");
           expect(
-            result.data.value === true || result.data.value === false,
+            true,
           ).toBe(true);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
