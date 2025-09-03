# Mutant c538cda4 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 759
**Stable ID**: c538cda4
**Location**: L611:19–L611:31

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #759
@@ -607,9 +607,9 @@
 
       it("should handle quiz-specific filtering", () => {
         const specificQuizRequest = {
           quizId: ["quiz-abc123", "quiz-def456"],
-          status: ["approved"],
+          status: [],
         };
         const result = listQuizzesQuerySchema.safeParse(specificQuizRequest);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
