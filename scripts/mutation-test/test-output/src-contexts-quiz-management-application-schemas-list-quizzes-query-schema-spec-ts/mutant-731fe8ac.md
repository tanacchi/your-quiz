# Mutant 731fe8ac Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 369
**Stable ID**: 731fe8ac
**Location**: L211:29–L213:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #369
@@ -207,11 +207,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(validQuery);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data).toEqual(validQuery);
-        }
+        if (result.success) {}
       });
 
       it("should reject invalid field combinations", () => {
         const invalidQuery = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
