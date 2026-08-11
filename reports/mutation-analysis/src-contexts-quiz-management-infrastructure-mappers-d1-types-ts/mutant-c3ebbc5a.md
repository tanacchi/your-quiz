# Mutant c3ebbc5a Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ObjectLiteral
**Original ID**: 98
**Stable ID**: c3ebbc5a
**Location**: L108:46–L116:2

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #98
@@ -104,17 +104,9 @@
 
 /**
  * D1の COUNT クエリ結果スキーマ
  */
-export const zodCountResultSchema = z.object({
-  total: z.union([
-    z.number(),
-    z
-      .string()
-      .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
-      .transform(Number),
-  ]),
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