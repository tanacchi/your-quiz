# Mutant d745a770 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ArrowFunction
**Original ID**: 45
**Stable ID**: d745a770
**Location**: L68:19–L68:54

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #45
@@ -64,9 +64,9 @@
       .union([
         z.number(),
         z
           .string()
-          .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
+          .refine(() => undefined, "Must be a valid number")
           .transform(Number),
       ])
       .nullable()
       .optional(),
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。