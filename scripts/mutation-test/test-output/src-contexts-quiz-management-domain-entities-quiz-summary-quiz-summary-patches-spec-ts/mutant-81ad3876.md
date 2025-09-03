# Mutant 81ad3876 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4295
**Stable ID**: 81ad3876
**Location**: L189:10–L189:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4295
@@ -185,9 +185,9 @@
         ["pending typo", "pending", [{ status: "pending_approval" }]],
         ["waiting typo", "waiting", [{ status: "pending_approval" }]],
         ["approve typo", "approve", [{ status: "approved" }]],
         ["accept typo", "accept", [{ status: "approved" }]],
-        ["reject typo", "reject", [{ status: "rejected" }]],
+        ["", "reject", [{ status: "rejected" }]],
         ["decline typo", "decline", [{ status: "rejected" }]],
         [
           "pending_approval contains pending",
           "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
