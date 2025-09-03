# Mutant 0b1a7090 Report

**File**: src/shared/errors/factories.ts
**Mutator**: ArrowFunction
**Original ID**: 81
**Stable ID**: 0b1a7090
**Location**: L144:17–L145:61

## Diff

```diff
Index: src/shared/errors/factories.ts
===================================================================
--- src/shared/errors/factories.ts	original
+++ src/shared/errors/factories.ts	mutated #81
@@ -140,10 +140,9 @@
 /**
  * リポジトリエラーファクトリー
  */
 export const RepositoryErrorFactory = {
-  createFailed: (entity: string, cause?: Error, requestId?: string) =>
-    new CreateFailedError(entity, cause?.message, requestId),
+  createFailed: () => undefined,
 
   findFailed: (entity: string, cause?: Error, requestId?: string) =>
     new FindFailedError(entity, cause?.message, requestId),
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。