# Mutant c3e88cf4 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4254
**Stable ID**: c3e88cf4
**Location**: L164:10–L164:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4254
@@ -160,9 +160,9 @@
         ],
         ["unknown typo", "unknown_type", []],
         ["non-string input", 123, []],
         ["null input", null, []],
-      ])("should handle %s", (_desc, input, expected) => {
+      ])("", (_desc, input, expected) => {
         const result = suggestAnswerTypePatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
