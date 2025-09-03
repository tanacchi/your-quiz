# Mutant 90a4020f Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7676
**Stable ID**: 90a4020f
**Location**: L350:64–L352:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7676
@@ -346,11 +346,9 @@
       });
     });
 
     describe("isParsedChoice", () => {
-      test("should return true for valid parsed choice", () => {
-        expect(isParsedChoice(createValidParsedChoice())).toBe(true);
-      });
+      test("should return true for valid parsed choice", () => {});
 
       test("should return false for invalid data", () => {
         expect(isParsedChoice({ invalid: "data" })).toBe(false);
       });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
