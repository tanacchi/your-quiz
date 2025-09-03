# Mutant 6deb7735 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7671
**Stable ID**: 6deb7735
**Location**: L345:43–L345:49

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7671
@@ -341,9 +341,9 @@
         expect(isBasicQuizInfo(createValidBasicQuizInfo())).toBe(true);
       });
 
       test("should return false for invalid data", () => {
-        expect(isBasicQuizInfo({ invalid: "data" })).toBe(false);
+        expect(isBasicQuizInfo({ invalid: "" })).toBe(false);
       });
     });
 
     describe("isParsedChoice", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
