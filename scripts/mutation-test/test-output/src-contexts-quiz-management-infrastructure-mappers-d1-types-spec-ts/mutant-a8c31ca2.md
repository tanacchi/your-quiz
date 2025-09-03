# Mutant a8c31ca2 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7681
**Stable ID**: a8c31ca2
**Location**: L355:42–L355:48

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7681
@@ -351,9 +351,9 @@
         expect(isParsedChoice(createValidParsedChoice())).toBe(true);
       });
 
       test("should return false for invalid data", () => {
-        expect(isParsedChoice({ invalid: "data" })).toBe(false);
+        expect(isParsedChoice({ invalid: "" })).toBe(false);
       });
     });
 
     describe("isParsedChoiceArray", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
