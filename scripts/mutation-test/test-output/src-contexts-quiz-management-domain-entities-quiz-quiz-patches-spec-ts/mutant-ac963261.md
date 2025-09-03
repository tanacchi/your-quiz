# Mutant ac963261 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1825
**Stable ID**: ac963261
**Location**: L161:10–L161:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1825
@@ -157,9 +157,9 @@
     describe("suggestAnswerTypePatches", () => {
       it.each([
         ["bool", "bool", [{ answerType: "boolean" }]],
         ["boolean", "boolean", [{ answerType: "boolean" }]],
-        ["true_false", "true_false", [{ answerType: "boolean" }]],
+        ["", "true_false", [{ answerType: "boolean" }]],
         ["truefalse", "truefalse", [{ answerType: "boolean" }]],
         ["yes_no", "yes_no", [{ answerType: "boolean" }]],
         ["yesno", "yesno", [{ answerType: "boolean" }]],
         ["correct_incorrect", "correct_incorrect", [{ answerType: "boolean" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
