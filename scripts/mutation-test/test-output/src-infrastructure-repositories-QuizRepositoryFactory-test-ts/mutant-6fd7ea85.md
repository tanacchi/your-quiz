# Mutant 6fd7ea85 Report

**File**: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
**Mutator**: StringLiteral
**Original ID**: 9428
**Stable ID**: 6fd7ea85
**Location**: L20:10–L20:25

## Diff

```diff
Index: src/infrastructure/repositories/QuizRepositoryFactory.test.ts
===================================================================
--- src/infrastructure/repositories/QuizRepositoryFactory.test.ts	original
+++ src/infrastructure/repositories/QuizRepositoryFactory.test.ts	mutated #9428
@@ -16,9 +16,9 @@
 
   return { ...baseEnv, ...overrides };
 };
 
-describe("shouldUseMock", () => {
+describe("", () => {
   // Parameterized test cases for shouldUseMock
   const testCases = [
     {
       description: "テスト環境では常にtrue",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
