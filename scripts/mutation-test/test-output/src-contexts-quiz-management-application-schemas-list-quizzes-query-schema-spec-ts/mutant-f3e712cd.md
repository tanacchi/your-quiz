# Mutant f3e712cd Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 362
**Stable ID**: f3e712cd
**Location**: L204:19–L204:49

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #362
@@ -200,9 +200,9 @@
       it("should accept valid complete query", () => {
         const validQuery = {
           status: ["approved", "pending_approval"],
           creatorId: "creator-123",
-          quizId: ["quiz-1", "quiz-2", "quiz-3"],
+          quizId: [],
           limit: 25,
           offset: 50,
         };
         const result = listQuizzesQuerySchema.safeParse(validQuery);
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
