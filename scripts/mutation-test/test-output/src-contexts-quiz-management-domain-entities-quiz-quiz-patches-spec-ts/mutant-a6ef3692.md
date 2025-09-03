# Mutant a6ef3692 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1885
**Stable ID**: a6ef3692
**Location**: L171:10–L171:25

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1885
@@ -167,9 +167,9 @@
         ["ox", "ox", [{ answerType: "boolean" }]],
         ["maru_batsu", "maru_batsu", [{ answerType: "boolean" }]],
         ["mixed case bool", "BOOL", [{ answerType: "boolean" }]],
         ["with spaces", " boolean ", [{ answerType: "boolean" }]],
-        ["valid boolean", "boolean", [{ answerType: "boolean" }]],
+        ["", "boolean", [{ answerType: "boolean" }]],
         ["unknown type", "single_choice", []],
         ["non-string input", 123, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestAnswerTypePatches(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
