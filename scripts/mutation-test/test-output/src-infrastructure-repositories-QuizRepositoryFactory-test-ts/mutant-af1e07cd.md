# Mutant af1e07cd Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9507
**Stable ID**: af1e07cd
**Location**: L112:5–L112:62

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9507
@@ -108,9 +108,9 @@
     { NODE_ENV: "test" as const },
     { NODE_ENV: "test" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "test" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "development" as const },
-    { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
+    {},
     { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "production" as const },
     { NODE_ENV: "production" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "production" as const, USE_MOCK_DB: "false" },
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
