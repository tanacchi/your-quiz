# Mutant 5879cd28 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3767
**Stable ID**: 5879cd28
**Location**: L499:12–L499:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3767
@@ -495,9 +495,9 @@
       });
 
       describe("removeTags scenarios", () => {
         it.each([
-          ["all tags", validTagIds, []],
+          ["", validTagIds, []],
           [
             "partial tags",
             [TagId.parse(validTagIds[0])],
             [TagId.parse(validTagIds[1])],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
