# Mutant 128b43f5 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: StringLiteral
**Original ID**: 30
**Stable ID**: 128b43f5
**Location**: L22:3–L22:14

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #30
@@ -18,9 +18,9 @@
  * 列挙型スキーマ
  */
 export const zodAnswerTypeSchema = z.enum([
   "boolean",
-  "free_text",
+  "",
   "single_choice",
   "multiple_choice",
 ]);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。