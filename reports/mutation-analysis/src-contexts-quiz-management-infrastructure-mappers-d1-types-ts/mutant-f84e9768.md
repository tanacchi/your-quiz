# Mutant f84e9768 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ArrowFunction
**Original ID**: 106
**Stable ID**: f84e9768
**Location**: L138:15–L138:50

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #106
@@ -134,9 +134,9 @@
   orderIndex: z.union([
     z.number(),
     z
       .string()
-      .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
+      .refine(() => undefined, "Must be a valid number")
       .transform(Number),
   ]),
   isCorrect: z.boolean(),
 });
```

## Hint

ミューテータ "ArrowFunction" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。