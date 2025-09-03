# Mutant cf604cad Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9444
**Stable ID**: cf604cad
**Location**: L35:26–L35:53

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9444
@@ -31,9 +31,9 @@
       expected: true,
     },
     {
       description: "開発環境でUSE_MOCK_DBが未設定の場合はtrue（デフォルト）",
-      env: createMockEnv({ NODE_ENV: "development" }),
+      env: createMockEnv({}),
       expected: true,
     },
     {
       description: "開発環境でUSE_MOCK_DBがfalseの場合はfalse",
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
