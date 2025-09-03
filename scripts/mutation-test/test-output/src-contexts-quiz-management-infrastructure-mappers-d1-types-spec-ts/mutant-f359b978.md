# Mutant f359b978 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7684
**Stable ID**: f359b978
**Location**: L359:43–L376:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7684
@@ -355,27 +355,10 @@
         expect(isParsedChoice({ invalid: "data" })).toBe(false);
       });
     });
 
-    describe("isParsedChoiceArray", () => {
-      test("should return true for valid array", () => {
-        const validChoices = [
-          createValidParsedChoice(),
-          createValidParsedChoice(),
-        ];
-        expect(isParsedChoiceArray(validChoices)).toBe(true);
-      });
+    describe("isParsedChoiceArray", () => {});
 
-      test("should return true for empty array", () => {
-        expect(isParsedChoiceArray([])).toBe(true);
-      });
-
-      test("should return false for invalid array", () => {
-        expect(isParsedChoiceArray([{ invalid: "data" }])).toBe(false);
-        expect(isParsedChoiceArray("not-an-array")).toBe(false);
-      });
-    });
-
     describe("String Validation Guards", () => {
       test("should validate answer types", () => {
         expect(isValidAnswerType("boolean")).toBe(true);
         expect(isValidAnswerType("invalid")).toBe(false);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
