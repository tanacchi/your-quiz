# Mutant d2afcd5d Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3699
**Stable ID**: d2afcd5d
**Location**: L422:16–L422:37

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3699
@@ -418,9 +418,9 @@
           ),
         ).toBe(true);
       });
 
-      describe("removeTag scenarios", () => {
+      describe("", () => {
         it.each([
           ["first tag", 0, 1],
           ["second tag", 1, 1],
         ])(
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
