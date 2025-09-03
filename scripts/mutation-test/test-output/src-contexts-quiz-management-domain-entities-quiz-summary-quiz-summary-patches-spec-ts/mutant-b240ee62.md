# Mutant b240ee62 Report

**File**: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 4271
**Stable ID**: b240ee62
**Location**: L185:10–L185:24

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz-summary/quiz-summary-patches.spec.ts	mutated #4271
@@ -181,9 +181,9 @@
     });
 
     describe("suggestStatusPatches", () => {
       it.each([
-        ["pending typo", "pending", [{ status: "pending_approval" }]],
+        ["", "pending", [{ status: "pending_approval" }]],
         ["waiting typo", "waiting", [{ status: "pending_approval" }]],
         ["approve typo", "approve", [{ status: "approved" }]],
         ["accept typo", "accept", [{ status: "approved" }]],
         ["reject typo", "reject", [{ status: "rejected" }]],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
