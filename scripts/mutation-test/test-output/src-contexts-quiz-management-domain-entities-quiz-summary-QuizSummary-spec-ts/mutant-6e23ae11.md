# Mutant 6e23ae11 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3444
**Stable ID**: 6e23ae11
**Location**: L154:11–L154:30

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3444
@@ -150,9 +150,9 @@
           { status: "approved", approvedAt: undefined },
           "Approved quiz must have approvedAt timestamp",
         ],
         [
-          "duplicate tag IDs",
+          "",
           { tagIds: [TagId.parse("tag-1"), TagId.parse("tag-1")] },
           "Duplicate tag IDs are not allowed",
         ],
       ])("should enforce %s", (_desc, invalidFields, expectedErrorMessage) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
