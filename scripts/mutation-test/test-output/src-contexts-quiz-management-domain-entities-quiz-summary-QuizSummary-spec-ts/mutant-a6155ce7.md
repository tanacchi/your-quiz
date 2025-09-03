# Mutant a6155ce7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3761
**Stable ID**: a6155ce7
**Location**: L493:63–L493:78

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3761
@@ -489,9 +489,9 @@
         const result = quiz.addTags(newTagIds);
 
         const error = result._unsafeUnwrapErr({ withStackTrace: true });
         expect(
-          error.issues.some((issue) => issue.message.includes("already exist")),
+          error.issues.some((issue) => issue.message.includes("")),
         ).toBe(true);
       });
 
       describe("removeTags scenarios", () => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
