# Mutant b9647dbf Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4307
**Stable ID**: b9647dbf
**Location**: L192:11–L192:46

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4307
@@ -188,9 +188,9 @@
         ["accept typo", "accept", [{ status: "approved" }]],
         ["reject typo", "reject", [{ status: "rejected" }]],
         ["decline typo", "decline", [{ status: "rejected" }]],
         [
-          "pending_approval contains pending",
+          "",
           "pending_approval",
           [{ status: "pending_approval" }],
         ],
         ["unknown typo", "unknown_status", []],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
