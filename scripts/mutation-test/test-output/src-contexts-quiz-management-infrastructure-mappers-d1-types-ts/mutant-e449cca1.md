# Mutant e449cca1 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: StringLiteral
**Original ID**: 7879
**Stable ID**: e449cca1
**Location**: L113:52–L113:76

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7879
@@ -109,9 +109,9 @@
   total: z.union([
     z.number(),
     z
       .string()
-      .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
+      .refine((val) => !Number.isNaN(Number(val)), "")
       .transform(Number),
   ]),
 });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
