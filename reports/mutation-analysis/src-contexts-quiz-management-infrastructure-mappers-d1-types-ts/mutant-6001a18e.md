# Mutant 6001a18e Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 132
**Stable ID**: 6001a18e
**Location**: L104:48–L108:2

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #132
@@ -100,13 +100,9 @@
 
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