# Mutant 99c19dae Report

**File**: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
**Mutator**: StringLiteral
**Original ID**: 799
**Stable ID**: 99c19dae
**Location**: L260:21–L260:74

## Diff

```diff
Index: src/contexts/quiz-management/infrastructure/mappers/d1-types.ts
===================================================================
--- src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	original
+++ src/contexts/quiz-management/infrastructure/mappers/d1-types.ts	mutated #799
@@ -256,8 +256,8 @@
   answer_type: string;
 } {
   const result = zodBasicQuizInfoSchema.safeParse(data);
   if (!result.success) {
-    throw new Error(`Invalid BasicQuizInfo data: ${result.error.message}`);
+    throw new Error(``);
   }
   return result.data;
 }
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。