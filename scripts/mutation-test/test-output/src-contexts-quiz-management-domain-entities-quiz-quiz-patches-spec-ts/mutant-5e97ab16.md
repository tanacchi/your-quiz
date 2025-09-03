# Mutant 5e97ab16 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1873
**Stable ID**: 5e97ab16
**Location**: L169:10–L169:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1873
@@ -165,9 +165,9 @@
         ["correct_incorrect", "correct_incorrect", [{ answerType: "boolean" }]],
         ["○×", "○×", [{ answerType: "boolean" }]],
         ["ox", "ox", [{ answerType: "boolean" }]],
         ["maru_batsu", "maru_batsu", [{ answerType: "boolean" }]],
-        ["mixed case bool", "BOOL", [{ answerType: "boolean" }]],
+        ["", "BOOL", [{ answerType: "boolean" }]],
         ["with spaces", " boolean ", [{ answerType: "boolean" }]],
         ["valid boolean", "boolean", [{ answerType: "boolean" }]],
         ["unknown type", "single_choice", []],
         ["non-string input", 123, []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
