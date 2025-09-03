# Mutant 5170cdbc Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 17
**Stable ID**: 5170cdbc
**Location**: L11:14–L11:30

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #17
@@ -7,9 +7,9 @@
 } from "./list-quizzes-query.schema";
 
 describe("List Quizzes Query Schema", () => {
   describe("listQuizzesQuerySchema Validation", () => {
-    describe("Default Values", () => {
+    describe("", () => {
       it("should apply default values for all optional fields", () => {
         const emptyInput = {};
         const result = listQuizzesQuerySchema.safeParse(emptyInput);
         expect(result.success).toBe(true);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
