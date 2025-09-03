# Mutant e16b4a05 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 704
**Stable ID**: e16b4a05
**Location**: L541:12–L541:41

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #704
@@ -537,9 +537,9 @@
       });
     });
   });
 
-  describe("Type Safety and Integration", () => {
+  describe("", () => {
     describe("TypeScript Type Compatibility", () => {
       it("should maintain type safety with inferred types", () => {
         const validInput = {
           status: ["approved"] as const,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
