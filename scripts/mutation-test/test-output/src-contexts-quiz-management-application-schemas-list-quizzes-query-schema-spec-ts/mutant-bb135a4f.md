# Mutant bb135a4f Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 20
**Stable ID**: bb135a4f
**Location**: L12:71–L25:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #20
@@ -8,23 +8,10 @@
 
 describe("List Quizzes Query Schema", () => {
   describe("listQuizzesQuerySchema Validation", () => {
     describe("Default Values", () => {
-      it("should apply default values for all optional fields", () => {
-        const emptyInput = {};
-        const result = listQuizzesQuerySchema.safeParse(emptyInput);
-        expect(result.success).toBe(true);
+      it("should apply default values for all optional fields", () => {});
 
-        if (result.success) {
-          const data = result.data as ListQuizzesQuery;
-          expect(data.status).toEqual(["approved"]);
-          expect(data.limit).toBe(10);
-          expect(data.offset).toBe(0);
-          expect(data.creatorId).toBeUndefined();
-          expect(data.quizId).toBeUndefined();
-        }
-      });
-
       it("should preserve provided values over defaults", () => {
         const customInput = {
           status: ["pending_approval", "rejected"],
           limit: 25,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
