# Mutant 8c81ce9f Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
**Mutator**: StringLiteral
**Original ID**: 7648
**Stable ID**: 8c81ce9f
**Location**: L317:11–L317:19

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.spec.ts	mutated #7648
@@ -313,9 +313,9 @@
       test("should return false for invalid data", () => {
         const invalidInputs = [
           null,
           undefined,
-          "string",
+          "",
           123,
           {},
           { invalid: "data" },
         ];
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
