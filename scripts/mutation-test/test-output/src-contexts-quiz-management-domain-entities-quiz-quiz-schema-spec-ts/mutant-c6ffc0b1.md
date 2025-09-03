# Mutant c6ffc0b1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 2959
**Stable ID**: c6ffc0b1
**Location**: L154:13–L154:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #2959
@@ -150,9 +150,9 @@
         const data = { ...validQuizData, solution: validSolution };
         const result = QuizSchema.safeParse(data);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           expect(result.data.solution).toEqual(validSolution);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
