# Mutant 0ad999c3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4129
**Stable ID**: 0ad999c3
**Location**: L85:10–L85:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4129
@@ -81,9 +81,9 @@
           "  Valid explanation  ",
           [{ explanation: "Valid explanation" }],
         ],
         ["valid explanation", "Valid explanation", []],
-        ["empty string", "", []],
+        ["", "", []],
         ["non-string input", 123, []],
         ["null input", null, []],
         ["undefined input", undefined, []],
       ])("should handle %s", (_desc, input, expected) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
