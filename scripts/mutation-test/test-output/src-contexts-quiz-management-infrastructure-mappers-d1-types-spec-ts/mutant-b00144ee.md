# Mutant b00144ee Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7645
**Stable ID**: b00144ee
**Location**: L313:12–L313:50

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7645
@@ -309,9 +309,9 @@
       test("should return true for valid quiz row", () => {
         expect(isQuizRow(createValidQuizRow())).toBe(true);
       });
 
-      test("should return false for invalid data", () => {
+      test("", () => {
         const invalidInputs = [
           null,
           undefined,
           "string",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
