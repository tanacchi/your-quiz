# Mutant 87ecfcb8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7661
**Stable ID**: 87ecfcb8
**Location**: L335:41–L335:47

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7661
@@ -331,9 +331,9 @@
         expect(isCountResult(createValidCountResult())).toBe(true);
       });
 
       test("should return false for invalid data", () => {
-        expect(isCountResult({ invalid: "data" })).toBe(false);
+        expect(isCountResult({ invalid: "" })).toBe(false);
       });
     });
 
     describe("isBasicQuizInfo", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
