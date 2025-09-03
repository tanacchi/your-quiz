# Mutant d93fbc6d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3450
**Stable ID**: d93fbc6d
**Location**: L158:10–L158:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3450
@@ -154,9 +154,9 @@
           "duplicate tag IDs",
           { tagIds: [TagId.parse("tag-1"), TagId.parse("tag-1")] },
           "Duplicate tag IDs are not allowed",
         ],
-      ])("should enforce %s", (_desc, invalidFields, expectedErrorMessage) => {
+      ])("", (_desc, invalidFields, expectedErrorMessage) => {
         const invalidData = {
           ...(validQuizData as Record<string, unknown>),
           ...invalidFields,
         };
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
