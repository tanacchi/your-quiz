# Mutant adf18ec5 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7669
**Stable ID**: adf18ec5
**Location**: L344:58–L346:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7669
@@ -340,11 +340,9 @@
       test("should return true for valid basic quiz info", () => {
         expect(isBasicQuizInfo(createValidBasicQuizInfo())).toBe(true);
       });
 
-      test("should return false for invalid data", () => {
-        expect(isBasicQuizInfo({ invalid: "data" })).toBe(false);
-      });
+      test("should return false for invalid data", () => {});
     });
 
     describe("isParsedChoice", () => {
       test("should return true for valid parsed choice", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
