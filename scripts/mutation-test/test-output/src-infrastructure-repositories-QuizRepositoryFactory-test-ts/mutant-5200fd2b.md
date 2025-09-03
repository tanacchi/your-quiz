# Mutant 5200fd2b Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9511
**Stable ID**: 5200fd2b
**Location**: L114:5–L114:40

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9511
@@ -110,9 +110,9 @@
     { NODE_ENV: "test" as const, USE_MOCK_DB: "false" },
     { NODE_ENV: "development" as const },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "development" as const, USE_MOCK_DB: "false" },
-    { NODE_ENV: "production" as const },
+    {},
     { NODE_ENV: "production" as const, USE_MOCK_DB: "true" },
     { NODE_ENV: "production" as const, USE_MOCK_DB: "false" },
   ];
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
