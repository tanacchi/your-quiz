# Mutant 280c02f1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4091
**Stable ID**: 280c02f1
**Location**: L46:10–L46:27

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4091
@@ -42,9 +42,9 @@
         ["empty string", "", [{ question: "Sample question" }]],
         ["valid question", "Valid question", []],
         ["non-string input", 123, []],
         ["null input", null, []],
-        ["undefined input", undefined, []],
+        ["", undefined, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestQuestionPatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
