# Mutant a2607cd3 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4277
**Stable ID**: a2607cd3
**Location**: L186:10–L186:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4277
@@ -182,9 +182,9 @@
 
     describe("suggestStatusPatches", () => {
       it.each([
         ["pending typo", "pending", [{ status: "pending_approval" }]],
-        ["waiting typo", "waiting", [{ status: "pending_approval" }]],
+        ["", "waiting", [{ status: "pending_approval" }]],
         ["approve typo", "approve", [{ status: "approved" }]],
         ["accept typo", "accept", [{ status: "approved" }]],
         ["reject typo", "reject", [{ status: "rejected" }]],
         ["decline typo", "decline", [{ status: "rejected" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
