# Mutant cb1e1604 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7689
**Stable ID**: cb1e1604
**Location**: L368:12–L368:48

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7689
@@ -364,9 +364,9 @@
         ];
         expect(isParsedChoiceArray(validChoices)).toBe(true);
       });
 
-      test("should return true for empty array", () => {
+      test("", () => {
         expect(isParsedChoiceArray([])).toBe(true);
       });
 
       test("should return false for invalid array", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
