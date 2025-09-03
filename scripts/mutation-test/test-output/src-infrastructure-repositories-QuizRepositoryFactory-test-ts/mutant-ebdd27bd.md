# Mutant ebdd27bd Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9475
**Stable ID**: ebdd27bd
**Location**: L72:26–L72:73

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9475
@@ -68,9 +68,9 @@
       expectedType: MockQuizRepository,
     },
     {
       description: "USE_MOCK_DB=trueの場合MockQuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
+      env: createMockEnv({}),
       expectedType: MockQuizRepository,
     },
     {
       description: "開発環境でUSE_MOCK_DB未設定の場合MockQuizRepositoryを返す",
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
