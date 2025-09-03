# Mutant 94fe5fc4 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7675
**Stable ID**: 94fe5fc4
**Location**: L350:12–L350:56

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7675
@@ -346,9 +346,9 @@
       });
     });
 
     describe("isParsedChoice", () => {
-      test("should return true for valid parsed choice", () => {
+      test("", () => {
         expect(isParsedChoice(createValidParsedChoice())).toBe(true);
       });
 
       test("should return false for invalid data", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
