# Mutant 782ad0e8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 7496
**Stable ID**: 782ad0e8
**Location**: L93:9–L93:27

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7496
@@ -89,9 +89,9 @@
   ) => {
     const parseResult = Result.fromThrowable(() => schema.safeParse(data))();
     expect(parseResult.isOk()).toBe(true);
 
-    if (parseResult.isOk()) {
+    if (true) {
       const { success } = parseResult.value;
       expect(success).toBe(false);
     }
   };
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
