# Mutant a4171b80 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7650
**Stable ID**: a4171b80
**Location**: L320:22–L320:28

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7650
@@ -316,9 +316,9 @@
           undefined,
           "string",
           123,
           {},
-          { invalid: "data" },
+          { invalid: "" },
         ];
 
         invalidInputs.forEach((input) => {
           expect(isQuizRow(input)).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
