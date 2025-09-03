# Mutant 458b24af Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7595
**Stable ID**: 458b24af
**Location**: L238:13–L238:32

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7595
@@ -234,9 +234,9 @@
         const stringTotal = { total: "42" };
         const parseResult = zodCountResultSchema.safeParse(stringTotal);
 
         expect(parseResult.success).toBe(true);
-        if (parseResult.success) {
+        if (false) {
           expect(parseResult.data.total).toBe(42);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
