# Mutant 713fe950 Report

**File**: src/shared/errors/factories.ts
**Mutator**: ObjectLiteral
**Original ID**: 9635
**Stable ID**: 713fe950
**Location**: L65:39–L68:2

## Diff

```diff
Index: src/shared/errors/factories.ts
===================================================================
--- src/shared/errors/factories.ts	original
+++ src/shared/errors/factories.ts	mutated #9635
@@ -61,12 +61,9 @@
     requestId,
   );
 };
 
-export const ValidationErrorFactory = {
-  fromZodError: (zodError: ZodError, requestId?: string) =>
-    createValidationError(zodError, requestId),
-};
+export const ValidationErrorFactory = {};
 
 /**
  * 単一フィールドのバリデーションエラーを作成
  */
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
