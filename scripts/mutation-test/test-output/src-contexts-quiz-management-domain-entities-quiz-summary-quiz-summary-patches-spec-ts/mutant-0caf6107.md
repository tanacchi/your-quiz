# Mutant 0caf6107 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4126
**Stable ID**: 0caf6107
**Location**: L84:31–L84:50

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4126
@@ -80,9 +80,9 @@
           "untrimmed explanation",
           "  Valid explanation  ",
           [{ explanation: "Valid explanation" }],
         ],
-        ["valid explanation", "Valid explanation", []],
+        ["valid explanation", "", []],
         ["empty string", "", []],
         ["non-string input", 123, []],
         ["null input", null, []],
         ["undefined input", undefined, []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
