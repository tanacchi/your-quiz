# Mutant 00a4a05c Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4317
**Stable ID**: 00a4a05c
**Location**: L197:10–L197:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4317
@@ -193,9 +193,9 @@
           "pending_approval",
           [{ status: "pending_approval" }],
         ],
         ["unknown typo", "unknown_status", []],
-        ["non-string input", 123, []],
+        ["", 123, []],
         ["null input", null, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestStatusPatches(input);
         expect(result).toEqual(expected);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
