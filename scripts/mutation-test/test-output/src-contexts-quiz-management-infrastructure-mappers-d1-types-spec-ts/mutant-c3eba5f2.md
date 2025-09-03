# Mutant c3eba5f2 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7697
**Stable ID**: c3eba5f2
**Location**: L373:48–L373:54

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7697
@@ -369,9 +369,9 @@
         expect(isParsedChoiceArray([])).toBe(true);
       });
 
       test("should return false for invalid array", () => {
-        expect(isParsedChoiceArray([{ invalid: "data" }])).toBe(false);
+        expect(isParsedChoiceArray([{ invalid: "" }])).toBe(false);
         expect(isParsedChoiceArray("not-an-array")).toBe(false);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
