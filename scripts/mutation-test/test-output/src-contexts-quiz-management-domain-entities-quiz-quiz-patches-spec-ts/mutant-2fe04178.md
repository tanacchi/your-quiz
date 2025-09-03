# Mutant 2fe04178 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1987
**Stable ID**: 2fe04178
**Location**: L209:10–L209:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1987
@@ -205,9 +205,9 @@
           "pending_approval",
           [{ status: "pending_approval" }],
         ],
         ["unknown status", "unknown_status", []],
-        ["non-string input", 123, []],
+        ["", 123, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestStatusPatches(input);
         expect(result).toEqual(expected);
       });
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
