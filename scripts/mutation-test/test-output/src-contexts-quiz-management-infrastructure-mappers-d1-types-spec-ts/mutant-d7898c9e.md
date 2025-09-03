# Mutant d7898c9e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7678
**Stable ID**: d7898c9e
**Location**: L354:12–L354:50

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7678
@@ -350,9 +350,9 @@
       test("should return true for valid parsed choice", () => {
         expect(isParsedChoice(createValidParsedChoice())).toBe(true);
       });
 
-      test("should return false for invalid data", () => {
+      test("", () => {
         expect(isParsedChoice({ invalid: "data" })).toBe(false);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
