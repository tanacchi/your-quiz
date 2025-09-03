# Mutant fb5a6d09 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4289
**Stable ID**: fb5a6d09
**Location**: L188:10–L188:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4289
@@ -184,9 +184,9 @@
       it.each([
         ["pending typo", "pending", [{ status: "pending_approval" }]],
         ["waiting typo", "waiting", [{ status: "pending_approval" }]],
         ["approve typo", "approve", [{ status: "approved" }]],
-        ["accept typo", "accept", [{ status: "approved" }]],
+        ["", "accept", [{ status: "approved" }]],
         ["reject typo", "reject", [{ status: "rejected" }]],
         ["decline typo", "decline", [{ status: "rejected" }]],
         [
           "pending_approval contains pending",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
