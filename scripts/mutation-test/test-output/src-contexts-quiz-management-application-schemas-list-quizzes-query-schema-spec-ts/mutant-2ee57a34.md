# Mutant 2ee57a34 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 630
**Stable ID**: 2ee57a34
**Location**: L447:29–L449:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #630
@@ -443,11 +443,9 @@
         const input = { creatorId };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.creatorId).toEqual(creatorId);
-        }
+        if (result.success) {}
       });
     });
   });
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
