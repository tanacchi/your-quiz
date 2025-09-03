# Mutant b24cc2fb Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 772
**Stable ID**: b24cc2fb
**Location**: L626:28–L634:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #772
@@ -622,17 +622,9 @@
     describe("Performance and Memory", () => {
       it("should handle validation performance within reasonable time", () => {
         const startTime = performance.now();
 
-        const largeInput = {
-          status: ["approved"],
-          creatorId: "creator-performance-test",
-          quizId: Array(100)
-            .fill(0)
-            .map((_, i) => `quiz-${i}`),
-          limit: 100,
-          offset: 0,
-        };
+        const largeInput = {};
 
         const result = listQuizzesQuerySchema.safeParse(largeInput);
         const endTime = performance.now();
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
