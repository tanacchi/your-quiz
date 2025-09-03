# Mutant 6fe9c654 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 3003
**Stable ID**: 6fe9c654
**Location**: L198:13–L198:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3003
@@ -194,9 +194,9 @@
           validQuizData;
         const result = QuizSchema.safeParse(dataWithoutExplanation);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           expect(result.data.explanation).toBeUndefined();
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
