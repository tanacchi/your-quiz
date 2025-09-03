# Mutant de3ac3aa Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1965
**Stable ID**: de3ac3aa
**Location**: L201:10–L201:22

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1965
@@ -197,9 +197,9 @@
         ["published", "published", [{ status: "approved" }]],
         ["reject", "reject", [{ status: "rejected" }]],
         ["decline", "decline", [{ status: "rejected" }]],
         ["denied", "denied", [{ status: "rejected" }]],
-        ["mixed case", "PENDING", [{ status: "pending_approval" }]],
+        ["", "PENDING", [{ status: "pending_approval" }]],
         ["with spaces", " approve ", [{ status: "approved" }]],
         [
           "pending_approval contains pending",
           "pending_approval",
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
