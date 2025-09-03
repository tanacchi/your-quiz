# Mutant 955501ec Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 355
**Stable ID**: 955501ec
**Location**: L200:10–L200:46

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #355
@@ -196,9 +196,9 @@
       });
     });
 
     describe("Complex Validation Scenarios", () => {
-      it("should accept valid complete query", () => {
+      it("", () => {
         const validQuery = {
           status: ["approved", "pending_approval"],
           creatorId: "creator-123",
           quizId: ["quiz-1", "quiz-2", "quiz-3"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
