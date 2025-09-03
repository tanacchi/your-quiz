# Mutant b39fe82c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4252
**Stable ID**: b39fe82c
**Location**: L163:10–L163:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4252
@@ -159,9 +159,9 @@
           [{ answerType: "free_text" }],
         ],
         ["unknown typo", "unknown_type", []],
         ["non-string input", 123, []],
-        ["null input", null, []],
+        ["", null, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestAnswerTypePatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
