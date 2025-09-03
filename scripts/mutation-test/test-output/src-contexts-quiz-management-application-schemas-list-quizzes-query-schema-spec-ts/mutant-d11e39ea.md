# Mutant d11e39ea Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 751
**Stable ID**: d11e39ea
**Location**: L602:29–L605:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #751
@@ -598,12 +598,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(singleCreatorRequest);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.creatorId).toBe("teacher-1");
-          expect(result.data.status).toHaveLength(2);
-        }
+        if (result.success) {}
       });
 
       it("should handle quiz-specific filtering", () => {
         const specificQuizRequest = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
