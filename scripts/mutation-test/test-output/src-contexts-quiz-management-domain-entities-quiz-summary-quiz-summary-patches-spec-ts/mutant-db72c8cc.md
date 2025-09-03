# Mutant db72c8cc Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4133
**Stable ID**: db72c8cc
**Location**: L86:10–L86:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4133
@@ -82,9 +82,9 @@
           [{ explanation: "Valid explanation" }],
         ],
         ["valid explanation", "Valid explanation", []],
         ["empty string", "", []],
-        ["non-string input", 123, []],
+        ["", 123, []],
         ["null input", null, []],
         ["undefined input", undefined, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestExplanationPatches(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
