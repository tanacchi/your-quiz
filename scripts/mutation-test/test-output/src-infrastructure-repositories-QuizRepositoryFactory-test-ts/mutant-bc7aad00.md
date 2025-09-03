# Mutant bc7aad00 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9480
**Stable ID**: bc7aad00
**Location**: L77:26–L77:53

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9480
@@ -73,9 +73,9 @@
       expectedType: MockQuizRepository,
     },
     {
       description: "開発環境でUSE_MOCK_DB未設定の場合MockQuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "development" }),
+      env: createMockEnv({}),
       expectedType: MockQuizRepository,
     },
     {
       description: "開発環境でUSE_MOCK_DB=falseの場合D1QuizRepositoryを返す",
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
