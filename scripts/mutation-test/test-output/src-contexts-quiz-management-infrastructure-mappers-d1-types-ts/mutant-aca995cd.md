# Mutant aca995cd Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7821
**Stable ID**: aca995cd
**Location**: L64:14–L70:8

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7821
@@ -60,15 +60,9 @@
       .nullable()
       .optional(),
     choices: z.string().nullable().optional(),
     min_correct_answers: z
-      .union([
-        z.number(),
-        z
-          .string()
-          .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
-          .transform(Number),
-      ])
+      .union([])
       .nullable()
       .optional(),
   })
   .transform((data) => {
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
