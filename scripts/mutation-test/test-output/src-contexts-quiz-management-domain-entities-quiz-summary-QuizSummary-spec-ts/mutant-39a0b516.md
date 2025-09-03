# Mutant 39a0b516 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3543
**Stable ID**: 39a0b516
**Location**: L270:66–L270:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3543
@@ -266,9 +266,9 @@
         draft.question = "Mutator updated question";
         draft.explanation = "Mutator updated explanation";
       });
 
-      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
+      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: false });
       expect(updatedQuiz.get("question")).toBe("Mutator updated question");
       expect(updatedQuiz.get("explanation")).toBe(
         "Mutator updated explanation",
       );
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
