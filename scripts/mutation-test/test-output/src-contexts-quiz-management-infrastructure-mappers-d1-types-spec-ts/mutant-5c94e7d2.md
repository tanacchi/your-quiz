# Mutant 5c94e7d2 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7626
**Stable ID**: 5c94e7d2
**Location**: L284:13–L284:32

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7626
@@ -280,9 +280,9 @@
           choiceWithStringIndex,
         );
 
         expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
+        if (false) {
           expect(parseResult.data.orderIndex).toBe(2);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
