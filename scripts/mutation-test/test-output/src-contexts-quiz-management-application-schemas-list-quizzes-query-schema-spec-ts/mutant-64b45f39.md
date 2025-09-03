# Mutant 64b45f39 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: BlockStatement
**Original ID**: 740
**Stable ID**: 64b45f39
**Location**: L587:29–L590:10

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #740
@@ -583,12 +583,9 @@
         };
         const result = listQuizzesQuerySchema.safeParse(paginationRequest);
         expect(result.success).toBe(true);
 
-        if (result.success) {
-          expect(result.data.limit).toBe(20);
-          expect(result.data.offset).toBe(40);
-        }
+        if (result.success) {}
       });
 
       it("should handle filtering by single creator", () => {
         const singleCreatorRequest = {
```

## Hint

ミューテータ "BlockStatement" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
