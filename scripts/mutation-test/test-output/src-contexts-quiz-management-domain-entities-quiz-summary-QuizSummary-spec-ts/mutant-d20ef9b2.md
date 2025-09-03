# Mutant d20ef9b2 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3439
**Stable ID**: d20ef9b2
**Location**: L149:11–L149:47

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3439
@@ -145,9 +145,9 @@
 
     describe("Business rule validations", () => {
       it.each([
         [
-          "approved quiz must have approvedAt",
+          "",
           { status: "approved", approvedAt: undefined },
           "Approved quiz must have approvedAt timestamp",
         ],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
