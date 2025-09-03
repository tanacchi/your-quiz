# Mutant c5b7c656 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 593
**Stable ID**: c5b7c656
**Location**: L412:29–L416:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #593
@@ -408,13 +408,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.status).toHaveLength(1);
-          expect(result.data.creatorId).toBe("single-creator");
-          expect(result.data.quizId).toHaveLength(1);
-        }
+        if (result.success) {}
       });
 
       it("should handle very large arrays", () => {
         const largeArray = Array(50)
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
