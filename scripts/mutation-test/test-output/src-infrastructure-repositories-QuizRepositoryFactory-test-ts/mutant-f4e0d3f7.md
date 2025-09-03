# Mutant f4e0d3f7 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9488
**Stable ID**: f4e0d3f7
**Location**: L86:20–L86:63

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9488
@@ -82,9 +82,9 @@
       env: createMockEnv({ NODE_ENV: "development", USE_MOCK_DB: "false" }),
       expectedType: D1QuizRepository,
     },
     {
-      description: "本番環境でUSE_MOCK_DB未設定の場合D1QuizRepositoryを返す",
+      description: "",
       env: createMockEnv({ NODE_ENV: "production" }),
       expectedType: D1QuizRepository,
     },
     {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
