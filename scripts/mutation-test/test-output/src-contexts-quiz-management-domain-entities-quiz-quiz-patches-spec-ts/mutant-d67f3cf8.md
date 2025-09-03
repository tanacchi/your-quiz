# Mutant d67f3cf8 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1879
**Stable ID**: d67f3cf8
**Location**: L170:10–L170:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1879
@@ -166,9 +166,9 @@
         ["○×", "○×", [{ answerType: "boolean" }]],
         ["ox", "ox", [{ answerType: "boolean" }]],
         ["maru_batsu", "maru_batsu", [{ answerType: "boolean" }]],
         ["mixed case bool", "BOOL", [{ answerType: "boolean" }]],
-        ["with spaces", " boolean ", [{ answerType: "boolean" }]],
+        ["", " boolean ", [{ answerType: "boolean" }]],
         ["valid boolean", "boolean", [{ answerType: "boolean" }]],
         ["unknown type", "single_choice", []],
         ["non-string input", 123, []],
       ])("should handle %s", (_desc, input, expected) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
