# Mutant f3fff674 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1752
**Stable ID**: f3fff674
**Location**: L106:10–L106:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1752
@@ -102,9 +102,9 @@
           "A".repeat(1001),
           [{ explanation: `${"A".repeat(997)}...` }],
         ],
         ["valid explanation", "Valid explanation", []],
-        ["empty string", "", []],
+        ["", "", []],
         ["non-string input", 123, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestExplanationPatches(input);
         expect(result).toEqual(expected);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
