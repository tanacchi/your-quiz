# Mutant 8c0dd517 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3935
**Stable ID**: 8c0dd517
**Location**: L677:8–L677:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3935
@@ -673,9 +673,9 @@
       expect(dto.question).toBe("What is TypeScript?");
       expect(dto.tagIds).toEqual(validTagIds);
     });
 
-    it("should deep clone in toData", () => {
+    it("", () => {
       const result = QuizSummary.from(validQuizData);
       const quiz = result._unsafeUnwrap({ withStackTrace: true });
 
       const dto1 = quiz.toData();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
