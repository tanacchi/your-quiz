# Mutant e74cef0f Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9490
**Stable ID**: e74cef0f
**Location**: L87:38–L87:50

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9490
@@ -83,9 +83,9 @@
       expectedType: D1QuizRepository,
     },
     {
       description: "本番環境でUSE_MOCK_DB未設定の場合D1QuizRepositoryを返す",
-      env: createMockEnv({ NODE_ENV: "production" }),
+      env: createMockEnv({ NODE_ENV: "" }),
       expectedType: D1QuizRepository,
     },
     {
       description: "本番環境でUSE_MOCK_DB=falseの場合D1QuizRepositoryを返す",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
