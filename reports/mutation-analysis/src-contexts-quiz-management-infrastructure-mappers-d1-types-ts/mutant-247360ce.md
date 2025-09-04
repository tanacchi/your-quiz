# Mutant 247360ce Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ArrayDeclaration
**Original ID**: 99
**Stable ID**: 247360ce
**Location**: L109:18–L115:4

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #99
@@ -105,15 +105,9 @@
 /**
  * D1の COUNT クエリ結果スキーマ
  */
 export const zodCountResultSchema = z.object({
-  total: z.union([
-    z.number(),
-    z
-      .string()
-      .refine((val) => !Number.isNaN(Number(val)), "Must be a valid number")
-      .transform(Number),
-  ]),
+  total: z.union([]),
 });
 
 /**
  * 基本的なクイズ情報スキーマ（削除時に使用）
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。