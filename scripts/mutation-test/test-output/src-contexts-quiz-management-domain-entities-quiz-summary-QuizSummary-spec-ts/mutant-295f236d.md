# Mutant 295f236d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3630
**Stable ID**: 295f236d
**Location**: L346:14–L346:48

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3630
@@ -342,9 +342,9 @@
         expect(quiz.canBeDeleted()).toBe(expectedCanDelete);
       });
     });
 
-    describe("approve method state transitions", () => {
+    describe("", () => {
       it("should approve pending quiz successfully", () => {
         const initialResult = QuizSummary.from(validQuizData);
         const quiz = initialResult._unsafeUnwrap({ withStackTrace: true });
         const approvedAt = "2023-12-01 12:00:00";
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
