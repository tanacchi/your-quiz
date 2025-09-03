# Mutant f8fcc3d4 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 714
**Stable ID**: f8fcc3d4
**Location**: L552:29–L558:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #714
@@ -548,15 +548,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(validInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          // Type checks - these should compile without errors
-          const data: ListQuizzesQuery = result.data;
-          expect(data.status).toEqual(["approved"]);
-          expect(typeof data.limit).toBe("number");
-          expect(typeof data.offset).toBe("number");
-        }
+        if (result.success) {}
       });
 
       it("should work with partial input objects", () => {
         const partialInput: Partial<ListQuizzesQuery> = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
