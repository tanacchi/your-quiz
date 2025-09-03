# Mutant f1a738f2 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: BlockStatement
**Original ID**: 7690
**Stable ID**: f1a738f2
**Location**: L368:56–L370:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7690
@@ -364,11 +364,9 @@
         ];
         expect(isParsedChoiceArray(validChoices)).toBe(true);
       });
 
-      test("should return true for empty array", () => {
-        expect(isParsedChoiceArray([])).toBe(true);
-      });
+      test("should return true for empty array", () => {});
 
       test("should return false for invalid array", () => {
         expect(isParsedChoiceArray([{ invalid: "data" }])).toBe(false);
         expect(isParsedChoiceArray("not-an-array")).toBe(false);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
