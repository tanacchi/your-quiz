# Mutant 79c40c7c Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1855
**Stable ID**: 79c40c7c
**Location**: L166:10–L166:14

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1855
@@ -162,9 +162,9 @@
         ["truefalse", "truefalse", [{ answerType: "boolean" }]],
         ["yes_no", "yes_no", [{ answerType: "boolean" }]],
         ["yesno", "yesno", [{ answerType: "boolean" }]],
         ["correct_incorrect", "correct_incorrect", [{ answerType: "boolean" }]],
-        ["○×", "○×", [{ answerType: "boolean" }]],
+        ["", "○×", [{ answerType: "boolean" }]],
         ["ox", "ox", [{ answerType: "boolean" }]],
         ["maru_batsu", "maru_batsu", [{ answerType: "boolean" }]],
         ["mixed case bool", "BOOL", [{ answerType: "boolean" }]],
         ["with spaces", " boolean ", [{ answerType: "boolean" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
