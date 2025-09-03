# Mutant b4f3f1a7 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7680
**Stable ID**: b4f3f1a7
**Location**: L355:31–L355:50

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7680
@@ -351,9 +351,9 @@
         expect(isParsedChoice(createValidParsedChoice())).toBe(true);
       });
 
       test("should return false for invalid data", () => {
-        expect(isParsedChoice({ invalid: "data" })).toBe(false);
+        expect(isParsedChoice({})).toBe(false);
       });
     });
 
     describe("isParsedChoiceArray", () => {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
