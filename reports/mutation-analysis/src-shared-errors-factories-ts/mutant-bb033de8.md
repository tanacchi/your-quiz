# Mutant bb033de8 Report

**File**: src/shared/errors/factories.ts
**Mutator**: ArrowFunction
**Original ID**: 67
**Stable ID**: bb033de8
**Location**: L66:17–L67:47

## Diff

```diff
Index: src/shared/errors/factories.ts
===================================================================
--- src/shared/errors/factories.ts	original
+++ src/shared/errors/factories.ts	mutated #67
@@ -62,10 +62,9 @@
   );
 };
 
 export const ValidationErrorFactory = {
-  fromZodError: (zodError: ZodError, requestId?: string) =>
-    createValidationError(zodError, requestId),
+  fromZodError: () => undefined,
 };
 
 /**
  * 単一フィールドのバリデーションエラーを作成
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。