# Mutant bea15088 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: StringLiteral
**Original ID**: 7824
**Stable ID**: bea15088
**Location**: L68:56–L68:80

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7824
@@ -64,9 +64,9 @@
       .union([
         z.number(),
         z
           .string()
-          .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
+          .refine((val) => !Number.isNaN(Number(val)), "")
           .transform(Number),
       ])
       .nullable()
       .optional(),
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
