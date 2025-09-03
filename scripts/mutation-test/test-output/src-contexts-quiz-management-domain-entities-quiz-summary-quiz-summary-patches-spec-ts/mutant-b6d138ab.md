# Mutant b6d138ab Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4322
**Stable ID**: b6d138ab
**Location**: L199:10–L199:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4322
@@ -195,9 +195,9 @@
         ],
         ["unknown typo", "unknown_status", []],
         ["non-string input", 123, []],
         ["null input", null, []],
-      ])("should handle %s", (_desc, input, expected) => {
+      ])("", (_desc, input, expected) => {
         const result = suggestStatusPatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
