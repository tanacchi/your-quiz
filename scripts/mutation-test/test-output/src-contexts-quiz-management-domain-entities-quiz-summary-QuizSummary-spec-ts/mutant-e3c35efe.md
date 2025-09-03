# Mutant e3c35efe Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3697
**Stable ID**: e3c35efe
**Location**: L417:36–L417:52

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3697
@@ -413,9 +413,9 @@
 
         const error = result._unsafeUnwrapErr({ withStackTrace: true });
         expect(
           error.issues.some((issue) =>
-            issue.message.includes("already exists"),
+            issue.message.includes(""),
           ),
         ).toBe(true);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
