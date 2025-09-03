# Mutant a31f03ca Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4130
**Stable ID**: a31f03ca
**Location**: L85:26–L85:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4130
@@ -81,9 +81,9 @@
           "  Valid explanation  ",
           [{ explanation: "Valid explanation" }],
         ],
         ["valid explanation", "Valid explanation", []],
-        ["empty string", "", []],
+        ["empty string", "Stryker was here!", []],
         ["non-string input", 123, []],
         ["null input", null, []],
         ["undefined input", undefined, []],
       ])("should handle %s", (_desc, input, expected) => {
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
