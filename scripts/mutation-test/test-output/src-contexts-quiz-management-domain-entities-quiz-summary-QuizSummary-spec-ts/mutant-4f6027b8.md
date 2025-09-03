# Mutant 4f6027b8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3855
**Stable ID**: 4f6027b8
**Location**: L586:34–L586:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3855
@@ -582,9 +582,9 @@
         draft.update("question", "");
         expect(draft.hasErrors()).toBe(true);
 
         // Then fix the data
-        draft.update("question", "Valid question");
+        draft.update("question", "");
         draft.with(validQuizData as Record<string, unknown>);
         expect(draft.hasErrors()).toBe(false);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
