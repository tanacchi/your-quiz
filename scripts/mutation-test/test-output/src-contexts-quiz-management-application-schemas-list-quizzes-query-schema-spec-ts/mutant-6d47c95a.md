# Mutant 6d47c95a Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 15
**Stable ID**: 6d47c95a
**Location**: L10:12–L10:47

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #15
@@ -6,9 +6,9 @@
   listQuizzesQuerySchema,
 } from "./list-quizzes-query.schema";
 
 describe("List Quizzes Query Schema", () => {
-  describe("listQuizzesQuerySchema Validation", () => {
+  describe("", () => {
     describe("Default Values", () => {
       it("should apply default values for all optional fields", () => {
         const emptyInput = {};
         const result = listQuizzesQuerySchema.safeParse(emptyInput);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
