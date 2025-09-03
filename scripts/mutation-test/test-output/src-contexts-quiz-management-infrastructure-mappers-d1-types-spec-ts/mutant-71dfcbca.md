# Mutant 71dfcbca Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7721
**Stable ID**: 71dfcbca
**Location**: L396:12–L396:34

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7721
@@ -392,9 +392,9 @@
       });
     });
   });
 
-  describe("Conversion Functions", () => {
+  describe("", () => {
     describe("toQuizRow", () => {
       test("should convert valid input correctly", () => {
         const input = {
           id: 123,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
