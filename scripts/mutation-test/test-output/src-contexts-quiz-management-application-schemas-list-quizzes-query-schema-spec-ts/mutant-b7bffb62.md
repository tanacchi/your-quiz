# Mutant b7bffb62 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 687
**Stable ID**: b7bffb62
**Location**: L517:10–L517:53

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #687
@@ -513,9 +513,9 @@
       });
     });
 
     describe("Multiple Validation Errors", () => {
-      it("should collect multiple validation errors", () => {
+      it("", () => {
         const input = {
           status: ["invalid_status"],
           creatorId: "",
           limit: 0,
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
