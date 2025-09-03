# Mutant a97a4b86 Report

**File**: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
**Mutator**: StringLiteral
**Original ID**: 685
**Stable ID**: a97a4b86
**Location**: L516:14–L516:42

## Diff

```diff
Index: src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts
===================================================================
--- src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	original
+++ src/contexts/quiz-management/application/schemas/list-quizzes-query.schema.spec.ts	mutated #685
@@ -512,9 +512,9 @@
         }
       });
     });
 
-    describe("Multiple Validation Errors", () => {
+    describe("", () => {
       it("should collect multiple validation errors", () => {
         const input = {
           status: ["invalid_status"],
           creatorId: "",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
