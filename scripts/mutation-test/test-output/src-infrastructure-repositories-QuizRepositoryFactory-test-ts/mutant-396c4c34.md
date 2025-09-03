# Mutant 396c4c34 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: ObjectLiteral
**Original ID**: 9433
**Stable ID**: 396c4c34
**Location**: L25:26–L25:46

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9433
@@ -21,9 +21,9 @@
   // Parameterized test cases for shouldUseMock
   const testCases = [
     {
       description: "テスト環境では常にtrue",
-      env: createMockEnv({ NODE_ENV: "test" }),
+      env: createMockEnv({}),
       expected: true,
     },
     {
       description: "USE_MOCK_DBがtrueの場合はtrue",
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
