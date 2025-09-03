# Mutant 1abaddec Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 13
**Stable ID**: 1abaddec
**Location**: L9:10–L9:37

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #13
@@ -5,9 +5,9 @@
   listQueryFromReq,
   listQuizzesQuerySchema,
 } from "./list-quizzes-query.schema";
 
-describe("List Quizzes Query Schema", () => {
+describe("", () => {
   describe("listQuizzesQuerySchema Validation", () => {
     describe("Default Values", () => {
       it("should apply default values for all optional fields", () => {
         const emptyInput = {};
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
