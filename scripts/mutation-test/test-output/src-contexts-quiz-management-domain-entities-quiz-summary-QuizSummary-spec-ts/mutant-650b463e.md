# Mutant 650b463e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3498
**Stable ID**: 650b463e
**Location**: L214:59–L214:63

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3498
@@ -210,9 +210,9 @@
 
   describe("Immutability", () => {
     it("should freeze the quiz instance", () => {
       const result = QuizSummary.from(validQuizData);
-      const quiz = result._unsafeUnwrap({ withStackTrace: true });
+      const quiz = result._unsafeUnwrap({ withStackTrace: false });
 
       expect(Object.isFrozen(quiz)).toBe(true);
     });
   });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
