# Mutant 5e4b9157 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3529
**Stable ID**: 5e4b9157
**Location**: L256:48–L256:72

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3529
@@ -252,9 +252,9 @@
         question: "Updated question",
         explanation: "Updated explanation",
       });
 
-      const updatedQuiz = result._unsafeUnwrap({ withStackTrace: true });
+      const updatedQuiz = result._unsafeUnwrap({});
       expect(updatedQuiz.get("question")).toBe("Updated question");
       expect(updatedQuiz.get("explanation")).toBe("Updated explanation");
     });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
