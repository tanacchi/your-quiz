# Mutant 31435bb2 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 24
**Stable ID**: 31435bb2
**Location**: L17:29–L24:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #24
@@ -13,16 +13,9 @@
         const emptyInput = {};
         const result = listQuizzesQuerySchema.safeParse(emptyInput);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          const data = result.data as ListQuizzesQuery;
-          expect(data.status).toEqual(["approved"]);
-          expect(data.limit).toBe(10);
-          expect(data.offset).toBe(0);
-          expect(data.creatorId).toBeUndefined();
-          expect(data.quizId).toBeUndefined();
-        }
+        if (result.success) {}
       });
 
       it("should preserve provided values over defaults", () => {
         const customInput = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
