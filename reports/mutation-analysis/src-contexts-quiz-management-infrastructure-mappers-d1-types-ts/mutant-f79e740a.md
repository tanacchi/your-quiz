# Mutant f79e740a Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: StringLiteral
**Original ID**: 108
**Stable ID**: f79e740a
**Location**: L138:52–L138:76

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #108
@@ -134,9 +134,9 @@
   orderIndex: z.union([
     z.number(),
     z
       .string()
-      .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
+      .refine((val) => !Number.isNaN(Number(val)), "")
       .transform(Number),
   ]),
   isCorrect: z.boolean(),
 });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。