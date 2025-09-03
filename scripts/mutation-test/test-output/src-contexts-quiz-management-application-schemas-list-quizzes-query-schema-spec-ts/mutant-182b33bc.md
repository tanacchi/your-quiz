# Mutant 182b33bc Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 635
**Stable ID**: 182b33bc
**Location**: L456:10–L456:66

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #635
@@ -452,9 +452,9 @@
   });
 
   describe("Error Handling and Validation Messages", () => {
     describe("Detailed Error Information", () => {
-      it("should provide specific error paths for invalid status", () => {
+      it("", () => {
         const input = { status: ["invalid_status"] };
         const result = listQuizzesQuerySchema.safeParse(input);
         expect(result.success).toBe(false);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
