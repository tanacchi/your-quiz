# Mutant ac7618f1 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 633
**Stable ID**: ac7618f1
**Location**: L455:14–L455:42

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #633
@@ -451,9 +451,9 @@
     });
   });
 
   describe("Error Handling and Validation Messages", () => {
-    describe("Detailed Error Information", () => {
+    describe("", () => {
       it("should provide specific error paths for invalid status", () => {
         const input = { status: ["invalid_status"] };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
