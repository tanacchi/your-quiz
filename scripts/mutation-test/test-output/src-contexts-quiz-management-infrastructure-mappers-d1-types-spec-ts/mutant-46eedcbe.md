# Mutant 46eedcbe Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7683
**Stable ID**: 46eedcbe
**Location**: L359:14–L359:35

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7683
@@ -355,9 +355,9 @@
         expect(isParsedChoice({ invalid: "data" })).toBe(false);
       });
     });
 
-    describe("isParsedChoiceArray", () => {
+    describe("", () => {
       test("should return true for valid array", () => {
         const validChoices = [
           createValidParsedChoice(),
           createValidParsedChoice(),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
