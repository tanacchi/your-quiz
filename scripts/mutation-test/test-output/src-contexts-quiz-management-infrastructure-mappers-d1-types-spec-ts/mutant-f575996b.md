# Mutant f575996b Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7699
**Stable ID**: f575996b
**Location**: L374:36–L374:50

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7699
@@ -370,9 +370,9 @@
       });
 
       test("should return false for invalid array", () => {
         expect(isParsedChoiceArray([{ invalid: "data" }])).toBe(false);
-        expect(isParsedChoiceArray("not-an-array")).toBe(false);
+        expect(isParsedChoiceArray("")).toBe(false);
       });
     });
 
     describe("String Validation Guards", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
