# Mutant e10350c1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1843
**Stable ID**: e10350c1
**Location**: L164:10–L164:17

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1843
@@ -160,9 +160,9 @@
         ["boolean", "boolean", [{ answerType: "boolean" }]],
         ["true_false", "true_false", [{ answerType: "boolean" }]],
         ["truefalse", "truefalse", [{ answerType: "boolean" }]],
         ["yes_no", "yes_no", [{ answerType: "boolean" }]],
-        ["yesno", "yesno", [{ answerType: "boolean" }]],
+        ["", "yesno", [{ answerType: "boolean" }]],
         ["correct_incorrect", "correct_incorrect", [{ answerType: "boolean" }]],
         ["○×", "○×", [{ answerType: "boolean" }]],
         ["ox", "ox", [{ answerType: "boolean" }]],
         ["maru_batsu", "maru_batsu", [{ answerType: "boolean" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
