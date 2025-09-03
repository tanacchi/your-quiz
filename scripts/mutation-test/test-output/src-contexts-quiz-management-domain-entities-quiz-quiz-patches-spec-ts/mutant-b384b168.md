# Mutant b384b168 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1959
**Stable ID**: b384b168
**Location**: L200:10–L200:18

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1959
@@ -196,9 +196,9 @@
         ["accept", "accept", [{ status: "approved" }]],
         ["published", "published", [{ status: "approved" }]],
         ["reject", "reject", [{ status: "rejected" }]],
         ["decline", "decline", [{ status: "rejected" }]],
-        ["denied", "denied", [{ status: "rejected" }]],
+        ["", "denied", [{ status: "rejected" }]],
         ["mixed case", "PENDING", [{ status: "pending_approval" }]],
         ["with spaces", " approve ", [{ status: "approved" }]],
         [
           "pending_approval contains pending",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
