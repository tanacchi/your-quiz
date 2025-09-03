# Mutant f8caf0b6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3638
**Stable ID**: f8caf0b6
**Location**: L354:69–L354:73

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3638
@@ -350,9 +350,9 @@
         const approvedAt = "2023-12-01 12:00:00";
 
         const result = quiz.approve(approvedAt);
 
-        const approvedQuiz = result._unsafeUnwrap({ withStackTrace: true });
+        const approvedQuiz = result._unsafeUnwrap({ withStackTrace: false });
         expect(approvedQuiz.get("status")).toBe("approved");
         expect(approvedQuiz.get("approvedAt")).toBe(approvedAt);
       });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
