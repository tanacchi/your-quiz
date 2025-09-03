# Mutant 114472fb Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 710
**Stable ID**: 114472fb
**Location**: L544:28–L548:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #710
@@ -540,13 +540,9 @@
 
   describe("Type Safety and Integration", () => {
     describe("TypeScript Type Compatibility", () => {
       it("should maintain type safety with inferred types", () => {
-        const validInput = {
-          status: ["approved"] as const,
-          limit: 20,
-          offset: 0,
-        };
+        const validInput = {};
         const result = listQuizzesQuerySchema.safeParse(validInput);
         expect(result.success).toBe(true);
 
         if (result.success) {
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
