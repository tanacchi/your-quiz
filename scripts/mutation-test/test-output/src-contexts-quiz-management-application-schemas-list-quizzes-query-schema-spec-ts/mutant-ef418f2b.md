# Mutant ef418f2b Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 577
**Stable ID**: ef418f2b
**Location**: L394:56–L401:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #577
@@ -390,16 +390,9 @@
       });
     });
 
     describe("Array Edge Cases", () => {
-      it("should handle empty arrays correctly", () => {
-        const input = {
-          status: [],
-          quizId: [],
-        };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(true); // empty arrays are allowed, status will use default
-      });
+      it("should handle empty arrays correctly", () => {});
 
       it("should handle single-item arrays", () => {
         const input = {
           status: ["approved"],
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
