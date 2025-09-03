# Mutant be8e2fc6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3666
**Stable ID**: be8e2fc6
**Location**: L384:14–L384:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3666
@@ -380,9 +380,9 @@
     });
   });
 
   describe("Tag Operations", () => {
-    describe("Single tag operations", () => {
+    describe("", () => {
       describe("addTag success scenarios", () => {
         it.each([
           ["empty tag list", []],
           ["existing tags", [TagId.parse("tag-other")]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
