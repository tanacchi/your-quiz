# Mutant db2ee6e8 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 131
**Stable ID**: db2ee6e8
**Location**: L97:46–L99:2

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #131
@@ -93,11 +93,9 @@
 
 /**
  * D1の COUNT クエリ結果スキーマ
  */
-export const zodCountResultSchema = z.object({
-  total: z.coerce.number(),
-});
+export const zodCountResultSchema = z.object({});
 
 /**
  * 基本的なクイズ情報スキーマ（削除時に使用）
  */
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。