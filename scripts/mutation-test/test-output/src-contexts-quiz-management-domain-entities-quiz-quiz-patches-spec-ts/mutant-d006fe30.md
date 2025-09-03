# Mutant d006fe30 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1697
**Stable ID**: d006fe30
**Location**: L50:10–L50:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1697
@@ -46,9 +46,9 @@
         ["501 chars", "A".repeat(501), [{ question: `${"A".repeat(497)}...` }]],
         ["valid question", "Valid question?", []],
         ["non-string input", 123, []],
         ["null input", null, []],
-      ])("should handle %s", (_desc, input, expected) => {
+      ])("", (_desc, input, expected) => {
         const result = suggestQuestionPatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
