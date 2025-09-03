# Mutant 913777fa Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3725
**Stable ID**: 913777fa
**Location**: L458:14–L458:39

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3725
@@ -454,9 +454,9 @@
         });
       });
     });
 
-    describe("Multiple tag operations", () => {
+    describe("", () => {
       describe("addTags success scenarios", () => {
         it.each([
           ["empty list", [], [TagId.parse("tag-3"), TagId.parse("tag-4")]],
           ["existing tags", [TagId.parse("tag-other")], [TagId.parse("tag-3")]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
