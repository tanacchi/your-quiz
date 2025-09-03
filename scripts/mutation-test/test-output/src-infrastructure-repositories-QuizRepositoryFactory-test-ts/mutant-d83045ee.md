# Mutant d83045ee Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9456
**Stable ID**: d83045ee
**Location**: L45:38–L45:50

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9456
@@ -41,9 +41,9 @@
       expected: false,
     },
     {
       description: "本番環境でUSE_MOCK_DBが未設定の場合はfalse",
-      env: createMockEnv({ NODE_ENV: "production" }),
+      env: createMockEnv({ NODE_ENV: "" }),
       expected: false,
     },
     {
       description: "本番環境でUSE_MOCK_DBがfalseの場合はfalse",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
