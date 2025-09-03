# Mutant 17a0b9d9 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7702
**Stable ID**: 17a0b9d9
**Location**: L378:48–L393:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7702
@@ -374,24 +374,9 @@
         expect(isParsedChoiceArray("not-an-array")).toBe(false);
       });
     });
 
-    describe("String Validation Guards", () => {
-      test("should validate answer types", () => {
-        expect(isValidAnswerType("boolean")).toBe(true);
-        expect(isValidAnswerType("invalid")).toBe(false);
-      });
-
-      test("should validate quiz statuses", () => {
-        expect(isValidQuizStatus("approved")).toBe(true);
-        expect(isValidQuizStatus("invalid")).toBe(false);
-      });
-
-      test("should validate matching strategies", () => {
-        expect(isValidMatchingStrategy("exact")).toBe(true);
-        expect(isValidMatchingStrategy("invalid")).toBe(false);
-      });
-    });
+    describe("String Validation Guards", () => {});
   });
 
   describe("Conversion Functions", () => {
     describe("toQuizRow", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
