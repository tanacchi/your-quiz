# Mutant edf96816 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3491
**Stable ID**: edf96816
**Location**: L206:43–L206:67

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3491
@@ -202,9 +202,9 @@
       const draft = new QuizSummary.Draft();
       draft.with(validQuizData as Record<string, unknown>);
 
       const result = QuizSummary.fromDraft(draft);
-      const entity = result._unsafeUnwrap({ withStackTrace: true });
+      const entity = result._unsafeUnwrap({});
       expect(entity).toBeDefined();
     });
   });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
