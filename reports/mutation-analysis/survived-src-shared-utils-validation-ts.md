# Survived mutants report: src/shared/utils/validation.ts

## mutant #1 (BlockStatement)

Location: L18:61–L25:4

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #1
@@ -14,16 +14,9 @@
  */
 export const parseJsonSafe = (request: {
   json(): Promise<unknown>;
 }): ResultAsync<unknown, JsonParseError> => {
-  return ResultAsync.fromPromise(request.json(), (error) => {
-    if (error instanceof SyntaxError) {
-      return createJsonParseError(error);
-    }
-    return createJsonParseError(
-      error instanceof Error ? error : new Error("Unknown parsing error"),
-    );
-  });
+  return ResultAsync.fromPromise(request.json(), (error) => {});
 };
 
 /**
  * Zodスキーマによるバリデーション（ValidationError版）
```

**Hint**: ミューテータ "BlockStatement" による置換。

## mutant #0 (BlockStatement)

Location: L17:45–L26:2

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #0
@@ -13,18 +13,9 @@
  * @returns ResultAsync<unknown, JsonParseError> - パース結果またはエラー
  */
 export const parseJsonSafe = (request: {
   json(): Promise<unknown>;
-}): ResultAsync<unknown, JsonParseError> => {
-  return ResultAsync.fromPromise(request.json(), (error) => {
-    if (error instanceof SyntaxError) {
-      return createJsonParseError(error);
-    }
-    return createJsonParseError(
-      error instanceof Error ? error : new Error("Unknown parsing error"),
-    );
-  });
-};
+}): ResultAsync<unknown, JsonParseError> => {};
 
 /**
  * Zodスキーマによるバリデーション（ValidationError版）
  * @param schema - Zodスキーマ
```

**Hint**: ミューテータ "BlockStatement" による置換。

## mutant #2 (ConditionalExpression)

Location: L19:9–L19:37

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #2
@@ -15,9 +15,9 @@
 export const parseJsonSafe = (request: {
   json(): Promise<unknown>;
 }): ResultAsync<unknown, JsonParseError> => {
   return ResultAsync.fromPromise(request.json(), (error) => {
-    if (error instanceof SyntaxError) {
+    if (true) {
       return createJsonParseError(error);
     }
     return createJsonParseError(
       error instanceof Error ? error : new Error("Unknown parsing error"),
```

**Hint**: 条件式が変更されています。

## mutant #3 (ConditionalExpression)

Location: L19:9–L19:37

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #3
@@ -15,9 +15,9 @@
 export const parseJsonSafe = (request: {
   json(): Promise<unknown>;
 }): ResultAsync<unknown, JsonParseError> => {
   return ResultAsync.fromPromise(request.json(), (error) => {
-    if (error instanceof SyntaxError) {
+    if (false) {
       return createJsonParseError(error);
     }
     return createJsonParseError(
       error instanceof Error ? error : new Error("Unknown parsing error"),
```

**Hint**: 条件式が変更されています。

## mutant #4 (BlockStatement)

Location: L19:39–L21:6

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #4
@@ -15,11 +15,9 @@
 export const parseJsonSafe = (request: {
   json(): Promise<unknown>;
 }): ResultAsync<unknown, JsonParseError> => {
   return ResultAsync.fromPromise(request.json(), (error) => {
-    if (error instanceof SyntaxError) {
-      return createJsonParseError(error);
-    }
+    if (error instanceof SyntaxError) {}
     return createJsonParseError(
       error instanceof Error ? error : new Error("Unknown parsing error"),
     );
   });
```

**Hint**: ミューテータ "BlockStatement" による置換。

## mutant #5 (StringLiteral)

Location: L23:50–L23:73

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #5
@@ -19,9 +19,9 @@
     if (error instanceof SyntaxError) {
       return createJsonParseError(error);
     }
     return createJsonParseError(
-      error instanceof Error ? error : new Error("Unknown parsing error"),
+      error instanceof Error ? error : new Error(""),
     );
   });
 };
```

**Hint**: ミューテータ "StringLiteral" による置換。

## mutant #6 (BlockStatement)

Location: L59:35–L72:2

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #6
@@ -55,23 +55,10 @@
 export function validateWithZod<T, E = ValidationError>(
   schema: z.ZodSchema<T>,
   data: unknown,
   errMapper?: (e: z.ZodError<T>) => E,
-): Result<T, E | ValidationError> {
-  const result = schema.safeParse(data);
-  if (result.success) {
-    return ok(result.data);
-  }
+): Result<T, E | ValidationError> {}
 
-  // errMapperが提供されていない場合（ValidationError版）
-  if (errMapper === undefined) {
-    return err(ValidationErrorFactory.fromZodError(result.error));
-  }
-
-  // カスタムerrMapper版
-  return err(errMapper(result.error));
-}
-
 /**
  * エラーをアプリケーション層の適切なエラー型に変換
  * @param error - 変換対象のエラー
  * @param context - エラーコンテキスト（ログ用）
```

**Hint**: ミューテータ "BlockStatement" による置換。

## mutant #7 (ConditionalExpression)

Location: L61:7–L61:21

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #7
@@ -57,9 +57,9 @@
   data: unknown,
   errMapper?: (e: z.ZodError<T>) => E,
 ): Result<T, E | ValidationError> {
   const result = schema.safeParse(data);
-  if (result.success) {
+  if (true) {
     return ok(result.data);
   }
 
   // errMapperが提供されていない場合（ValidationError版）
```

**Hint**: 条件式が変更されています。

## mutant #8 (ConditionalExpression)

Location: L61:7–L61:21

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #8
@@ -57,9 +57,9 @@
   data: unknown,
   errMapper?: (e: z.ZodError<T>) => E,
 ): Result<T, E | ValidationError> {
   const result = schema.safeParse(data);
-  if (result.success) {
+  if (false) {
     return ok(result.data);
   }
 
   // errMapperが提供されていない場合（ValidationError版）
```

**Hint**: 条件式が変更されています。

## mutant #9 (BlockStatement)

Location: L61:23–L63:4

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #9
@@ -57,11 +57,9 @@
   data: unknown,
   errMapper?: (e: z.ZodError<T>) => E,
 ): Result<T, E | ValidationError> {
   const result = schema.safeParse(data);
-  if (result.success) {
-    return ok(result.data);
-  }
+  if (result.success) {}
 
   // errMapperが提供されていない場合（ValidationError版）
   if (errMapper === undefined) {
     return err(ValidationErrorFactory.fromZodError(result.error));
```

**Hint**: ミューテータ "BlockStatement" による置換。

## mutant #10 (ConditionalExpression)

Location: L66:7–L66:30

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #10
@@ -62,9 +62,9 @@
     return ok(result.data);
   }
 
   // errMapperが提供されていない場合（ValidationError版）
-  if (errMapper === undefined) {
+  if (true) {
     return err(ValidationErrorFactory.fromZodError(result.error));
   }
 
   // カスタムerrMapper版
```

**Hint**: 条件式が変更されています。

## mutant #11 (ConditionalExpression)

Location: L66:7–L66:30

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #11
@@ -62,9 +62,9 @@
     return ok(result.data);
   }
 
   // errMapperが提供されていない場合（ValidationError版）
-  if (errMapper === undefined) {
+  if (false) {
     return err(ValidationErrorFactory.fromZodError(result.error));
   }
 
   // カスタムerrMapper版
```

**Hint**: 条件式が変更されています。

## mutant #12 (EqualityOperator)

Location: L66:7–L66:30

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #12
@@ -62,9 +62,9 @@
     return ok(result.data);
   }
 
   // errMapperが提供されていない場合（ValidationError版）
-  if (errMapper === undefined) {
+  if (errMapper !== undefined) {
     return err(ValidationErrorFactory.fromZodError(result.error));
   }
 
   // カスタムerrMapper版
```

**Hint**: 等価演算子が置換されています（==/=== ⇄ !=/!==）。

## mutant #13 (BlockStatement)

Location: L66:32–L68:4

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #13
@@ -62,11 +62,9 @@
     return ok(result.data);
   }
 
   // errMapperが提供されていない場合（ValidationError版）
-  if (errMapper === undefined) {
-    return err(ValidationErrorFactory.fromZodError(result.error));
-  }
+  if (errMapper === undefined) {}
 
   // カスタムerrMapper版
   return err(errMapper(result.error));
 }
```

**Hint**: ミューテータ "BlockStatement" による置換。

## mutant #14 (StringLiteral)

Location: L82:21–L82:39

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #14
@@ -78,9 +78,9 @@
  * @returns ValidationError または InternalServerError
  */
 export const fromZodErrorToAppError = (
   error: unknown,
-  context: string = "Operation failed",
+  context: string = "",
 ): ValidationError | InternalServerError => {
   // ZodErrorの場合はValidationErrorに変換
   if (error instanceof ZodError) {
     return ValidationErrorFactory.fromZodError(error);
```

**Hint**: ミューテータ "StringLiteral" による置換。

## mutant #15 (BlockStatement)

Location: L83:45–L94:2

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #15
@@ -79,16 +79,5 @@
  */
 export const fromZodErrorToAppError = (
   error: unknown,
   context: string = "Operation failed",
-): ValidationError | InternalServerError => {
-  // ZodErrorの場合はValidationErrorに変換
-  if (error instanceof ZodError) {
-    return ValidationErrorFactory.fromZodError(error);
-  }
-
-  // その他はInternalServerErrorとして扱う
-  return new InternalServerError(
-    context,
-    error instanceof Error ? error.message : String(error),
-  );
-};
+): ValidationError | InternalServerError => {};
```

**Hint**: ミューテータ "BlockStatement" による置換。

## mutant #16 (ConditionalExpression)

Location: L85:7–L85:32

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #16
@@ -81,9 +81,9 @@
   error: unknown,
   context: string = "Operation failed",
 ): ValidationError | InternalServerError => {
   // ZodErrorの場合はValidationErrorに変換
-  if (error instanceof ZodError) {
+  if (true) {
     return ValidationErrorFactory.fromZodError(error);
   }
 
   // その他はInternalServerErrorとして扱う
```

**Hint**: 条件式が変更されています。

## mutant #17 (ConditionalExpression)

Location: L85:7–L85:32

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #17
@@ -81,9 +81,9 @@
   error: unknown,
   context: string = "Operation failed",
 ): ValidationError | InternalServerError => {
   // ZodErrorの場合はValidationErrorに変換
-  if (error instanceof ZodError) {
+  if (false) {
     return ValidationErrorFactory.fromZodError(error);
   }
 
   // その他はInternalServerErrorとして扱う
```

**Hint**: 条件式が変更されています。

## mutant #18 (BlockStatement)

Location: L85:34–L87:4

```diff
Index: src/shared/utils/validation.ts
===================================================================
--- src/shared/utils/validation.ts	original
+++ src/shared/utils/validation.ts	mutated #18
@@ -81,11 +81,9 @@
   error: unknown,
   context: string = "Operation failed",
 ): ValidationError | InternalServerError => {
   // ZodErrorの場合はValidationErrorに変換
-  if (error instanceof ZodError) {
-    return ValidationErrorFactory.fromZodError(error);
-  }
+  if (error instanceof ZodError) {}
 
   // その他はInternalServerErrorとして扱う
   return new InternalServerError(
     context,
```

**Hint**: ミューテータ "BlockStatement" による置換。
