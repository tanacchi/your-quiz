# Mutant 7a4bd29e Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 358
**Stable ID**: 7a4bd29e
**Location**: L202:19–L202:51

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #358
@@ -198,9 +198,9 @@
 
     describe("Complex Validation Scenarios", () => {
       it("should accept valid complete query", () => {
         const validQuery = {
-          status: ["approved", "pending_approval"],
+          status: [],
           creatorId: "creator-123",
           quizId: ["quiz-1", "quiz-2", "quiz-3"],
           limit: 25,
           offset: 50,
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
