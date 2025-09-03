# Mutant a99a1f2e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7625
**Stable ID**: a99a1f2e
**Location**: L284:13–L284:32

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7625
@@ -280,9 +280,9 @@
           choiceWithStringIndex,
         );
 
         expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
+        if (true) {
           expect(parseResult.data.orderIndex).toBe(2);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
