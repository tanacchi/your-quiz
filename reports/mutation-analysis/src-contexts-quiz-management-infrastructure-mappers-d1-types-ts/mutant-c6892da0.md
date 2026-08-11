# Mutant c6892da0 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 133
**Stable ID**: c6892da0
**Location**: L113:47–L119:2

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #133
@@ -109,15 +109,9 @@
 
 /**
  * JSON.parse後の選択肢データスキーマ
  */
-export const zodParsedChoiceSchema = z.object({
-  id: z.string(),
-  solutionId: z.string(),
-  text: z.string(),
-  orderIndex: z.coerce.number(),
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