# Mutant 75bb5619 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3429
**Stable ID**: 75bb5619
**Location**: L130:10–L130:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3429
@@ -126,9 +126,9 @@
           "invalid approvedAt format",
           { approvedAt: "invalid-date" },
           "Invalid SQLite datetime format",
         ],
-      ])("should reject %s", (_desc, invalidFields, expectedErrorMessage) => {
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
