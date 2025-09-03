# Mutant ed06b132 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1867
**Stable ID**: ed06b132
**Location**: L168:10–L168:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1867
@@ -164,9 +164,9 @@
         ["yesno", "yesno", [{ answerType: "boolean" }]],
         ["correct_incorrect", "correct_incorrect", [{ answerType: "boolean" }]],
         ["○×", "○×", [{ answerType: "boolean" }]],
         ["ox", "ox", [{ answerType: "boolean" }]],
-        ["maru_batsu", "maru_batsu", [{ answerType: "boolean" }]],
+        ["", "maru_batsu", [{ answerType: "boolean" }]],
         ["mixed case bool", "BOOL", [{ answerType: "boolean" }]],
         ["with spaces", " boolean ", [{ answerType: "boolean" }]],
         ["valid boolean", "boolean", [{ answerType: "boolean" }]],
         ["unknown type", "single_choice", []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
