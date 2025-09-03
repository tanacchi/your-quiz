# Mutant 43abf99c Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 18
**Stable ID**: 43abf99c
**Location**: L11:38–L42:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #18
@@ -7,41 +7,10 @@
 } from "./list-quizzes-query.schema";
 
 describe("List Quizzes Query Schema", () => {
   describe("listQuizzesQuerySchema Validation", () => {
-    describe("Default Values", () => {
-      it("should apply default values for all optional fields", () => {
-        const emptyInput = {};
-        const result = listQuizzesQuerySchema.safeParse(emptyInput);
-        expect(result.success).toBe(true);
+    describe("Default Values", () => {});
 
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
-      it("should preserve provided values over defaults", () => {
-        const customInput = {
-          status: ["pending_approval", "rejected"],
-          limit: 25,
-          offset: 50,
-        };
-        const result = listQuizzesQuerySchema.safeParse(customInput);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.status).toEqual(["pending_approval", "rejected"]);
-          expect(result.data.limit).toBe(25);
-          expect(result.data.offset).toBe(50);
-        }
-      });
-    });
-
     describe("Status Field Validation", () => {
       it.each([
         ["single approved status", ["approved"], true],
         ["single pending_approval status", ["pending_approval"], true],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
