# Mutant ffc4aa99 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1895
**Stable ID**: ffc4aa99
**Location**: L173:10–L173:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1895
@@ -169,9 +169,9 @@
         ["mixed case bool", "BOOL", [{ answerType: "boolean" }]],
         ["with spaces", " boolean ", [{ answerType: "boolean" }]],
         ["valid boolean", "boolean", [{ answerType: "boolean" }]],
         ["unknown type", "single_choice", []],
-        ["non-string input", 123, []],
+        ["", 123, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestAnswerTypePatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
