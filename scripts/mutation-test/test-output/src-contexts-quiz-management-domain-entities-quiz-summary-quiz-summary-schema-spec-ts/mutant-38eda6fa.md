# Mutant 38eda6fa Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 5222
**Stable ID**: 38eda6fa
**Location**: L214:13–L214:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-schema.spec.ts	mutated #5222
@@ -210,9 +210,9 @@
         const { tagIds: _tagIds, ...dataWithoutTagIds } = validQuizSummaryData;
         const result = QuizSummarySchema.safeParse(dataWithoutTagIds);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           expect(result.data.tagIds).toEqual([]);
         }
       });
     });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
