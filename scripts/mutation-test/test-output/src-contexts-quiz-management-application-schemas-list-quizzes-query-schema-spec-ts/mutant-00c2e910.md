# Mutant 00c2e910 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 706
**Stable ID**: 00c2e910
**Location**: L542:14–L542:45

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #706
@@ -538,9 +538,9 @@
     });
   });
 
   describe("Type Safety and Integration", () => {
-    describe("TypeScript Type Compatibility", () => {
+    describe("", () => {
       it("should maintain type safety with inferred types", () => {
         const validInput = {
           status: ["approved"] as const,
           limit: 20,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
