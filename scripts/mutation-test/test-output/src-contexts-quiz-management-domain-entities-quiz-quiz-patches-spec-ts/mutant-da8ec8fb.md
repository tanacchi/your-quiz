# Mutant da8ec8fb Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1971
**Stable ID**: da8ec8fb
**Location**: L202:10–L202:23

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1971
@@ -198,9 +198,9 @@
         ["reject", "reject", [{ status: "rejected" }]],
         ["decline", "decline", [{ status: "rejected" }]],
         ["denied", "denied", [{ status: "rejected" }]],
         ["mixed case", "PENDING", [{ status: "pending_approval" }]],
-        ["with spaces", " approve ", [{ status: "approved" }]],
+        ["", " approve ", [{ status: "approved" }]],
         [
           "pending_approval contains pending",
           "pending_approval",
           [{ status: "pending_approval" }],
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
