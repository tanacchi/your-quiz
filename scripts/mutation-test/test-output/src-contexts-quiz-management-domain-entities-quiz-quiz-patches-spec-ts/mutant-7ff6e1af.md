# Mutant 7ff6e1af Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1989
**Stable ID**: 7ff6e1af
**Location**: L210:10–L210:28

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1989
@@ -206,9 +206,9 @@
           [{ status: "pending_approval" }],
         ],
         ["unknown status", "unknown_status", []],
         ["non-string input", 123, []],
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
