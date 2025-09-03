# Mutant d7df7a81 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9443
**Stable ID**: d7df7a81
**Location**: L34:20–L34:57

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9443
@@ -30,9 +30,9 @@
       env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
       expected: true,
     },
     {
-      description: "開発環境でUSE_MOCK_DBが未設定の場合はtrue（デフォルト）",
+      description: "",
       env: createMockEnv({ NODE_ENV: "development" }),
       expected: true,
     },
     {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
