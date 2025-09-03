# Mutant 357cbc98 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7489
**Stable ID**: 357cbc98
**Location**: L77:9–L77:27

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7489
@@ -73,9 +73,9 @@
   ) => {
     const parseResult = Result.fromThrowable(() => schema.safeParse(data))();
     expect(parseResult.isOk()).toBe(true);
 
-    if (parseResult.isOk()) {
+    if (true) {
       const { success } = parseResult.value;
       expect(success).toBe(true);
     }
   };
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
