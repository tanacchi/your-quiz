# Mutant 69fdf2a6 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: ArrayDeclaration
**Original ID**: 37
**Stable ID**: 69fdf2a6
**Location**: L33:49–L33:78

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #37
@@ -29,9 +29,9 @@
   "approved",
   "rejected",
 ]);
 
-export const zodMatchingStrategySchema = z.enum(["exact", "partial", "regex"]);
+export const zodMatchingStrategySchema = z.enum([]);
 
 /**
  * クイズ関連のD1行データスキーマ
  */
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。