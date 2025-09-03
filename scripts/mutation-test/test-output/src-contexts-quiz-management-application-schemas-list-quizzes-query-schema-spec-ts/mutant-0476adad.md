# Mutant 0476adad Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 707
**Stable ID**: 0476adad
**Location**: L542:53–L575:6

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #707
@@ -538,43 +538,10 @@
     });
   });
 
   describe("Type Safety and Integration", () => {
-    describe("TypeScript Type Compatibility", () => {
-      it("should maintain type safety with inferred types", () => {
-        const validInput = {
-          status: ["approved"] as const,
-          limit: 20,
-          offset: 0,
-        };
-        const result = listQuizzesQuerySchema.safeParse(validInput);
-        expect(result.success).toBe(true);
+    describe("TypeScript Type Compatibility", () => {});
 
-        if (result.success) {
-          // Type checks - these should compile without errors
-          const data: ListQuizzesQuery = result.data;
-          expect(data.status).toEqual(["approved"]);
-          expect(typeof data.limit).toBe("number");
-          expect(typeof data.offset).toBe("number");
-        }
-      });
-
-      it("should work with partial input objects", () => {
-        const partialInput: Partial<ListQuizzesQuery> = {
-          status: ["pending_approval"],
-          limit: 5,
-        };
-        const result = listQuizzesQuerySchema.safeParse(partialInput);
-        expect(result.success).toBe(true);
-
-        if (result.success) {
-          expect(result.data.status).toEqual(["pending_approval"]);
-          expect(result.data.limit).toBe(5);
-          expect(result.data.offset).toBe(0); // default
-        }
-      });
-    });
-
     describe("Real-world Integration Scenarios", () => {
       it("should handle typical API pagination request", () => {
         const paginationRequest = {
           status: ["approved"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
