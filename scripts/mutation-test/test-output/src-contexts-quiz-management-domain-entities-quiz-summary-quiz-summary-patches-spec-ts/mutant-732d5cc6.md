# Mutant 732d5cc6 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4283
**Stable ID**: 732d5cc6
**Location**: L187:10–L187:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4283
@@ -183,9 +183,9 @@
     describe("suggestStatusPatches", () => {
       it.each([
         ["pending typo", "pending", [{ status: "pending_approval" }]],
         ["waiting typo", "waiting", [{ status: "pending_approval" }]],
-        ["approve typo", "approve", [{ status: "approved" }]],
+        ["", "approve", [{ status: "approved" }]],
         ["accept typo", "accept", [{ status: "approved" }]],
         ["reject typo", "reject", [{ status: "rejected" }]],
         ["decline typo", "decline", [{ status: "rejected" }]],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
