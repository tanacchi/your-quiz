# Mutant aa056196 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 709
**Stable ID**: aa056196
**Location**: L543:67–L559:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #709
@@ -539,26 +539,10 @@
   });
 
   describe("Type Safety and Integration", () => {
     describe("TypeScript Type Compatibility", () => {
-      it("should maintain type safety with inferred types", () => {
-        const validInput = {
-          status: ["approved"] as const,
-          limit: 20,
-          offset: 0,
-        };
-        const result = listQuizzesQuerySchema.safeParse(validInput);
-        expect(result.success).toBe(true);
+      it("should maintain type safety with inferred types", () => {});
 
-        if (result.success) {
-          // Type checks - these should compile without errors
-          const data: ListQuizzesQuery = result.data;
-          expect(data.status).toEqual(["approved"]);
-          expect(typeof data.limit).toBe("number");
-          expect(typeof data.offset).toBe("number");
-        }
-      });
-
       it("should work with partial input objects", () => {
         const partialInput: Partial<ListQuizzesQuery> = {
           status: ["pending_approval"],
           limit: 5,
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
