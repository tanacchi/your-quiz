# Mutant 1383a65c Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9479
**Stable ID**: 1383a65c
**Location**: L76:20–L76:65

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9479
@@ -72,9 +72,9 @@
       env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
       expectedType: MockQuizRepository,
     },
     {
-      description: "開発環境でUSE_MOCK_DB未設定の場合MockQuizRepositoryを返す",
+      description: "",
       env: createMockEnv({ NODE_ENV: "development" }),
       expectedType: MockQuizRepository,
     },
     {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
