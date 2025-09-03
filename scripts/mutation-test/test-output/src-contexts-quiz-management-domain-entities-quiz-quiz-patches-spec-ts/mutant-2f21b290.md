# Mutant 2f21b290 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1753
**Stable ID**: 2f21b290
**Location**: L106:26–L106:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1753
@@ -102,9 +102,9 @@
           "A".repeat(1001),
           [{ explanation: `${"A".repeat(997)}...` }],
         ],
         ["valid explanation", "Valid explanation", []],
-        ["empty string", "", []],
+        ["empty string", "Stryker was here!", []],
         ["non-string input", 123, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestExplanationPatches(input);
         expect(result).toEqual(expected);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
