# Mutant 4b00b4a1 Report

**File**: src/shared/errors/factories.ts
**Mutator**: ObjectLiteral
**Original ID**: 9649
**Stable ID**: 4b00b4a1
**Location**: L143:39–L158:2

## Diff

```diff
Index: src/shared/errors/factories.ts
===================================================================
--- src/shared/errors/factories.ts	original
+++ src/shared/errors/factories.ts	mutated #9649
@@ -139,25 +139,10 @@
 
 /**
  * リポジトリエラーファクトリー
  */
-export const RepositoryErrorFactory = {
-  createFailed: (entity: string, cause?: Error, requestId?: string) =>
-    new CreateFailedError(entity, cause?.message, requestId),
+export const RepositoryErrorFactory = {};
 
-  findFailed: (entity: string, cause?: Error, requestId?: string) =>
-    new FindFailedError(entity, cause?.message, requestId),
-
-  updateFailed: (entity: string, cause?: Error, requestId?: string) =>
-    new UpdateFailedError(entity, cause?.message, requestId),
-
-  deleteFailed: (entity: string, cause?: Error, requestId?: string) =>
-    new DeleteFailedError(entity, cause?.message, requestId),
-
-  notImplemented: (operation: string, requestId?: string) =>
-    new NotImplementedError(operation, requestId),
-};
-
 /**
  * JSON解析エラーを作成
  */
 export const createJsonParseError = (
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
