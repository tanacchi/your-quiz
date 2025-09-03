# Mutant 1b2377c5 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9476
**Stable ID**: 1b2377c5
**Location**: L72:38–L72:50

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9476
@@ -68,9 +68,9 @@
       expectedType: MockQuizRepository,
     },
     {
       description: "USE_MOCK_DB=trueの場合MockQuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
+      env: createMockEnv({ NODE_ENV: "", USE_MOCK_DB: "true" }),
       expectedType: MockQuizRepository,
     },
     {
       description: "開発環境でUSE_MOCK_DB未設定の場合MockQuizRepositoryを返す",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
