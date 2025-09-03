# Mutant 8a079bd8 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 116
**Stable ID**: 8a079bd8
**Location**: L72:10–L72:54

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #116
@@ -68,9 +68,9 @@
           expect(result.data.status).toEqual(status);
         }
       });
 
-      it("should apply default status when undefined", () => {
+      it("", () => {
         const result = listQuizzesQuerySchema.safeParse({});
         expect(result.success).toBe(true);
 
         if (result.success) {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
