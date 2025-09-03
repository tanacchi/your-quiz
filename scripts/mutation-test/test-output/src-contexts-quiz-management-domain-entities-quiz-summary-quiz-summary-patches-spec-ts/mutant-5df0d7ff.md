# Mutant 5df0d7ff Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4085
**Stable ID**: 5df0d7ff
**Location**: L44:10–L44:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4085
@@ -40,9 +40,9 @@
         ],
         ["question with only spaces", "   ", [{ question: "Sample question" }]],
         ["empty string", "", [{ question: "Sample question" }]],
         ["valid question", "Valid question", []],
-        ["non-string input", 123, []],
+        ["", 123, []],
         ["null input", null, []],
         ["undefined input", undefined, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestQuestionPatches(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
