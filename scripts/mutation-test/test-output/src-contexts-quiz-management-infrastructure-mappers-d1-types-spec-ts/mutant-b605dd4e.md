# Mutant b605dd4e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7664
**Stable ID**: b605dd4e
**Location**: L339:39–L347:6

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7664
@@ -335,18 +335,10 @@
         expect(isCountResult({ invalid: "data" })).toBe(false);
       });
     });
 
-    describe("isBasicQuizInfo", () => {
-      test("should return true for valid basic quiz info", () => {
-        expect(isBasicQuizInfo(createValidBasicQuizInfo())).toBe(true);
-      });
+    describe("isBasicQuizInfo", () => {});
 
-      test("should return false for invalid data", () => {
-        expect(isBasicQuizInfo({ invalid: "data" })).toBe(false);
-      });
-    });
-
     describe("isParsedChoice", () => {
       test("should return true for valid parsed choice", () => {
         expect(isParsedChoice(createValidParsedChoice())).toBe(true);
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
