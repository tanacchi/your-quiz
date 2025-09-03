# Mutant 57691ec3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ArrayDeclaration
**Original ID**: 3437
**Stable ID**: 57691ec3
**Location**: L147:15–L158:8

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3437
@@ -143,20 +143,9 @@
       });
     });
 
     describe("Business rule validations", () => {
-      it.each([
-        [
-          "approved quiz must have approvedAt",
-          { status: "approved", approvedAt: undefined },
-          "Approved quiz must have approvedAt timestamp",
-        ],
-        [
-          "duplicate tag IDs",
-          { tagIds: [TagId.parse("tag-1"), TagId.parse("tag-1")] },
-          "Duplicate tag IDs are not allowed",
-        ],
-      ])("should enforce %s", (_desc, invalidFields, expectedErrorMessage) => {
+      it.each([])("should enforce %s", (_desc, invalidFields, expectedErrorMessage) => {
         const invalidData = {
           ...(validQuizData as Record<string, unknown>),
           ...invalidFields,
         };
```

## Hint

ミューテータ "ArrayDeclaration" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
