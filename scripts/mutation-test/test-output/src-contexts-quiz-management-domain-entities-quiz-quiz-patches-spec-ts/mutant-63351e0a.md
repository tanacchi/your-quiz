# Mutant 63351e0a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1659
**Stable ID**: 63351e0a
**Location**: L39:11–L39:31

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1659
@@ -35,9 +35,9 @@
   describe("Individual Patch Suggesters", () => {
     describe("suggestQuestionPatches", () => {
       it.each([
         [
-          "untrimmed question",
+          "",
           "  Valid question?  ",
           [{ question: "Valid question?" }],
         ],
         ["empty string", "", [{ question: "Sample boolean question?" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
