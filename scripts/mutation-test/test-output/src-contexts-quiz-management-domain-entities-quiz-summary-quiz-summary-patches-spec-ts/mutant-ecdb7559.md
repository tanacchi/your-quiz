# Mutant ecdb7559 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4136
**Stable ID**: ecdb7559
**Location**: L87:10–L87:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4136
@@ -83,9 +83,9 @@
         ],
         ["valid explanation", "Valid explanation", []],
         ["empty string", "", []],
         ["non-string input", 123, []],
-        ["null input", null, []],
+        ["", null, []],
         ["undefined input", undefined, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestExplanationPatches(input);
         expect(result).toEqual(expected);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
