# Mutant d245748b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3637
**Stable ID**: d245748b
**Location**: L354:51–L354:75

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3637
@@ -350,9 +350,9 @@
         const approvedAt = "2023-12-01 12:00:00";
 
         const result = quiz.approve(approvedAt);
 
-        const approvedQuiz = result._unsafeUnwrap({ withStackTrace: true });
+        const approvedQuiz = result._unsafeUnwrap({});
         expect(approvedQuiz.get("status")).toBe("approved");
         expect(approvedQuiz.get("approvedAt")).toBe(approvedAt);
       });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
