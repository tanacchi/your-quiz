# Mutant febe0654 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 582
**Stable ID**: febe0654
**Location**: L403:10–L403:44

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #582
@@ -399,9 +399,9 @@
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(true); // empty arrays are allowed, status will use default
       });
 
-      it("should handle single-item arrays", () => {
+      it("", () => {
         const input = {
           status: ["approved"],
           creatorId: "single-creator",
           quizId: ["single-quiz"],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
