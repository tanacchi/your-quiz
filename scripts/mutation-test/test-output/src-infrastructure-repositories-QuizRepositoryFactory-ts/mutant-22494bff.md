# Mutant 22494bff Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.ts
**Mutator**: ObjectLiteral
**Original ID**: 9534
**Stable ID**: 22494bff
**Location**: L26:47–L30:4

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.ts	mutated #9534
@@ -22,13 +22,9 @@
  * @param env - Cloudflare Workersのバインディング環境変数
  * @returns 適切なリポジトリ実装
  */
 export function createQuizRepository(env: CloudflareBindings): IQuizRepository {
-  console.log("QuizRepositoryFactory - env:", {
-    NODE_ENV: env.NODE_ENV,
-    USE_MOCK_DB: env.USE_MOCK_DB,
-    DB_exists: !!env.DB,
-  });
+  console.log("QuizRepositoryFactory - env:", {});
 
   if (shouldUseMock(env)) {
     console.log("Using MockQuizRepository");
     return new MockQuizRepository();
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
