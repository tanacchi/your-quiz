# Mutant 237db97b Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7882
**Stable ID**: 237db97b
**Location**: L134:23–L140:4

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7882
@@ -130,15 +130,9 @@
 export const zodParsedChoiceSchema = z.object({
   id: z.string(),
   solutionId: z.string(),
   text: z.string(),
-  orderIndex: z.union([
-    z.number(),
-    z
-      .string()
-      .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
-      .transform(Number),
-  ]),
+  orderIndex: z.union([]),
   isCorrect: z.boolean(),
 });
 
 /**
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
