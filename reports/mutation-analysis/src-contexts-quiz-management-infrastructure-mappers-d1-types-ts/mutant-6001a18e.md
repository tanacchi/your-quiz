# Mutant 6001a18e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 103
**Stable ID**: 6001a18e
**Location**: L121:48–L125:2

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #103
@@ -117,13 +117,9 @@
 
 /**
  * 基本的なクイズ情報スキーマ（削除時に使用）
  */
-export const zodBasicQuizInfoSchema = z.object({
-  id: d1IdSchema,
-  solution_id: d1IdSchema,
-  answer_type: zodAnswerTypeSchema,
-});
+export const zodBasicQuizInfoSchema = z.object({});
 
 /**
  * JSON.parse後の選択肢データスキーマ
  */
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。