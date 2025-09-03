# Mutant fdc36676 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3662
**Stable ID**: fdc36676
**Location**: L376:36–L376:66

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3662
@@ -372,9 +372,9 @@
 
         const error = result._unsafeUnwrapErr({ withStackTrace: true });
         expect(
           error.issues.some((issue) =>
-            issue.message.includes(`${status} cannot be approved`),
+            issue.message.includes(``),
           ),
         ).toBe(true);
       });
     });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
