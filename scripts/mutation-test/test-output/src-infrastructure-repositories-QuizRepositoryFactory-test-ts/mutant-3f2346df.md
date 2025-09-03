# Mutant 3f2346df Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9483
**Stable ID**: 3f2346df
**Location**: L81:20–L81:66

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9483
@@ -77,9 +77,9 @@
       env: createMockEnv({ NODE_ENV: "development" }),
       expectedType: MockQuizRepository,
     },
     {
-      description: "開発環境でUSE_MOCK_DB=falseの場合D1QuizRepositoryを返す",
+      description: "",
       env: createMockEnv({ NODE_ENV: "development", USE_MOCK_DB: "false" }),
       expectedType: D1QuizRepository,
     },
     {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
