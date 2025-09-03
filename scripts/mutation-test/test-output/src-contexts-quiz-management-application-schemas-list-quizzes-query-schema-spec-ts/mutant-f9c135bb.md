# Mutant f9c135bb Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ConditionalExpression
**Original ID**: 750
**Stable ID**: f9c135bb
**Location**: L602:13–L602:27

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #750
@@ -598,9 +598,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(singleCreatorRequest);
         expect(result.success).toBe(true);
 
-        if (result.success) {
+        if (false) {
           expect(result.data.creatorId).toBe("teacher-1");
           expect(result.data.status).toHaveLength(2);
         }
       });
```

## Hint

条件式が変更されています。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
