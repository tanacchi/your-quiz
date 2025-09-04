# Mutant a7164f67 Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: StringLiteral
**Original ID**: 32
**Stable ID**: a7164f67
**Location**: L24:3–L24:20

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #32
@@ -20,9 +20,9 @@
 export const zodAnswerTypeSchema = z.enum([
   "boolean",
   "free_text",
   "single_choice",
-  "multiple_choice",
+  "",
 ]);
 
 export const zodQuizStatusSchema = z.enum([
   "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。