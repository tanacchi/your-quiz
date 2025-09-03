# Mutant acf1267a Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4063
**Stable ID**: acf1267a
**Location**: L37:11–L37:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4063
@@ -33,9 +33,9 @@
   describe("Individual Patch Suggesters", () => {
     describe("suggestQuestionPatches", () => {
       it.each([
         [
-          "untrimmed question",
+          "",
           "  Valid question  ",
           [{ question: "Valid question" }],
         ],
         ["question with only spaces", "   ", [{ question: "Sample question" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
