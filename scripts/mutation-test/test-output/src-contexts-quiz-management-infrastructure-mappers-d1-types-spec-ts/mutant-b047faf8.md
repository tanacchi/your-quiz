# Mutant b047faf8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7674
**Stable ID**: b047faf8
**Location**: L349:38–L357:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7674
@@ -345,18 +345,10 @@
         expect(isBasicQuizInfo({ invalid: "data" })).toBe(false);
       });
     });
 
-    describe("isParsedChoice", () => {
-      test("should return true for valid parsed choice", () => {
-        expect(isParsedChoice(createValidParsedChoice())).toBe(true);
-      });
+    describe("isParsedChoice", () => {});
 
-      test("should return false for invalid data", () => {
-        expect(isParsedChoice({ invalid: "data" })).toBe(false);
-      });
-    });
-
     describe("isParsedChoiceArray", () => {
       test("should return true for valid array", () => {
         const validChoices = [
           createValidParsedChoice(),
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
