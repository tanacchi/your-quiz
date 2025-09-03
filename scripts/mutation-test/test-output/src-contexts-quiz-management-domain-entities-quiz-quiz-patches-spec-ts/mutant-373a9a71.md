# Mutant 373a9a71 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1756
**Stable ID**: 373a9a71
**Location**: L107:10–L107:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1756
@@ -103,9 +103,9 @@
           [{ explanation: `${"A".repeat(997)}...` }],
         ],
         ["valid explanation", "Valid explanation", []],
         ["empty string", "", []],
-        ["non-string input", 123, []],
+        ["", 123, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestExplanationPatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
