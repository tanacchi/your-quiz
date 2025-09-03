# Mutant 32b1e72b Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4088
**Stable ID**: 32b1e72b
**Location**: L45:10–L45:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4088
@@ -41,9 +41,9 @@
         ["question with only spaces", "   ", [{ question: "Sample question" }]],
         ["empty string", "", [{ question: "Sample question" }]],
         ["valid question", "Valid question", []],
         ["non-string input", 123, []],
-        ["null input", null, []],
+        ["", null, []],
         ["undefined input", undefined, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestQuestionPatches(input);
         expect(result).toEqual(expected);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
