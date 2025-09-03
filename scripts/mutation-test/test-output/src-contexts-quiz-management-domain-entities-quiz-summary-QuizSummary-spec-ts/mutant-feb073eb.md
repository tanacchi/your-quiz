# Mutant feb073eb Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3845
**Stable ID**: feb073eb
**Location**: L568:9–L568:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3845
@@ -564,9 +564,9 @@
         ["empty creatorId", { creatorId: "" }, "creatorId"],
         ["empty solutionId", { solutionId: "" }, "solutionId"],
         ["invalid createdAt", { createdAt: "invalid-date" }, "createdAt"],
       ])(
-        "should validate and store errors for %s",
+        "",
         (_desc, invalidData, errorField) => {
           Object.entries(invalidData).forEach(([key, value]) => {
             draft.update(key as keyof typeof validQuizData, value);
           });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
