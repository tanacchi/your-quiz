# Mutant 8c1daebf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
**Mutator**: StringLiteral
**Original ID**: 3465
**Stable ID**: 8c1daebf
**Location**: L174:10–L174:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/QuizSummary.spec.ts	mutated #3465
@@ -170,9 +170,9 @@
     });
 
     describe("Default value handling", () => {
       it.each([
-        ["undefined tagIds", { tagIds: undefined }, []],
+        ["", { tagIds: undefined }, []],
         ["null tagIds", { tagIds: null }, []],
         ["missing tagIds", {}, validQuizData.tagIds],
       ])(
         "should handle %s and default to empty array",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
