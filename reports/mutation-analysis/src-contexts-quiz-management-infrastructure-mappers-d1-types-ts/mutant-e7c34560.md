# Mutant e7c34560 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: StringLiteral
**Original ID**: 40
**Stable ID**: e7c34560
**Location**: L33:70–L33:77

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #40
@@ -29,9 +29,9 @@
   "approved",
   "rejected",
 ]);
 
-export const zodMatchingStrategySchema = z.enum(["exact", "partial", "regex"]);
+export const zodMatchingStrategySchema = z.enum(["exact", "partial", ""]);
 
 /**
  * クイズ関連のD1行データスキーマ
  */
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。