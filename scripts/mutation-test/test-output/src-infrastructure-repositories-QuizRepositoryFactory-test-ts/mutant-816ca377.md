# Mutant 816ca377 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9426
**Stable ID**: 816ca377
**Location**: L12:15–L12:28

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9426
@@ -8,9 +8,9 @@
 const createMockEnv = (
   overrides: Partial<CloudflareBindings> = {},
 ): CloudflareBindings => {
   const baseEnv: CloudflareBindings = {
-    NODE_ENV: "development",
+    NODE_ENV: "",
     DB: {} as D1Database,
     ASSETS: {} as Fetcher,
   };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
