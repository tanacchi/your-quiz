# Mutant 01bee274 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ArrowFunction
**Original ID**: 100
**Stable ID**: 01bee274
**Location**: L113:15–L113:50

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #100
@@ -109,9 +109,9 @@
   total: z.union([
     z.number(),
     z
       .string()
-      .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
+      .refine(() => undefined, "Must be a valid number")
       .transform(Number),
   ]),
 });
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。