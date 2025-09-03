# Mutant 03f869eb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1837
**Stable ID**: 03f869eb
**Location**: L163:10–L163:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1837
@@ -159,9 +159,9 @@
         ["bool", "bool", [{ answerType: "boolean" }]],
         ["boolean", "boolean", [{ answerType: "boolean" }]],
         ["true_false", "true_false", [{ answerType: "boolean" }]],
         ["truefalse", "truefalse", [{ answerType: "boolean" }]],
-        ["yes_no", "yes_no", [{ answerType: "boolean" }]],
+        ["", "yes_no", [{ answerType: "boolean" }]],
         ["yesno", "yesno", [{ answerType: "boolean" }]],
         ["correct_incorrect", "correct_incorrect", [{ answerType: "boolean" }]],
         ["○×", "○×", [{ answerType: "boolean" }]],
         ["ox", "ox", [{ answerType: "boolean" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
