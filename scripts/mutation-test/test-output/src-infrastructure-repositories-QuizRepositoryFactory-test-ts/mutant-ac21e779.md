# Mutant ac21e779 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9454
**Stable ID**: ac21e779
**Location**: L44:20–L44:51

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9454
@@ -40,9 +40,9 @@
       env: createMockEnv({ NODE_ENV: "development", USE_MOCK_DB: "false" }),
       expected: false,
     },
     {
-      description: "本番環境でUSE_MOCK_DBが未設定の場合はfalse",
+      description: "",
       env: createMockEnv({ NODE_ENV: "production" }),
       expected: false,
     },
     {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
