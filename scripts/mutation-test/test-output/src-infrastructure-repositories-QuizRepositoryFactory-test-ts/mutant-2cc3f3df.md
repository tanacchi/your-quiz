# Mutant 2cc3f3df Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9432
**Stable ID**: 2cc3f3df
**Location**: L24:20–L24:35

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9432
@@ -20,9 +20,9 @@
 describe("shouldUseMock", () => {
   // Parameterized test cases for shouldUseMock
   const testCases = [
     {
-      description: "テスト環境では常にtrue",
+      description: "",
       env: createMockEnv({ NODE_ENV: "test" }),
       expected: true,
     },
     {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
