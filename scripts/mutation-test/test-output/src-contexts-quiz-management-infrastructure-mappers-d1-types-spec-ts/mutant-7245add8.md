# Mutant 7245add8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 7649
**Stable ID**: 7245add8
**Location**: L320:11–L320:30

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7649
@@ -316,9 +316,9 @@
           undefined,
           "string",
           123,
           {},
-          { invalid: "data" },
+          {},
         ];
 
         invalidInputs.forEach((input) => {
           expect(isQuizRow(input)).toBe(false);
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
