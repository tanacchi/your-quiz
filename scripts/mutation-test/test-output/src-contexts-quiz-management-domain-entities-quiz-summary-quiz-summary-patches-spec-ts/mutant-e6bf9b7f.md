# Mutant e6bf9b7f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4081
**Stable ID**: e6bf9b7f
**Location**: L43:10–L43:26

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4081
@@ -39,9 +39,9 @@
           [{ question: "Valid question" }],
         ],
         ["question with only spaces", "   ", [{ question: "Sample question" }]],
         ["empty string", "", [{ question: "Sample question" }]],
-        ["valid question", "Valid question", []],
+        ["", "Valid question", []],
         ["non-string input", 123, []],
         ["null input", null, []],
         ["undefined input", undefined, []],
       ])("should handle %s", (_desc, input, expected) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
