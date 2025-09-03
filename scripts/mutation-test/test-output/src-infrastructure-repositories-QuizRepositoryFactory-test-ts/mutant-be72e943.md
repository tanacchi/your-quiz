# Mutant be72e943 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9504
**Stable ID**: be72e943
**Location**: L110:5–L110:56

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9504
@@ -106,9 +106,9 @@
   // Integration test to ensure shouldUseMock and createQuizRepository are consistent
   const integrationTestCases = [
     { NODE_ENV: "test" as const },
     { NODE_ENV: "test" as const, USE_MOCK_DB: "true" },
-    { NODE_ENV: "test" as const, USE_MOCK_DB: "false" },
+    {},
     { NODE_ENV: "development" as const },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "production" as const },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
