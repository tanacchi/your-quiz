# Mutant 0b3c6e1d Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 3222
**Stable ID**: 0b3c6e1d
**Location**: L443:11–L443:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-schema.spec.ts	mutated #3222
@@ -439,9 +439,9 @@
 
       const result = QuizSchema.safeParse(fullApprovedQuiz);
       expect(result.success).toBe(true);
 
-      if (result.success) {
+      if (false) {
         expect(result.data.answerType).toBe("boolean");
         expect(result.data.solution.value).toBe(true);
         expect(result.data.status).toBe("approved");
         expect(result.data.approvedAt).toBeDefined();
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
