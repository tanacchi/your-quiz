# Mutant 2b0d78c4 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9437
**Stable ID**: 2b0d78c4
**Location**: L29:20–L29:46

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9437
@@ -25,9 +25,9 @@
       env: createMockEnv({ NODE_ENV: "test" }),
       expected: true,
     },
     {
-      description: "USE_MOCK_DBがtrueの場合はtrue",
+      description: "",
       env: createMockEnv({ NODE_ENV: "production", USE_MOCK_DB: "true" }),
       expected: true,
     },
     {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
