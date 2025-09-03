# Mutant 9834b35b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3861
**Stable ID**: 9834b35b
**Location**: L598:43–L598:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3861
@@ -594,9 +594,9 @@
         draft.with(validQuizData as Record<string, unknown>);
 
         const result = draft.commit();
 
-        const quiz = result._unsafeUnwrap({ withStackTrace: true });
+        const quiz = result._unsafeUnwrap({});
         expect(quiz.get("question")).toBe("What is TypeScript?");
       });
 
       it.each([
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
