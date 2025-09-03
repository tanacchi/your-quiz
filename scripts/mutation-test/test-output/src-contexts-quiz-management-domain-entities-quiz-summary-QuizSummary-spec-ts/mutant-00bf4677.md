# Mutant 00bf4677 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: ObjectLiteral
**Original ID**: 3719
**Stable ID**: 00bf4677
**Location**: L450:49–L450:73

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3719
@@ -446,9 +446,9 @@
           const nonExistingTagId = TagId.parse("tag-999");
 
           const result = quiz.removeTag(nonExistingTagId);
 
-          const error = result._unsafeUnwrapErr({ withStackTrace: true });
+          const error = result._unsafeUnwrapErr({});
           expect(
             error.issues.some((issue) => issue.message.includes("not found")),
           ).toBe(true);
         });
```

## Hint

ミューテータ "ObjectLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
