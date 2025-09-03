# Mutant e9bf4a6a Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1849
**Stable ID**: e9bf4a6a
**Location**: L165:10–L165:29

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1849
@@ -161,9 +161,9 @@
         ["true_false", "true_false", [{ answerType: "boolean" }]],
         ["truefalse", "truefalse", [{ answerType: "boolean" }]],
         ["yes_no", "yes_no", [{ answerType: "boolean" }]],
         ["yesno", "yesno", [{ answerType: "boolean" }]],
-        ["correct_incorrect", "correct_incorrect", [{ answerType: "boolean" }]],
+        ["", "correct_incorrect", [{ answerType: "boolean" }]],
         ["○×", "○×", [{ answerType: "boolean" }]],
         ["ox", "ox", [{ answerType: "boolean" }]],
         ["maru_batsu", "maru_batsu", [{ answerType: "boolean" }]],
         ["mixed case bool", "BOOL", [{ answerType: "boolean" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
