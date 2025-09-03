# Mutant 17fbd0b9 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3862
**Stable ID**: 17fbd0b9
**Location**: L598:61–L598:65

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3862
@@ -594,9 +594,9 @@
         draft.with(validQuizData as Record<string, unknown>);
 
         const result = draft.commit();
 
-        const quiz = result._unsafeUnwrap({ withStackTrace: true });
+        const quiz = result._unsafeUnwrap({ withStackTrace: false });
         expect(quiz.get("question")).toBe("What is TypeScript?");
       });
 
       it.each([
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
