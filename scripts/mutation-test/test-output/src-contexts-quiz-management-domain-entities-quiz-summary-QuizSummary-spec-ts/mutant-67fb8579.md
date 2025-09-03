# Mutant 67fb8579 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3530
**Stable ID**: 67fb8579
**Location**: L256:66–L256:70

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3530
@@ -252,9 +252,9 @@
         question: "Updated question",
         explanation: "Updated explanation",
       });
 
-      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
+      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: false });
       expect(updatedQuiz.get("question")).toBe("Updated question");
       expect(updatedQuiz.get("explanation")).toBe("Updated explanation");
     });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
