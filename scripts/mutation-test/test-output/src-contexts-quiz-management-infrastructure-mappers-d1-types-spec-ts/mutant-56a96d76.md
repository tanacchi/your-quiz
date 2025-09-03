# Mutant 56a96d76 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7480
**Stable ID**: 56a96d76
**Location**: L25:10–L25:29

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7480
@@ -21,9 +21,9 @@
   zodQuizRowSchema,
   zodQuizStatusSchema,
 } from "./d1-types";
 
-describe("D1 Types with Zod", () => {
+describe("", () => {
   /**
    * 有効なクイズ行データを生成するヘルパー関数
    */
   const createValidQuizRow = () =>
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
