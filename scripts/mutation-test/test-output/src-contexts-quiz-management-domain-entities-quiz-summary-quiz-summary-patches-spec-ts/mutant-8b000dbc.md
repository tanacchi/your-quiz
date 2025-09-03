# Mutant 8b000dbc Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4314
**Stable ID**: 8b000dbc
**Location**: L196:26–L196:42

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4314
@@ -192,9 +192,9 @@
           "pending_approval contains pending",
           "pending_approval",
           [{ status: "pending_approval" }],
         ],
-        ["unknown typo", "unknown_status", []],
+        ["unknown typo", "", []],
         ["non-string input", 123, []],
         ["null input", null, []],
       ])("should handle %s", (_desc, input, expected) => {
         const result = suggestStatusPatches(input);
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
