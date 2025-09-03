# Mutant e64d91cb Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 735
**Stable ID**: e64d91cb
**Location**: L580:19–L580:31

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #735
@@ -576,9 +576,9 @@
 
     describe("Real-world Integration Scenarios", () => {
       it("should handle typical API pagination request", () => {
         const paginationRequest = {
-          status: ["approved"],
+          status: [],
           limit: 20,
           offset: 40, // page 3 with limit 20
         };
         const result = listQuizzesQuerySchema.safeParse(paginationRequest);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
