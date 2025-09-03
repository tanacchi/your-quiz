# Mutant 465cdb8e Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3461
**Stable ID**: 465cdb8e
**Location**: L172:14–L172:38

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3461
@@ -168,9 +168,9 @@
         ).toBe(true);
       });
     });
 
-    describe("Default value handling", () => {
+    describe("", () => {
       it.each([
         ["undefined tagIds", { tagIds: undefined }, []],
         ["null tagIds", { tagIds: null }, []],
         ["missing tagIds", {}, validQuizData.tagIds],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
