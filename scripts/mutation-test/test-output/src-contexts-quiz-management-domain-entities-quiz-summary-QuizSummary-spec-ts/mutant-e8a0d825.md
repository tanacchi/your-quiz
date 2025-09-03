# Mutant e8a0d825 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: BooleanLiteral
**Original ID**: 3720
**Stable ID**: e8a0d825
**Location**: L450:67–L450:71

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3720
@@ -446,9 +446,9 @@
           const nonExistingTagId = TagId.parse("tag-999");
 
           const result = quiz.removeTag(nonExistingTagId);
 
-          const error = result._unsafeUnwrapErr({ withStackTrace: true });
+          const error = result._unsafeUnwrapErr({ withStackTrace: false });
           expect(
             error.issues.some((issue) => issue.message.includes("not found")),
           ).toBe(true);
         });
```

## Hint

ブーリアンが反転しています（true/false）。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
