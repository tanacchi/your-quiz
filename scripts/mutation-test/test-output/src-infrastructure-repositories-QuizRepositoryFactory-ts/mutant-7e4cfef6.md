# Mutant 7e4cfef6 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.ts
**Mutator**: StringLiteral
**Original ID**: 9533
**Stable ID**: 7e4cfef6
**Location**: L26:15–L26:45

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.ts	mutated #9533
@@ -22,9 +22,9 @@
  * @param env - Cloudflare Workersのバインディング環境変数
  * @returns 適切なリポジトリ実装
  */
 export function createQuizRepository(env: CloudflareBindings): IQuizRepository {
-  console.log("QuizRepositoryFactory - env:", {
+  console.log("", {
     NODE_ENV: env.NODE_ENV,
     USE_MOCK_DB: env.USE_MOCK_DB,
     DB_exists: !!env.DB,
   });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
