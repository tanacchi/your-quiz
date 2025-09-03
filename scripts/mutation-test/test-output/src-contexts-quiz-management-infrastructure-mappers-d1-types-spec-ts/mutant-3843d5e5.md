# Mutant 3843d5e5 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7685
**Stable ID**: 3843d5e5
**Location**: L360:12–L360:48

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7685
@@ -356,9 +356,9 @@
       });
     });
 
     describe("isParsedChoiceArray", () => {
-      test("should return true for valid array", () => {
+      test("", () => {
         const validChoices = [
           createValidParsedChoice(),
           createValidParsedChoice(),
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
