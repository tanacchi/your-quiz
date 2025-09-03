# Mutant 7cec1b82 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1749
**Stable ID**: 7cec1b82
**Location**: L105:31–L105:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1749
@@ -101,9 +101,9 @@
           "1001 chars",
           "A".repeat(1001),
           [{ explanation: `${"A".repeat(997)}...` }],
         ],
-        ["valid explanation", "Valid explanation", []],
+        ["valid explanation", "", []],
         ["empty string", "", []],
         ["non-string input", 123, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestExplanationPatches(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
