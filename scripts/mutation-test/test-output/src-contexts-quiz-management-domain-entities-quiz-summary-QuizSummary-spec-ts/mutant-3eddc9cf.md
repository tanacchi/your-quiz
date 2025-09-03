# Mutant 3eddc9cf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3425
**Stable ID**: 3eddc9cf
**Location**: L126:11–L126:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3425
@@ -122,9 +122,9 @@
           { createdAt: "invalid-date" },
           "Invalid SQLite datetime format",
         ],
         [
-          "invalid approvedAt format",
+          "",
           { approvedAt: "invalid-date" },
           "Invalid SQLite datetime format",
         ],
       ])("should reject %s", (_desc, invalidFields, expectedErrorMessage) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
