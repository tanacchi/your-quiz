# Mutant 1901e1c7 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4075
**Stable ID**: 1901e1c7
**Location**: L42:10–L42:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4075
@@ -38,9 +38,9 @@
           "  Valid question  ",
           [{ question: "Valid question" }],
         ],
         ["question with only spaces", "   ", [{ question: "Sample question" }]],
-        ["empty string", "", [{ question: "Sample question" }]],
+        ["", "", [{ question: "Sample question" }]],
         ["valid question", "Valid question", []],
         ["non-string input", 123, []],
         ["null input", null, []],
         ["undefined input", undefined, []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
