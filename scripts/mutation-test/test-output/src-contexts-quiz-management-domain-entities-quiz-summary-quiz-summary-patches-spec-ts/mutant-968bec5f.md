# Mutant 968bec5f Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4301
**Stable ID**: 968bec5f
**Location**: L190:10–L190:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4301
@@ -186,9 +186,9 @@
         ["waiting typo", "waiting", [{ status: "pending_approval" }]],
         ["approve typo", "approve", [{ status: "approved" }]],
         ["accept typo", "accept", [{ status: "approved" }]],
         ["reject typo", "reject", [{ status: "rejected" }]],
-        ["decline typo", "decline", [{ status: "rejected" }]],
+        ["", "decline", [{ status: "rejected" }]],
         [
           "pending_approval contains pending",
           "pending_approval",
           [{ status: "pending_approval" }],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
