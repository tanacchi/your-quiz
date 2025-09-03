# Mutant bdd071f9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3482
**Stable ID**: bdd071f9
**Location**: L193:8–L193:51

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3482
@@ -189,9 +189,9 @@
     });
   });
 
   describe("Factory Methods", () => {
-    it("should create QuizSummary from valid data", () => {
+    it("", () => {
       const result = QuizSummary.from(validQuizData);
 
       const quiz = result._unsafeUnwrap({ withStackTrace: true });
       expect(quiz.get("question")).toBe("What is TypeScript?");
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
