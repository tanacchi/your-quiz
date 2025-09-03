# Mutant 876000bd Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7687
**Stable ID**: 876000bd
**Location**: L361:30–L364:10

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7687
@@ -357,12 +357,9 @@
     });
 
     describe("isParsedChoiceArray", () => {
       test("should return true for valid array", () => {
-        const validChoices = [
-          createValidParsedChoice(),
-          createValidParsedChoice(),
-        ];
+        const validChoices = [];
         expect(isParsedChoiceArray(validChoices)).toBe(true);
       });
 
       test("should return true for empty array", () => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
