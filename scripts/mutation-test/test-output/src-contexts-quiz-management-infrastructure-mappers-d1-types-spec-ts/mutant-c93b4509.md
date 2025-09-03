# Mutant c93b4509 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7673
**Stable ID**: c93b4509
**Location**: L349:14–L349:30

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7673
@@ -345,9 +345,9 @@
         expect(isBasicQuizInfo({ invalid: "data" })).toBe(false);
       });
     });
 
-    describe("isParsedChoice", () => {
+    describe("", () => {
       test("should return true for valid parsed choice", () => {
         expect(isParsedChoice(createValidParsedChoice())).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
