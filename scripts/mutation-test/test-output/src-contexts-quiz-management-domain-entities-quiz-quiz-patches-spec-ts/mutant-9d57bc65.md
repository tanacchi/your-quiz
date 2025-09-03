# Mutant 9d57bc65 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1984
**Stable ID**: 9d57bc65
**Location**: L208:28–L208:44

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1984
@@ -204,9 +204,9 @@
           "pending_approval contains pending",
           "pending_approval",
           [{ status: "pending_approval" }],
         ],
-        ["unknown status", "unknown_status", []],
+        ["unknown status", "", []],
         ["non-string input", 123, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestStatusPatches(input);
         expect(result).toEqual(expected);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
