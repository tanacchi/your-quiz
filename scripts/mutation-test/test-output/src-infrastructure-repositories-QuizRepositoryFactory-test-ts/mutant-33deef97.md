# Mutant 33deef97 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9474
**Stable ID**: 33deef97
**Location**: L71:20–L71:62

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9474
@@ -67,9 +67,9 @@
       env: createMockEnv({ NODE_ENV: "test" }),
       expectedType: MockQuizRepository,
     },
     {
-      description: "USE_MOCK_DB=trueの場合MockQuizRepositoryを返す",
+      description: "",
       env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
       expectedType: MockQuizRepository,
     },
     {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
