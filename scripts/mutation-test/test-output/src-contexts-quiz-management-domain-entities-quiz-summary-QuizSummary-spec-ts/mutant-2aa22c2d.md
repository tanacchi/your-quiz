# Mutant 2aa22c2d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3928
**Stable ID**: 2aa22c2d
**Location**: L666:12–L666:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3928
@@ -662,9 +662,9 @@
       expect(Array.isArray(tagIds)).toBe(true);
     });
   });
 
-  describe("Data Transfer", () => {
+  describe("", () => {
     it("should convert to Data", () => {
       const result = QuizSummary.from(validQuizData);
       const quiz = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
