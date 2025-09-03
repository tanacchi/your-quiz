# Mutant ce6991f6 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 19
**Stable ID**: ce6991f6
**Location**: L12:10–L12:63

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #19
@@ -8,9 +8,9 @@
 
 describe("List Quizzes Query Schema", () => {
   describe("listQuizzesQuerySchema Validation", () => {
     describe("Default Values", () => {
-      it("should apply default values for all optional fields", () => {
+      it("", () => {
         const emptyInput = {};
         const result = listQuizzesQuerySchema.safeParse(emptyInput);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
