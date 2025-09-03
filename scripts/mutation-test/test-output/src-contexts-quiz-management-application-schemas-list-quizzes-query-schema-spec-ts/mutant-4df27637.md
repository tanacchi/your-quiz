# Mutant 4df27637 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 576
**Stable ID**: 4df27637
**Location**: L394:10–L394:48

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #576
@@ -390,9 +390,9 @@
       });
     });
 
     describe("Array Edge Cases", () => {
-      it("should handle empty arrays correctly", () => {
+      it("", () => {
         const input = {
           status: [],
           quizId: [],
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
