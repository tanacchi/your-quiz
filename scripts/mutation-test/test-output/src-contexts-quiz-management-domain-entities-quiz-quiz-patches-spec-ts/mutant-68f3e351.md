# Mutant 68f3e351 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1813
**Stable ID**: 68f3e351
**Location**: L159:10–L159:16

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1813
@@ -155,9 +155,9 @@
     });
 
     describe("suggestAnswerTypePatches", () => {
       it.each([
-        ["bool", "bool", [{ answerType: "boolean" }]],
+        ["", "bool", [{ answerType: "boolean" }]],
         ["boolean", "boolean", [{ answerType: "boolean" }]],
         ["true_false", "true_false", [{ answerType: "boolean" }]],
         ["truefalse", "truefalse", [{ answerType: "boolean" }]],
         ["yes_no", "yes_no", [{ answerType: "boolean" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
