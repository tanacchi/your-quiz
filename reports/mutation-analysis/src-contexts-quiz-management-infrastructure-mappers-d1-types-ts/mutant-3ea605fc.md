# Mutant 3ea605fc Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 104
**Stable ID**: 3ea605fc
**Location**: L130:47–L142:2

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #104
@@ -126,21 +126,9 @@
 
 /**
  * JSON.parse後の選択肢データスキーマ
  */
-export const zodParsedChoiceSchema = z.object({
-  id: z.string(),
-  solutionId: z.string(),
-  text: z.string(),
-  orderIndex: z.union([
-    z.number(),
-    z
-      .string()
-      .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
-      .transform(Number),
-  ]),
-  isCorrect: z.boolean(),
-});
+export const zodParsedChoiceSchema = z.object({});
 
 /**
  * 既存の型定義（Zodから推論）
  */
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。