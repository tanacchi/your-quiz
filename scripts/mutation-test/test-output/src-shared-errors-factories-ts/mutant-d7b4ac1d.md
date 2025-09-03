# Mutant d7b4ac1d Report

**File**: src/shared/errors/factories.ts
**Mutator**: ArrowFunction
**Original ID**: 9656
**Stable ID**: d7b4ac1d
**Location**: L153:17–L154:61

## Diff

```diff
Index: src/shared/errors/factories.ts
===================================================================
--- src/shared/errors/factories.ts	original
+++ src/shared/errors/factories.ts	mutated #9656
@@ -149,10 +149,9 @@
 
   updateFailed: (entity: string, cause?: Error, requestId?: string) =>
     new UpdateFailedError(entity, cause?.message, requestId),
 
-  deleteFailed: (entity: string, cause?: Error, requestId?: string) =>
-    new DeleteFailedError(entity, cause?.message, requestId),
+  deleteFailed: () => undefined,
 
   notImplemented: (operation: string, requestId?: string) =>
     new NotImplementedError(operation, requestId),
 };
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
