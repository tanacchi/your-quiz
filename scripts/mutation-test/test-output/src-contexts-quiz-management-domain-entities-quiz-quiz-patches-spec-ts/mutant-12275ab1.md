# Mutant 12275ab1 Report

**File**: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
**Mutator**: StringLiteral
**Original ID**: 1953
**Stable ID**: 12275ab1
**Location**: L199:10–L199:19

## Diff

```diff
Index: src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts
===================================================================
--- src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	original
+++ src/contexts/quiz-management/domain/entities/quiz/quiz-patches.spec.ts	mutated #1953
@@ -195,9 +195,9 @@
         ["approve", "approve", [{ status: "approved" }]],
         ["accept", "accept", [{ status: "approved" }]],
         ["published", "published", [{ status: "approved" }]],
         ["reject", "reject", [{ status: "rejected" }]],
-        ["decline", "decline", [{ status: "rejected" }]],
+        ["", "decline", [{ status: "rejected" }]],
         ["denied", "denied", [{ status: "rejected" }]],
         ["mixed case", "PENDING", [{ status: "pending_approval" }]],
         ["with spaces", " approve ", [{ status: "approved" }]],
         [
```

## Hint

ミューテータ "StringLiteral" による置換。

## Instruction

このサバイブ・ミューテーションを失敗させる最小テストを設計してください。
