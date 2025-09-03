# Mutant 05d1de93 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 171
**Stable ID**: 05d1de93
**Location**: L97:67–L99:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #171
@@ -93,11 +93,9 @@
         const input = creatorId === undefined ? {} : { creatorId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(isValid);
 
-        if (isValid && result.success && creatorId !== undefined) {
-          expect(result.data.creatorId).toEqual(creatorId);
-        }
+        if (isValid && result.success && creatorId !== undefined) {}
       });
     });
 
     describe("QuizId Field Validation", () => {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
