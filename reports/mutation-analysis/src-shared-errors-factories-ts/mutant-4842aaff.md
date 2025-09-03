# Mutant 4842aaff Report

**File**: src/shared/errors/factories.ts
**Mutator**: ArrowFunction
**Original ID**: 85
**Stable ID**: 4842aaff
**Location**: L150:17–L151:61

## Diff

```diff
Index: src/shared/errors/factories.ts
===================================================================
--- src/shared/errors/factories.ts	original
+++ src/shared/errors/factories.ts	mutated #85
@@ -146,10 +146,9 @@
 
   findFailed: (entity: string, cause?: Error, requestId?: string) =>
     new FindFailedError(entity, cause?.message, requestId),
 
-  updateFailed: (entity: string, cause?: Error, requestId?: string) =>
-    new UpdateFailedError(entity, cause?.message, requestId),
+  updateFailed: () => undefined,
 
   deleteFailed: (entity: string, cause?: Error, requestId?: string) =>
     new DeleteFailedError(entity, cause?.message, requestId),
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。