# Mutant facbae74 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3500
**Stable ID**: facbae74
**Location**: L220:12–L220:35

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3500
@@ -216,9 +216,9 @@
       expect(Object.isFrozen(quiz)).toBe(true);
     });
   });
 
-  describe("Generic Getter/Setter", () => {
+  describe("", () => {
     it("should get values with type safety", () => {
       const result = QuizSummary.from(validQuizData);
       const quiz = result._unsafeUnwrap({ withStackTrace: true });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
