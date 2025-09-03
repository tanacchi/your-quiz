# Mutant 1fa07562 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ArrayDeclaration
**Original ID**: 7804
**Stable ID**: 1fa07562
**Location**: L15:28–L15:52

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #7804
@@ -11,9 +11,9 @@
 
 /**
  * D1の数値IDを文字列に変換するスキーマ
  */
-const d1IdSchema = z.union([z.string(), z.number()]).transform(String);
+const d1IdSchema = z.union([]).transform(String);
 
 /**
  * 列挙型スキーマ
  */
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
