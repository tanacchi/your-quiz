# Mutant 3c50ac95 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3367
**Stable ID**: 3c50ac95
**Location**: L68:12–L68:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3367
@@ -64,9 +64,9 @@
       });
     });
   });
 
-  describe("Schema Validation", () => {
+  describe("", () => {
     it("should validate valid quiz data", () => {
       const quiz = QuizSummary.from(validQuizData);
 
       const entity = quiz._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
