# Mutant e6b831d2 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9439
**Stable ID**: e6b831d2
**Location**: L30:38–L30:50

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9439
@@ -26,9 +26,9 @@
       expected: true,
     },
     {
       description: "USE_MOCK_DBがtrueの場合はtrue",
-      env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
+      env: createMockEnv({ NODE_ENV: "", USE_MOCK_DB: "true" }),
       expected: true,
     },
     {
       description: "開発環境でUSE_MOCK_DBが未設定の場合はtrue（デフォルト）",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
