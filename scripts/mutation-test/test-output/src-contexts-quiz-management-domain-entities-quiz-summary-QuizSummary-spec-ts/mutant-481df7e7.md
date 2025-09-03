# Mutant 481df7e7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3427
**Stable ID**: 481df7e7
**Location**: L127:25–L127:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3427
@@ -123,9 +123,9 @@
           "Invalid SQLite datetime format",
         ],
         [
           "invalid approvedAt format",
-          { approvedAt: "invalid-date" },
+          { approvedAt: "" },
           "Invalid SQLite datetime format",
         ],
       ])("should reject %s", (_desc, invalidFields, expectedErrorMessage) => {
         const invalidData = {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
