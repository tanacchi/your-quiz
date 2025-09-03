# Mutant 3a62a827 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 631
**Stable ID**: 3a62a827
**Location**: L454:12–L454:52

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #631
@@ -450,9 +450,9 @@
       });
     });
   });
 
-  describe("Error Handling and Validation Messages", () => {
+  describe("", () => {
     describe("Detailed Error Information", () => {
       it("should provide specific error paths for invalid status", () => {
         const input = { status: ["invalid_status"] };
         const result = listQuizzesQuerySchema.safeParse(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
