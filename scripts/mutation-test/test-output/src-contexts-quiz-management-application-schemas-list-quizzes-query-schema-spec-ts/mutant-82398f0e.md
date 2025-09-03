# Mutant 82398f0e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 583
**Stable ID**: 82398f0e
**Location**: L403:52–L417:8

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #583
@@ -399,24 +399,10 @@
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(true); // empty arrays are allowed, status will use default
       });
 
-      it("should handle single-item arrays", () => {
-        const input = {
-          status: ["approved"],
-          creatorId: "single-creator",
-          quizId: ["single-quiz"],
-        };
-        const result = listQuizzesQuerySchema.safeParse(input);
-        expect(result.success).toBe(true);
+      it("should handle single-item arrays", () => {});
 
-        if (result.success) {
-          expect(result.data.status).toHaveLength(1);
-          expect(result.data.creatorId).toBe("single-creator");
-          expect(result.data.quizId).toHaveLength(1);
-        }
-      });
-
       it("should handle very large arrays", () => {
         const largeArray = Array(50)
           .fill("quiz")
           .map((_, i) => `quiz-${i}`);
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
