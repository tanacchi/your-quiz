# Mutant e5127ea0 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9485
**Stable ID**: e5127ea0
**Location**: L82:38–L82:51

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9485
@@ -78,9 +78,9 @@
       expectedType: MockQuizRepository,
     },
     {
       description: "開発環境でUSE_MOCK_DB=falseの場合D1QuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "development", USE_MOCK_DB: "false" }),
+      env: createMockEnv({ NODE_ENV: "", USE_MOCK_DB: "false" }),
       expectedType: D1QuizRepository,
     },
     {
       description: "本番環境でUSE_MOCK_DB未設定の場合D1QuizRepositoryを返す",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
