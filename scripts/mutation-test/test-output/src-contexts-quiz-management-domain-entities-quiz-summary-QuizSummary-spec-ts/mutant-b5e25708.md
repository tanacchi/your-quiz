# Mutant b5e25708 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3784
**Stable ID**: b5e25708
**Location**: L522:12–L522:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3784
@@ -518,9 +518,9 @@
       });
     });
   });
 
-  describe("Draft Class", () => {
+  describe("", () => {
     let draft: InstanceType<typeof QuizSummary.Draft>;
 
     beforeEach(() => {
       draft = new QuizSummary.Draft();
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
