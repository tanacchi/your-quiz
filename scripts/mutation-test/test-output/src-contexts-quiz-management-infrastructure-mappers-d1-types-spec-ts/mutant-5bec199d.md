# Mutant 5bec199d Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7643
**Stable ID**: 5bec199d
**Location**: L309:59–L311:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7643
@@ -305,11 +305,9 @@
   });
 
   describe("Type Guards", () => {
     describe("isQuizRow", () => {
-      test("should return true for valid quiz row", () => {
-        expect(isQuizRow(createValidQuizRow())).toBe(true);
-      });
+      test("should return true for valid quiz row", () => {});
 
       test("should return false for invalid data", () => {
         const invalidInputs = [
           null,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
