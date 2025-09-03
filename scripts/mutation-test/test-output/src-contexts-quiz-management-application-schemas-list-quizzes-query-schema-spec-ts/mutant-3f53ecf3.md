# Mutant 3f53ecf3 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 580
**Stable ID**: 3f53ecf3
**Location**: L397:19–L397:21

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #580
@@ -393,9 +393,9 @@
     describe("Array Edge Cases", () => {
       it("should handle empty arrays correctly", () => {
         const input = {
           status: [],
-          quizId: [],
+          quizId: ["Stryker was here"],
         };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(true); // empty arrays are allowed, status will use default
       });
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
